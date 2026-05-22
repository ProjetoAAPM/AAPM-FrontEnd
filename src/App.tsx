import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import Novidades from "./pages/Novidades";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import EscolhaPlano from "./pages/EscolhaPlano";

import perfil1 from "./assets/perfis/user1.png";

import type { Usuario } from "./types/Usuario";

function App() {
  const location = useLocation();

  const esconderHeader = ["/cadastro", "/login", "/escolhaplano"].includes(
    location.pathname
  );

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "Maysa Soares",
    foto: perfil1,
    tipo_usuario: "aluno",
    curso: "Tec Desenvolvimento de Sistemas",
    dataInicio: "01/02/2025",
    dataFinal: "12/12/2026",
    premium: true,
  });

  return (
    <>
      {!esconderHeader && (
        <Header usuario={usuario} setUsuario={setUsuario} />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={<Home usuario={usuario} />}
        />

        <Route path="/novidades" element={<Novidades />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/escolhaplano" element={<EscolhaPlano />} />

        <Route path="*" element={<p>Página não encontrada</p>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;