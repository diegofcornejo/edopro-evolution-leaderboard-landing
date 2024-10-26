import sendEmail from '../../../libs/sendGridUtils';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';
import { initializeDataSource } from '../../../libs/database';
import bcrypt from 'bcrypt';

const PASSWORD_LENGTH = 4


const handler = async (request, response) => {
	if (request.method === 'POST') {
		const session = await getServerSession(request, response, authOptions)

		if(!session) {
			response.status(401).json({ error: 'Unauthorized' });
		}

		let client;
		try {
			const { id } = session.user;
			const { password, newPassword } = request.body;

			if(newPassword.length !== PASSWORD_LENGTH) {
				response.status(400).json({ error: 'Invalid password length' });
				return
			}
			const dataSource = await initializeDataSource();
			const userResponse = await dataSource.query(`SELECT * FROM users WHERE id = '${id}'`);

			if(userResponse.length === 0) {
				response.status(409).json({ error: 'User does not exist' });
				return
			}

			const user = userResponse[0];

			if(!bcrypt.compareSync(password, user.password)) {
				response.status(401).json({ error: 'Actual password is invalid' });
				return;
			}

			const passwordHashed = await bcrypt.hash(newPassword, 10);

			await dataSource.query(`UPDATE users SET password = '${passwordHashed}' WHERE id = '${id}'`)

			const emailData = {
				email: user.email,
				username: user.username,
				password: newPassword,
				template_id: process.env.SENDGRID_PASSWORD_TEMPLATE_ID
			};
			await sendEmail(emailData);
			response.status(200).json({ message: 'Password updated' });
		} catch (error) {
			console.error('Error during processing:', error);
			response.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if(client) await client.quit();
		}

	} else {
		response.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;