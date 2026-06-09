import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import type { ReactNode } from "react";

const API_BASE = "https://aapm-api.onrender.com";

interface AuthContextType {
    isAdmin: boolean;
    loadingAuth: boolean;
    logoutLoading: boolean;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    ativarAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem("isAdmin") === "true"
    );

    const [loadingAuth, setLoadingAuth] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);

    useEffect(() => {
        async function verificarSessao() {
            const adminLocal = localStorage.getItem("isAdmin") === "true";
            const estaNaRotaAdmin = window.location.pathname.startsWith("/admin");

            console.log("adminLocal:", adminLocal);
            console.log("estaNaRotaAdmin:", estaNaRotaAdmin);
            console.log("URL verificação:", `${API_BASE}/admin/home`);

            if (!adminLocal && !estaNaRotaAdmin) {
                setIsAdmin(false);
                setLoadingAuth(false);
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/admin/home`, {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    setIsAdmin(true);
                    localStorage.setItem("isAdmin", "true");
                    return;
                }

                const tentativa2 = await fetch(`${API_BASE}/admin/home`, {
                    method: "GET",
                    credentials: "include"
                });

                if (tentativa2.ok) {
                    setIsAdmin(true);
                    localStorage.setItem("isAdmin", "true");
                    return;
                }

                setIsAdmin(false);
                localStorage.removeItem("isAdmin");
            } catch (error) {
                console.error("Erro ao verificar sessão admin:", error);

                if (estaNaRotaAdmin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    localStorage.removeItem("isAdmin");
                }
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
                credentials: "include"
            });

            console.log("Status login admin:", res.status);

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

    const ativarAdmin = () => {
        localStorage.setItem("isAdmin", "true");
        setIsAdmin(true);
    };

    const logout = async () => {
        setLogoutLoading(true);

        try {
            await fetch(`${API_BASE}/usuario/logout`, {
                method: "GET",
                credentials: "include"
            });
        } catch (error) {
            console.error("Erro ao sair:", error);
        } finally {
            localStorage.removeItem("isAdmin");
            setIsAdmin(false);
            setLogoutLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAdmin,
                loadingAuth,
                logoutLoading,
                login,
                logout,
                ativarAdmin
            }}
        >
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