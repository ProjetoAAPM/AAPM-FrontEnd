import { useEffect, useState } from "react";

import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

import type { Usuario } from "../types/Usuario";

type ExtratoItem = {
  tipo: "premio" | "pontos" | "resgate";
  premio?: string;
  pontos?: number;
  valor?: number;
  descricao?: string;
  mensagem?: string;
};

type HomeProps = {
  usuario: Usuario;
};

type Progresso = {
  pontos: number;
  porcentagem: number;
};

function Home({ usuario }: HomeProps) {
  const [progresso, setProgresso] = useState<Progresso>({
    pontos: 0,
    porcentagem: 0,
  });

  const [extrato, setExtrato] = useState<ExtratoItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      setLoading(true);

      const [resProgresso, resExtrato] = await Promise.all([
        fetch("http://localhost:5000/usuario/meu-progresso", {
          credentials: "include",
        }),

        fetch("http://localhost:5000/usuario/extrato", {
          credentials: "include",
        }),
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
    if (usuario) {
      carregarDados();
    }
  }, [usuario]);

  return (
    <div className="w-full overflow-x-hidden bg-[#101625]">

      <section className="w-full px-3 sm:px-5 lg:px-8 mt-25 flex items-center justify-center">
        <Pontuacao
          pontos={progresso.pontos}
          progresso={progresso.porcentagem}
          loading={loading}
          usuario={usuario}
        />
      </section>

      <section className="w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center">
        <FormularioExtrato extrato={extrato} />
      </section>

      <section className="w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center">
        <Sugestoes />
      </section>

    </div>
  );
}

export default Home;