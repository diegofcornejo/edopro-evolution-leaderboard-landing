import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { initializeDataSource } from '../../../libs/database';

const handler = async (request, response) => {
	if (request.method === 'POST') {

		const session = await getServerSession(request, response, authOptions)

		if(!session) {
			response.status(401).json({ error: 'Unauthorized' });
		}

		try {
			const { id } = session.user;
			const { avatar } = request.body;
			const dataSource = await initializeDataSource();
			const userResponse = await dataSource.query(`SELECT * FROM users WHERE id = '${id}'`);

			if(userResponse.length === 0) {
				response.status(409).json({ error: 'User does not exist' });
				return
			}

			await dataSource.query(`UPDATE users SET avatar = '${JSON.stringify(avatar)}' WHERE id = '${id}'`);
			response.status(200).json({ message: 'Avatar saved' });
		} catch (error) {
			console.error('Error during processing:', error);
			response.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		response.status(405).json({ error: 'Method not allowed' });
	}
}


export default handler;