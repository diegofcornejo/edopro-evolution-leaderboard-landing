import { createClient, RedisClientType } from "redis";
import { Database } from "../../domain/Database";

export class Redis implements Database {
	private static instance?: Redis;
	public readonly client: RedisClientType;

	private constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL,
		});
	}

	static getInstance(): Redis {
		if (Redis.instance === undefined) {
			Redis.instance = new Redis();
		}

		return Redis.instance;
	}

	async connect(): Promise<void> {
		if (!process.env.REDIS_URL) {
			return;
		}

		await this.client.connect();
	}
}
