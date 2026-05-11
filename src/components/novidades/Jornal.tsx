import { useEffect, useState } from "react";
import { useEditMode } from "../../contexts/modo_editar";
import BlocoEditavel from "../admin/BlocoEditavel";
import img1 from "../../assets/images/formatura2.png";
import img2 from "../../assets/images/carros.jpg";
import img3 from "../../assets/images/medalhasDesafio.jpg";
import img4 from "../../assets/images/senaiPredio.jpg";
import iconeEditar from "../../assets/icons/icone_editar.png";

export default function Jornal() {
    const { editMode } = useEditMode();

    const [image1, setImage1] = useState(img1);
    const [image2, setImage2] = useState(img2);
    const [image3, setImage3] = useState(img3);
    const [image4, setImage4] = useState(img4);

    const [textoCol1, setTextoCol1] = useState<string | null>(null);
    const [textoCol2, setTextoCol2] = useState<string | null>(null);
    const [textoCol3_1, setTextoCol3_1] = useState<string | null>(null);
    const [textoCol3_2, setTextoCol3_2] = useState<string | null>(null);

    useEffect(() => {
        setImage1(localStorage.getItem("jornal-img1") || img1);
        setImage2(localStorage.getItem("jornal-img2") || img2);
        setImage3(localStorage.getItem("jornal-img3") || img3);
        setImage4(localStorage.getItem("jornal-img4") || img4);

        setTextoCol1(localStorage.getItem("jornal-texto-col1"));
        setTextoCol2(localStorage.getItem("jornal-texto-col2"));
        setTextoCol3_1(localStorage.getItem("jornal-texto-col3-1"));
        setTextoCol3_2(localStorage.getItem("jornal-texto-col3-2"));
    }, [editMode]);

    const TEXTO_COL1_PADRAO = `
<p>Além disso, o SENAI oferece uma variedade de cursos...</p>
`;

    const TEXTO_COL3_1_PADRAO = `
<p>Outro diferencial é a forte conexão com o setor industrial...</p>
`;

    const TEXTO_COL2_PADRAO = `
<p>A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado...</p>
<p>Nos últimos anos, a instituição tem ampliado significativamente...</p>
`;

    const TEXTO_COL3_2_PADRAO = `
<p>Com uma trajetória marcada pela constante evolução...</p>
<p>Ao investir continuamente em infraestrutura...</p>
`;

    const IconeEditarOverlay = () => (
        <img
            src={iconeEditar}
            className="absolute top-2 right-2 w-5 h-5 z-20 pointer-events-none"
        />
    );

    const handleImageChange = (id: string, setter: any) => {
        if (!editMode) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                localStorage.setItem(`jornal-${id}`, base64);
                setter(base64);
            };

            reader.readAsDataURL(file);
        };

        input.click();
    };

    const renderEditableImage = (src: string, setter: any, id: string, className: string) => (
        <div
            onClick={() => handleImageChange(id, setter)}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
                editMode ? "border-2 border-dashed border-blue-400" : ""
            }`}
        >
            {editMode && <IconeEditarOverlay />}
            <img src={src} className={className} />
        </div>
    );

    const wrapText = (id: string, content: string, children: any) => (
        editMode ? (
            <div className="relative">
                <IconeEditarOverlay />
                <BlocoEditavel id={id} content={content} className="text-md leading-relaxed text-justify" />
            </div>
        ) : (
            children
        )
    );

    return (
        <div className="w-full min-h-screen bg-[#101625] text-white px-8 py-20">

            <div className="w-full flex justify-end mb-[50px]">
                <h1 className="bg-[#94122F] px-[500px] py-2 text-[3rem] font-bold rounded mr-[-2rem]">
                    Formatura
                </h1>
            </div>

            <div className="grid grid-cols-3 gap-6">

                {/* COLUNA 1 */}
                <div className="flex flex-col gap-4">

                    {renderEditableImage(image1, setImage1, "img1", "w-full h-[300px] object-cover")}

                    {wrapText(
                        "jornal-texto-col1",
                        textoCol1 || TEXTO_COL1_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol1 || TEXTO_COL1_PADRAO }} />
                    )}

                    <div className="flex gap-4 items-start">

                        <div className="flex-1">
                            {wrapText(
                                "jornal-texto-col3-1",
                                textoCol3_1 || TEXTO_COL3_1_PADRAO,
                                <div dangerouslySetInnerHTML={{ __html: textoCol3_1 || TEXTO_COL3_1_PADRAO }} />
                            )}
                        </div>

                        <div className="w-[220px] flex-shrink-0">
                            {renderEditableImage(image2, setImage2, "img2", "w-full h-[200px] object-cover")}
                        </div>

                    </div>
                </div>

                {/* COLUNA 2 */}
                <div className="flex flex-col gap-4">

                    {wrapText(
                        "jornal-texto-col2",
                        textoCol2 || TEXTO_COL2_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol2 || TEXTO_COL2_PADRAO }} />
                    )}

                    {renderEditableImage(image3, setImage3, "img3", "w-full h-[395px] object-cover")}

                </div>

                {/* COLUNA 3 */}
                <div className="flex flex-col gap-4">

                    {renderEditableImage(image4, setImage4, "img4", "w-full h-[370px] object-cover")}

                    {wrapText(
                        "jornal-texto-col3-2",
                        textoCol3_2 || TEXTO_COL3_2_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol3_2 || TEXTO_COL3_2_PADRAO }} />
                    )}

                </div>

            </div>
        </div>
    );
}