import { Link, useNavigate } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";
import type { Usuario } from "../types/Usuario";
import { useState } from "react";

type HeaderProps = {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
};

function Header({ usuario, setUsuario }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);

  const navigate = useNavigate();

  function logout() {
    setUsuario({
      nome: "",
      foto: "",
      tipo_usuario: "aluno",
      premium: false,
    });

    setIsOpen(false);

    navigate("/");
  }

  return (
    <>
      <div
        className={`absolute w-full flex justify-center z-50 transition-all duration-300 
        ${isOpen ? "mt-0 px-0" : "mt-0 px-0 lg:mt-4 lg:px-10"}`}
      >
        <div
          className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300
          ${
            isOpen
              ? "fixed bg-[#FFD44B] rounded-none"
              : "bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          }`}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="src/assets/icons/Logo48.svg"
              className="h-[40px] md:h-[45px]"
            />

            <p
              className={`text-sm md:text-xl font-semibold transition-colors ${
                isOpen ? "text-black" : "text-white"
              }`}
            >
              AAPM Senai Leopoldina
            </p>
          </div>

          <div className="hidden lg:flex gap-10 xl:gap-28 text-white text-lg font-medium">
            <Link to="/home">Home</Link>
            <Link to="/novidades">Novidades</Link>
            <Link to="/pagamento">Pagamento</Link>
          </div>

          <div className="flex gap-6 items-center">

            {usuario?.nome ? (
              <div
                onClick={() => setPerfilOpen(true)}
                className="hidden lg:flex items-center gap-3 cursor-pointer select-none"
              >
                <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33]">
                  <img
                    src={usuario.foto}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                </div>

                <p
                  className={`
                    px-4 py-1.5 rounded-full font-bold transition-all duration-300
                    ${
                      usuario.premium
                        ? "bg-gradient-to-r from-[#FFD700] via-[#FEEB8D] to-[#C9A227] text-[#383636]"
                        : "bg-gradient-to-r from-[#8E8E8E] via-[#EDEDED] to-[#6E6E6E] text-[#1f1f1f]"
                    }
                  `}
                >
                  {usuario.nome}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                  className="text-white ml-3 text-sm opacity-70 hover:opacity-100"
                >
                  sair
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex gap-4">
                <Link to="/login" className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                    text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                      Login
                </Link>

                <div className={`hidden lg:block w-[2px] h-10 ${isOpen ? 'bg-black/20' : 'bg-gray-500/50'}`}></div>

                <Link to="/cadastro" className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                   text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                      Cadastrar
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3 lg:hidden">

              {usuario?.nome && (
                <button
                  onClick={() => setPerfilOpen(true)}
                  className="rounded-full overflow-hidden border-2 border-white"
                >
                  <img
                    src={usuario.foto}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[120]"
              >
                <span
                  className={`h-0.5 w-6 transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2 bg-black" : "bg-white"
                  }`}
                ></span>

                <span
                  className={`h-0.5 w-6 transition-all duration-300 ${
                    isOpen ? "opacity-0" : "bg-white"
                  }`}
                ></span>

                <span
                  className={`h-0.5 w-6 transition-all duration-300 ${
                    isOpen
                      ? "-rotate-45 -translate-y-2 bg-black"
                      : "bg-white"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MenuMobile
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        usuario={usuario}
        logout={logout}
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