import Formulario from "../components/Formulario";

function Cadastro() {
    return (
        <div className="bg-[#101625] min-h-[100vh]">
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute top-0 left-0 z-0 opacity-80 w-[350px]" />
            <img src="src/assets/detalheEstilo.png" alt="bolinhas" className="absolute bottom-0 right-0 z-0 opacity-80 w-[300px] -scale-x-100 -scale-y-100" />

            <Formulario tipo="cadastro" />
        </div>
    );
}

export default Cadastro