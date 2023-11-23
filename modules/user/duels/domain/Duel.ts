import { DuelPlayer, DuelPlayerProperties } from './DuelPlayer';

export class Duel {
  public readonly username: string;
  public readonly banlistName: string;
  public readonly bestOf: number;
  public readonly date: Date;
  public readonly ranked: boolean;
  public readonly players: DuelPlayer[];
  public readonly type: 'Tag' | 'PvP';

  constructor({
    bestOf,
    date,
    ranked,
    players,
    banlistName,
    username,
  }: {
    bestOf: number;
    date: Date;
    ranked: boolean;
    players: DuelPlayerProperties[];
    banlistName: string;
    username: string;
  }) {
    this.bestOf = bestOf;
    this.date = date;
    this.ranked = ranked;
    this.type = players.length > 2 ? 'Tag' : 'PvP';
    this.players = this.sortPlayers(players, username);
    this.banlistName = banlistName;
    this.username = username;
  }

  private sortPlayers(
    players: DuelPlayerProperties[],
    username: string
  ): DuelPlayerProperties[] {
    const player = players.find((item) => item.name === username);
    if (!player) {
      throw new Error('Inconsintence duel data.');
    }

    const playerTeam = players.filter(
      (item) => item.team === player.team && item.name !== player.name
    );
    const opponentTeam = players.filter((item) => item.team !== player.team);

    const playerTeamNames = `${player.name} ${playerTeam.map(
      (item) => `, ${item.name}`
    )}`;

    const opponent = opponentTeam.shift();
    if (!opponent) {
      throw new Error('Inconsintence duel data.');
    }

    const opponentTeamNames = `${opponent.name} ${opponentTeam.map(
      (item) => `, ${item.name}`
    )}`;

    return [
      new DuelPlayer({ ...player, name: playerTeamNames }),
      new DuelPlayer({ ...opponent, name: opponentTeamNames }),
    ];
  }
}
