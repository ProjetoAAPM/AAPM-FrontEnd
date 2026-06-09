import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Novidades from "./pages/Novidades";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EscolhaPlano from "./pages/EscolhaPlano";
import Admin from "./pages/admin";
import { EditModeProvider } from "./contexts/modo_editar";
import GlobalClickHandler from "./components/admin/GlobalClickHandler";
import { AuthProvider, useAuth } from "./contexts/admin/AuthContext";
import perfil1 from "./assets/perfis/user1.png";
import type { Usuario } from "./types/Usuario";
import { RotaProtegida } from "./components/RotaProtegida";

function AdminRoute({ children }: { children: React.ReactElement }) {
    const { isAdmin, loadingAuth } = useAuth();
    console.log("AdminRoute =>", {
        isAdmin,
        loadingAuth
    });
    if (loadingAuth) {
        return null;
    }
    return isAdmin ? children : <Navigate to="/login" replace />;
}

function AppContent() {
    const { loadingAuth, logoutLoading } = useAuth();
    const location = useLocation();
    const esconderHeader = new Set([
        "/cadastro",
        "/login",
        "/escolhaplano"
    ]).has(location.pathname);

    const [usuario, setUsuario] = useState<Usuario>({
        nome: "",
        foto: perfil1,
        tipo_usuario: "aluno",
        curso: "",
        dataInicio: "",
        dataFinal: "",
        premium: false
    });

    async function carregarUsuario() {
        try {
            const resposta = await fetch(
                "https://aapm-api.onrender.com/usuario/home-logada",
                { credentials: "include" }
            );

            if (!resposta.ok) return;

            const data = await resposta.json();

            setUsuario({
                nome: data.nome,
                foto: data.foto || perfil1,
                tipo_usuario: data.tipo,
                curso: data.curso || "",
                especialidade: data.especialidade || "",
                dataInicio: data.inicio_curso || "",
                dataFinal: data.fim_curso || "",
                premium: data.premium || false
            });
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        }
    }

    useEffect(() => {
        if (esconderHeader) return;
        if (location.pathname.startsWith("/admin")) return;

        carregarUsuario();
    }, [location.pathname]);

    if (loadingAuth || logoutLoading) {
        return (
            <div className="min-h-screen bg-[#101625]" />
        );
    }

    return (
        <EditModeProvider>
            <GlobalClickHandler />

            <Routes>
                <Route path="*" element={<p>Página não encontrada</p>} />

                <Route path="/login" element={<Login setUsuario={setUsuario} />} />
                <Route path="/cadastro" element={<Cadastro setUsuario={setUsuario} />} />
                <Route path="/escolhaplano" element={<EscolhaPlano />} />

                <Route
                    element={
                        <>
                            <Header usuario={usuario} setUsuario={setUsuario} />
                            <main><Outlet/></main>
                            <Footer />
                        </>
                    }
                >
                    <Route path="/" element={<LandingPage/>}/>

                    <Route element={<RotaProtegida />}>
                        <Route path="/home" element={<Home usuario={usuario} />} />
                        <Route path="/novidades" element={<Novidades />} />
                        <Route path="/pagamento" element={<Pagamento />} />
                    </Route>

                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        }
                    >
                        <Route index element={<LandingPage />} />
                        <Route path="home" element={<Home usuario={usuario} />} />
                        <Route path="usuario" element={<Home usuario={usuario} modoAdmin />} />
                        <Route path="novidades" element={<Novidades modoAdmin />} />
                        <Route path="pagamento" element={<Pagamento isAdmin />} />
                    </Route>


                </Route>

                
            </Routes>
        </EditModeProvider>
    );
}

function App() {
    return (
        <GoogleOAuthProvider clientId="832032152359-3njip8902sedk03lvg7jicqebq7hcerq.apps.googleusercontent.com">
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;