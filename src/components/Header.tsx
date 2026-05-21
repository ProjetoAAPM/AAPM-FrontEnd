import { Link, useLocation } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";

import perfil1 from "../assets/perfis/user1.png";
import perfil2 from "../assets/perfis/user2.png";

import { useState } from "react";
import { useEditMode } from "../contexts/modo_editar";

import logoImg from "/src/assets/icons/Logo48.svg";

type Usuario = {
  nome: string;
  foto: string;
  tipo_usuario: string;
  especialidade?: string;
  curso?: string;
  dataInicio?: string;
  dataFinal?: string;
  premium?: boolean;
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);
  const { editMode, setEditMode } = useEditMode();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const testeDocente = false;

  const [usuario, setUsuario] = useState<Usuario>(
    testeDocente
      ? {
          nome: "Prof. Carlos",
          foto: perfil2,
          tipo_usuario: "docente",
          especialidade: "TI",
          premium: false,
        }
      : {
          nome: "Maysa Soares",
          foto: perfil1,
          tipo_usuario: "aluno",
          curso: "Tec Desenvolvimento de Sistemas",
          dataInicio: "01/02/2025",
          dataFinal: "12/12/2026",
          premium: true,
        }
  );

  function logout() {
    setUsuario({
      nome: "",
      foto: "",
      tipo_usuario: "",
      premium: false,
    });
    setIsOpen(false);
  }

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
      window.location.reload();
    }
  };

  return (
    <>
      <div className={`absolute w-full flex justify-center z-50 transition-all duration-300 ${isOpen ? "mt-0 px-0" : "mt-0 px-0 lg:mt-4 lg:px-10"}`}>
        <div className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${isOpen ? "fixed bg-[#FFD44B] rounded-none" : "bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)]"}`}>
          <div className="flex items-center gap-2 md:gap-3">
            <img src={logoImg} alt="Logo" className="h-[40px] md:h-[45px] w-auto object-contain" />
            <p className={`text-sm md:text-xl font-semibold whitespace-nowrap leading-tight transition-colors ${isOpen ? "text-black" : "text-white"}`}>
              AAPM Senai Leopoldina
            </p>
          </div>

          <div className="hidden lg:flex gap-4 xl:gap-16 2xl:gap-28 text-white text-sm xl:text-base 2xl:text-lg font-medium">
            <Link to={isAdmin ? "/admin" : "/home"} className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            {isAdmin && (
              <Link to="/admin/usuario" className="hover:text-gray-300 transition-colors">
                Usuário
              </Link>
            )}
            <Link to={isAdmin ? "/admin/novidades" : "/novidades"} className="hover:text-gray-300 transition-colors">
              Novidades
            </Link>
            <Link to={isAdmin ? "/admin/pagamento" : "/pagamento"} className="hover:text-gray-300 transition-colors">
              Pagamento
            </Link>
          </div>

          <div className="flex gap-2 md:gap-4 xl:gap-6 items-center">
            {isAdmin ? (
              <>
                <button onClick={resetarPadrao} className="hidden xl:flex items-center justify-center bg-[#C83D3D] rounded-full w-[140px] xl:w-[160px] h-[42px] text-white shadow-lg text-base xl:text-lg font-semibold hover:bg-[#b03535] transition-all">
                  Padrão
                </button>
                <div className={`hidden xl:block w-[2px] h-8 ${isOpen ? "bg-black/20" : "bg-gray-500/50"}`}></div>
                <button onClick={() => { if (editMode) { alert("Salvo com sucesso!"); } setEditMode(!editMode); }} className="hidden xl:flex items-center justify-center bg-[#C83D3D] rounded-full w-[140px] xl:w-[160px] h-[42px] text-white shadow-lg text-base xl:text-lg font-semibold hover:bg-[#b03535] transition-all">
                  {editMode ? "Salvar" : "Editar"}
                </button>
              </>
            ) : (
              <>
                {usuario?.nome ? (
                  <div onClick={() => setPerfilOpen(true)} className="hidden lg:flex items-center gap-3 cursor-pointer select-none">
                    <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                      <img src={usuario.foto} alt="Foto do usuário" className="w-11 h-11 rounded-full object-cover bg-[#171717]" />
                    </div>
                    <p className={`px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${usuario.premium ? "bg-gradient-to-r from-[#FFD700] via-[#FEEB8D] to-[#C9A227] text-[#383636]" : "bg-gradient-to-r from-[#8E8E8E] via-[#EDEDED] to-[#6E6E6E] text-[#1f1f1f]"}`}>
                      {usuario.nome}
                    </p>
                    <button onClick={(e) => { e.stopPropagation(); logout(); }} className="text-white ml-3 text-sm opacity-70 hover:opacity-100">
                      sair
                    </button>
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center">
                      <Link to="/login" className="bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-semibold rounded-full px-8 py-2 text-base min-w-[130px] text-center">
                        Login
                      </Link>

                      <div className="mx-4 text-white/70 text-xl font-light">
                        |
                      </div>

                      <Link to="/cadastro" className="bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-semibold rounded-full px-8 py-2 text-base min-w-[130px] text-center">
                        Cadastrar
                      </Link>
                    </div>
                )}
              </>
            )}

            <div className={`flex items-center gap-3 ${isAdmin ? "xl:hidden" : "lg:hidden"}`}>
              {usuario?.nome && (
                <button onClick={() => setPerfilOpen(true)} className="rounded-full overflow-hidden border-2 border-white">
                  <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                    <img src={usuario.foto} alt="Foto do usuário" className="w-10 h-10 rounded-full object-cover bg-[#171717]" />
                  </div>
                </button>
              )}

              <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[120]">
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-black" : "bg-white"}`}></span>
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? "opacity-0" : "bg-white"}`}></span>
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-black" : "bg-white"}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MenuMobile isOpen={isOpen} onClose={() => setIsOpen(false)} usuario={usuario} logout={logout} />
      <ModalPerfil perfilOpen={perfilOpen} setPerfilOpen={setPerfilOpen} usuario={usuario} setUsuario={setUsuario} />
    </>
  );
}

export default Header;