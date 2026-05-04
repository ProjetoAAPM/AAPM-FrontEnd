import CardPlano from "../components/CardPlano";

function EscolhaPlano() {

    return(
        <div className="min-h-screen bg-[#101625] flex flex-col items-center py-10 px-4">
           <div className="w-full max-w-5xl mb-10">
                <div className="flex justify-center mb-6">
                     <img src="src/assets/icons/Logo48.svg" alt="logo" className="absolute h-[100px] w-auto drop-shadow-md"/>
                </div>
                <h1 className="bg-[#42B9F4] text-white text-center text-4xl font-bold">
                    Escolha o seu plano
                </h1>
           </div>

           <div className="flex flex-col items-center gap-8 w-full justify-between">
                <CardPlano
                    fundoTitulo="bg-white"
                    titulo="Plano Comum"
                    popular={false}
                    corBtn="bg-[#373737] text-white"
                    corBorda="border-none"
                    esconderBotao={false}
            
                >     
                </CardPlano>

                <CardPlano
                    fundoTitulo="bg-white"
                    titulo="Plano Premium"
                    popular={true}
                    corBtn="bg-[#86D5FE]"
                    corBorda="border-none"
                    esconderBotao={false}
            
                >     
                </CardPlano>
           </div>

        </div>
    );
}
export default EscolhaPlano;