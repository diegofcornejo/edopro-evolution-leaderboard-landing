import { createClient } from 'redis';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		//verify jwt
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET, { issuer: process.env.JWT_ISSUER});
		if (!decoded) {
			res.status(401).json({ error: 'Invalid token' });
			return;
		}
		
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();

		try {
			const { username } = decoded;
			console.log(req.body)
			const { password, newPassword } = req.body;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			//get password
			const userPassword = await client.hGet(key, 'password');
			if (userPassword !== password) {
				res.status(401).json({ error: 'Actual password is invalid' });
				return;
			}

			//update password
			const updatePassword = await client.hSet(key, 'password', newPassword);

			if (updatePassword != 0) {
				res.status(401).json({ error: 'Password update failed' });
				return;
			}

			res.status(200).json({ message: 'Password updated' });
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