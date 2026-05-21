import Formulario from "../components/Formulario";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#101625] min-h-screen flex flex-col items-center relative">
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute top-0 left-0 z-0 opacity-80 w-[350px]" />
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute bottom-0 right-0 z-0 opacity-80 w-[300px] -scale-x-100 -scale-y-100" />

            <button
                onClick={() => navigate('/')}
                className="absolute top-10 left-15 flex items-center gap-2 cursor-pointer"
            >
                <ArrowLeft size={30} color="#FFFFFF" strokeWidth={3}/>
            </button>

            <Formulario tipo="login" />

            <div className="z-10 -mt-14 mb-10">
                <Link to="/cadastro" className="text-white text-lg font-semibold underline underline-offset-4">
                    Ainda não tem uma conta? {" "}
                    <span className="text-[#42B9F4]">
                         Cadastre-se.
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Login