import { useEffect, useState } from "react";
import { useEditMode } from "../../context_admin/modo_editar";

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
<p class="text-md leading-relaxed text-justify">
Além disso, o SENAI oferece uma variedade de cursos, que vão desde formação inicial e continuada até cursos técnicos, graduação e pós-graduação, abrangendo áreas como tecnologia da informação, logística, mecânica, automação e gestão. Essa diversidade permite estudantes de diferentes perfis encontrem oportunidades de qualificação e crescimento profissional dentro da própria instituição.
</p>
`;

    const TEXTO_COL3_1_PADRAO = `
<p class="text-md leading-relaxed text-justify">
Outro diferencial é a forte conexão com o setor industrial. A unidade mantém parcerias com empresas e incentiva a participação dos alunos em estágios, possibilitando a aplicação dos conhecimentos adquiridos em situações reais de trabalho.
Esse contato contribui para o desenvolvimento de competências técnicas e comportamentais.
</p>
`;

    const TEXTO_COL2_PADRAO = `
<p class="text-md leading-relaxed text-justify">
A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de iniciativas que reforçam seu compromisso com a formação de profissionais qualificados e preparados para as exigências do mercado industrial. Integrando uma das maiores redes de educação profissional da América Latina, a escola oferece uma estrutura moderna e alinhada às demandas tecnológicas atuais, proporcionando aos alunos uma formação prática e atualizada.
Nos últimos anos, a instituição tem ampliado significativamente sua atuação, investindo na modernização de laboratórios e na incorporação de tecnologias emergentes, como automação industrial, inteligência artificial e sistemas digitais. Eventos como o Mundo SENAI, por exemplo, aproximam os estudantes dessas inovações por meio de palestras, visitas técnicas e experiências práticas em áreas como impressão 3D, mecatrônica e eletrificação veicular.
</p>
`;

    const TEXTO_COL3_2_PADRAO = `
<p class="text-md leading-relaxed text-justify">
Com uma trajetória marcada pela constante evolução — desde sua criação voltada para atender à demanda industrial da região até sua consolidação como um centro de tecnologia e inovação — o SENAI Leopoldina Mariano Ferraz continua se reinventando para acompanhar as transformações da indústria. Ao investir continuamente em infraestrutura, inovação e na atualização de suas metodologias de ensino, a instituição demonstra um compromisso sólido com a excelência na formação profissional. Nesse contexto, não apenas prepara seus alunos para o ingresso no mercado de trabalho, mas também contribui ativamente para o desenvolvimento tecnológico e industrial do país. Dessa forma, o SENAI Leopoldina Mariano Ferraz se mantém como uma referência em educação profissional, formando não apenas técnicos qualificados, mas cidadãos preparados para enfrentar os desafios de um cenário cada vez mais dinâmico, competitivo e em constante transformação.
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
            <div
                onClick={() => handleImageChange(id, setter)}
                className={`relative rounded-xl overflow-hidden cursor-pointer ${editMode ? "border-2 border-dashed border-blue-400" : ""}`}
            >
                <img src={src} className={className} />
                {editMode && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <img src="/src/assets/images/icone_editar.png" className="w-12 h-12" />
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

                    {renderEditableImage(image1, setImage1, "img1", "rounded-xl w-full h-[300px] object-cover")}

                    <div className="text-md leading-relaxed text-justify"
                         dangerouslySetInnerHTML={{ __html: textoCol1 || TEXTO_COL1_PADRAO }} />

                    <div className="flex gap-4 items-start">

                        <div className="flex-1 text-md leading-relaxed text-justify"
                             dangerouslySetInnerHTML={{ __html: textoCol3_1 || TEXTO_COL3_1_PADRAO }} />

                        <div className="w-[220px] flex-shrink-0">
                            {renderEditableImage(
                                image2,
                                setImage2,
                                "img2",
                                "rounded-xl w-full h-[200px] object-cover"
                            )}
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-4">

                    <div className="text-md leading-relaxed text-justify"
                         dangerouslySetInnerHTML={{ __html: textoCol2 || TEXTO_COL2_PADRAO }} />

                    {renderEditableImage(image3, setImage3, "img3", "rounded-xl w-full h-[395px] object-cover")}
                </div>

                <div className="flex flex-col gap-4">

                    {renderEditableImage(image4, setImage4, "img4", "rounded-xl w-full h-[370px] object-cover")}

                    <div className="text-md leading-relaxed text-justify"
                         dangerouslySetInnerHTML={{ __html: textoCol3_2 || TEXTO_COL3_2_PADRAO }} />
                </div>

            </div>
        </div>
    );
}