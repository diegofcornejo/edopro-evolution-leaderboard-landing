const handler = async (req, res) => {
	if (req.method === 'GET') {
		
		const events = [
			{
				"id": "11b70ef8-b121-4e96-9f54-c6f5d0ab0dda",
				"name": "Grand Slam 1",
				"type": "Event",
				"creator": "Admin",
				"creationDate": "2023-08-05 18:26:45",
				"start": "2023-08-05",
				"end": "2023-08-05 23:59:59",
				"status": "Finished",
				"banlist": "2023.06 TCG",
				"allowed": "Prerelease",
				"mode": "Single",
				"rule": "Master Rule 5",
				"bestof": 3,
				"rules": ["Best of 3", "TCG", "Swiss", "Top 8"]
			},
			{
				"id": "11b70ef8-b121-4e96-9f54-c6f5d0ab0ddb",
				"name": "Grand Slam 2",
				"type": "Event",
				"creator": "Admin",
				"creationDate": "2023-08-05 18:26:45",
				"start": "2023-08-05",
				"end": "2023-08-05 23:59:59",
				"status": "Running",
				"banlist": "2023.06 TCG",
				"allowed": "Prerelease",
				"mode": "Single",
				"rule": "Master Rule 5",
				"bestof": 3,
				"rules": ["Best of 3", "TCG", "Swiss", "Top 8"]
			},
			{
				"id": "11b70ef8-b121-4e96-9f54-c6f5d0ab0ddc",
				"name": "Grand Slam 3",
				"type": "Event",
				"creator": "Admin",
				"creationDate": "2023-08-05 18:26:45",
				"start": "2023-08-05",
				"end": "2023-08-05 23:59:59",
				"status": "Upcoming",
				"banlist": "2023.06 TCG",
				"allowed": "Prerelease",
				"mode": "Single",
				"rule": "Master Rule 5",
				"bestof": 3,
				"rules": ["Best of 3", "TCG", "Swiss", "Top 8"]
			},
			{
				"id": "11b70ef8-b121-4e96-9f54-c6f5d0ab0ddd",
				"name": "Grand Slam 4",
				"type": "Event",
				"creator": "Admin",
				"creationDate": "2023-08-05 18:26:45",
				"start": "2023-08-05",
				"end": "2023-08-05 23:59:59",
				"status": "Finished",
				"banlist": "2023.06 TCG",
				"allowed": "Prerelease",
				"mode": "Single",
				"rule": "Master Rule 5",
				"bestof": 3,
				"rules": ["Best of 3", "TCG", "Swiss", "Top 8"]
			},
			{
				"id": "11b70ef8-b121-4e96-9f54-c6f5d0ab0dde",
				"name": "King of Darkness",
				"type": "Tournament",
				"creator": "Admin",
				"creationDate": "2023-08-05 18:26:45",
				"start": "2023-08-05",
				"end": "2023-08-05 23:59:59",
				"status": "Finished",
				"banlist": "Custom Banlist",
				"allowed": "Prerelease",
				"mode": "Single",
				"rule": "Master Rule 4",
				"bestof": 3,
				"rules": ["Best of 3", "TCG", "Swiss", "Top 8"]
			},
		]
		res.status(200).json(events);
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;