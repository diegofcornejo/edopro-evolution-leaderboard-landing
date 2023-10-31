import { Leaderboard } from "./Leaderboard";

export interface LeaderboardRepository {
	getCachedLeaderboard(banlistname: string): Promise<Leaderboard | null>
	get(banlistname: string): Promise<Leaderboard>
	cache(leaderboard: Leaderboard, banlistname: string): Promise<void>
}