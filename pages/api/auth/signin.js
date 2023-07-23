import { createClient } from 'redis';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();

		try {
			const { username, password } = req.body;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			const userPassword = await client.hGet(key, 'password');
			if (userPassword !== password) {
				res.status(401).json({ error: 'Invalid credentials' });
				return;
			}

			const [rank, points, wins, losses] = await Promise.all([
				client.zRevRank('leaderboard:points', username),
				client.zScore('leaderboard:points', username),
				client.zScore('leaderboard:wins', username),
				client.zScore('leaderboard:losses', username),
			]);

			const winrate = parseFloat(((wins / (wins + losses)) * 100).toFixed(2));

			const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d', issuer: process.env.JWT_ISSUER });

			res.status(200).json({token, username, rank, points, wins, losses, winrate });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			await client.quit();
		}

	}else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;