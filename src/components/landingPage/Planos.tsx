import { useState } from "react";
import Copiador from "../../alerts/Copiador";
import CardPlano from "../CardPlano";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Planos() {
    const [comumAberto, setComumAberto] = useState(false);
    const [premiumAberto, setPremiumAberto] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-[1812px] m-auto py-8 px-4 md:px-10">
            
            <div className="bg-[#51AAD8] py-2 mb-8 rounded-md">
                <h2 className="text-center text-white text-2xl md:text-4xl font-bold italic">
                    Contribuições
                </h2>
            </div>

            <div className="flex flex-wrap justify-center items-stretch py-2 gap-6 lg:gap-20 xl:gap-24">
                
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#FFFFFF] border-3 border-[#86D5FE]"
                    fundoTitulo="bg-[#86D5FE] w-full h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn="Contribuir"
                    corBtn="bg-[#86D5FE] italic mb-10"
                    onClick={() => navigate("/cadastro")}
                >
                    <div className="bg-[#86D5FE]/80 w-full h-[40px] -mt-18 mb-10 text-2xl font-bold italic">R$50 <span className="text-[22px] font-medium">/ 3 meses</span></div>

                    <p className="text-lg md:text-2xl pl-6 pr-6 font-medium leading-tight">Participe no seu ritmo, contribuindo aos poucos e aproveitando as atividades ao longo do ano.</p>
                    
                    <button onClick={() => setComumAberto(!comumAberto)} className="lg:hidden flex items-center gap-2 mt-3 text-[#51AAD8] font-bold text-sm">
                        {comumAberto ? <><ChevronUp size={18}/> Ocultar</> : <><ChevronDown size={18}/> Ver benefícios</>}
                    </button>

                    <div className={`${comumAberto ? "block" : "hidden"} lg:block`}>
                        <ul className="text-left w-full space-y-1 mt-6 text-base md:text-xl font-medium ml-2 md:ml-10">
                            <li className="flex items-center gap-2">
                                <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Pontos: +5 por ação</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Acesso a atividades e eventos</p>
                            </li>
                            <li className="flex items-center gap-2">
                                 <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Brindes padrão</p>
                            </li>
                        </ul>
                    </div>
                </CardPlano>

                <CardPlano
                    titulo="Plano Premium"
                    className="bg-linear-to-r from-[#FFF4C9] to-[#EDD98D] border-3 border-[#EFBF04]"
                    fundoTitulo="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] w-full h-[90px] rounded-t-xl italic"
                    popular={true}
                    textoBtn="Contribuir"
                    corBtn="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] italic mb-13"
                    onClick={() => navigate("/cadastro")}
                >

                    <div className="bg-linear-to-r from-[#F1D052] via-[#F0C72B] to-[#EFBF04] w-full h-[40px] -mt-6 mb-10 text-2xl font-bold italic">R$100 <span className="text-[22px] font-medium">/ 6 meses</span></div>

                    <p className="text-lg md:text-2xl pl-6 pr-6 font-medium leading-tight">Participe por mais tempo, contribuindo de forma contínua e aproveitando benefícios adicionais ao longo do ano.</p>
                    
                    <button onClick={() => setPremiumAberto(!premiumAberto)} className="lg:hidden flex items-center gap-2 mt-3 text-[#D8AC00] font-bold text-sm">
                        {premiumAberto ? <><ChevronUp size={18}/> Ocultar</> : <><ChevronDown size={18}/> Ver benefícios</>}
                    </button>

                    <div className={`${premiumAberto ? "block" : "hidden"} lg:block`}>
                        <ul className="text-left w-full space-y-1 mt-4 text-base md:text-xl font-medium ml-2 md:ml-10">
                            <li className="flex items-center gap-2">
                                <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Pontos: +7 por ação</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Brindes em dobro</p>
                            </li>
                            <li className="flex items-center gap-2">
                                 <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Prêmio exclusivo</p>
                            </li>
                            <li className="flex items-center gap-2">
                                 <Check size={18} className="text-green-600 stroke-3"/>
                                <p>Destaque na gamificação</p>
                            </li>
                        </ul>
                    </div>
                </CardPlano>

                <CardPlano
                    titulo="Turbine seus Pontos!"
                    className="bg-[#FFFFFF] border-3 border-[#C83D3D]"
                    fundoTitulo="bg-[#C83D3D] w-full h-[80px] rounded-t-xl italic"
                    popular={false}
                    textoBtn=" "
                    corBtn="hidden"
                    onClick={() => navigate("/cadastro")}
                >
                    
                    <div className="bg-[#C83D3D]/80 w-full h-[40px] -mt-4 mb-10 text-2xl font-bold italic">R$80 <span className="text-[22px] font-medium">/ ativação</span></div>
                    <div className="w-full flex flex-col items-center">
                        <p className="text-lg md:text-2xl font-medium leading-tight text-center">Sua contribuição apoia alunos e melhora o dia a dia na escola. Qualquer valor faz diferença.</p>
                        
                        <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] mt-4 rounded-2xl border-2 border-[#383636]/50" />

                        <Copiador textoParaCopiar="https://www.sp.senai.br/">
                            <div className="w-full max-w-[260px] md:max-w-[299px] h-auto bg-[#FFEBEB] p-2 mt-4 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer">
                                <div className="text-left overflow-hidden">
                                    <p className="text-[10px] md:text-base font-medium">Chave Pix</p>
                                    <p className="text-xs md:text-xl font-semibold text-[#C83D3D] truncate">https://www.sp.senai.br/</p>
                                </div>
                                <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                            </div>
                        </Copiador>
                    </div>
                </CardPlano>

            </div>
        </div>
    );
}

export default Planos;