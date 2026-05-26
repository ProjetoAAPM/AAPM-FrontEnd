import React, { useEffect, useState } from "react";
import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";
import type { Usuario } from "../types/Usuario";

type ExtratoItem = {
  tipo: "premio" | "pontos" | "resgate" | "ganho";
  premio?: string;
  pontos?: number;
  valor?: number;
  descricao?: string;
  mensagem?: string;
};

type Progresso = {
  pontos: number;
  porcentagem: number;
};

interface HomeProps {
  modoAdmin?: boolean;
  usuario?: Usuario;
}

function Home({ modoAdmin = false, usuario }: HomeProps) {
  const [progresso, setProgresso] = useState<Progresso>({ pontos: 0, porcentagem: 0 });
  const [extrato, setExtrato] = useState<ExtratoItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    if (modoAdmin) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [resProgresso, resExtrato] = await Promise.all([
        fetch("http://localhost:5000/usuario/meu-progresso", { credentials: "include" }),
        fetch("http://localhost:5000/usuario/extrato-pontos", { credentials: "include" }),
      ]);
      const dataProgresso = await resProgresso.json();
      const dataExtrato = await resExtrato.json();
      setProgresso({
        pontos: dataProgresso?.pontos_totais || 0,
        porcentagem: dataProgresso?.porcentagem_cofre || 0,
      });
      setExtrato(dataExtrato || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (usuario || modoAdmin) {
      carregarDados();
    }
  }, [usuario, modoAdmin]);

  return (
    <div className="w-full overflow-x-hidden bg-[#101625]">
      {!modoAdmin && (
        <section className="w-full px-3 sm:px-5 lg:px-8 mt-25 flex items-center justify-center">
          <Pontuacao pontos={progresso.pontos} progresso={progresso.porcentagem} loading={loading} usuario={usuario} />
        </section>
      )}
      <section className={`w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center ${modoAdmin ? "mt-20 sm:mt-24 lg:mt-18" : ""}`}>
        <FormularioExtrato extrato={extrato} modoAdmin={modoAdmin} />
      </section>
      <section className={`w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center ${modoAdmin ? "mt-4 sm:mt-6" : ""}`}>
        <Sugestoes modoAdmin={modoAdmin} />
      </section>
    </div>
  );
}

export default Home;