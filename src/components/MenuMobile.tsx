import { useLocation, useNavigate } from "react-router-dom";
import { useEditMode } from "../contexts/modo_editar";
import { limparTodoConteudo } from "../Services/conteudoService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
  logout?: () => void;
  setModalAberto: (aberto: boolean) => void; // Mudamos aqui para receber diretamente o controle do Modal
};

function MenuMobile({ isOpen, onClose, usuario, logout, setModalAberto }: Props) {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegar via código
  const { editMode, setEditMode } = useEditMode();

  const isAdmin = location.pathname.startsWith("/admin");

  // Função que decide se navega ou se abre o modal
  const navegarComVerificacao = (rota: string) => {
    // Se for admin, passa direto
    if (isAdmin) {
      navigate(rota);
      onClose();
      return;
    }

    // Verifica se o usuário está realmente logado (nome preenchido e válido)
    if (!usuario || !usuario.nome || usuario.nome.trim() === "") {
      setModalAberto(true); // Abre o modal de aviso que está no Header
      // Opcional: onClose(); // Descomente esta linha se quiser que o menu feche ao abrir o modal
    } else {
      navigate(rota);
      onClose();
    }
  };

  const resetarPadrao = async () => {
    if (window.confirm("Deseja voltar ao texto e imagens padrão originais?")) {
      await limparTodoConteudo();

      localStorage.removeItem("inicio-texto");
      localStorage.removeItem("sobre-texto");
      localStorage.removeItem("img-futsal");
      localStorage.removeItem("img-grupo");
      localStorage.removeItem("jornal-img1");
      localStorage.removeItem("jornal-img2");
      localStorage.removeItem("jornal-img3");
      localStorage.removeItem("jornal-img4");
      localStorage.removeItem("jornal-texto-col1");
      localStorage.removeItem("jornal-texto-col2");
      localStorage.removeItem("jornal-texto-col3-1");
      localStorage.removeItem("jornal-texto-col3-2");
      localStorage.removeItem("carrossel-slides");

      setEditMode(false);
      onClose();

      window.location.reload();
    }
  };

  return (
    <>
      <div
        className={`
          fixed top-[75px] left-0
          w-full h-[calc(100vh-75px)]
          bg-[#211F1D]
          supports-[backdrop-filter]:bg-[#211F1D]/80
          backdrop-blur-lg backdrop-saturate-100
          z-[100]
          transition-all duration-500 ease-in-out
          lg:hidden
          overflow-y-auto
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        <nav className="flex flex-col px-10 pt-12 pb-10">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => navegarComVerificacao(isAdmin ? "/admin" : "/home")}
              className="text-left text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2 cursor-pointer"
            >
              Home
            </button>

            {isAdmin && (
              <button
                onClick={() => navegarComVerificacao("/admin/usuario")}
                className="text-left text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2 cursor-pointer"
              >
                Usuário
              </button>
            )}

            <button
              onClick={() => navegarComVerificacao(isAdmin ? "/admin/novidades" : "/novidades")}
              className="text-left text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2 cursor-pointer"
            >
              Novidades
            </button>

            <button
              onClick={() => navegarComVerificacao(isAdmin ? "/admin/pagamento" : "/pagamento")}
              className="text-left text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2 cursor-pointer"
            >
              Pagamentos
            </button>
          </div>

          {!isAdmin && usuario?.nome && (
            <div
              className={`
                w-full h-[45px] mx-auto px-4 py-1.5
                flex items-center justify-center
                rounded-full text-lg font-bold
                mt-12
                transition-all duration-300
                ${
                  usuario.premium
                    ? "bg-gradient-to-r from-[#FFD700] via-[#FEEB8D] to-[#C9A227] text-[#383636]"
                    : "bg-gradient-to-r from-[#8E8E8E] via-[#EDEDED] to-[#6E6E6E] text-[#1f1f1f]"
                }
              `}
            >
              {usuario.nome}
            </div>
          )}

          <div
            className={`flex flex-col gap-4 ${
              !isAdmin && usuario?.nome ? "mt-5" : "mt-20"
            }`}
          >
            {isAdmin ? (
              <>
                <button
                  onClick={resetarPadrao}
                  className="w-full h-[45px] flex items-center justify-center rounded-full border border-white/30 text-[#CACACA] text-lg font-bold bg-[#171717]"
                >
                  Padrão
                </button>

                <button
                  onClick={() => {
                    if (editMode) {
                      alert("Salvo com sucesso!");
                    }
                    setEditMode(!editMode);
                    onClose();
                  }}
                  className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#FFD44B] text-[#171717] text-lg font-bold shadow-lg"
                >
                  {editMode ? "Salvar" : "Editar"}
                </button>
              </>
            ) : (
              <>
                {usuario?.nome ? (
                  <button
                    onClick={() => {
                      if (logout) logout();
                      onClose();
                    }}
                    className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#363636] text-white text-lg font-bold shadow-lg cursor-pointer"
                  >
                    Sair
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { navigate("/login"); onClose(); }}
                      className="w-full h-[45px] flex items-center justify-center rounded-full border border-white/30 text-[#CACACA] text-lg font-bold bg-[#171717] cursor-pointer"
                    >
                      Entrar
                    </button>

                    <button
                      onClick={() => { navigate("/cadastro"); onClose(); }}
                      className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#FFD44B] text-[#171717] text-lg font-bold shadow-lg cursor-pointer"
                    >
                      Cadastrar
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;