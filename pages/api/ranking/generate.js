import createRedisClient from '../../../libs/redisUtils';

const generate = async (req, res) => {

	if (req.method === 'POST') {

		if (req.query.key !== process.env.CRON_JOB_SECRET) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		let client;
		try {

			client = await createRedisClient();

			let actualRanking = JSON.parse(await client.get('ranking'));

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

			//Add position to top
			for (const [i, player] of top.entries()) {
				player.position = i + 1;
			}

			// Verify if ranking has changed
			let changed = false;

			for (const player of top) {
				const found = actualRanking.leaderboard.find(p => p.value === player.value);

				player.difference = 0;

				if (!found) {
					player.new = true;
					player.difference = (top.length + 1) - player.position;
					changed = true;
				} else if (found.position !== player.position) {
					player.difference = found.position - player.position;
					changed = true;
				} else if (found.score !== player.score) {
					player.difference = found.difference;
					if (found.new) {
						player.new = true;
					}
					changed = true;
				}
			}

			if (changed) { //If ranking changed save on redis
				await client.set('ranking', JSON.stringify({ leaderboard: top, lastUpdate: new Date() }));
			}

			res.status(200).json({ message: 'Ranking updated' });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if (client) await client.quit();
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default generate;