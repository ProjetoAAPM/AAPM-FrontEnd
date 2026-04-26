import { useState } from "react";
import Header from "../../components/Header";
import EditorCK from "../../components/admin/EditorCK";
import Comentarios from "../../components/landingPage/Comentarios";
import SobreNos from "../../components/landingPage/SobreNos";
import Planos from "../../components/landingPage/Planos";
import StylesHomeAdmin from "./StylesHomeAdmin";

function HomeAdmin() {
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState({
    heroHtml: `<h1>Conectando alunos,<br>escola <span>e comunidade</span></h1><p>Faça parte de projetos que transformam o Senai em <br class="quebra-desktop"> um lugar ainda melhor para aprender e crescer</p><p>Pequenas ações que melhoram a vida do aluno</p>`,
    sobre: {
      herohtml: `
        <div class="mb-8 md:mx-20 lg:mx-30 text-white">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
            Origem
          </h3>
          <p class="leading-relaxed text-gray-200 text-lg md:text-xl lg:text-2xl">
            Surgimos tendo em vista a necessidade de criar uma relação mais próxima entre a escola técnica e a comunidade local, envolvendo os pais e alunos no cotidiano escolar. Temos como objetivo 
            <span class="font-semibold text-white"> enriquecer</span> a formação dos alunos e 
            <span class="font-semibold text-white"> oferecer</span> suporte administrativo e financeiro para atividades que vão além do currículo obrigatório.
          </p>
        </div>
        <div class="mb-8 md:mx-20 lg:mx-30 text-white">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
            Apoio ao Aluno
          </h3>
          <ul class="list-disc list-inside space-y-3 text-gray-200 text-lg md:text-xl lg:text-2xl">
            <li>Suporte financeiro, empréstimo de armários, e acesso a ferramentas de lazer e esportes.</li>
            <li>Eventos, formaturas, feiras de tecnologia e confraternizações.</li>
          </ul>
        </div>
      `,
      foto1: "src/assets/images/futsal.jpg",
      foto2: "src/assets/images/fotoGrupo.jpg"
    }
  });

  const toggleEditing = () => {
    if (isEditing) {
      localStorage.setItem("home_content_data", JSON.stringify(content));
      alert("ALTERAÇÕES SALVAS!");
    }
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e: any, key: string) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent((prev) => ({
          ...prev,
          sobre: { ...prev.sobre, [key]: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <StylesHomeAdmin />
      <Header isAdmin={true} isEditing={isEditing} toggleEditing={toggleEditing} />

      <div className="relative min-h-screen flex flex-col items-center md:items-start overflow-hidden">
        <video
          src="src/assets/video/jundiai.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />

        <div className="absolute inset-0 bg-black/60 z-[-1]"></div>

        <div className="z-10 max-w-[1650px] w-full mx-auto px-10 md:px-20 pt-32 md:pt-[140px] lg:pt-[280px] pb-10">
          <div className="max-w-4xl text-left hero-text-container">
            <EditorCK
              isEditing={isEditing}
              initialData={content.heroHtml}
              onChange={(v: string) => setContent({ ...content, heroHtml: v })}
              className={isEditing ? "border-2 border-dashed border-blue-500 p-4 rounded-lg relative" : ""}
            />

            <button
              onClick={() => {
                document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-hero-fix"
            >
              Conheça Mais
            </button>
          </div>

          <div className="mt-10">
            <Comentarios isAdmin={true} />
          </div>
        </div>
      </div>

      <main className="w-full bg-[#101625]">
        <SobreNos
          isAdmin={true}
          isEditing={isEditing}
          content={content}
          setContent={setContent}
          handleImageUpload={handleImageUpload}
        />

        <div className="w-full max-w-[1812px] mx-auto pb-10" id="planos">
          <Planos />
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;

