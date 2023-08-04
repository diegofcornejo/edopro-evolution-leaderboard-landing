import createRedisClient from '../../../libs/redisUtils';
import { verifyJwt } from '../../../libs/jwtUtils';

const getPlayerScore = (games) => {
	let score = 0;
	games.forEach((game) => {
		if (game.result === 'winner') {
			score++;
		}
	});
	return score;
};

const getPlayerPoints = (winner, games) => {
	let wins = 0;
	let losses = 0;
	games.forEach((game) => {
		game.result === 'winner' ? wins++ : losses++;
	});
	const points = winner ? wins + (wins - losses) : wins;
	return points;
}

const handler = async (req, res) => {
	if (req.method === 'GET') {
		let decoded;
		// Verify jwt
		try {
			decoded = verifyJwt(req);
		} catch (error) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		let client;

		try {
			client = await createRedisClient();
			const { username } = decoded;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}


			//order players by logged user
			const orderPlayers = (players) => {
				const userIndex = players.findIndex(player => player.name === username);

				if (userIndex !== -1) {
					const userPlayer = players[userIndex];
					players.splice(userIndex, 1);
					players.unshift(userPlayer);
				}

				const teamMap = new Map();

				for (const player of players) {
					const { name, team, ...rest } = player;

					const existingTeamPlayers = teamMap.get(team);

					if (existingTeamPlayers) {
						existingTeamPlayers.name += `, ${name}`;
					} else {
						teamMap.set(team, { name, ...rest });
					}
				}

				return [...teamMap.values()];
			}


			let duels = await client.lRange(`user:${username}:duels`, 0, -1);

			if (duels.length > 0) {
				duels = duels.map((duel) => {
					duel = JSON.parse(duel);
					const players = duel.players.map((player) => {
						return {
							name: player.name,
							team: player.team,
							winner: player.winner,
							score: getPlayerScore(player.games),
							points: getPlayerPoints(player.winner, player.games),
						};
					});
					return {
						bestOf: duel.bestOf,
						date: duel.date,
						players: orderPlayers(players),
						ranked: duel.ranked,
						// turns: duel.turn,
						type: players.length > 2 ? 'Tag' : 'PvP',
					};
				});
			} else {
				duels = [];
			}
			res.status(200).json(duels);
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