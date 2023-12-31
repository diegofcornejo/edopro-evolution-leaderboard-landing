export interface RealTimeRoom {
	id: number;
	turn: number;
	bestOf: number;
	notes: string;
	banlist: {
		name: string;
	};
	players: {
		position: number;
		username: string;
		lps: number;
		score: number;
	}[]
}