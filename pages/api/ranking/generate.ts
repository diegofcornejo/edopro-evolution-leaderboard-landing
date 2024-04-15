import { LeaderboardUpdater } from '@/modules/leaderboard/application/LeaderboardUpdater'
import { LeaderboardRedisRepository } from '@/modules/leaderboard/infrastructure/LeaderboardRedisRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
		if(req.query.key !== process.env.CRON_JOB_SECRET) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const leaderboardUpdater = new LeaderboardUpdater(new LeaderboardRedisRepository());
		await leaderboardUpdater.run('general');
		await leaderboardUpdater.run('Evolution S6');
		await leaderboardUpdater.run('Edison(PreErrata)');
		await leaderboardUpdater.run('2024.01 TCG');
		await leaderboardUpdater.run('2024.04 TCG');
		await leaderboardUpdater.run('JTP (Original)');
		await leaderboardUpdater.run('2005.4 GOAT');
		return res.status(200).json({});
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
