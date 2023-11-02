'use client'

import { RealTimeRoom } from "@/modules/room/domain/RealTimeRoom"
import { createContext } from "react"

interface ContextProps {
	rooms: RealTimeRoom[]
}

export const RoomsContext = createContext({} as ContextProps)