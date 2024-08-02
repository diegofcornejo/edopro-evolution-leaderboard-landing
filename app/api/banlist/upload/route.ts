import { verifyJwt } from '../../../../libs/jwtUtils';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const git = simpleGit();
const githubURLRepo = 'https://github.com/termitaklk/lflist';

const done = (response, status) => {
	return new Response(JSON.stringify(response), {
		status: status,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

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

    const repoDir = path.join('/tmp', 'repo');
    const gitUrlWithCredentials = repoUrl.replace(
      'https://',
      `https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@`
    );

    try {
      // Clone repository with credentials
      await git.clone(gitUrlWithCredentials, repoDir);
      const repoGit = simpleGit(repoDir);

      // Save file to /tmp
      const filePath = await saveFile(file);

      // Move file to repository
      const repoFilePath = path.join(repoDir, file.name);
      await fs.promises.rename(filePath, repoFilePath);

      // Make commit
      await repoGit.add(repoFilePath);
      await repoGit.commit(commitMessage);

      // Make push
      await repoGit.push();

      return done({ message: 'Banlist Uploaded' }, 200);
    } catch (error) {
      console.error('Error during processing:', error);
      return done({ error: 'Error during processing' }, 500);
    } finally {
      fs.rmSync(repoDir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error('Error parsing the form:', error);
    return done({ error: 'Error parsing the form' }, 400);
  }
}
