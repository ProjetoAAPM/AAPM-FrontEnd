import { useState, useEffect } from "react";
import Comentarios from "../landingPage/Comentarios";
import BlocoEditavel from "../admin/BlocoEditavel";
import { useEditMode } from "../../contexts/modo_editar";
import iconeEditar from "../../assets/icons/icone_editar.png";
import { buscarConteudo } from "../../Services/admin/conteudoService";
import { verificarAdminHome } from "../../Services/api";

function Inicio() {
  const { editMode } = useEditMode();

  const [conteudoSalvo, setConteudoSalvo] = useState<string | null>(null);

  const conteudoPadrao = `
    <h1 class="text-white text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
      Conectando alunos,<br />escola <span style="color: #FFDB4B;">e comunidade</span>
    </h1>

    <p class="text-white text-base md:text-xl lg:text-3xl mt-4 max-w-3xl font-medium">
      Faça parte de projetos que transformam o Senai em<br class="hidden md:block" />
      um lugar ainda melhor para aprender e crescer
    </p>

    <p class="text-white text-base md:text-xl lg:text-2xl mt-4 opacity-90">
      Pequenas ações que melhoram a vida do aluno
    </p>
  `;

  useEffect(() => {
      async function verificar() {
          if (!editMode) return;
          try {
              await verificarAdminHome();
          } catch {
              alert("Sessão expirada");
              window.location.href = "/login";
          }
      }
      verificar();
  }, [editMode]);


  useEffect(() => {
    async function carregarConteudo() {
      const salvo = await buscarConteudo(1);

      setConteudoSalvo(salvo);
    }

    carregarConteudo();
  }, [editMode]);

  return (
    <div className="relative min-h-screen flex flex-col items-center md:items-start overflow-x-hidden">

      <video
        src="src/assets/video/jundiai.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      <div className="absolute inset-0 bg-black/60 z-[-1]" />

      <div className="max-w-[1650px] w-full mx-auto px-10 md:px-20 pt-32 md:pt-[140px] lg:pt-[280px] pb-10 lg:pb-20">

        <div className="flex flex-col items-center md:items-start relative">

          {editMode ? (
            <div className="w-full border-dashed border-white/30 relative">

              <BlocoEditavel
                id={1} 
                className="text-white"
                content={conteudoSalvo || conteudoPadrao}
              />

              <div className="absolute top-4 right-4">
                <img
                  src={iconeEditar}
                  alt="Editar"
                  className="w-7 h-7"
                />
              </div>

            </div>
          ) : (
            <div
              className="text-white ProseMirror-static"
              dangerouslySetInnerHTML={{
                __html: conteudoSalvo || conteudoPadrao
              }}
            />
          )}

        </div>

        <button
          onClick={() => {
            document
              .getElementById("planos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center justify-center bg-[#C83D3D] rounded-full md:w-[194px] h-[48px] px-10 py-1 text-white text-lg font-semibold mt-10 cursor-pointer shadow-lg hover:bg-[#b03535] transition-all"
        >
          Conheça Mais
        </button>

        <div className="mt-10">
          <Comentarios />
        </div>

      </div>
    </div>
  );
}

export default Inicio;