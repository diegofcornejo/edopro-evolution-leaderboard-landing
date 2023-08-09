//Create tournament on redis

import { verifyJwt } from '../../../libs/jwtUtils';
import createRedisClient from '../../../libs/redisUtils';
const crypto = require('crypto');

const create = async (req, res) => {

	let decoded;
	try {
		decoded = verifyJwt(req);
	} catch (error) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	if(decoded.role !== 'ADMIN'){
		res.status(403).json({ error: 'Forbidden' });
		return;
	}

	const { name, startDate, banlist, mode, bestOf, rule} = req.body;
	const tournamentId = crypto.randomUUID();
	
	let client;
	try {
		client = await createRedisClient();
		const tournament = {
			name,
			startDate,
			banlist,
			mode,
			bestOf,
			rule,
			owner: decoded.username,
		};
		const create = await client.hSet(`tournament:${tournamentId}`, tournament);
		if(create === 7){ //This is the number of fields that we are setting
			res.status(200).json({message: 'Tournament created'});
		}else{
			res.status(500).json({ error: 'Tournament not created' });
			return;
		}
	} catch (error) {
		console.error('Error during processing:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		if (client) await client.quit();
	}

}

export default create;