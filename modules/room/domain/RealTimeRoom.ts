export interface RealTimeRoom {
	id: number;
	players: {
		position: number;
		username: string;
	}[]
}