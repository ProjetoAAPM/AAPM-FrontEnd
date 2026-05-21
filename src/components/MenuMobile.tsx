import { Link, useLocation } from "react-router-dom";
import { useEditMode } from "../contexts/modo_editar";
import logoImgBorda from "/src/assets/icons/LogoBorda48.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
  logout?: () => void;
};

function MenuMobile({ isOpen, onClose, usuario, logout }: Props) {
  const location = useLocation();
  const { editMode, setEditMode } = useEditMode();
  const isAdmin = location.pathname.startsWith("/admin");

  const resetarPadrao = () => {
    if (window.confirm("Deseja voltar ao texto e imagens padrão originais?")) {
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
      <div className={`fixed inset-0 w-full h-screen bg-[#211F1D] supports-[backdrop-filter]:bg-[#211F1D]/80 backdrop-blur-lg backdrop-saturate-100 z-[100] transition-all duration-500 ease-in-out lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="w-full bg-[#FFD44B] h-[75px] flex items-center justify-between px-4 shadow-md">
          <div className="flex items-center">
            <img src={logoImgBorda} alt="Logo" className="h-10 w-auto px-2" />
            <p className="text-[#171717] font-bold text-lg">
              AAPM Senai Leopoldina
            </p>
          </div>
          <button onClick={onClose} className="text-[#1A1A1A] text-3xl font-light">
            ✕
          </button>
        </div>

        <nav className="flex flex-col h-[calc(100vh-75px)] px-10 pt-12 pb-10">
          <div className="flex flex-col gap-6">
            <Link to={isAdmin ? "/admin" : "/home"} onClick={onClose} className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2">
              Home
            </Link>
            {isAdmin && (
              <Link to="/admin/usuario" onClick={onClose} className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2">
                Usuário
              </Link>
            )}
            <Link to={isAdmin ? "/admin/novidades" : "/novidades"} onClick={onClose} className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2">
              Novidades
            </Link>
            <Link to={isAdmin ? "/admin/pagamento" : "/pagamento"} onClick={onClose} className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2">
              Pagamentos
            </Link>
          </div>

          {!isAdmin && usuario?.nome && (
            <div className={`w-full h-[45px] flex items-center justify-center rounded-full text-lg font-bold shadow-lg mt-12 ${usuario.premium ? "bg-gradient-to-r from-[#FFD700] via-[#FEEB8D] to-[#C9A227] text-[#383636] cursor-pointer" : "bg-[#211F1D]/80 backdrop-blur-lg text-white border border-white/10"}`}>
              {usuario.nome}
            </div>
          )}

          <div className={`flex flex-col gap-4 ${!isAdmin && usuario?.nome ? "mt-5" : "mt-20"}`}>
            {isAdmin ? (
              <>
                <button onClick={resetarPadrao} className="w-full h-[45px] flex items-center justify-center rounded-full border border-white/30 text-[#CACACA] text-lg font-bold bg-[#171717]">
                  Padrão
                </button>
                <button onClick={() => { if (editMode) { alert("Salvo com sucesso!"); } setEditMode(!editMode); onClose(); }} className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#FFD44B] text-[#171717] text-lg font-bold shadow-lg">
                  {editMode ? "Salvar" : "Editar"}
                </button>
              </>
            ) : (
              <>
                {usuario?.nome ? (
                  <button onClick={() => { if (logout) { logout(); } onClose(); }} className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#363636] text-white text-lg font-bold shadow-lg cursor-pointer">
                    Sair
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={onClose} className="w-full h-[45px] flex items-center justify-center rounded-full border border-white/30 text-[#CACACA] text-lg font-bold bg-[#171717]">
                      Entrar
                    </Link>
                    <Link to="/cadastro" onClick={onClose} className="w-full h-[45px] flex items-center justify-center rounded-full bg-[#FFD44B] text-[#171717] text-lg font-bold shadow-lg">
                      Cadastrar
                    </Link>
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