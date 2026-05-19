import { Link } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";
import { useState } from "react";

type Usuario = {
  nome: string;
  foto: string;
  tipo_usuario: string;
  especialidade?: string;
  curso?: string;
  dataInicio?: string;
  dataFinal?: string;
  premium: boolean;
};

type HeaderProps = {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
};

function Header({ usuario, setUsuario }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);

  return (
    <>
      <div className="absolute w-full flex justify-center z-50">
        <div className="w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 bg-[#211F1D]/80 backdrop-blur-lg">

          <div className="flex items-center gap-3">
            <p className="text-white font-bold">AAPM Senai Leopoldina</p>
          </div>

          <div className="hidden lg:flex gap-10 text-white">
            <Link to="/home">Home</Link>
            <Link to="/novidades">Novidades</Link>
            <Link to="/pagamento">Pagamento</Link>
          </div>

          <div className="flex items-center gap-4">

            {usuario && (
              <div
                onClick={() => setPerfilOpen(true)}
                className="hidden lg:flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={usuario.foto}
                  className="w-10 h-10 rounded-full"
                />

                {/* 🔥 NOME AUTOMÁTICO PREMIUM/NORMAL */}
                <p
                  className={`
                    px-4 py-1.5 rounded-full font-bold transition-all
                    ${
                      usuario.premium
                        ? "bg-gradient-to-r from-[#FFD700] via-[#FEEB8D] to-[#C9A227] text-[#383636]"
                        : "bg-gradient-to-r from-[#8E8E8E] via-[#EDEDED] to-[#6E6E6E] text-[#1f1f1f]"
                    }
                  `}
                >
                  {usuario.nome}
                </p>
              </div>
            )}

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