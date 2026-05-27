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
            if (!BACKEND_ATIVO) {
                const adminMarcado = localStorage.getItem("isAdmin") === "true";
                setIsAdmin(adminMarcado);
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
                    setIsAdmin(false);
                    localStorage.removeItem("isAdmin");
                }
            } catch (error) {
                console.error("Erro ao verificar sessão admin:", error);
                setIsAdmin(false);
                localStorage.removeItem("isAdmin");
            }
        }

        verificarSessao();
    }, []);

    const login = async (email: string, senha: string): Promise<boolean> => {
        if (!BACKEND_ATIVO) {
            return false;
        }

        try {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", "true");
            return true;
        } catch (error) {
            console.error("Erro no login admin:", error);
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
            }).catch(() => {});
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