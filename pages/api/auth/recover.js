import { passwordGenerator } from '../../../libs/helpers';
import sendEmail from '../../../libs/sendGridUtils';
import bcrypt from 'bcrypt';
import { initializeDataSource } from '../../../libs/database';


const handler = async (request, response) => {
	if (request.method === 'POST') {
		try {
			if (!request.body.email) {
				response.status(400).json({ error: 'Missing email in the request body' });
				return;
			}
			
			const { email } = request.body;

			const password = passwordGenerator(4);
			const passwordHashed = await bcrypt.hash(password, 10);

			const dataSource = await initializeDataSource();

			const userResponse = await dataSource.query(`SELECT * FROM users WHERE email = '${email}'`);
			
			if (userResponse.length === 0) {
				response.status(404).json({ error: 'Email not found' });
				return;
			}

			await dataSource.query(`UPDATE users SET password = '${passwordHashed}' WHERE id = '${userResponse[0].id}'`)

			const emailData = {
				email,
				username: userResponse[0].username,
				password,
				template_id: process.env.SENDGRID_PASSWORD_TEMPLATE_ID
			};

			await sendEmail(emailData);
			response.status(202).json({ message: 'We have sent your new credentials to the registered email' });

		} catch (error) {
			console.error('Error during processing:', error);
			response.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		response.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;