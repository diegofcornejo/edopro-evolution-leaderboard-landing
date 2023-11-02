'use client'

import { RealTimeRoom } from "@/modules/room/domain/RealTimeRoom";
import { FC, useReducer } from "react";
import { roomsReducer } from "./rooms-reducer";
import { RoomsContext } from "./RoomsContext";

export interface RoomsState {
	rooms: RealTimeRoom[];
}

const ROOMS_INITIAL_STATE: RoomsState = {
	rooms: []
}

interface Props {
  children: React.ReactNode;
}



export const RoomsProvider: FC<Props> = ({ children }: Props) => {
	const [state, dispatch] = useReducer( roomsReducer, ROOMS_INITIAL_STATE )
	const socket = new WebSocket('ws://localhost:4000');

	socket.addEventListener('open', () => {
		console.log('WebSocket connected');
	});

	socket.addEventListener('message', (event) => {
		console.log("mensaje recibido", event.data)
		dispatch({ type: '[Rooms] - List', payload: JSON.parse(event.data) })
	});

	socket.addEventListener('close', () => {
		console.log('WebSocket disconnected');
	});

	return (
		<RoomsContext.Provider value={{ ...state }}>
			{ children }
		</RoomsContext.Provider>
	)
}