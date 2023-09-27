const handler = async (req, res) => {
	if (req.method === 'GET') {
		const { code } = req.query;

		const formData = new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID,
			client_secret: process.env.DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.DISCORD_REDIRECT_URI
		});
	
		const response = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		});
	
		const data = await response.json();

		const meResponse = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `${data.token_type} ${data.access_token}`
			}
		});

		const me = await meResponse.json();

		res.status(200).json({});
	}else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;