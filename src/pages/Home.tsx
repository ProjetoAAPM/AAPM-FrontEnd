import { useState } from "react";
import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home() {
  const [extrato, setExtrato] = useState([]);

  return (
    <div className="bg-[#101625]">

      <section className="min-h-[100vh] flex items-center justify-center pt-24">
        <Pontuacao setExtrato={setExtrato} />
      </section>

      <section className="min-h-[90vh] flex items-center justify-center">
        <FormularioExtrato extrato={extrato} />
      </section>

      <section className="min-h-[90vh] flex items-center justify-center">
        <Sugestoes />
      </section>

    </div>
  );
}
export default Home;