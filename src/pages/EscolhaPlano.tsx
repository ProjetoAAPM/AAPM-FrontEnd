import CardPlano from "../components/CardPlano";
import Copiador from "../alerts/Copiador";
import { Copy } from "lucide-react";

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
                    titulo="Plano Comum"
                    className="bg-[#86D5FE]"
                    fundoTitulo="bg-white mr-10 mt-10 w-[90%] h-[40px] rounded-r-xs"
                    popular={false}
                    textoBtn="Upload"
                > 
                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] rounded-2xl " />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                            <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#78C0E5] p-2 mt-4 rounded-lg flex items-center justify-between border-2 border-[#78C0E5] shadow-md cursor-pointer">
                                <div className="text-left overflow-hidden">
                                    <p className="text-xs md:text-xs font-medium">Chave Pix</p>
                                    <p className="text-sm md:text-sm font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                                </div>
                                <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                            </div>
                        </Copiador>
                </CardPlano>

                <CardPlano
                    titulo="Plano Premium"
                    className="bg-[#1D1D1D]"
                    fundoTitulo="bg-white ml-10 mt-10 w-[90%] h-[40px] rounded-l-xs"
                    popular={true}
                    textoBtn="Upload"
                > 
                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px]  rounded-2xl " />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                            <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#424242] p-2 mt-4 rounded-lg flex items-center justify-between shadow-md cursor-pointer">
                                <div className="text-left overflow-hidden">
                                    <p className="text-xs md:text-xs font-medium text-[#F0C72B]">Chave Pix</p>
                                    <p className="text-sm md:text-sm font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                                </div>
                                <Copy size={16} className="text-[#F0C72B] flex-shrink-0 ml-2" />
                            </div>
                        </Copiador>
                </CardPlano>

           </div>

        </div>
    );
}
export default EscolhaPlano;