import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import type { ReactNode } from "react";

const API_BASE = "https://portal-aapm-904312815750.southamerica-east1.run.app"; 

interface AuthContextType {
    isAdmin: boolean;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function verificarSessao() {
            try {
                const res = await fetch(`${API_BASE}/admin/home`, {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Erro ao verificar sessão admin:", error);
                setIsAdmin(false);
            }
        }

        verificarSessao();
    }, []);

    const login = async (email: string, senha: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha }),
                credentials: "include"
            });

            if (res.ok) {
                setIsAdmin(true);
                return true;
            }
            
            setIsAdmin(false);
            return false;
        } catch (error) {
            console.error("Erro no login admin:", error);
            setIsAdmin(false);
            return false;
        }
    };

    const logout = () => {
        setIsAdmin(false);

        fetch(`${API_BASE}/logout`, {
            method: "POST",
            credentials: "include"
        }).catch(() => {});
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};