import { createContext, useState } from "react";

export interface sessionI {
    name?: string;
    token?: string;
    profileImage?: string;
}

export interface AuthContextI extends sessionI {
    removeSession: () => void;
    setSession: ({ name, token }: sessionI) => sessionI
}

export const AuthContext = createContext({} as AuthContextI)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [session, _setSession] = useState<sessionI | null>(null)

    const setSession = ({ name, token, profileImage }: sessionI) => {
        _setSession({ name, token, profileImage })
        localStorage.setItem("@session", JSON.stringify({ name, token, profileImage }))
        return { name, token, profileImage }
    }

    const removeSession = () => {
        localStorage.removeItem("@session")
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