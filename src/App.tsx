import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import type { Usuario } from "./components/Header"; 
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
import perfil2 from "./assets/perfis/user2.png";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const rotasSemHeader = ["/cadastro", "/login", "/escolhaplano"];

  const esconderHeader = rotasSemHeader.includes(location.pathname);
  const testeDocente = false;

  const [usuario, setUsuario] = useState<Usuario>(
    testeDocente
      ? {
          nome: "Prof. Carlos",
          foto: perfil2,
          tipo_usuario: "docente",
          especialidade: "TI",
          premium: false,
        }
      : {
          nome: "Maysa Soares",
          foto: perfil1,
          tipo_usuario: "aluno",
          curso: "Tec Desenvolvimento de Sistemas",
          dataInicio: "01/02/2025",
          dataFinal: "12/12/2026",
          premium: true,
        }
  );

  return (
    <AuthProvider>
      <EditModeProvider>
        <GlobalClickHandler />

        {!esconderHeader && (
          <Header usuario={usuario} setUsuario={setUsuario} />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home usuario={usuario} />} />

          <Route path="/novidades" element={<Novidades />} />

          <Route path="/pagamento" element={<Pagamento />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/escolhaplano" element={<EscolhaPlano />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home usuario={usuario} />} />
            <Route path="usuario" element={<Home usuario={usuario} modoAdmin />} />
            <Route path="novidades" element={<Novidades modoAdmin={true} />} />
            <Route path="pagamento" element={<Pagamento isAdmin />} />
          </Route>

          <Route path="*" element={<p>Página não encontrada</p>} />
        </Routes>

        <Footer />
      </EditModeProvider>
    </AuthProvider>
  );
}

export default App;