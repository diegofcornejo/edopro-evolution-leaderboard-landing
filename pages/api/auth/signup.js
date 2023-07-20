import { createClient } from 'redis';

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
						"email": email
					}
				],
				"dynamic_template_data": {
					"username": username,
					"password": password
				}
			}
		],
		"template_id": process.env.SENDGRID_TEMPLATE_ID
	}
	try {
		await sgMail.send(message);
	} catch (error) {
		console.log('Sengrid Client Error', error);
	}
}

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));

		try {
			await client.connect();

			if (!req.body.username || !req.body.password || !req.body.email) {
				res.status(400).json({ error: 'Missing username, password, or email in the request body' });
				return;
			}

			const { username, password, email } = req.body;

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

			const createUser = await client.hSet(`user:${username}`, { username, password, email });
			if (createUser === 3) { //This is the number of fields that we are setting
				await Promise.all([
					await client.set(`email:${email}`, username),
					await client.zAdd('leaderboard:points', { score: 0, value: username }),
					await client.zAdd('leaderboard:wins', { score: 0, value: username }),
					await client.zAdd('leaderboard:losses', { score: 0, value: username })
				]);

				await sendEmail(email, username, password);
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
			await client.quit();
		}

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;