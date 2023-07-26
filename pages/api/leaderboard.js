import createRedisClient from '../../libs/redisUtils';

const handler = async (req, res) => {
	if (req.method === 'GET') {

		let client;

		try {

			client = await createRedisClient();

			let points = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:points', '-inf', '+inf');
			let wins = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:wins', '-inf', '+inf');
			let losses = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:losses', '-inf', '+inf');

			const leaderboard = points.map(point => {
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

			// const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);
			const reverseLeaderBoard = leaderboard.reverse();

			const top = reverseLeaderBoard.slice(0, 20);

			//get avatars for top players
			const data = await Promise.all(top.map(async (player) => {
				const avatar = await client.hGet(`user:${player.value}`, 'avatar');
				return {
					...player,
					avatar: avatar ? JSON.parse(avatar) : null,
				};
			}));

			console.log("🚀 ~ file: leaderboard.js:48 ~ data ~ data:", data)

			res.status(200).json(data);
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
