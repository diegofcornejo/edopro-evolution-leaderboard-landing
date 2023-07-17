import { createClient } from 'redis';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));
		await client.connect();
		const { username, password } = req.body;
		const usernameExists = await client.EXISTS(`user:${username}`);
		if (!usernameExists) {
			res.status(409).json({ error: 'Username does not exist' });
			return;
		}
		const userPassword = await client.hGet(`user:${username}`, 'password');
		if (userPassword !== password) {
			res.status(401).json({ error: 'Invalid credentials' });
			return;
		}
		//get rank
		const rank = await client.zRevRank('leaderboard:points', username);
		//get points
		const points = await client.zScore('leaderboard:points', username);
		//get wins
		const wins = await client.zScore('leaderboard:wins', username);
		//get losses
		const losses = await client.zScore('leaderboard:losses', username);
		await client.quit();
		res.status(200).json({ username, rank, points, wins, losses });
	}
}

export default handler;