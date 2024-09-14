import { verifyJwt } from "../../../libs/jwtUtils";

const handler = async (request, response) => {
	if (request.method === 'POST') {
		let decoded;
		try {
			decoded = verifyJwt(request);
		} catch (error) {
			console.error('Error during JWT processing:', error);
			return response.status(401).json({ error: 'Unauthorized' });
		}
		if (decoded.role !== 'admin') {
			return response.status(403).json({ error: 'Forbidden' });
		}

		const { message, reason } = request.body;

		try {
			const payload = {
				message,
				reason
			};
			const request = await fetch(`${process.env.SERVER_API_URL}/api/admin/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'admin-api-key': `${process.env.SERVER_API_ADMIN_KEY}`,
				},
				body: JSON.stringify(payload),
			});
			const data = await request.json();
			return response.status(200).json({message: 'Message sent', data});
		} catch (error) {
			console.error('Error during processing:', error);
			return response.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		response.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
