import { createClient, RedisClientType } from "redis";
import { Database } from "../../domain/Database";

export class RedisClientFactory {
	static async createClient(): Promise<RedisClientType> {
		const client: RedisClientType = createClient({
			url: process.env.REDIS_URL,
		});

		await client.connect();

		return client;
	}
}
