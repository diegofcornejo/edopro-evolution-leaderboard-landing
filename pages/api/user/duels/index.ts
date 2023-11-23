import { DuelGetter } from '@/modules/user/duels/application/DuelGetter';
import { DuelRedisRepository } from '@/modules/user/infrastructure/DuelRedisRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
			const session = await getServerSession(req, res, authOptions)

			if(!session) {
				res.status(401).json({ error: 'Unauthorized' });
			}

      const { banlistname, username } = req.query;

      if (!username) {
        return res.status(400).json({ error: 'username is required.' });
      }

      const dueLGetter = new DuelGetter(new DuelRedisRepository());
      const duels = await dueLGetter.run(
        username as string,
        banlistname as string
      );
      return res.status(200).json(duels);
    } catch (error) {}
  }
};

export default handler;
