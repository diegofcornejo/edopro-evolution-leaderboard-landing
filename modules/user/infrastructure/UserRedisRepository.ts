import { Redis } from "@/modules/shared/db/infrastructure/redis/Redis";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRedisRepository implements UserRepository {
	constructor() {
		const redis = Redis.getInstance();
		redis.connect()
	}

	async save(user: User): Promise<void> {
		const redis = Redis.getInstance();
		await redis.client.hSet(`user:${user.username}`, { 
			email: user.email,
			avatar: user.avatar || '',
			role: user.role,
			username: user.username,
			discordId: user.discordId || ''
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		const redis = Redis.getInstance();
		const username = await redis.client.get(`email:${email}`);
		if(!username) {
			return null;
		}
		const userData = await redis.client.hGetAll(`user:${username}`);
		const rank = await redis.client.zRevRank('leaderboard:points', username) || NaN;
		const points = await redis.client.zScore('leaderboard:points', username) || 0;
		const wins = await redis.client.zScore('leaderboard:wins', username) || 0;
		const losses = await redis.client.zScore('leaderboard:losses', username) || 0;

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
			losses
	})
		return user;
	}

	async findByUsername(username: string): Promise<User | null> {
		const redis = Redis.getInstance();
		const userData = await redis.client.hGetAll(`user:${username}`);
		if(!Object.keys(userData).length) {
			return null;
		}

		const rank = await redis.client.zRevRank('leaderboard:points', username) || NaN;
		const points = await redis.client.zScore('leaderboard:points', username) || 0;
		const wins = await redis.client.zScore('leaderboard:wins', username) || 0;
		const losses = await redis.client.zScore('leaderboard:losses', username) || 0;

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
			losses
	})
		return user;
	}
}