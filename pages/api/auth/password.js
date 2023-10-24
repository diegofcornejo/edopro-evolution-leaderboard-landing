import createRedisClient from '../../../libs/redisUtils';
import { verifyJwt } from '../../../libs/jwtUtils';
import sendEmail from '../../../libs/sendGridUtils';

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
			const email = await client.hGet(key, 'email');
			const emailData = {
				email,
				username,
				password: newPassword,
				template_id: process.env.SENDGRID_PASSWORD_TEMPLATE_ID
			};
			await sendEmail(emailData);
			res.status(200).json({ message: 'Password updated' });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if(client) await client.quit();
		}

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;