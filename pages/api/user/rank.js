import createRedisClient from '../../../libs/redisUtils';
import { verifyJwt } from '../../../libs/jwtUtils';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		let decoded;
    // Verify jwt
    try {
      decoded = verifyJwt(req);
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
		
		let client;
		try {
			client = await createRedisClient();
			const { username } = decoded;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			const [rank, points, wins, losses] = await Promise.all([
				client.zRank('leaderboard:points', username),
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
			if(client) await client.quit();
		}

	}else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;