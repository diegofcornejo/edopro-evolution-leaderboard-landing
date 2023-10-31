import { Leaderboard } from "../domain/Leaderboard";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";

export class LeaderboardFinder {
	constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

	async run(banlistname: string): Promise<Leaderboard> {
		const leaderboard = await this.leaderboardRepository.getCachedLeaderboard(banlistname);
		if(!leaderboard) { throw new Error(`Leaderboard ${banlistname} not found`) };
		return leaderboard;
	}
}