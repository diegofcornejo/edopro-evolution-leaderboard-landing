import { verifyJwt } from '../../../../libs/jwtUtils';
import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';

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

async function saveFile(file) {
  const data = Buffer.from(await file.arrayBuffer());
  const filePath = path.join('/tmp', file.name);
  await fs.promises.writeFile(filePath, data);
  return filePath;
}


export async function POST(req) {
  let decoded;
  try {
    decoded = verifyJwt(req);
  } catch (error) {
    console.log(error);
    return done({ error: 'Unauthorized' }, 401);
  }

  if (decoded.role !== 'ADMIN' && decoded.role !== 'MANAGER') {
    return done({ error: 'Forbidden' }, 403);
  }

  try {
    const formData = await req.formData();
    const fields = Object.fromEntries(formData.entries());
    const file = formData.get('file');

    if (!file) {
      return done({ error: 'No file provided' }, 400);
    }

    const repoUrl = githubURLRepo;
    const commitMessage = fields.commitMessage || 'Adding banlist file';

    const filePath = await saveFile(file);
    const content = fs.readFileSync(filePath, { encoding: 'base64' });

    const [owner, repo] = repoUrl.split('/').slice(-2);

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
