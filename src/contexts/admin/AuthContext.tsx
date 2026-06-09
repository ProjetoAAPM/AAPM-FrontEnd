import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import type { ReactNode } from "react";

const API_BASE = `https://aapm-api.onrender.com`;

interface AuthContextType {
    isAdmin: boolean;
    loadingAuth: boolean;
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

    useEffect(() => {
        async function verificarSessao() {
            const adminLocal = localStorage.getItem("isAdmin") === "true";


            console.log("adminLocal:", adminLocal);
            console.log("URL verificação:", `${API_BASE}/admin`);


            if (!adminLocal) {
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
                    } else {
                    setIsAdmin(false);
                    localStorage.removeItem("isAdmin");
                    }
            } catch (error) {
                console.error("Erro ao verificar sessão admin:", error);
                setIsAdmin(false);
                localStorage.removeItem("isAdmin");
            } finally {
                setLoadingAuth(false);
            }
        }

        verificarSessao();
    }, []);

    const login = async (email: string, senha: string): Promise<boolean> => {
        try {
            const res = await fetch("https://aapm-api.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
                credentials: "include"
            });

            console.log("Status login admin:", res.status);

            if (res.ok) {
                console.log("Status login admin:", res.status);
                localStorage.setItem("isAdmin", "true");
                setIsAdmin(true);
                return true;
            } else {
                localStorage.removeItem("isAdmin");
                setIsAdmin(false);
                return false;
            }
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

    const logout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);

        fetch(`${API_BASE}/usuario/logout`, {
            method: "GET",
            credentials: "include"
        }).catch(() => {});
    };

    return (
        <AuthContext.Provider value={{ isAdmin, loadingAuth, login, logout, ativarAdmin }}>
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