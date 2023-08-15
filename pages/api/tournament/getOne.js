import createRedisClient from '../../../libs/redisUtils';

// const ranking = require('./ranking.json');

const getOne = async (req, res) => {
	const id = req.query.id;
	let client;
	try {
		client = await createRedisClient();
		const key = `tournament:${id}`;
		const tournament = await client.hGetAll(key);
		const players = await client.lRange(`${key}:players`, 0, -1);
		const ranking = [];
		for (const [i, player] of players.entries()) {
			const playerData = {
				"value": player,
				"score": 0,
				"wins": 0,
				"losses": 0,
				"winrate": 0,
				"position": i + 1,
				"difference": 0,
				"avatar": null
			};
			ranking.push(playerData);
		}
		tournament.ranking = {
			data: ranking,
			lastUpdate: "2023-08-13T01:40:02.711Z"
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