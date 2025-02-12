import { createContext } from "react";

interface AuthContextType {
    token: string | null,
    setToken: (newToken: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);