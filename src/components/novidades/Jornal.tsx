import { useEffect, useState } from "react";
import { useEditMode } from "../../context_admin/modo_editar";
import BlocoEditavel from "../admin/BlocoEditavel";

import img1 from "../../assets/images/formatura2.png";
import img2 from "../../assets/images/carros.jpg";
import img3 from "../../assets/images/medalhasDesafio.jpg";
import img4 from "../../assets/images/senaiPredio.jpg";

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
        const saved1 = localStorage.getItem("jornal-img1");
        const saved2 = localStorage.getItem("jornal-img2");
        const saved3 = localStorage.getItem("jornal-img3");
        const saved4 = localStorage.getItem("jornal-img4");

        if (saved1) setImage1(saved1);
        if (saved2) setImage2(saved2);
        if (saved3) setImage3(saved3);
        if (saved4) setImage4(saved4);

        setTextoCol1(localStorage.getItem("jornal-texto-col1"));
        setTextoCol2(localStorage.getItem("jornal-texto-col2"));
        setTextoCol3_1(localStorage.getItem("jornal-texto-col3-1"));
        setTextoCol3_2(localStorage.getItem("jornal-texto-col3-2"));
    }, [editMode]);

    const TEXTO_COL1_PADRAO = `
        <p class="text-md leading-relaxed">
            Entre as principais atualizações, estão a modernização dos laboratórios e a ampliação do uso de tecnologias digitais em sala de aula, permitindo que os estudantes tenham contato direto com ferramentas utilizadas na indústria atual. Além disso, novos cursos e especializações foram incorporados à grade, acompanhando as demandas do setor produtivo e ampliando as oportunidades de qualificação.
        </p>
    `;

    const TEXTO_COL2_PADRAO = `
        <p class="text-md leading-relaxed">
            A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de novidades que reforçam seu compromisso com a formação de profissionais qualificados e preparados para o mercado de trabalho. Com investimentos em infraestrutura, inovação tecnológica e metodologias de ensino mais dinâmicas, a instituição vem proporcionando uma experiência educacional cada vez mais completa aos alunos.
        </p>
    `;

    const TEXTO_COL3_1_PADRAO = `
        <p class="text-md leading-relaxed">
            Outro destaque é o incentivo a projetos práticos e colaborativos, nos quais os alunos desenvolvem soluções reais para desafios do mercado. Essas iniciativas estimulam não apenas o conhecimento técnico, mas também habilidades como trabalho em equipe, criatividade e resolução de problemas.
        </p>
    `;

    const TEXTO_COL3_2_PADRAO = `
        <p class="text-md leading-relaxed">
            Com essas mudanças, o SENAI Leopoldina Mariano Ferraz segue consolidando sua posição como referência em educação profissional, preparando seus alunos para os desafios de um cenário cada vez mais tecnológico e competitivo.
        </p>
    `;

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
        <div className="relative">
            <div onClick={() => handleImageChange(id, setter)}
                 className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${editMode ? 'border-2 border-dashed border-blue-400' : ''}`}>
                <img src={src} className={className} alt="" />
                {editMode && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <img src="/src/assets/images/icone_editar.png" alt="Editar" className="w-12 h-12" />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#101625] text-white px-8 py-20">
            <div className="w-full flex justify-end mb-[50px]">
                <h1 className="bg-[#94122F] px-[500px] py-2 text-[3rem] font-bold rounded mr-[-2rem]">
                    Formatura
                </h1>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-4">
                    {renderEditableImage(image1, setImage1, "img1", "rounded-xl w-full h-[250px] object-cover")}

                    <div className="border-l-4 border-blue-500 pl-3">
                        {editMode ? (
                            <BlocoEditavel
                                id="jornal-texto-col1"
                                content={textoCol1 || TEXTO_COL1_PADRAO}
                            />
                        ) : (
                            <div
                                className="conteudo-renderizado text-md leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: textoCol1 || TEXTO_COL1_PADRAO }}
                            />
                        )}
                    </div>

                    {renderEditableImage(image2, setImage2, "img2", "rounded-xl w-full h-[140px] object-cover")}
                </div>

                <div className="flex flex-col gap-4">
                    {editMode ? (
                        <BlocoEditavel id="jornal-texto-col2" content={textoCol2 || TEXTO_COL2_PADRAO} />
                    ) : (
                        <div className="conteudo-renderizado text-md leading-relaxed"
                             dangerouslySetInnerHTML={{ __html: textoCol2 || TEXTO_COL2_PADRAO }} />
                    )}

                    {renderEditableImage(image3, setImage3, "img3", "rounded-xl w-full h-[400px] object-cover")}
                </div>

                <div className="flex flex-col gap-4">
                    {renderEditableImage(image4, setImage4, "img4", "rounded-xl w-full h-[180px] object-cover")}

                    {editMode ? (
                        <BlocoEditavel id="jornal-texto-col3-1" content={textoCol3_1 || TEXTO_COL3_1_PADRAO} />
                    ) : (
                        <div className="conteudo-renderizado text-md leading-relaxed"
                             dangerouslySetInnerHTML={{ __html: textoCol3_1 || TEXTO_COL3_1_PADRAO }} />
                    )}

                    {editMode ? (
                        <BlocoEditavel id="jornal-texto-col3-2" content={textoCol3_2 || TEXTO_COL3_2_PADRAO} />
                    ) : (
                        <div className="conteudo-renderizado text-md leading-relaxed"
                             dangerouslySetInnerHTML={{ __html: textoCol3_2 || TEXTO_COL3_2_PADRAO }} />
                    )}
                </div>
            </div>
        </div>
    );
}