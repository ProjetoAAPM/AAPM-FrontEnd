import img1 from "../../assets/images/formatura2.png";
import img2 from "../../assets/images/carros.jpg";
import img3 from "../../assets/images/medalhasDesafio.jpg";
import img4 from "../../assets/images/senaiPredio.jpg";

export default function Jornal() {
     return (
        <div className="w-full min-h-screen bg-[#101625] text-white py-[70px]">

            <div className="w-full flex justify-end mb-[50px]">
            <h1 className="bg-[#94122F] px-[500px] py-2 text-[3rem] font-bold rounded-l">
                Novidades
            </h1>
            </div>

        <div className="grid grid-cols-3 gap-6 pl-10 pr-10">
            <div className="flex flex-col gap-4">
            <img
                src={img1}
                className="rounded-xl w-full h-[300px] object-cover"
            />
            <p className="text-md leading-relaxed text-justify">
                Além disso, o SENAI oferece uma variedade de cursos, que vão desde formação inicial e continuada até cursos técnicos, graduação e pós-graduação, abrangendo áreas como tecnologia da informação, logística, mecânica, automação e gestão. Essa diversidade permite estudantes de diferentes perfis encontrem oportunidades de qualificação e crescimento profissional dentro da própria instituição. </p>
            
            <div className="flex items-start gap-4 ">
                <p className="text-md leading-relaxed text-justify max-w-[300px]">
                    Outro diferencial é a forte conexão com o setor industrial. A unidade mantém parcerias com empresas e incentiva a participação dos alunos em estágios, possibilitando a aplicação dos conhecimentos adquiridos em situações reais de trabalho.
                    Esse contato contribui para o desenvolvimento de competências técnicas e comportamentais.
                </p>
                <img
                    src={img2}
                    className="rounded-xl w-[300px] h-[260px] object-cover"
                />
            </div>
        </div>

            <div className="flex flex-col gap-4">
            <p className="text-md leading-relaxed text-justify">
                A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de iniciativas que reforçam seu compromisso com a formação de profissionais qualificados e preparados para as exigências do mercado industrial. Integrando uma das maiores redes de educação profissional da América Latina, a escola oferece uma estrutura moderna e alinhada às demandas tecnológicas atuais, proporcionando aos alunos uma formação prática e atualizada.
                Nos últimos anos, a instituição tem ampliado significativamente sua atuação, investindo na modernização de laboratórios e na incorporação de tecnologias emergentes, como automação industrial, inteligência artificial e sistemas digitais. Eventos como o Mundo SENAI, por exemplo, aproximam os estudantes dessas inovações por meio de palestras, visitas técnicas e experiências práticas em áreas como impressão 3D, mecatrônica e eletrificação veicular. </p>
            <img
                src={img3}
                className="rounded-xl w-full h-[395px] object-cover"
            />
            </div>

            <div className="flex flex-col gap-4">
            <img
                src={img4}
                className="rounded-xl w-full h-[370px] object-cover"
            />
            <p className="text-md leading-relaxed text-justify">
                Com uma trajetória marcada pela constante evolução — desde sua criação voltada para atender à demanda industrial da região até sua consolidação como um centro de tecnologia e inovação — o SENAI Leopoldina Mariano Ferraz continua se reinventando para acompanhar as transformações da indústria. Ao investir continuamente em infraestrutura, inovação e na atualização de suas metodologias de ensino, a instituição demonstra um compromisso sólido com a excelência na formação profissional. Nesse contexto, não apenas prepara seus alunos para o ingresso no mercado de trabalho, mas também contribui ativamente para o desenvolvimento tecnológico e industrial do país. Dessa forma, o SENAI Leopoldina Mariano Ferraz se mantém como uma referência em educação profissional, formando não apenas técnicos qualificados, mas cidadãos preparados para enfrentar os desafios de um cenário cada vez mais dinâmico, competitivo e em constante transformação. </p>
            </div>

        </div>
    </div>
    );
    }
