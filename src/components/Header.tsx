import { Link, useLocation } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";
import perfil1 from "../assets/perfis/user1.png";
import perfil2 from "../assets/perfis/user2.png";
import { useState } from "react";
import { useEditMode } from "../contexts/modo_editar";
import logoImg from "/src/assets/icons/Logo48.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { editMode, setEditMode } = useEditMode();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [perfilOpen, setPerfilOpen] = useState(false);

  const testeDocente = false;

  const [usuario, setUsuario] = useState(
    testeDocente
      ? {
          nome: "Prof. Carlos",
          foto: perfil2,
          tipo_usuario: "docente",
          especialidade: "TI",
        }
      : {
          nome: "Maysa Soares",
          foto: perfil1,
          tipo_usuario: "aluno",
          curso: "Tec Desenvolvimento de Sistemas",
          dataInicio: "01/02/2025",
          dataFinal: "12/12/2026",
        }
  );

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
      <div className={`absolute w-full flex justify-center z-50 transition-all duration-300 
        ${isOpen ? 'mt-0 px-0' : 'mt-0 px-0 lg:mt-4 lg:px-10'}`}>

        <div className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300
          ${isOpen 
            ? 'fixed bg-[#FFD44B] rounded-none' 
            : 'bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)]'}`}>

          <div className="flex items-center gap-2 md:gap-3">
            <img src={logoImg} alt="Logo" className="h-[40px] md:h-[45px] w-auto object-contain"/>
            <p className={`text-sm md:text-xl font-semibold whitespace-nowrap leading-tight transition-colors ${isOpen ? 'text-black' : 'text-white'}`}>
              AAPM Senai Leopoldina
            </p>
          </div>

          {/* AJUSTADO: Gap e tamanho de fonte responsivos para evitar quebra em 1330px */}
          <div className="hidden lg:flex gap-4 xl:gap-16 2xl:gap-28 text-white text-sm xl:text-base 2xl:text-lg font-medium">
            <Link to={isAdmin ? "/admin" : "/home"} className="hover:text-gray-300 transition-colors">Home</Link>
            
            {isAdmin && (
              <Link to="/admin/usuario" className="hover:text-gray-300 transition-colors">Usuário</Link>
            )}

            <Link to={isAdmin ? "/admin/novidades" : "/novidades"} className="hover:text-gray-300 transition-colors">Novidades</Link>
            <Link to={isAdmin ? "/admin/pagamento" : "/pagamento"} className="hover:text-gray-300 transition-colors">Pagamento</Link>
          </div>

          <div className="flex gap-2 md:gap-4 xl:gap-6 items-center">
            {isAdmin ? (
              <>
                <button
                  onClick={resetarPadrao}
                  className="hidden xl:flex items-center justify-center bg-[#C83D3D] rounded-full w-[140px] xl:w-[160px] h-[42px] text-white shadow-lg text-base xl:text-lg font-semibold hover:bg-[#b03535] transition-all"
                >
                  Padrão
                </button>

                <div className={`hidden xl:block w-[2px] h-8 ${isOpen ? 'bg-black/20' : 'bg-gray-500/50'}`}></div>

                <button
                  onClick={() => {
                    if (editMode) alert("Salvo com sucesso!");
                    setEditMode(!editMode);
                  }}
                  className="hidden xl:flex items-center justify-center bg-[#C83D3D] rounded-full w-[140px] xl:w-[160px] h-[42px] text-white shadow-lg text-base xl:text-lg font-semibold hover:bg-[#b03535] transition-all"
                >
                  {editMode ? "Salvar" : "Editar"}
                </button>
              </>
            ) : (
              usuario && (
                <div
                  onClick={() => setPerfilOpen(true)}
                  className="hidden lg:flex items-center gap-3 cursor-pointer"
                >
                  <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                    <img
                      src={usuario.foto}
                      alt="Foto do usuário"
                      className="w-11 h-11 rounded-full object-cover bg-[#171717]"
                    />
                  </div>
                  <p className="text-white font-medium text-lg hover:text-gray-300 transition-colors">
                    {usuario.nome}
                  </p>
                </div>
              )
            )}

            {/* O menu mobile/perfil alternativo agora assume o controle caso a tela seja menor que xl (1280px) se for Admin */}
            <div className={`flex items-center gap-3 ${isAdmin ? 'xl:hidden' : 'lg:hidden'}`}>
              {usuario && (
                <button
                  onClick={() => setPerfilOpen(true)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                >
                  <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                    <img
                      src={usuario.foto}
                      alt="Foto do usuário"
                      className="w-11 h-11 rounded-full object-cover bg-[#171717]"
                    />
                  </div>
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[60]"
              >
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 bg-black' : 'bg-white'}`}></span>
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'opacity-0' : 'bg-white'}`}></span>
                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 bg-black' : 'bg-white'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MenuMobile
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        usuario={usuario}
      />

      <ModalPerfil
        perfilOpen={perfilOpen}
        setPerfilOpen={setPerfilOpen}
        usuario={usuario}
        setUsuario={setUsuario}
      />
    </>
  );
}

export default Header;

