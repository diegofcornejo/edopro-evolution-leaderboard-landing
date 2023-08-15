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
			const key = `tournament:${tournamentId}:players`;
			const { username } = decoded;

			const alreadyJoined = await client.lRange(key, 0, -1);
			if (alreadyJoined.includes(username)) {
				res.status(400).json({ error: 'User already joined' });
				return;
			}

			await client.lPush(key, username);

			const data = {
				"value": username,
				"score": 0,
				"wins": 0,
				"losses": 0,
				"winrate": 0,
				"position": 0,
				"difference": 0,
				"avatar": null
			};

			res.status(200).json({ message: 'Joined successfully', data});
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