import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import type { ReactNode } from "react";

const API_BASE = "http://localhost:5000";

interface AuthContextType {
    isAdmin: boolean;
    loadingAuth: boolean;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem("isAdmin") === "true"
    );

    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        async function verificarSessao() {
            const adminLocal = localStorage.getItem("isAdmin") === "true";

            if (!adminLocal) {
                setIsAdmin(false);
                setLoadingAuth(false);
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/admin`, {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    setIsAdmin(true);
                    localStorage.setItem("isAdmin", "true");
                } else {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Erro ao verificar sessão admin:", error);
                setIsAdmin(true);
            } finally {
                setLoadingAuth(false);
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
                localStorage.setItem("isAdmin", "true");
                setIsAdmin(true);
                return true;
            }

            localStorage.removeItem("isAdmin");
            setIsAdmin(false);
            return false;
        } catch (error) {
            console.error("Erro no login admin:", error);
            localStorage.removeItem("isAdmin");
            setIsAdmin(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);

        fetch(`${API_BASE}/logout`, {
            method: "POST",
            credentials: "include"
        }).catch(() => {});
    };

    return (
        <AuthContext.Provider value={{ isAdmin, loadingAuth, login, logout }}>
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