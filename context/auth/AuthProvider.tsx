'use client'

import { FC, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./auth-reducer";
import { signOut, useSession } from "next-auth/react";
import { UserPresentation } from "@/modules/user/domain/User";

export interface AuthState {
	isLoggedIn: boolean;
	user?: UserPresentation;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }: Props) => {
	const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
	const { data, status } = useSession();

	useEffect(() => {
		if(status === 'authenticated') {
			console.log("authenticated", data);
			dispatch({ type: '[Auth] -Login', payload: data.user as UserPresentation })
		}
	}, [status, data])

	const logout = () => {
		signOut();
	}

	return (
		<AuthContext.Provider value={{ ...state, logout }}>
			{ children }
		</AuthContext.Provider>
	)
}