import Cookies from "cookies-js";
import { createContext, useState } from "react";

export interface sessionI {
    name?: string;
    token?: string;
}

export interface AuthContextI extends sessionI {
    removeSession: () => void;
    setSession: ({ name, token }: sessionI) => sessionI
}

export const AuthContext = createContext({} as AuthContextI)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [session, _setSession] = useState<sessionI | null>(null)

    const setSession = ({ name, token }: sessionI) => {
        _setSession({ name, token })
        Cookies.set("@session", JSON.stringify({ name, token }))
        return { name, token }
    }

    const removeSession = () => {
        Cookies.expire("@session")
        _setSession(null)
    }

    return (
        <AuthContext.Provider
            value={{
                ...session,
                setSession,
                removeSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}