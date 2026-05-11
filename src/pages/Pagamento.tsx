import CardPlano from "../components/CardPlano";

function Pagamento() {
    return (
        <div className="min-h-[100vh] bg-[#101625] flex flex-col items-center py-5">

            <div className="flex flex-wrap justify-center gap-20 w-full mb-15 mt-37 justify-between">
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#FFFFFF] border-3 border-[#86D5FE]"
                    fundoTitulo="bg-[#86D5FE] w-full h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn="Pagar"
                    corBtn="bg-[#86D5FE] italic"
                >
                    <p className="bg-[#86D5FE]/80 rounded-md p-4 mx-6 text-[22px] mb-2"> 
                        Esse plano permite acompanhar as iniciativas da plataforma, participar das atividades disponíveis e acumular pontos que podem ser utilizados para conquistar brindes e recompensas ao longo do período.
                    </p>
                </CardPlano>
            
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-linear-to-r from-[#FFF4C9] to-[#EDD98D] border-3 border-[#EFBF04]"
                    fundoTitulo="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] w-full h-[90px] rounded-t-xl italic"
                    popular={true}
                    textoBtn="Pagar"
                    corBtn="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] italic"   
                >
                    <p className="bg-[#EFC10E]/80 rounded-md p-4 mx-6 text-[22px] mb-2"> 
                        O Plano Premium oferece vantagens exclusivas que permitem acumular pontos mais rapidamente e acessar recompensas diferenciadas. Além disso, usuários premium recebem maior destaque no sistema de gamificação e benefícios especiais em campanhas e eventos.
                    </p>
                </CardPlano>
                
                <CardPlano
                    titulo="Turbine seus Pontos!"
                    className="bg-[#FFFFFF] border-3 border-[#C83D3D]"
                    fundoTitulo="bg-[#C83D3D] w-full h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn="Turbinar!"
                    corBtn="bg-[#C83D3D] italic"   
                >
                    <div className="bg-[#C83D3D]/80 w-full h-[40px] -mt-10 mb-10 text-2xl font-bold italic">R$80 <span className="text-[22px] font-medium">/ ativação</span></div>
                    <p className="bg-[#C83D3D]/80 rounded-md p-4 mx-6 text-[22px] mb-2">
                        Essa opção permite aumentar sua pontuação rapidamente, ajudando a desbloquear brindes e recompensas disponíveis no sistema. Ao ativá-la, o usuário recebe um reforço em seus pontos acumulados, acelerando seu progresso na plataforma.
                    </p>
                </CardPlano>
            </div>
        </div>
    );
}

export default Pagamento