import { Leaderboard } from "../domain/Leaderboard";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";

export class LeaderboardUpdater {
	constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

	async run(banlistname: string): Promise<void> {
		const cachedLeaderboard = await this.leaderboardRepository.getCachedLeaderboard(banlistname);
		const leaderboard = await this.leaderboardRepository.get(banlistname);
		const top = leaderboard.top(20);

		if(!cachedLeaderboard) {
			await this.leaderboardRepository.cache(top, banlistname);
			return;
		}

		const cachedTop = cachedLeaderboard?.top(20);
		const updatedLeaderboardItems = top.leaderboard.map(item => {
			const topItem = cachedTop.found(item);

			if(!topItem) {
				return top.newOnTop(item);
			}

			if(topItem.generalStats.rank !== item.generalStats.rank) {
				return top.rankingChange(topItem, item);
			}

			return item;
		})

		const updatedLeaderboard = new Leaderboard(updatedLeaderboardItems, new Date())
		await this.leaderboardRepository.cache(updatedLeaderboard, banlistname);
	}
}