import createRedisClient from '../../../libs/redisUtils';
import { generateJwt } from '../../../libs/jwtUtils';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		
		let client;
		
		try {
			client = await createRedisClient();
			const { username, password } = req.body;
			const key = `user:${username}`;
			const usernameExists = await client.exists(key);

			if (!usernameExists) {
				res.status(409).json({ error: 'Username does not exist' });
				return;
			}

			const userPassword = await client.hGet(key, 'password');
			if (userPassword !== password) {
				res.status(401).json({ error: 'Invalid credentials' });
				return;
			}

			let [user, rank, points, wins, losses] = await Promise.all([
				client.hmGet(key, ['avatar', 'role']),
				client.zRevRank('leaderboard:points', username),
				client.zScore('leaderboard:points', username),
				client.zScore('leaderboard:wins', username),
				client.zScore('leaderboard:losses', username),
			]);

			// if(user.avatar) user.avatar = JSON.parse(avatar);
			let avatar = user[0] ? JSON.parse(user[0]) : null;
			let role = user[1] ? user[1] : 'PUBLIC'; 

			const winrate = parseFloat(((wins / (wins + losses)) * 100).toFixed(2)) || 0;
			
			const token = generateJwt({ username, role });

			res.status(200).json({token, username, role, avatar, rank, points, wins, losses, winrate });
		} catch (error) {
			console.error('Error during processing:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		} finally {
			if(client) await client.quit();
		}

	}else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;