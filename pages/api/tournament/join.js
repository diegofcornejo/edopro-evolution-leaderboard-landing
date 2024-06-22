import { verifyJwt } from '../../../libs/jwtUtils';
import createRedisClient from '../../../libs/redisUtils';


const Join = async (req, res) => {
	if (req.method === 'POST') {
		let decoded;
		try {
			decoded = verifyJwt(req);
		} catch (error) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		const { tournamentId } = req.body;

		let client;
		try {
			client = await createRedisClient();
			const key = `tournament:${tournamentId}`;
			const { username } = decoded;

			// Check if user is already in tournament
			const exists = await client.zScore(`${key}:leaderboard:points`, username);
			if (exists !== null) {
				res.status(400).json({ error: 'Already in tournament' });
				return;
			}

			let [avatar] = await Promise.all([
				client.hmGet(key, ['avatar']),
				client.zAdd(`${key}:leaderboard:points`, { score: 0, value: username }),
				client.zAdd(`${key}:leaderboard:wins`, { score: 0, value: username }),
				client.zAdd(`${key}:leaderboard:losses`, { score: 0, value: username })
			]);


			const player = {
				"value": username,
				"score": 0,
				"wins": 0,
				"losses": 0,
				"winrate": 0,
				"position": 0,
				"difference": 0,
				"avatar": avatar[0] ? JSON.parse(avatar[0]) : null
			};

			res.status(200).json({ message: 'Joined successfully', player});
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if (client) await client.quit();
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default Join;