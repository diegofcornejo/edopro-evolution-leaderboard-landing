import createRedisClient from '../../../libs/redisUtils';

const getAll = async (req, res) => {
	let client;
	try {
		client = await createRedisClient();
		const keys = await client.keys('tournament:*');
		const tournaments = [];
		for (const key of keys) {
			const tournament = await client.hGetAll(key);
			tournaments.push(tournament);
		}
		res.status(200).json(tournaments);
	} catch (error) {
		console.error('Error during processing:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		if (client) await client.quit();
	}
}

export default getAll;