import { createClient } from 'redis';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const client = createClient({ url: process.env.REDIS_URL });
		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();

		let points = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:points', '-inf', '+inf');
		let wins = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:wins', '-inf', '+inf');
		let losses = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard:losses', '-inf', '+inf');
		await client.quit();

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

		const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);
		const top = sortedLeaderboard.slice(0, 20);

		res.status(200).json(top);

	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
