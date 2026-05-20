import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import type { ReactNode } from "react";

import { BACKEND_ATIVO } from "../../config/admin/backend";

import { verificarAdminHome } from "../../Services/api";

interface AuthContextType {

    isAdmin: boolean;

    login: (
        email: string,
        senha: string
    ) => Promise<boolean>;

    logout: () => void;
}

const AuthContext =
    createContext<AuthContextType | null>(null);

export function AuthProvider({
    children
}: {
    children: ReactNode;
}) {

    const [isAdmin, setIsAdmin] =
        useState(false);

    useEffect(() => {

        async function verificarSessao() {

            if (!BACKEND_ATIVO) {

                const adminLogado =
                    localStorage.getItem("isAdmin")
                    === "true";

                setIsAdmin(adminLogado);

                return;
            }

            try {

                await verificarAdminHome();

                setIsAdmin(true);

            } catch {

                setIsAdmin(false);
            }
        }

        verificarSessao();

    }, []);

    const login = async (
        email: string,
        senha: string
    ): Promise<boolean> => {

        if (!BACKEND_ATIVO) {

            if (
                email === "admin@gmail.com" &&
                senha === "12345"
            ) {

                localStorage.setItem(
                    "isAdmin",
                    "true"
                );

                setIsAdmin(true);

                return true;
            }

            return false;
        }

        try {

            await verificarAdminHome();

            setIsAdmin(true);

            return true;

        } catch {

            return false;
        }
    };

    const logout = () => {

        localStorage.removeItem("isAdmin");

        setIsAdmin(false);
    };

    return (

        <AuthContext.Provider
            value={{
                isAdmin,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider"
        );
    }

    return context;
};