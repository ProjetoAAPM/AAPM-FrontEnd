import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
  logout: () => void;
};

function MenuMobile({
  isOpen,
  onClose,
  usuario,
  logout,
}: Props) {
  return (
    <>
      <div
        className={`
          fixed top-[75px] left-0
          w-full h-screen
          bg-[#211F1D]
          supports-[backdrop-filter]:bg-[#211F1D]/80
          backdrop-blur-lg
          backdrop-saturate-100
          z-[100]
          transition-all duration-500 ease-in-out
          lg:hidden
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        <nav className="flex flex-col px-10 pt-12 pb-10">
          
          <div className="flex flex-col gap-6">
            <Link
              to="/home"
              onClick={onClose}
              className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2"
            >
              Home
            </Link>

            <Link
              to="/novidades"
              onClick={onClose}
              className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2"
            >
              Novidades
            </Link>

            <Link
              to="/pagamento"
              onClick={onClose}
              className="text-[#CACACA] text-lg font-semibold border-b-2 border-[#FFF4C9] pb-2"
            >
              Pagamentos
            </Link>
          </div>

          {usuario?.nome ? (
            <div className="flex flex-col gap-4 mt-20">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="
                  w-full h-[45px]
                  flex items-center justify-center
                  rounded-full
                  bg-[#C83D3D]
                  text-white
                  text-lg font-bold
                  shadow-lg
                "
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-20">

              <Link
                to="/login"
                onClick={onClose}
                className="
                  w-full h-[45px]
                  flex items-center justify-center
                  rounded-full
                  border border-white/30
                  text-[#CACACA]
                  text-lg font-bold
                  bg-[#171717]
                "
              >
                Entrar
              </Link>

              <Link
                to="/cadastro"
                onClick={onClose}
                className="
                  w-full h-[45px]
                  flex items-center justify-center
                  rounded-full
                  bg-[#FFD44B]
                  text-[#171717]
                  text-lg font-bold
                  shadow-lg
                "
              >
                Cadastrar
              </Link>
            </div>
          )}
        </nav>
      </div>
      
    </>
  );
}

export default MenuMobile;