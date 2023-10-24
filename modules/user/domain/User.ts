import { GeneralStats } from "./GeneralStats";

export type UserPresentation = {
  id: string;
  email: string;
  role: string;
  rank: number;
  points: number;
  wins: number;
  losses: number;
	winrate: number;
  username: string;
  avatar: string | null;
};

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly role: string;
  public readonly username: string;
  public readonly password: string;
  public readonly avatar: string | null;
  public readonly discordId: string | null;
  private readonly generalStats: GeneralStats;

  constructor({
    email,
    role,
    username,
    password,
    rank,
    points,
    wins,
    losses,
    avatar,
    discordId,
  }: {
    email: string;
    role: string;
    username: string;
    password: string;
    rank: number;
    points: number;
    wins: number;
    losses: number;
    avatar: string | null;
    discordId: string | null;
  }) {
    this.id = email;
    this.email = email;
    this.avatar = avatar;
    this.discordId = discordId;
    this.password = password;
    this.role = role || "PUBLIC";
    this.username = username;
    this.generalStats = new GeneralStats({ rank, points, wins, losses });
  }

  toPresentation(): UserPresentation {
    return {
      id: this.email,
      email: this.email,
      role: this.role,
			rank: this.generalStats.rank,
			points: this.generalStats.points,
			wins: this.generalStats.wins,
			losses: this.generalStats.losses,
			winrate: this.generalStats.winrate,
      username: this.username,
      avatar: JSON.parse(this.avatar),
    };
  }
}
