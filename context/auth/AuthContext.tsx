'use client'
import { UserPresentation } from "@/modules/user/domain/User";
import { createContext } from "react";

interface ContextProps {
	isLoggedIn: boolean;
	user?: UserPresentation;
	logout: () => void;
}

export const AuthContext = createContext({} as ContextProps)