import { RealTimeRoom } from "@/modules/room/domain/RealTimeRoom";
import { RoomsState } from "./RoomsProvider";

type RoomsActionType = 
	| { type: "[Rooms] - List", payload: RealTimeRoom[] }

export const roomsReducer = (
	state: RoomsState,
	action: RoomsActionType
): RoomsState => {
	switch (action.type) {
		case "[Rooms] - List":
			return {
				...state,
				rooms: action.payload
			};
		
		default:
			return state;
	}
}