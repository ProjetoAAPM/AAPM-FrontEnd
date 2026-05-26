import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import type { ReactNode } from "react";
import { BACKEND_ATIVO, API_BASE } from "../../config/admin/backend";

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
            const adminMarcado = localStorage.getItem("isAdmin") === "true";
            if (!adminMarcado) {
                setIsAdmin(false);
                return;
            }

            if (!BACKEND_ATIVO) {
                setIsAdmin(adminMarcado);
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/admin/home`, {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    localStorage.removeItem("isAdmin"); 
                }

            } catch {
                setIsAdmin(false);
            }
        }

        verificarSessao();
    }, []);

    const login = async (email: string, senha: string): Promise<boolean> => {
        if (!BACKEND_ATIVO) {
            if (email === "admin@gmail.com" && senha === "12345") {
                localStorage.setItem("isAdmin", "true");
                setIsAdmin(true);
                return true;
            }
            return false;
        }

        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, senha })
            });

            if (res.ok) {
                setIsAdmin(true);
                return true;
            }

            return false;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);

        if (BACKEND_ATIVO) {
            fetch(`${API_BASE}/logout`, {
                method: "POST",
                credentials: "include"
            });
        }
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