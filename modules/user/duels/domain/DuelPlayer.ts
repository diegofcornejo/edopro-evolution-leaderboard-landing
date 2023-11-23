export type DuelPlayerProperties = {
  name: string;
  team: number;
  winner: boolean;
  score: number;
  points: { [key: string]: number };
};

export class DuelPlayer {
  public readonly name: string;
  public readonly team: number;
  public readonly winner: boolean;
  public readonly score: number;
  public readonly points: { [key: string]: number };

  constructor({ name, team, winner, score, points }: DuelPlayerProperties) {
    this.name = name;
    this.team = team;
    this.winner = winner;
    this.score = score ?? NaN;
    this.points = points;
  }
}
