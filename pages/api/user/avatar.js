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
			const { avatar } = req.body;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			const saveAvatar = await client.hSet(key, 'avatar', JSON.stringify(avatar));
			if (saveAvatar != 0 && saveAvatar != 1) {
				res.status(401).json({ error: 'Avatar save failed' });
				return;
			}

			res.status(200).json({ message: 'Avatar saved' });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if (client) await client.quit();
		}

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;