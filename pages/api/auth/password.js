import createRedisClient from '../../../libs/redisUtils';
import { verifyJwt } from '../../../libs/jwtUtils';

//Send email with sendgrid template
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, username, password) => {
	const message = {
		"from": {
			"email": process.env.SENDGRID_FROM_EMAIL
		},
		"personalizations": [
			{
				"to": [
					{
						email
					}
				],
				"dynamic_template_data": {
					username,
					password
				}
			}
		],
		"template_id": process.env.SENDGRID_PASSWORD_TEMPLATE_ID
	}
	try {
		await sgMail.send(message);
	} catch (error) {
		console.log('Sengrid Client Error', error);
	}
}

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
			
			await sendEmail(email, username, newPassword);
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