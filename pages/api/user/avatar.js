import createRedisClient from '../../../libs/redisUtils';
import { verifyJwt } from '../../../libs/jwtUtils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		const session = await getServerSession(req, res, authOptions)

		if(!session) {
			res.status(401).json({ error: 'Unauthorized' });
		}

		let client;
		try {
			client = await createRedisClient();
			const { username } = session?.user;
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