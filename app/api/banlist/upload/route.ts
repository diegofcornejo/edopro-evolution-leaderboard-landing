import fs from 'fs';
import path from 'path';
import { verifyJwt } from '../../../../libs/jwtUtils';
import { Octokit } from '@octokit/rest';
import createRedisClient from '../../../../libs/redisUtils';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

const githubURLRepo = 'https://github.com/termitaklk/lflist';

const done = (response, status) => {
	return new Response(JSON.stringify(response), {
		status: status,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

async function addIdentifierToBanlist(file: File, banlist: { identifier: string }): Promise<string> {
	const identifier = banlist.identifier;
	const data = Buffer.from(await file.arrayBuffer());
	const fileContent = data.toString('utf-8');
	const lines = fileContent.split('\n');
	const newLines: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (i === 0) {
			line = line.replace(/\[([^\]]+)\]/g, `\[${identifier} - $1\]`);
			newLines.push(line);
		} else if (line.startsWith('!')) {
			newLines.push(`!${identifier} - ${line.slice(1)}`);
		} else {
			newLines.push(line);
		}
	}

	return newLines.join('\n');
}


async function saveFile(fileContent, fileName) {
	const filePath = path.join('/tmp', fileName);
	await fs.promises.writeFile(filePath, fileContent);
	return filePath;
}

async function getUserBanlists(username) {
	let client;
	try {
		client = await createRedisClient();
		const permissions = await client.hGet(`user:${username}`, "permissions");
		if (!permissions) return [];
		const parsedPermissions = JSON.parse(permissions);
		const banlists = parsedPermissions.banlists;
		if (!banlists) return [];
		return banlists;
	} catch (error) {
		console.error('Error during processing:', error);
		return [];
	} finally {
		if (client) await client.quit();
	}
}

async function checkFileName(banlists, fileName) {
	for (const banlist of banlists) {
		if (banlist.githubFileName === fileName) {
			return true;
		}
	}
	return false;
}

async function getBanlistInFile(file) {
	const data = Buffer.from(await file.arrayBuffer());
	const fileContent = data.toString('utf-8');
	const lines = fileContent.split('\n');
	let banlistCount = 0;

	for (const line of lines) {
		if (line.startsWith('!')) {
			banlistCount++;
		}
	}

	return banlistCount;
}

const MAX_BANLIST_PER_FILE = 2; // 2 banlists per file, 1 file per community

export async function POST(req) {
	let decoded;
	try {
		decoded = verifyJwt(req);
	} catch (error) {
		console.error(error);
		return done({ error: 'Unauthorized' }, 401);
	}

	if (decoded.role !== 'ADMIN' && decoded.role !== 'MANAGER') {
		return done({ error: 'Forbidden' }, 403);
	}

	try {
		const formData = await req.formData();
		const username = formData.get('username');
		const commitMessage = formData.get('commitMessage') || 'Adding banlist file';
		const file = formData.get('file');
		const banlists = await getUserBanlists(username);
		const hasPermission = await checkFileName(banlists, file.name);

		if (!file) {
			return done({ error: 'No file provided' }, 400);
		}

		if (!hasPermission) {
			return done({ error: 'You do not have permission to upload this banlist, check the filename' }, 403);
		}

		const banlistInFile = await getBanlistInFile(file);

		if (banlistInFile > MAX_BANLIST_PER_FILE) {
			return done({ error: `You can only have ${MAX_BANLIST_PER_FILE} banlists per file` }, 403);
		}

		const updatedContent = await addIdentifierToBanlist(file, banlists[0]);
		const filePath = await saveFile(updatedContent, file.name);
		const content = fs.readFileSync(filePath, { encoding: 'base64' });

		const [owner, repo] = githubURLRepo.split('/').slice(-2);

		try {
			// Get the reference of the main branch
			const { data: refData } = await octokit.rest.git.getRef({
				owner,
				repo,
				ref: 'heads/main',
			});

			const baseTree = refData.object.sha;

			// Create a new blob with the file content
			const blobData = await octokit.rest.git.createBlob({
				owner,
				repo,
				content: content,
				encoding: 'base64',
			});

			// Create a new tree
			const treeData = await octokit.rest.git.createTree({
				owner,
				repo,
				base_tree: baseTree,
				tree: [
					{
						path: file.name,
						mode: '100644',
						type: 'blob',
						sha: blobData.data.sha,
					},
				],
			});

			// Create a new commit
			const commitData = await octokit.rest.git.createCommit({
				owner,
				repo,
				message: commitMessage,
				tree: treeData.data.sha,
				parents: [baseTree],
			});

			// Update the reference to point to the new commit
			await octokit.rest.git.updateRef({
				owner,
				repo,
				ref: 'heads/main',
				sha: commitData.data.sha,
			});

			return done({ message: 'Banlist Uploaded' }, 200);
		} catch (error) {
			console.error('Error during processing:', error);
			return done({ error: 'Error during processing' }, 500);
		}
	} catch (error) {
		console.error('Error parsing the form:', error);
		return done({ error: 'Error parsing the form' }, 400);
	}
}
