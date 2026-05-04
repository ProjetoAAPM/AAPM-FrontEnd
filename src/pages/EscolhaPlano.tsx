import CardPlano from "../components/CardPlano";

function EscolhaPlano() {

    return(
        <div className="min-h-screen bg-[#101625] flex flex-col items-center py-5 ">
           <div className="w-full max-w-5xl mb-5">
                <div className="flex justify-center mb-30">
                     <img src="src/assets/icons/Logo48.svg" alt="logo" className="absolute h-[100px] w-auto drop-shadow-md"/>
                </div>
                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#42B9F4] py-4 mb-3 h-[80px]">
                    <h1 className="text-white text-center text-4xl font-bold italic">
                        Escolha o seu plano
                    </h1>
                </div>
           </div>

           <div className="flex flex-wrap justify-center gap-8 w-full justify-between">
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