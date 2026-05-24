import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";
import { supabase } from "../../Services/admin/supabaseClient";
import { BACKEND_ATIVO } from "../../config/admin/backend";

interface PostIt {
  cor: string;
  texto: string;
}

interface QuadroNotasProps {
  isAdmin?: boolean;
}

function QuadroNotas({ isAdmin = false }: QuadroNotasProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [postSelecionado, setPostSelecionado] = useState<number | null>(null);

  const postsPadrao: PostIt[] = [
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" }
  ];

  const [posts, setPosts] = useState<PostIt[]>(postsPadrao);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(
        window.innerWidth < 640 ||
        (window.innerWidth >= 768 && window.innerWidth < 1536)
      );
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    carregarPosts();
  }, []);

  async function carregarPosts() {
    try {
      if (!BACKEND_ATIVO) {
        const dadosLocalStorage = localStorage.getItem("quadro_notas");
        if (dadosLocalStorage) {
          setPosts(JSON.parse(dadosLocalStorage));
        }
        return;
      }

      const { data, error } = await supabase
        .from("conteudo_site")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data?.texto) {
        setPosts(JSON.parse(data.texto));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function salvarPosts() {
    try {
      if (!BACKEND_ATIVO) {
        localStorage.setItem("quadro_notas", JSON.stringify(posts));
        alert("Salvo com sucesso!");
        setEditMode(false);
        setPostSelecionado(null);
        return;
      }

      const { error } = await supabase
        .from("conteudo_site")
        .update({ texto: JSON.stringify(posts) })
        .eq("id", 1);

      if (error) {
        console.error(error);
        alert("Erro ao salvar!");
        return;
      }

      alert("Salvo com sucesso!");
      setEditMode(false);
      setPostSelecionado(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar!");
    }
  }

  function alterarTexto(index: number, valor: string) {
    const novosPosts = [...posts];
    novosPosts[index].texto = valor;
    setPosts(novosPosts);
  }

  function alterarCor(index: number, cor: string) {
    const novosPosts = [...posts];
    novosPosts[index].cor = cor;
    setPosts(novosPosts);
  }

  const postsRenderizados = isMobile
    ? [...posts, { cor: "bg-[#6196C0]", texto: "" }]
    : posts;

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 mb-4">
        <div className="self-start bg-[#14358F] text-white text-[1rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.3rem] xl:text-[3.1rem] 2xl:text-[3.3rem] font-black px-[80px] sm:px-[150px] md:px-[150px] lg:px-[250px] xl:px-[300px] 2xl:px-[350px] rounded-r-[10px] shadow-md py-2">
          Quadro de Notas
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              if (editMode) {
                salvarPosts();
              } else {
                setEditMode(true);
              }
            }}
            className="ml-[-10px] md:ml-[-25px] lg:ml-[300px] [@min-width:1330px]:ml-[-60px] bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-semibold rounded-full px-5 sm:px-6 md:px-8 py-2 text-sm sm:text-base min-w-[110px] sm:min-w-[170px] text-center shrink-0"
          >
            {editMode ? "Salvar" : "Editar"}
          </button>
        )}
      </div>

      <div
        className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[700px] xl:w-[950px] 2xl:w-[1350px] h-[1250px] sm:h-[950px] md:h-[850px] lg:h-[850px] xl:h-[1100px] 2xl:h-[1000px] bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center p-10"
        style={{ backgroundImage: `url(${fundo})` }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 md:gap-6 lg:gap-7 xl:gap-10 2xl:gap-12">
          {postsRenderizados.map((post, i) => (
            <div
              key={i}
              onClick={() => {
                if (isAdmin && editMode) {
                  setPostSelecionado(i);
                }
              }}
              className={`relative w-[110px] sm:w-[130px] md:w-[140px] lg:w-[140px] xl:w-[190px] 2xl:w-[200px] aspect-square ${post.cor} shadow-md p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${isAdmin && editMode && postSelecionado === i ? "border-[4px] border-dashed border-blue-500" : ""}`}
            >
              {isAdmin && editMode && postSelecionado === i && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow-lg z-50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alterarCor(i, "bg-[#C06161]");
                    }}
                    className="w-5 h-5 rounded-full bg-[#C06161] border-2 border-white shadow-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alterarCor(i, "bg-[#6196C0]");
                    }}
                    className="w-5 h-5 rounded-full bg-[#6196C0] border-2 border-white shadow-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alterarCor(i, "bg-[#C0BD61]");
                    }}
                    className="w-5 h-5 rounded-full bg-[#C0BD61] border-2 border-white shadow-md"
                  />
                </div>
              )}

              {isAdmin && editMode ? (
                <textarea
                  value={post.texto}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPostSelecionado(i);
                  }}
                  onChange={(e) => alterarTexto(i, e.target.value)}
                  className="w-full h-full bg-transparent resize-none outline-none text-black text-sm md:text-base font-medium text-center break-words pt-6"
                  maxLength={120}
                />
              ) : (
                <p className="text-black text-sm md:text-base font-medium break-words whitespace-pre-wrap">
                  {post.texto}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 mt-4 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-15">
          <p className="bg-[#4A61A0] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] 2xl:px-[80px] text-white font-bold text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.6rem] xl:text-[2.2rem] 2xl:text-[2.5rem]">
            Legendas
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-3 md:gap-5 lg:gap-5 xl:gap-10 2xl:gap-15">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#C06161] rounded-[3px]"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Eventos do SENAI
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#6196C0] rounded-sm"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Eventos Externos
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#C0BD61] rounded-sm"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Ações Governamentais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuadroNotas;