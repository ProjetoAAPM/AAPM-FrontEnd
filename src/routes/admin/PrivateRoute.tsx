import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

function PrivateRoute({ children }: Props) {

    const adminLogado = localStorage.getItem("admin-logado");

    if (!adminLogado) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;