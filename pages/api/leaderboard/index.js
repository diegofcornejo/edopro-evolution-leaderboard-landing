import createRedisClient from '../../../libs/redisUtils';

const handler = async (req, res) => {
	if (req.method === 'GET') {

		let client;

		try {

			client = await createRedisClient();

			const ranking = JSON.parse(await client.get('ranking'));
			const top = ranking.leaderboard;
			const lastUpdate = ranking.lastUpdate;

			//get avatars for top players
			const data = await Promise.all(top.map(async (player) => {
				const avatar = await client.hGet(`user:${player.value}`, 'avatar');
				return {
					...player,
					avatar: avatar ? JSON.parse(avatar) : null,
				};
			}));

			res.status(200).json({ data, lastUpdate });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if (client) await client.quit();
		}

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
