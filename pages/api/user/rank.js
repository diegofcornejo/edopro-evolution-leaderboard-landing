import { createClient } from 'redis';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		//verify jwt
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET, { issuer: process.env.JWT_ISSUER});
		console.log("🚀 ~ file: rank.js:10 ~ handler ~ decoded:", decoded)
		if (!decoded) {
			res.status(401).json({ error: 'Invalid credentials' });
			return;
		}
		
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();

		try {
			const { username } = req.body;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			const [rank, points, wins, losses] = await Promise.all([
				client.zRevRank('leaderboard:points', username),
				client.zScore('leaderboard:points', username),
				client.zScore('leaderboard:wins', username),
				client.zScore('leaderboard:losses', username),
			]);

			const winrate = parseFloat(((wins / (wins + losses)) * 100).toFixed(2));

			res.status(200).json({username, rank, points, wins, losses, winrate });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			await client.quit();
		}

	}
}

export default handler;