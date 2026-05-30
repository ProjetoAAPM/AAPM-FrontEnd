import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";
import { buscarConteudo, salvarConteudo } from "../../Services/conteudoService";

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
  const [textoNegrito, setTextoNegrito] = useState(false);
  const [textoItalico, setTextoItalico] = useState(false);
  const [textoSublinhado, setTextoSublinhado] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest(".postit-card") ||
        target.closest(".toolbar-postit")
      ) {
        return;
      }

      setPostSelecionado(null);
    };

    document.addEventListener("click", handleClickFora);

    return () => {
      document.removeEventListener("click", handleClickFora);
    };
  }, []);

  async function carregarPosts() {
    try {
      const stringDados = await buscarConteudo(20);

      if (stringDados) {
        setPosts(JSON.parse(stringDados));
      }
    } catch (err) {
      console.error("Erro ao carregar notas do quadro:", err);
    }
  }

  async function salvarPosts() {
    setIsSaving(true);
    try {
      const jsonString = JSON.stringify(posts);
      const sucesso = await salvarConteudo(20, jsonString);

      if (sucesso) {
        alert("Salvo com sucesso!");
        setEditMode(false);
        setPostSelecionado(null);
      } else {
        alert("Erro ao salvar no banco de dados!");
      }
    } catch (err) {
      console.error("Erro ao salvar notas do quadro:", err);
      alert("Erro ao salvar!");
    } finally {
      setIsSaving(false);
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
      <div className="w-full flex flex-row items-center justify-between gap-2 sm:gap-4 mb-4">
        <div className="self-start bg-[#14358F] text-white font-black rounded-r-[10px] shadow-md py-2 text-[1rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.3rem] xl:text-[3.1rem] 2xl:text-[3.3rem] px-10 sm:px-20 md:px-24 lg:px-40 xl:px-52 2xl:px-64 whitespace-nowrap">
          Quadro de Notas
        </div>

        {isAdmin && (
          <div className="self-center sm:ml-auto md:mr-[70px] xl:mr-[190px] 2xl:mr-[275px]">
            <button
              disabled={isSaving}
              onClick={() => {
                if (editMode) {
                  salvarPosts();
                } else {
                  setEditMode(true);
                }
              }}
              className={`bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-bold rounded-full px-4 min-[360px]:px-5 sm:px-6 md:px-7 md:text-lg py-1 text-sm min-[360px]:text-base sm:text-lg min-w-[110px] min-[360px]:min-w-[120px] md:min-w-[156px] whitespace-nowrap border border-transparent shadow-sm transform translate-y-1 sm:translate-y-4 md:translate-y-3.5 ${isSaving ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Salvando..." : editMode ? "Salvar" : "Editar"}
            </button>
          </div>
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
                if (isAdmin && editMode && !isSaving) {
                  setPostSelecionado(i);
                }
              }}
              className={`postit-card relative overflow-visible w-[110px] sm:w-[130px] md:w-[140px] lg:w-[140px] xl:w-[190px] 2xl:w-[200px] aspect-square ${post.cor} shadow-md p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${isAdmin && editMode && postSelecionado === i ? "border-[4px] border-dashed border-blue-500 z-50" : ""}`}
            >
              {isAdmin && editMode && postSelecionado === i && (
                <div 
                  className="toolbar-postit absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex max-[420px]:flex-col items-center justify-center gap-2 bg-white border border-gray-200 shadow-xl px-3 py-2 rounded-full max-[420px]:rounded-2xl z-[999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setTextoNegrito(!textoNegrito)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${textoNegrito ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                  >
                    <b>B</b>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTextoItalico(!textoItalico)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${textoItalico ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                  >
                    <i>I</i>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTextoSublinhado(!textoSublinhado)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${textoSublinhado ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                  >
                    U
                  </button>

                  <span className="w-px h-5 bg-gray-300 max-[420px]:hidden" />

                  <button
                    type="button"
                    onClick={() => alterarCor(i, "bg-[#C06161]")}
                    className="w-5 h-5 rounded-full bg-[#C06161]"
                  />

                  <button
                    type="button"
                    onClick={() => alterarCor(i, "bg-[#6196C0]")}
                    className="w-5 h-5 rounded-full bg-[#6196C0]"
                  />

                  <button
                    type="button"
                    onClick={() => alterarCor(i, "bg-[#C0BD61]")}
                    className="w-5 h-5 rounded-full bg-[#C0BD61]"
                  />
                </div>
              )}

              {isAdmin && editMode ? (
                <textarea
                  disabled={isSaving}
                  value={post.texto}
                  style={{
                    fontWeight: textoNegrito ? "bold" : "normal",
                    fontStyle: textoItalico ? "italic" : "normal",
                    textDecoration: textoSublinhado ? "underline" : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSaving) setPostSelecionado(i);
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