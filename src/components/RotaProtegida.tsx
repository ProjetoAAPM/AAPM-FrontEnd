import { Navigate, Outlet } from "react-router-dom";

export function RotaProtegida() {
    const statusUsuario = localStorage.getItem("status_usuario");

    if (statusUsuario === "INATIVO") {
        alert("Acesso restrito. É necessário ter uma conta ativa e planos regularizados para acessar esta página")
        return <Navigate to="/" replace/>;
    }
    return<Outlet/>;
}