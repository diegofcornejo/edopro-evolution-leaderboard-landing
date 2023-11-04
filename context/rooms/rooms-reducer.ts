import { RealTimeRoom } from "@/modules/room/domain/RealTimeRoom";
import { RoomsState } from "./RoomsProvider";

type RoomsActionType =
  | { type: "[Rooms] - Add"; payload: RealTimeRoom }
  | { type: "[Rooms] - Delete"; payload: RealTimeRoom }
  | { type: "[Rooms] - Update"; payload: RealTimeRoom }
  | { type: "[Rooms] - List"; payload: RealTimeRoom []};

export const roomsReducer = (
  state: RoomsState,
  action: RoomsActionType
): RoomsState => {
  switch (action.type) {
    case "[Rooms] - Add":
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };

    case "[Rooms] - Delete":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload.id),
      };
    case "[Rooms] - Update":
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.id === action.payload.id) {
            return action.payload;
          }
          return room;
        }),
      };

		case "[Rooms] - List":
			return {
				...state,
				rooms: action.payload,
			}
    default:
      return state;
  }
};
