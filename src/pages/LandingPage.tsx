import Inicio from "../components/landingPage/Inicio";
import SobreNos from "../components/landingPage/SobreNos";
import Planos from "../components/landingPage/Planos";
import Header from "../components/Header";
import { useState } from "react";

function LandingPage({ isAdmin = false }: any) {
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState({
    hero: {
      html: `
        <h1>
          Conectando alunos,<br/>
          escola <span class='text-[#FFDB4B]'>e comunidade</span>
        </h1>
        <p>
          Faça parte de projetos que transformam o Senai em um lugar ainda melhor para aprender e crescer
        </p>
        <p>
          Pequenas ações que melhoram a vida do aluno
        </p>
      `
    },
    sobre: {
      origem: "Surgimos tendo em vista a necessidade de criar uma relação mais próxima entre a escola técnica e a comunidade local...",
      apoio1: "Suporte financeiro, empréstimo de armários, e acesso a ferramentas de lazer e esportes.",
      apoio2: "Eventos, formaturas, feiras de tecnologia e confraternizações.",
    }
  });

  return (
    <>
      <Header
        isAdmin={isAdmin}
        isEditing={isEditing}
        toggleEditing={() => setIsEditing(!isEditing)}
      />

      <div>
        <section id="inicio">
          <Inicio
            isAdmin={isAdmin}
            isEditing={isEditing}
            content={content}
            setContent={setContent}
          />
        </section>

        <section id="sobre" className="bg-[#101625] min-h-screen">
          <SobreNos
            isAdmin={isAdmin}
            isEditing={isEditing}
            content={content}
            setContent={setContent}
          />
        </section>

        <section id="planos" className="bg-[#101625] min-h-screen">
          <Planos />
        </section>
      </div>
    </>
  );
}

export default LandingPage;
