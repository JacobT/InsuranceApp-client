import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const authState = useAuth();

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
