import { useEffect, useState } from "react";

import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home({usuario}) {

  const [progresso, setProgresso] = useState({
    pontos: 0,
    porcentagem: 0,
  });

  const [extrato, setExtrato] = useState([]);

  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      setLoading(true);

      // progresso
      const responseProgresso = await fetch(
        "http://localhost:5000/usuario/meu-progresso",
        {
          credentials: "include",
        }
      );

      const dataProgresso = await responseProgresso.json();

      // extrato
      const responseExtrato = await fetch(
        "http://localhost:5000/usuario/extrato",
        {
          credentials: "include",
        }
      );

      const dataExtrato = await responseExtrato.json();

      setProgresso({
        pontos: dataProgresso.pontos_totais || 0,
        porcentagem: dataProgresso.porcentagem_cofre || 0,
      });

      setExtrato(dataExtrato || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

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
        <FormularioExtrato
          extrato={extrato}
        />
      </section>

      <section className="w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center">
        <Sugestoes />
      </section>

    </div>
  );
}

export default Home;