import { RedisClientFactory } from '@/modules/shared/db/infrastructure/redis/Redis';
import { User } from '../domain/User';
import { DuelRepository } from '../duels/domain/DuelRepository';
import { Duel } from '../duels/domain/Duel';

export class DuelRedisRepository implements DuelRepository {
  async get(username: string, banlistName: string): Promise<Duel[]> {
    const client = await RedisClientFactory.createClient();
    const duels = await client.lRange(`user:${username}:duels`, 0, -1);

    await client.quit();

    if (banlistName !== 'Global') {
      return duels
        .map((item) => new Duel({ ...JSON.parse(item), username }))
        .filter((duel) => duel.banlistName === banlistName);
    }
    return duels.map((item) => new Duel({ ...JSON.parse(item), username }));
  }
}
