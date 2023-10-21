export class GeneralStats {
  public readonly rank: number;
  public readonly points: number;
  public readonly wins: number;
  public readonly losses: number;
  public readonly winrate: number;

  constructor({
    rank,
    points,
    wins,
    losses,
  }: {
    rank: number;
    points: number;
    wins: number;
    losses: number;
  }) {
    this.rank = rank;
    this.points = points;
    this.wins = wins;
    this.losses = losses;
    this.winrate = parseFloat(((wins / (wins + losses)) * 100).toFixed(2)) || 0;
  }
}
