import createRedisClient from '../../../libs/redisUtils';

const getOne = async (req, res) => {
	const id = req.query.id;
	let client;
	try {
		client = await createRedisClient();
		const key = `thunder:leaderboard`;

		let points = await client.ZRANGEBYSCORE_WITHSCORES(`${key}:points`, '-inf', '+inf');

		let leaderboard = points.map(point => {
			const player = {
				value: point.value,
				score: point.score,
				wins: 0,
				losses: 0,
				winrate: 0,
			};

			return player;
		});

		leaderboard.reverse();

		//Add position to top
		for (const [i, player] of leaderboard.entries()) {
			player.position = i + 1;
			player.difference = 0;
		}

		const data = await Promise.all(leaderboard.map(async (player) => {
			const avatar = await client.hGet(`user:${player.value}`, 'avatar');
			return {
				...player,
				avatar: avatar ? JSON.parse(avatar) : null,
			};
		}));

		const ranking = {
			data,
			lastUpdate: new Date().getTime()
		};
		res.status(200).json(ranking);
	} catch (error) {
		console.error('Error during processing:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		if (client) await client.quit();
	}
}

export default getOne;