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
  const [progresso, setProgresso] = useState<Progresso>({
    pontos: 0,
    porcentagem: 0,
  });

  const [extrato, setExtrato] = useState<ExtratoItem[]>([]);
  const [premiosDaBarra, setPremiosDaBarra] = useState<ExtratoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [animarPorco, setAnimarPorco] = useState(false);
  const [pontosAnterior, setPontosAnterior] = useState(0);
  const [pontosAtual, setPontosAtual] = useState(0);  
  const [animacaoPendente, setAnimacaoPendente] = useState(false);
  const [progressoPendente, setProgressoPendente] =
    useState<Progresso | null>(null);

  function usuarioEstaPresente() {
    return document.visibilityState === "visible" && document.hasFocus();
  }

  async function carregarDados() {
    if (modoAdmin) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [resProgresso, resExtrato] = await Promise.all([
        fetch("https://portal-aapm-904312815750.southamerica-east1.run.app/usuario/meu-progresso", {
          credentials: "include",
        }),
        fetch("https://portal-aapm-904312815750.southamerica-east1.run.app/usuario/extrato-pontos", {
          credentials: "include",
        }),
      ]);

      if (!resProgresso.ok || !resExtrato.ok) {
        throw new Error("Erro na requisição dos dados");
      }

      const dataProgresso = await resProgresso.json();
      const dataExtrato = await resExtrato.json();
      const novoProgresso: Progresso = {
        pontos: dataProgresso?.pontos_totais || 0,
        porcentagem: dataProgresso?.porcentagem_cofre || 0,
      };

      const ultimoGanho = (dataExtrato || []).find(
        (item: any) => item.tipo === "ganho"
      );

      if (ultimoGanho) {
        const idUltimoGanho = `${ultimoGanho.titulo}-${ultimoGanho.subtitulo}-${ultimoGanho.data}-${ultimoGanho.pontos}`;
        const ultimoGanhoVisto = sessionStorage.getItem(
          "ultimo_ganho_animado"
        );

        if (idUltimoGanho !== ultimoGanhoVisto) {
          if (usuarioEstaPresente()) {
            setPontosAnterior(progresso.pontos);
            setPontosAtual(novoProgresso.pontos);

            setProgresso(novoProgresso);
            setAnimarPorco(true);

            sessionStorage.setItem("ultimo_ganho_animado", idUltimoGanho);
          } else {
            setProgressoPendente(novoProgresso);
            setAnimacaoPendente(true);
          }
        } else {
          setProgresso(novoProgresso);
        }
      } else {
        setProgresso(novoProgresso);
      }

      const extratoFormatado: ExtratoItem[] = (dataExtrato || []).map(
        (item: any) => {
          const ehGanho = item.tipo === "ganho";

          const pontosNumericos =
            parseInt(String(item.pontos).replace(/[^\d-]/g, "")) *
            (ehGanho ? 1 : -1);

          return {
            tipo: ehGanho ? "pontos" : "resgate",
            mensagem: item.titulo,
            descricao: item.subtitulo,
            pontos: pontosNumericos,
            premio: item.data,
          };
        }
      );

      setExtrato(extratoFormatado);
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

  useEffect(() => {
    function executarAnimacaoPendente() {
      if (!usuarioEstaPresente()) return;

      if (animacaoPendente && progressoPendente) {
        setPontosAnterior(progresso.pontos);
        setPontosAtual(progressoPendente.pontos);

        setProgresso(progressoPendente);
        setAnimarPorco(true);
        setAnimacaoPendente(false);
        setProgressoPendente(null);
      } else if (usuario && !modoAdmin) {
        carregarDados();
      }
    }

    window.addEventListener("focus", executarAnimacaoPendente);
    document.addEventListener("visibilitychange", executarAnimacaoPendente);

    return () => {
      window.removeEventListener("focus", executarAnimacaoPendente);
      document.removeEventListener("visibilitychange", executarAnimacaoPendente);
    };
  }, [usuario, modoAdmin, animacaoPendente, progressoPendente]);

  useEffect(() => {
    if (!animarPorco) return;

    const timer = setTimeout(() => {
      setAnimarPorco(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, [animarPorco]);

  return (
    <div className="w-full overflow-x-hidden bg-[#101625]">
      {!modoAdmin && (
        <section className="w-full px-3 sm:px-5 lg:px-8 mt-25 flex items-center justify-center">
          <Pontuacao
            pontos={progresso.pontos}
            progresso={progresso.porcentagem}
            loading={loading}
            usuario={usuario}
            animar={animarPorco}
            pontosAnterior={pontosAnterior}
            pontosAtual={pontosAtual}
            onPremiosCalculados={setPremiosDaBarra}
          />
        </section>
      )}

      <section
        className={`w-full px-3 sm:px-5 lg:px-8 py-6 flex items-center justify-center ${
          modoAdmin ? "mt-20 sm:mt-24 lg:mt-19.5" : ""
        }`}
      >
        <FormularioExtrato
          extrato={
            modoAdmin
              ? [...extrato, ...premiosDaBarra]
              : [
                  ...extrato,
                  ...premiosDaBarra.filter((item) => item.tipo === "premio"),
                ]
          }
          modoAdmin={modoAdmin}
          premium={usuario?.premium}
        />
      </section>
      
      <section
        className={`w-full px-3 sm:px-5 lg:px-8 py-1 flex items-center justify-center ${
          modoAdmin ? "mt-4 sm:mt-1" : ""
        }`}
      >
        <Sugestoes modoAdmin={modoAdmin} />
      </section>
    </div>
  );
}

export default Home;