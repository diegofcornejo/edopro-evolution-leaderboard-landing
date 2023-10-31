import { LeaderboardFinder } from '@/modules/leaderboard/application/LeaderboardFinder';
import createRedisClient from '../../../libs/redisUtils';
import type { NextApiRequest, NextApiResponse } from 'next'
import { LeaderboardRedisRepository } from '@/modules/leaderboard/infrastructure/LeaderboardRedisRepository';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		let client;

		try {
			const { banlistname } = req.query;
			const leaderboardFinder = new LeaderboardFinder(new LeaderboardRedisRepository());
			const leaderboard = await leaderboardFinder.run(banlistname as string ??'general');
			return res.status(200).json(leaderboard.toPresentation());
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
