/* eslint-disable unicorn/no-null */
import { passwordGenerator } from '../../../libs/helpers';
import sendEmail from '../../../libs/sendGridUtils';
import databaseConfig from '../../../ormconfig.json';
import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

let AppDataSource;

const initializeDataSource = async () => {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    AppDataSource = new DataSource(databaseConfig);
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

const handler = async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { username, email } = request.body;

		if (!username || !email) {
			return response.status(400).json({ error: 'Missing username or email in the request body' });
		}

		const dataSource = await initializeDataSource();

		const userCount = await dataSource.query(
			'SELECT COUNT(*) FROM users WHERE username = $1 OR email = $2',
			[username, email]
		);

		if (Number(userCount[0].count) > 0) {
			return response.status(409).json({ error: 'Username or email already registered' });
		}

		const password = passwordGenerator(4);
		const passwordHashed = await bcrypt.hash(password, 10);
		const id = uuidv4();

		const query = `
			INSERT INTO users (id, username, email, password, avatar)	
			VALUES ($1, $2, $3, $4, $5)
		`;
		const values = [id, username, email, passwordHashed, null];

		await dataSource.query(query, values);

		const emailData = {
			email,
			username,
			password,
			template_id: process.env.SENDGRID_TEMPLATE_ID
		};
		await sendEmail(emailData);

		return response.status(201).json({ message: 'User created: We have sent your credentials to the registered email' });
	} catch (error) {
		console.error('Error during processing:', error);
		return response.status(500).json({ error: 'Internal Server Error' });
	} 
};

export default handler;