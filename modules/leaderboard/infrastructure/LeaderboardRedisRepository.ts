import { RedisClientFactory } from "@/modules/shared/db/infrastructure/redis/Redis";
import { Leaderboard } from '../domain/Leaderboard';
import { LeaderboardRepository } from '../domain/LeaderboardRepository';
import { LeaderboardItem } from '../domain/LeaderboardItem';

type RedisRanking = {
	score: number;
	value: string;
}

type LeaderboardItemRedis = {
	value: string;
	score: number;
	wins: number;
	losses: number;
	winrate: number;
	position: number;
	avatar: { [key: string]: unknown };
}
export class LeaderboardRedisRepository implements LeaderboardRepository {
	async getCachedLeaderboard(banlistname: string): Promise<Leaderboard | null> {
    const client = await RedisClientFactory.createClient();
		const response = await client.get(`ranking:${banlistname}`);
		if(!response) { return null };
		const data = JSON.parse(response);
		await client.quit();
		return new Leaderboard(
			(data.leaderboard as LeaderboardItemRedis[]).map((item) => new LeaderboardItem({
				...item,
				rank: item.position,
				points: item.score,
				avatar: item?.avatar ? JSON.stringify(item.avatar) : null,
			})),
			data.lastUpdated as Date
		)
	}

	
	async get(banlistname: string): Promise<Leaderboard> {
		if(banlistname === 'general') {
			const client = await RedisClientFactory.createClient();
			const points = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:points`, '-inf', '+inf');
			const wins = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:wins`, '-inf', '+inf');
			const losses = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:losses`, '-inf', '+inf');
			await client.quit();
			const leaderboardItems = await this.buildLeaderboardItems(points, wins, losses);
			return new Leaderboard(leaderboardItems, new Date());
		}

		const client = await RedisClientFactory.createClient();
		const points = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:${banlistname}:points`, '-inf', '+inf');
		const wins = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:${banlistname}:wins`, '-inf', '+inf');
		const losses = await client.ZRANGEBYSCORE_WITHSCORES(`leaderboard:${banlistname}:losses`, '-inf', '+inf');
		await client.quit();
		const leaderboardItems = await this.buildLeaderboardItems(points, wins, losses);
		return new Leaderboard(leaderboardItems, new Date());
	}

	async cache(leaderboard: Leaderboard, banlistname: string): Promise<void> {
    const client = await RedisClientFactory.createClient();
		await client.set(`ranking:${banlistname}`, JSON.stringify(leaderboard.toPresentation()));
		await client.quit();
	}

	private async buildLeaderboardItems(points: RedisRanking[], wins: RedisRanking[], losses: RedisRanking[]): Promise<LeaderboardItem[]> {
		const leaderboardItems: LeaderboardItem[] = [];
		const client = await RedisClientFactory.createClient();

		for (const item of points.reverse()) {
			const winsItem = wins.find((win) => win.value === item.value);
			const lossesItem = losses.find((lose) => lose.value === item.value);
		
			const winsScore = winsItem ? winsItem.score : 0;
			const lossesScore = lossesItem ? lossesItem.score : 0;

			const avatar = await client.hGet(`user:${item.value}`, 'avatar');
			const leaderboardItem = new LeaderboardItem({
				value: item.value,
				points: item.score,
				wins: winsScore,
				losses: lossesScore,
				avatar: avatar ?? null,
				rank: leaderboardItems.length + 1,
			});
		
			leaderboardItems.push(leaderboardItem);
		}

		await client.quit();
		return leaderboardItems;
	}
}