import Copiador from "../alerts/Copiador";
import { Copy } from "lucide-react";
import { X } from "lucide-react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

function PopupPagamento({ isOpen, onClose }: PopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            
            <div className="relative w-full max-w-[435px] bg-white rounded-2xl overflow-hidden shadow-xl">

                <div className="w-full h-[60px] bg-gradient-to-r from-[#86D5FE]/50 via-[#C83D3D]/50 to-[#EFC00B]/50" />

                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-white font-bold text-3xl cursor-pointer"
                >
                    <X size={28} strokeWidth={2.5} className="mt-2" />
                </button>

                <div className="p-8 flex flex-col items-center">

                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] rounded-2xl border-2 border-[#383636]/50"
                    />

                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#FFEBEB] p-2 mt-3 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer">
                            <div className="text-left overflow-hidden">
                                <p className="text-xs md:text-xs font-medium">Chave Pix</p>
                                <p className="text-sm md:text-sm font-semibold text-[#C83D3D] truncate">https://www.sp.senai.br/</p>
                            </div>
                            <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                        </div>
                    </Copiador>

                    <label className={`w-full max-x[300px] h-30 mt-3 rounded-md bg-[#F5F5F5] flex flex-col items-center justify-center p-2 cursor-pointer border-2 border-[#383636]/50`}>
                        <p className="text-base font-semibold text-[#888888]">Arraste o arquivo até aqui!</p>
                    </label>

                    <button className="w-full max-w-[180px] mx-auto h-[54px] mt-4 rounded-xl text-white font-bold shadow-md hover:scale-105 active:scale-95 transtion-all text-2xl cursor-pointer bg-[#373737]">
                        Upload
                    </button>

                </div>
            </div>
        </div>
    );
}

export default PopupPagamento;