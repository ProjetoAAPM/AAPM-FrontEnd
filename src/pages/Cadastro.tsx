import Formulario from "../components/Formulario";
import { Link } from "react-router-dom";

function Cadastro() {
    return (
        <div className="bg-[#101625] min-h-screen flex flex-col items-center relative pb-20">
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute top-0 left-0 z-0 opacity-80 w-[350px]" />
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute bottom-0 right-0 z-0 opacity-80 w-[300px] -scale-x-100 -scale-y-100" />

            <Formulario tipo="cadastro" className="-mt-20" />

            <div className="z-10 -mt-14 mb-10">
                <Link to="/login" className="text-white text-lg font-semibold underline underline-offset-4">
                    Já possui conta? {" "}
                    <span className="text-[#42B9F4]">
                        Faça login.
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Cadastro