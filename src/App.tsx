import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
    nome: "",
    foto: perfil1,
    tipo_usuario: "aluno",
    curso: "",
    dataInicio: "",
    dataFinal: "",
    premium: false,
  });

  async function carregarUsuario() {
    try {
      const resposta = await fetch("http://localhost:5000/usuario/home-logada", {
        credentials: "include",
      });

      if (!resposta.ok) return;

      const data = await resposta.json();
      console.log(data);

      setUsuario({
        nome: data.nome,
        foto: data.foto || perfil1,
        tipo_usuario: data.tipo,
        curso: data.curso || "",
        especialidade: data.especialidade || "",
        dataInicio: data.inicio_curso || "",
        dataFinal: data.fim_curso || "",
        premium: data.premium || false,
      });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

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
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<Cadastro setUsuario={setUsuario} />} />
        <Route path="/escolhaplano" element={<EscolhaPlano />} />

        <Route path="*" element={<p>Página não encontrada</p>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;