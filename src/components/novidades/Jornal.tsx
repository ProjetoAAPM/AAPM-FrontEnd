import img1 from "../../assets/images/formatura2.png";
import img2 from "../../assets/images/carros.jpg";
import img3 from "../../assets/images/medalhasDesafio.jpg";
import img4 from "../../assets/images/senaiPredio.jpg";

export default function Jornal() {
     return (
        <div className="w-full min-h-screen bg-[#101625] text-white px-8 py-20">

            <div className="w-full flex justify-end mb-[50px]">
            <h1 className="bg-[#94122F] px-[500px] py-2 text-[3rem] font-bold rounded mr-[-2rem]">
                Formatura
            </h1>
            </div>

        <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-4">
            <img
                src={img1}
                className="rounded-xl w-full h-[250px] object-cover"
            />
            <p className="text-md leading-relaxed border-l-4 border-blue-500 pl-3">
                Entre as principais atualizações, estão a modernização dos laboratórios e a ampliação do uso de tecnologias digitais em sala de aula, permitindo que os estudantes tenham contato direto com ferramentas utilizadas na indústria atual. Além disso, novos cursos e especializações foram incorporados à grade, acompanhando as demandas do setor produtivo e ampliando as oportunidades de qualificação.            </p>
            <img
                src={img2}
                className="rounded-xl w-full h-[140px] object-cover"
            />
            </div>

            <div className="flex flex-col gap-4">
            <p className="text-md leading-relaxed">
                A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de novidades que reforçam seu compromisso com a formação de profissionais qualificados e preparados para o mercado de trabalho. Com investimentos em infraestrutura, inovação tecnológica e metodologias de ensino mais dinâmicas, a instituição vem proporcionando uma experiência educacional cada vez mais completa aos alunos.            </p>
            <img
                src={img3}
                className="rounded-xl w-full h-[400px] object-cover"
            />
            </div>

            <div className="flex flex-col gap-4">
            <img
                src={img4}
                className="rounded-xl w-full h-[180px] object-cover"
            />
            <p className="text-md leading-relaxed">
                Outro destaque é o incentivo a projetos práticos e colaborativos, nos quais os alunos desenvolvem soluções reais para desafios do mercado. Essas iniciativas estimulam não apenas o conhecimento técnico, mas também habilidades como trabalho em equipe, criatividade e resolução de problemas. </p>
            <p className="text-md leading-relaxed">
                Com essas mudanças, o SENAI Leopoldina Mariano Ferraz segue consolidando sua posição como referência em educação profissional, preparando seus alunos para os desafios de um cenário cada vez mais tecnológico e competitivo. </p>
            </div>

        </div>
        </div>
    );
    }
