import { verifyJwt } from "../../../libs/jwtUtils";

const handler = async (req, res) => {
	if (req.method === 'POST') {
		let decoded;
		try {
			decoded = verifyJwt(req);
		} catch (error) {
			console.error('Error during JWT processing:', error);
			return res.status(401).json({ error: 'Unauthorized' });
		}
		if (decoded.role !== 'ADMIN') {
			return res.status(403).json({ error: 'Forbidden' });
		}

		const { message, reason } = req.body;

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
			return res.status(200).json({message: 'Message sent', data});
		} catch (error) {
			console.error('Error during processing:', error);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
