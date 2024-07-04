import createRedisClient from '../../../libs/redisUtils';

const getOne = async (req, res) => {
	const id = req.query.id;
	let client;
	try {
		client = await createRedisClient();
		const key = `tournament:${id}`;
		const tournament = await client.hGetAll(key);

		let points = await client.ZRANGEBYSCORE_WITHSCORES(`${key}:leaderboard:points`, '-inf', '+inf');
		let wins = await client.ZRANGEBYSCORE_WITHSCORES(`${key}:leaderboard:wins`, '-inf', '+inf');
		let losses = await client.ZRANGEBYSCORE_WITHSCORES(`${key}:leaderboard:losses`, '-inf', '+inf');

		let leaderboard = points.map(point => {
			const player = {
				value: point.value,
				score: point.score,
				wins: 0,
				losses: 0,
				winrate: 0,
			};

			const foundWin = wins.find(win => win.value === player.value);
			const foundLoss = losses.find(loss => loss.value === player.value);

			player.wins = foundWin ? foundWin.score : 0;
			player.losses = foundLoss ? foundLoss.score : 0;
			player.winrate = parseFloat(((player.wins / (player.wins + player.losses)) * 100).toFixed(2));

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

		tournament.ranking = {
			data,
			lastUpdate: new Date().getTime()
		};
		res.status(200).json(tournament);
	} catch (error) {
		console.error('Error during processing:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		if (client) await client.quit();
	}
}

export default getOne;