import createRedisClient from '../../../libs/redisUtils';
import { passwordGenerator } from '../../../libs/helpers';
import sendEmail from '../../../libs/sendGridUtils';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		let client;
		try {

			client = await createRedisClient();

			if (!req.body.username || !req.body.email) {
				res.status(400).json({ error: 'Missing username, or email in the request body' });
				return;
			}

			const { username, email } = req.body;

			const usernameExists = await client.exists(`user:${username}`);
			if (usernameExists) {
				res.status(409).json({ error: 'Username already registered' });
				return;
			}

			const emailExists = await client.exists(`email:${email}`);
			if (emailExists) {
				res.status(409).json({ error: 'Email already registered' });
				return;
			}

			//Generate a random password
			const password = passwordGenerator(4);

			const createUser = await client.hSet(`user:${username}`, { username, password, email });
			if (createUser === 3) { //This is the number of fields that we are setting
				await Promise.all([
					client.set(`email:${email}`, username),
					client.zAdd('leaderboard:points', { score: 0, value: username }),
					client.zAdd('leaderboard:wins', { score: 0, value: username }),
					client.zAdd('leaderboard:losses', { score: 0, value: username })
				]);

				const emailData = {
					email,
					username,
					password,
					template_id: process.env.SENDGRID_TEMPLATE_ID
				};
				await sendEmail(emailData);

				res.status(202).json({ message: 'User created: We have sent your credentials to the registered email' });
			} else {
				await client.del(`user:${username}`);
				res.status(500).json({ error: 'User not created' });
				return;
			}
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if(client) await client.quit();
		}

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;