import { Duel } from "./Duel";

export interface DuelRepository {
	get(username: string, banlistName?: string): Promise<Duel[]>;
}