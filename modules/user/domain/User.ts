import { GeneralStats } from "./GeneralStats";

export type Permissions = {
  banlists?: string[];
};

export type UserPresentation = {
  id: string;
  email: string;
  role: string;
  rank: number;
  points: number;
  wins: number;
  losses: number;
	winRate: number;
  username: string;
  avatar: string | null;
	token?: string;
	permissions?: Permissions;
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
	public readonly permissions: string | null;

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
		permissions
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
		permissions: string | null;
  }) {
    this.id = email;
    this.email = email;
    this.avatar = avatar;
    this.discordId = discordId;
    this.password = password;
    this.role = role || "PUBLIC";
    this.username = username;
    this.generalStats = new GeneralStats({ rank, points, wins, losses });
		this.permissions = permissions;
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
			winRate: this.generalStats.winrate,
      username: this.username,
      avatar: this.avatar ? JSON.parse(this.avatar): null,
			permissions: this.permissions ? JSON.parse(this.permissions): null
    };
  }
}
