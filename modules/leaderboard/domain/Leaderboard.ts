import { LeaderboardItem } from "./LeaderboardItem";

export class Leaderboard {
	public readonly leaderboard: LeaderboardItem[];
	public readonly lastUpdated: Date;

	constructor(leaderboard: LeaderboardItem[], lastUpdated: Date) {
		this.leaderboard = leaderboard;
		this.lastUpdated = lastUpdated;
	}

	top(max: number):Leaderboard {
		return new Leaderboard(this.leaderboard.slice(0, max), this.lastUpdated);
	}

	found(target: LeaderboardItem): LeaderboardItem | null {
		return this.leaderboard.find((leaderboardItem) => leaderboardItem.value === target.value) ?? null;
	}

	newOnTop(target: LeaderboardItem): LeaderboardItem {
		return new LeaderboardItem({
			value: target.value,
			rank: target.generalStats.rank,
			points: target.generalStats.points,
			wins: target.generalStats.wins,
			losses: target.generalStats.losses,
			avatar: target.avatar,
			difference: (this.leaderboard.length + 1) - target.generalStats.rank,
			isNewOnTop: true,
		})
	}

	rankingChange(before: LeaderboardItem, after: LeaderboardItem): LeaderboardItem {
		return new LeaderboardItem({
			value: after.value,
			rank: after.generalStats.rank,
			points: after.generalStats.points,
			wins: after.generalStats.wins,
			losses: after.generalStats.losses,
			avatar: after.avatar,
			difference: before.generalStats.rank - after.generalStats.rank,
			isNewOnTop: false,
		})
	}

	toPresentation() {
		return {
			lastUpdated: this.lastUpdated,
			leaderboard: this.leaderboard.map((item) => ({
				value: item.value,
				score: item.generalStats.points,
				wins: item.generalStats.wins,
				losses: item.generalStats.losses,
				winrate: item.generalStats.winrate,
				position: item.generalStats.rank,
				new: item.isNewOnTop,
				difference: item.difference,
				avatar: item.avatar ? JSON.parse(item.avatar): null,
			}))
		}
	}
}