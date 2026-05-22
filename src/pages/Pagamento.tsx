import { useState } from "react";
import CardPlano from "../components/CardPlano";
import PopupPagamento from "../alerts/PopupPagamento";

function Pagamento() {
    const [mostrarPopup, setMostrarPopup] = useState(false);

    return (
        <div className="min-h-[100vh] bg-[#101625] flex flex-col items-center py-5">

            <div className="flex flex-wrap justify-center gap-20 w-full mb-15 mt-37 justify-between">
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#FFFFFF] border-3 border-[#86D5FE]"
                    fundoTitulo="bg-[#86D5FE] w-full md:h-[60px] lg:h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn="Pagar"
                    corBtn="bg-[#86D5FE] italic -mt-10 mb-10"
                    onClick={() => setMostrarPopup(true)} 
                >
                    <p className="bg-[#86D5FE]/80 rounded-md p-6 mx-6 text-base md:text-xl lg:text-[22px] -mt-32"> 
                        Esse plano permite acompanhar as iniciativas da plataforma, participar das atividades disponíveis e acumular pontos que podem ser utilizados para conquistar brindes e recompensas ao longo do período.
                    </p>
                </CardPlano>
            
                <CardPlano
                    titulo="Plano Premium"
                    className="bg-linear-to-r from-[#FFF4C9] to-[#EDD98D] border-3 border-[#EFBF04]"
                    fundoTitulo="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] w-full md:h-[70px] lg:h-[90px] rounded-t-xl italic"
                    popular={true}
                    textoBtn="Pagar"
                    corBtn="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] italic mb-13"
                    onClick={() => setMostrarPopup(true)}   
                >
                    <p className="bg-[#EFC10E]/80 rounded-md p-4 mx-6 text-base md:text-xl lg:text-[22px] -mt-5"> 
                        O Plano Premium oferece vantagens exclusivas que permitem acumular pontos mais rapidamente e acessar recompensas diferenciadas. Além disso, usuários premium recebem maior destaque no sistema de gamificação e benefícios especiais em campanhas e eventos.
                    </p>
                </CardPlano>
                
                <CardPlano
                    titulo="Turbine seus Pontos!"
                    className="bg-[#FFFFFF] border-3 border-[#C83D3D]"
                    fundoTitulo="bg-[#C83D3D] w-full md:h-[60px] lg:h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn="Turbinar!"
                    corBtn="bg-[#C83D3D] italic mb-10"
                    onClick={() => setMostrarPopup(true)}
                >
                    <div className="bg-[#C83D3D]/80 w-full lg:h-[40px] 
                            md:mt-3 md:mb-3 
                            lg:mt-3 lg:mb-12 
                            md:text-[22px] lg:text-[26px] 
                            font-medium italic"
                        >
                            R$80 
                        <span className="md:text-[20px] lg:text-[22px] font-medium">/ ativação</span></div>
                    <p className="bg-[#C83D3D]/80 mt-4 rounded-md p-4 mx-6 text-base md:text-xl lg:text-[22px] -mt-5">
                        Essa opção permite aumentar sua pontuação rapidamente, ajudando a desbloquear brindes e recompensas disponíveis no sistema. Ao ativá-la, o usuário recebe um reforço em seus pontos acumulados, acelerando seu progresso na plataforma.
                    </p>
                </CardPlano>
            </div>
            <PopupPagamento
                isOpen={mostrarPopup}
                onClose={() => setMostrarPopup(false)}
            />
        </div>
    );
}

export default Pagamento