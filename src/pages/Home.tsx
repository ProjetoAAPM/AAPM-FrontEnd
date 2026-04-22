import Pontuacao from "../components/home/pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home() {
  return (
    <div className="bg-[#101625]">
      
      <section className="min-h-screen flex items-center justify-center pt-24">
        <Pontuacao />
      </section>

      <section className="min-h-screen flex items-center justify-center px-4">
        <FormularioExtrato />
      </section>

      <section className="min-h-screen flex items-center justify-center">
        <Sugestoes />
      </section>

    </div>
  );
}

export default Home;