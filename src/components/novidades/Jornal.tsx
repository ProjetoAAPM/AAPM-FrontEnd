import img1 from "../../assets/images/formatura2.png";
import img2 from "../../assets/images/carros.jpg";
import img3 from "../../assets/images/medalhasDesafio.jpg";
import img4 from "../../assets/images/senaiPredio.jpg";

export default function Jornal() {
  return (
    <div className="w-full min-h-screen bg-[#101625] text-white py-[40px] sm:py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px] 2xl:py-[90px] overflow-x-hidden">

      <div className="w-full flex justify-end mb-[30px] sm:mb-[40px] md:mb-[45px] lg:mb-[50px] xl:mb-[50px] 2xl:mb-[40px]">
        <h1
          className="bg-[#94122F]
          px-[70px] sm:px-[140px] md:px-[220px] lg:px-[400px] xl:px-[500px] 2xl:px-[600px]
          py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-3
          text-[1.2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[3.5rem]
          font-bold rounded-l"
        >
          Novidades
        </h1>
      </div>

      <div
        className="grid
        grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3
        gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-8
        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20"
      >

        <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 lg:gap-4 xl:gap-5 2xl:gap-5">

          <img
            src={img1}
            className="rounded-xl w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[460px] xl:h-[500px] 2xl:h-[400px] object-cover"
          />

          <p className="text-[0.9rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.05rem] leading-relaxed text-justify">
            Além disso, o SENAI oferece uma variedade de cursos, que vão desde formação inicial e continuada até cursos técnicos, graduação e pós-graduação, abrangendo áreas como tecnologia da informação, logística, mecânica, automação e gestão. Essa diversidade permite estudantes de diferentes perfis encontrem oportunidades de qualificação e crescimento profissional dentro da própria instituição.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 md:gap-5 lg:gap-4 xl:gap-5 2xl:gap-8">

            <p className="text-[0.9rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.05rem] leading-relaxed text-justify w-full lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[400px]">
              Outro diferencial é a forte conexão com o setor industrial. A unidade mantém parcerias com empresas e incentiva a participação dos alunos em estágios, possibilitando a aplicação dos conhecimentos adquiridos em situações reais de trabalho.
              Esse contato contribui para o desenvolvimento de competências técnicas e comportamentais.
            </p>

            <img
              src={img2}
              className="rounded-xl flex-shrink-0
              w-full sm:w-[220px] md:w-[260px] lg:w-[180px] xl:w-[250px] 2xl:w-[220px]
              h-[220px] sm:h-[180px] md:h-[100px] lg:h-[220px] xl:h-[300px] 2xl:h-[250px]
              object-cover min-[1100px]:hidden min-[1800px]:block"
            />

          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 lg:gap-4 xl:gap-5 2xl:gap-5">

          <p className="text-[0.9rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.05rem] leading-relaxed text-justify">
            A unidade do SENAI Leopoldina Mariano Ferraz tem se destacado recentemente por uma série de iniciativas que reforçam seu compromisso com a formação de profissionais qualificados e preparados para as exigências do mercado industrial. Integrando uma das maiores redes de educação profissional da América Latina, a escola oferece uma estrutura moderna e alinhada às demandas tecnológicas atuais, proporcionando aos alunos uma formação prática e atualizada.
            Nos últimos anos, a instituição tem ampliado significativamente sua atuação, investindo na modernização de laboratórios e na incorporação de tecnologias emergentes, como automação industrial, inteligência artificial e sistemas digitais. Eventos como o Mundo SENAI, por exemplo, aproximam os estudantes dessas inovações por meio de palestras, visitas técnicas e experiências práticas em áreas como impressão 3D, mecatrônica e eletrificação veicular.
          </p>

          <img
            src={img3}
            className="rounded-xl w-full
            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[395px] xl:h-[450px] 2xl:h-[480px]
            object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 lg:gap-4 xl:gap-5 2xl:gap-6">

          <img
            src={img4}
            className="hidden md:block rounded-xl w-full
            h-[260px] md:h-[300px] lg:h-[370px] xl:h-[430px] 2xl:h-[450px]
            object-cover"
          />

          <p className="text-[0.9rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.05rem] leading-relaxed text-justify">
            Com uma trajetória marcada pela constante evolução — desde sua criação voltada para atender à demanda industrial da região até sua consolidação como um centro de tecnologia e inovação — o SENAI Leopoldina Mariano Ferraz continua se reinventando para acompanhar as transformações da indústria. Ao investir continuamente em infraestrutura, inovação e na atualização de suas metodologias de ensino, a instituição demonstra um compromisso sólido com a excelência na formação profissional. Nesse contexto, não apenas prepara seus alunos para o ingresso no mercado de trabalho, mas também contribui ativamente para o desenvolvimento tecnológico e industrial do país. Dessa forma, o SENAI Leopoldina Mariano Ferraz se mantém como uma referência em educação profissional, formando não apenas técnicos qualificados, mas cidadãos preparados para enfrentar os desafios de um cenário cada vez mais dinâmico, competitivo e em constante transformação.
          </p>

        </div>

      </div>
    </div>
  );
}