export default function ModalPerfil({
    perfilOpen,
    setPerfilOpen,
    usuario
}) {

    if (!perfilOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-top justify-end">
            <div className="w-[480px] h-[760px] rounded-l-[5px] bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] shadow-2xl relative mr-[10px] overflow-hidden">
                <button
                    onClick={() => setPerfilOpen(false)}
                    className="absolute top-1 right-4 text-white text-4xl hover:scale-110 hover:cursor-pointer transition-transform"
                >
                    ×
                </button>
                <div className="flex flex-col items-center pt-12">
                    <div className="p-[6px] rounded-full bg-gradient-to-br from-[#666666] via-[#FFFAFA] to-[#666666]">
                        <img
                            src={usuario.foto}
                            alt=""
                            className="w-36 h-36 rounded-full object-cover"
                        />
                    </div>
                    <div className="mt-6 bg-[#4D4D4D] w-[280px] h-[40px] flex items-center justify-center shadow-md">
                        <p className="text-white text-2xl font-semibold">
                            {usuario.nome}
                        </p>
                    </div>
                </div>
                <div className="px-10 mt-10 flex flex-col gap-10">
                    <div>
                        <div className="bg-[#4D4D4D] w-[130px] h-[32px] flex items-center justify-center shadow">
                            <p className="text-white font-semibold text-2xl">
                                Curso:
                            </p>
                        </div>
                        <div className="mt-5 bg-white rounded-xl h-[50px] flex items-center justify-center shadow-inner">
                            <p className="text-[#3A3A3A] text-2xl font-bold">
                                TDSCPTM04T
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-[#4D4D4D] w-[170px] h-[32px] flex items-center justify-center shadow">
                            <p className="text-white font-semibold text-2xl">
                                Duração:
                            </p>
                        </div>
                        <div className="flex justify-between mt-8">
                            <div className="flex flex-col items-center gap-4">
                                <div className="bg-[#4D4D4D] px-4 py-1">
                                    <p className="text-white text-xl font-semibold">
                                        Data início
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl w-[190px] h-[45px] flex items-center justify-center">
                                    <p className="text-gray-400 text-2xl font-semibold">
                                        dd/mm/aa
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="bg-[#4D4D4D] px-4 py-1">
                                    <p className="text-white text-xl font-semibold">
                                        Data Final
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl w-[190px] h-[45px] flex items-center justify-center">
                                    <p className="text-gray-400 text-2xl font-semibold">
                                        dd/mm/aa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button className="w-[180px] h-[70px] bg-[#4D4D4D] rounded-[20px] text-white text-4xl font-bold shadow-lg hover:scale-102 hover:cursor-pointer transition-transform">
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}