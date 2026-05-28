import { Navigate, Outlet } from "react-router-dom";

export function RotaProtegida() {
    const statusUsuario = localStorage.getItem("status_usuario");
    const usuarioId = localStorage.getItem("usuario_id");

    if (!usuarioId || statusUsuario === "INATIVO") {
        return <Navigate to="/" replace/>;
    }
    return<Outlet/>;
}