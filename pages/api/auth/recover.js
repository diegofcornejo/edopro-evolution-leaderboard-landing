import createRedisClient from '../../../libs/redisUtils';
import { passwordGenerator } from '../../../libs/helpers';
import sendEmail from '../../../libs/sendGridUtils';

const handler = async (req, res) => {
	if (req.method === 'POST') {

		let client;
		try {

			client = await createRedisClient();

			if (!req.body.email) {
				res.status(400).json({ error: 'Missing email in the request body' });
				return;
			}

			const { email } = req.body;

			//Generate a random password
			const password = passwordGenerator(4);

			const username = await client.get(`email:${email}`);
			
			if (!username) {
				res.status(404).json({ error: 'Email not found' });
				return;
			}

			const updateUser = await client.hSet(`user:${username}`, { password });
			
			if (updateUser === 0) { //This is the number of fields that we are setting
				console.log('Password reset successfully');
				const emailData = {
					email,
					username,
					password,
					template_id: process.env.SENDGRID_PASSWORD_TEMPLATE_ID
				};
				await sendEmail(emailData);

				res.status(202).json({ message: 'We have sent your new credentials to the registered email' });
			} else {
				res.status(500).json({ error: 'Password not reset' });
				return;
			}
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

export default handler;