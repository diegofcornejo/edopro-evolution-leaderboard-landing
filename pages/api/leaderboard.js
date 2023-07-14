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
		
			let leaderboard = [];
			// let leaderboard: Player[] = [];
		
			// Iterar sobre los arrays de puntos, victorias y derrotas
			for (let i = 0; i < points.length; i++) {
				const player = {
					value: points[i].value,
					score: points[i].score,
					wins: 0,
					losses: 0,
					winrate: 0,
				};
		
				// Buscar las victorias y derrotas del jugador actual
				for (let j = 0; j < wins.length; j++) {
					if (wins[j].value === player.value) {
						player.wins = wins[j].score;
						break;
					}
				}
		
				for (let k = 0; k < losses.length; k++) {
					if (losses[k].value === player.value) {
						player.losses = losses[k].score;
						break;
					}
				}
		
				// Calcular el winrate
				player.winrate = parseFloat(
					((player.wins / (player.wins + player.losses)) * 100).toFixed(2)
				);
		
				// Agregar el jugador al leaderboard
				leaderboard.push(player);
			}
		
			leaderboard = leaderboard.sort((a, b) => b.score - a.score);
		
			// return leaderboard;
			res.status(200).json(leaderboard);
		
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;