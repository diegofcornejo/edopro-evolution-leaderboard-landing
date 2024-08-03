import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function checkPermissions() {
  try {
    const response = await octokit.rest.repos.get({
      owner: 'termitaklk',
      repo: 'lflist',
    });
    console.log('Repository data:', response.data);
    console.log('Token has the required permissions.');
  } catch (error) {
    console.error('Error verifying permissions:', error);
  }
}

export async function GET(req) {
	await checkPermissions();
	return new Response('OK');
}
