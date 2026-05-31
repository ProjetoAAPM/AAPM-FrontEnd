import { useEffect, useState } from "react";
import { useEditMode } from "../../contexts/modo_editar";
import BlocoEditavel from "../admin/BlocoEditavel";
import { buscarConteudo, salvarImagem, buscarImagem } from "../../Services/conteudoService";
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
        async function carregarDadosJornal() {
            const urlImg1 = await buscarImagem(5);
            const urlImg2 = await buscarImagem(6);
            const urlImg3 = await buscarImagem(7);
            const urlImg4 = await buscarImagem(8);

            setImage1(urlImg1 || img1);
            setImage2(urlImg2 || img2);
            setImage3(urlImg3 || img3);
            setImage4(urlImg4 || img4);

            const txt1 = await buscarConteudo(9);
            const txt2 = await buscarConteudo(10);
            const txt3_1 = await buscarConteudo(11);
            const txt3_2 = await buscarConteudo(12);

            setTextoCol1(txt1);
            setTextoCol2(txt2);
            setTextoCol3_1(txt3_1);
            setTextoCol3_2(txt3_2);
        }

        carregarDadosJornal();
    }, [editMode]);

    const TEXTO_COL1_PADRAO = `
    <p>Além disso, o SENAI oferece uma variedade de cursos, que vão desde formação inicial e continuada até cursos técnicos, graduação e pós-graduação, abrangendo áreas como tecnologia da informação, logística, mecânica, automação e gestão. Essa diversidade permite estudantes de diferentes perfis encontrem oportunidades de qualificação e crescimento profissional dentro da própria instituição.</p>
    `;

    const TEXTO_COL3_1_PADRAO = `
    <p>Outro diferencial é a forte conexão com o setor industrial. A unidade mantém parcerias com empresas e incentiva a participação dos alunos em estágios, possibilitando a aplicação dos conhecimentos adquiridos em situações reais de trabalho. Esse contato contribui para o desenvolvimento de competências técnicas e comportamentais.</p>
    `;

    const TEXTO_COL2_PADRAO = `
    <p>A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de iniciativas que reforçam seu compromisso com a formação de profissionais qualificados e preparados para as exigências do mercado industrial. Integrando uma das maiores redes de educação profissional da América Latina, a escola oferece uma estrutura moderna e alinhada às demandas tecnológicas atuais, proporcionando aos alunos uma formação prática e atualizada.</p>

    <p>Nos últimos anos, a instituição tem ampliado significativamente sua atuação, investindo na modernização de laboratórios e na incorporação de tecnologias emergentes, como automação industrial, inteligência artificial e sistemas digitais. Eventos como o Mundo SENAI, por exemplo, aproximam os estudantes dessas inovações por meio de palestras, visitas técnicas e experiências práticas em áreas como impressão 3D, mecatrônica e eletrificação veicular.</p>
    `;

    const TEXTO_COL3_2_PADRAO = `
    <p>Com uma trajetória marcada pela constante evolução — desde sua criação voltada para atender à demanda industrial da região até sua consolidação como um centro de tecnologia e inovação — o SENAI Leopoldina Mariano Ferraz continua se reinventando para acompanhar as transformações da indústria.</p>

    <p>Ao investir continuamente em infraestrutura, inovação e na atualização de suas metodologias de ensino, a instituição demonstra um compromisso sólido com a excelência na formação profissional.</p>

    <p>Nesse contexto, não apenas prepara seus alunos para o ingresso no mercado de trabalho, mas também contribui ativamente para o desenvolvimento tecnológico e industrial do país.</p>

    <p>Dessa forma, o SENAI Leopoldina Mariano Ferraz se mantém como uma referência em educação profissional, formando não apenas técnicos qualificados, mas cidadãos preparados para enfrentar os desafios de um cenário cada vez mais dinâmico, competitivo e em constante transformação.</p>
    `;

    const IconeEditarOverlay = () => (
        <img
            src={iconeEditar}
            className="absolute top-4 right-2 w-5 h-5 z-20 pointer-events-none"
        />
    );

    const handleImageChange = (id: number, setter: any) => {
        if (!editMode) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const urlPublica = await salvarImagem(id, file);
            if (urlPublica) {
                setter(urlPublica);
            }
        };

        input.click();
    };

    const renderEditableImage = (
        src: string,
        setter: any,
        id: number,
        className: string
    ) => (
        <div
            onClick={() => handleImageChange(id, setter)}
            className={`relative rounded-xl overflow-hidden cursor-pointer
            ${editMode ? "border-2 border-dashed border-blue-400" : ""}`}
        >
            {editMode && <IconeEditarOverlay />}

            <img
                src={src}
                className={className}
            />
        </div>
    );

    const wrapText = (
        id: number,
        content: string,
        children: any
    ) => (
            editMode ? (
            <div className="relative jornal-wrapper">

                <BlocoEditavel
                    id={id}
                    content={content}
                    className="jornal-texto"
                />
            </div>
        ) : (
            <div className="jornal-wrapper">
                <div
                    className="jornal-texto"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        )
    );

    return (
        <div className="w-full min-h-screen bg-[#101625] text-white py-[40px] sm:py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px] 2xl:py-[90px] overflow-x-hidden">
            
            <div className="w-full flex justify-end mb-[30px] sm:mb-[40px] md:mb-[45px] lg:mb-[50px] xl:mb-[50px] 2xl:mb-[40px]">
                <h1 className="bg-[#94122F] px-[70px] sm:px-[140px] md:px-[220px] lg:px-[400px] xl:px-[500px] 2xl:px-[600px] py-2 sm:py-3 text-[1.2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[3.5rem] font-bold rounded-l">
                    Novidades
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20">
                
                <div className="flex flex-col gap-4 sm:gap-5">
                    {renderEditableImage(
                        image1,
                        setImage1,
                        5,
                        "rounded-xl w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[460px] xl:h-[500px] 2xl:h-[400px] object-cover"
                    )}

                    {wrapText(
                        9,
                        textoCol1 || TEXTO_COL1_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol1 || TEXTO_COL1_PADRAO }} />
                    )}

                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                        <div className="w-full lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[400px]">
                            {wrapText(
                                11,
                                textoCol3_1 || TEXTO_COL3_1_PADRAO,
                                <div dangerouslySetInnerHTML={{ __html: textoCol3_1 || TEXTO_COL3_1_PADRAO }} />
                            )}
                        </div>

                        <div className="flex-shrink-0 w-full sm:w-[220px] md:w-[260px] lg:w-[180px] xl:w-[250px] 2xl:w-[220px] min-[1100px]:hidden min-[1800px]:block">
                            {renderEditableImage(
                                image2,
                                setImage2,
                                6,
                                "rounded-xl w-full h-[220px] sm:h-[180px] md:h-[100px] lg:h-[220px] xl:h-[300px] 2xl:h-[250px] object-cover"
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5">
                    {wrapText(
                        10,
                        textoCol2 || TEXTO_COL2_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol2 || TEXTO_COL2_PADRAO }} />
                    )}

                    {renderEditableImage(
                        image3,
                        setImage3,
                        7,
                        "rounded-xl w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[395px] xl:h-[450px] 2xl:h-[480px] object-cover"
                    )}
                </div>

                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="hidden md:block">
                        {renderEditableImage(
                            image4,
                            setImage4,
                            8,
                            "rounded-xl w-full h-[260px] md:h-[300px] lg:h-[370px] xl:h-[430px] 2xl:h-[450px] object-cover"
                        )}
                    </div>

                    {wrapText(
                        12,
                        textoCol3_2 || TEXTO_COL3_2_PADRAO,
                        <div dangerouslySetInnerHTML={{ __html: textoCol3_2 || TEXTO_COL3_2_PADRAO }} />
                    )}
                </div>

            </div>
        </div>
    );
}