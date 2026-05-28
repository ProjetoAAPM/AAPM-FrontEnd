import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedAdminRoute() {
    const { isAdmin } = useAuth();
    const statusUsuario =
        localStorage.getItem("status_usuario");

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    if (statusUsuario === "INATIVO") {
        return (
            <Navigate
                to="/escolhaplano"
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedAdminRoute;