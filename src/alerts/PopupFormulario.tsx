import logoImgBorda from "/src/assets/icons/LogoBorda48.svg";

interface PopupAvisoProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;

    titulo: string;
    mensagem: string;
    textoConfirmar?: string;
    textoCancelar?: string;

    corBotaoConfirmar?: string;
    hoverBotaoConfirmar?: string;
}

function PopupAviso({
    isOpen,
    onClose,
    onConfirm,

    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",

    corBotaoConfirmar = "bg-[#5DADE2]",
    hoverBotaoConfirmar = "hover:bg-[#3498DB]",
}: PopupAvisoProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">

            {/* CARD */}
            <div
                className="
                    relative
                    w-full
                    max-w-[340px]
                    sm:max-w-[420px]
                    lg:max-w-[480px]

                    rounded-[12px]
                    sm:rounded-[14px]

                    border-[4px]
                    sm:border-[5px]

                    border-[#0A0F1F]
                    bg-[#F4F4F4]
                    overflow-hidden
                    shadow-2xl
                "
            >

                <div
                    className="
                        w-full
                        h-[48px]
                        sm:h-[56px]
                        lg:h-[62px]

                        bg-[#0A0F1F]
                        flex
                        items-center

                        px-3
                        sm:px-5

                        gap-2
                        sm:gap-3
                    "
                >

                    <img
                        src={logoImgBorda}
                        alt="Logo"
                        className="
                            w-8 h-8
                            sm:w-10 sm:h-10
                            lg:w-11 lg:h-11
                            object-contain
                        "
                    />

                    <h2
                        className="
                            text-white
                            font-bold

                            text-[16px]
                            sm:text-[20px]
                            lg:text-[22px]
                        "
                    >
                        {titulo}
                    </h2>
                </div>

                <div
                    className="
                        px-4
                        sm:px-6
                        lg:px-8

                        pt-6
                        sm:pt-8

                        pb-5
                        sm:pb-7

                        flex
                        flex-col
                        items-center
                    "
                >

                    <h1
                        className="
                            text-center
                            font-bold

                            text-[20px]
                            sm:text-[26px]
                            lg:text-[30px]

                            leading-[24px]
                            sm:leading-[32px]
                            lg:leading-[36px]

                            max-w-[260px]
                            sm:max-w-[320px]
                            lg:max-w-[360px]
                        "
                    >
                        {mensagem}
                    </h1>

                    {/* BOTÕES */}
                    <div
                        className="
                            flex
                            flex-col
                            sm:flex-row

                            items-center
                            justify-center

                            gap-3
                            sm:gap-4

                            mt-7
                            sm:mt-8

                            w-full
                        "
                    >

                        <button
                            onClick={onConfirm}
                            className={`
                                w-full
                                sm:min-w-[140px]
                                sm:w-auto

                                h-[42px]
                                sm:h-[46px]
                                lg:h-[50px]

                                rounded-full

                                ${corBotaoConfirmar}
                                ${hoverBotaoConfirmar}

                                active:scale-95
                                transition-all

                                text-white
                                font-bold

                                text-[18px]
                                sm:text-[20px]
                                lg:text-[22px]

                                shadow-md
                                cursor-pointer
                            `}
                        >
                            {textoConfirmar}
                        </button>

                        <button
                            onClick={onClose}
                            className="
                                w-full
                                sm:min-w-[140px]
                                sm:w-auto

                                h-[42px]
                                sm:h-[46px]
                                lg:h-[50px]

                                rounded-full

                                bg-[#3B3B3B]
                                hover:bg-[#2C2C2C]

                                active:scale-95
                                transition-all

                                text-white
                                font-bold

                                text-[18px]
                                sm:text-[20px]
                                lg:text-[22px]

                                shadow-md
                                cursor-pointer
                            "
                        >
                            {textoCancelar}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupAviso;