'use client'

import { RealTimeRoom } from "@/modules/room/domain/RealTimeRoom";
import { FC, useEffect, useReducer } from "react";
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
	const [state, dispatch] = useReducer(roomsReducer, ROOMS_INITIAL_STATE)
	useEffect(() => {
		const socket = new WebSocket(process.env.WEBSOCKET_URL!);

		socket.addEventListener('open', () => {
			console.log('WebSocket connected');
		});

		socket.addEventListener('message', (event) => {
			const payload = JSON.parse(event.data);
			console.log("mensaje", payload)
			if(payload.action === 'ADD-ROOM') {
				dispatch({ type: '[Rooms] - Add', payload: payload.data })
			}

			if(payload.action === 'REMOVE-ROOM') {
				dispatch({ type: '[Rooms] - Delete', payload: payload.data })
			}

			if(payload.action === 'UPDATE-ROOM') {
				dispatch({ type: '[Rooms] - Update', payload: payload.data })
			}

			if(payload.action === 'GET-ROOMS') {
				dispatch({ type: '[Rooms] - List', payload: payload.data })
			}
		});

		socket.addEventListener('close', () => {
			console.log('WebSocket disconnected');
		});
	}, [])

	return (
		<RoomsContext.Provider value={{ ...state }}>
			{children}
		</RoomsContext.Provider>
	)
}