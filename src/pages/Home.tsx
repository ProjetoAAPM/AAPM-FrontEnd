import { useState } from "react";
import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home() {
  const [extrato, setExtrato] = useState([]);

  return (
    <div className="bg-[#101625] w-full overflow-x-hidden">
      
      <section
        className="
          min-h-screen
          flex
          items-center
          justify-center

          pt-16
          px-2

          min-[375px]:pt-20
          min-[375px]:px-3

          sm:pt-24
          sm:px-4

          md:pt-28
          md:px-6

          lg:pt-32
          lg:px-8

          xl:pt-24
          xl:px-10

          2xl:pt-24
          2xl:px-10
        "
      >
        <Pontuacao setExtrato={setExtrato} />
      </section>

      <section
        className="
          min-h-[70vh]
          flex
          items-center
          justify-center

          px-2
          py-8

          min-[375px]:px-3
          min-[375px]:py-10

          sm:min-h-[75vh]
          sm:px-4
          sm:py-12

          md:min-h-[80vh]
          md:px-6
          md:py-14

          lg:min-h-[85vh]
          lg:px-8
          lg:py-16

          xl:min-h-[90vh]
          xl:px-10
          xl:py-20

          2xl:min-h-[90vh]
          2xl:px-10
          2xl:py-20
        "
      >
        <FormularioExtrato extrato={extrato} />
      </section>

      <section
        className="
          min-h-[70vh]
          flex
          items-center
          justify-center

          px-2
          pb-8

          min-[375px]:px-3
          min-[375px]:pb-10

          sm:min-h-[75vh]
          sm:px-4
          sm:pb-12

          md:min-h-[80vh]
          md:px-6
          md:pb-14

          lg:min-h-[85vh]
          lg:px-8
          lg:pb-16

          xl:min-h-[90vh]
          xl:px-10
          xl:pb-20

          2xl:min-h-[90vh]
          2xl:px-5
        "
      >
        <Sugestoes />
      </section>

    </div>
  );
}

export default Home;