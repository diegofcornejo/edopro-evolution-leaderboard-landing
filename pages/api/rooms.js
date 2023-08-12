
const handler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const request = await fetch(`${process.env.SERVER_API_URL}/api/getrooms`);
			const data = await request.json();
			res.status(200).json(data.rooms);
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
