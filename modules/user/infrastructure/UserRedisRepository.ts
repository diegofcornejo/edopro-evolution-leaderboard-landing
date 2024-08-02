import { RedisClientFactory } from "@/modules/shared/db/infrastructure/redis/Redis";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRedisRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const client = await RedisClientFactory.createClient();
    await client.hSet(`user:${user.username}`, {
      email: user.email,
      avatar: user.avatar || "",
      role: user.role,
      username: user.username,
      discordId: user.discordId || "",
    });

    await client.quit();
  }

  async findByEmail(email: string): Promise<User | null> {
    const client = await RedisClientFactory.createClient();
    const username = await client.get(`email:${email}`);
    if (!username) {
      return null;
    }
    const userData = await client.hGetAll(`user:${username}`);
    const rank = (await client.zRevRank("leaderboard:points", username)) || NaN;
    const points = (await client.zScore("leaderboard:points", username)) || 0;
    const wins = (await client.zScore("leaderboard:wins", username)) || 0;
    const losses = (await client.zScore("leaderboard:losses", username)) || 0;

    const user = new User({
      email: userData?.email,
      username: userData?.username,
      avatar: userData?.avatar || null,
      role: userData?.role,
      discordId: userData?.discordId || null,
      password: userData?.password,
      rank,
      points,
      wins,
      losses,
			permissions: userData?.permissions || null
    });
    await client.quit();
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const client = await RedisClientFactory.createClient();
    const userData = await client.hGetAll(`user:${username}`);
    if (!Object.keys(userData).length) {
      return null;
    }

    const rank = (await client.zRevRank("leaderboard:points", username)) || NaN;
    const points = (await client.zScore("leaderboard:points", username)) || 0;
    const wins = (await client.zScore("leaderboard:wins", username)) || 0;
    const losses = (await client.zScore("leaderboard:losses", username)) || 0;

    const user = new User({
      email: userData?.email,
      username: userData?.username,
      avatar: userData?.avatar || null,
      role: userData?.role,
      discordId: userData?.discordId || null,
      password: userData?.password,
      rank,
      points,
      wins,
      losses,
			permissions: userData?.permissions || null
    });

		await client.quit();
    return user;
  }
}
