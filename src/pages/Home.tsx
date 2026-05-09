import { useState } from "react";
import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home({ modoAdmin = false }) {
  const [extrato, setExtrato] = useState<any[]>([]);

  return (
    <div className="bg-[#101625]">

      {!modoAdmin && (
        <section className="min-h-[100vh] flex items-center justify-center pt-24">
          <Pontuacao setExtrato={setExtrato} />
        </section>
      )}

      <section
        className={`
          min-h-[90vh]
          flex
          items-center
          justify-center
          ${modoAdmin ? "pt-24" : ""}
        `}
      >
        <FormularioExtrato
          extrato={extrato}
          modoAdmin={modoAdmin}
        />
      </section>

      <section className="min-h-[90vh] flex items-center justify-center">
        <Sugestoes modoAdmin={modoAdmin} />
      </section>

    </div>
  );
}

export default Home;