import createRedisClient from '../../../libs/redisUtils';

 const ranking = require('./ranking.json');

const getOne = async (req, res) => {
	const id = req.query.id;
	let client;
	try {
		client = await createRedisClient();
		const key = `tournament:${id}`;
		const tournament = await client.hGetAll(key);
		tournament.ranking = ranking;
		res.status(200).json(tournament);
	} catch (error) {
		console.error('Error during processing:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		if (client) await client.quit();
	}
}

export default getOne;