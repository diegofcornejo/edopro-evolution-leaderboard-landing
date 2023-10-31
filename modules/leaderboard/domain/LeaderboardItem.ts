import { GeneralStats } from "@/modules/user/domain/GeneralStats";

export class LeaderboardItem {
  public readonly value: string;
  public readonly avatar: string | null;
  public readonly difference: number;
  public readonly generalStats: GeneralStats;
  public readonly isNewOnTop: boolean;

  constructor({
    value,
    rank,
    points,
    wins,
    losses,
    avatar,
    difference = 0,
    isNewOnTop = false,
  }: {
    value: string;
    rank: number;
    points: number;
    wins: number;
    losses: number;
    avatar: string | null;
    difference?: number;
    isNewOnTop?: boolean;
  }) {
    this.avatar = avatar;
    this.value = value;
    this.difference = difference;
    this.isNewOnTop = isNewOnTop;
    this.generalStats = new GeneralStats({ rank, points, wins, losses });
  }
}
