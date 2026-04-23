import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home() {
  return (
    <div className="bg-[#101625]">

      <section className="min-h-[100vh] flex items-center justify-center pt-24">
        <Pontuacao />
      </section>

      <section className="min-h-[85vh] flex items-center justify-center px-4">
        <FormularioExtrato />
      </section>

      <section className="min-h-[90vh] flex items-center justify-center">
        <Sugestoes />
      </section>

    </div>
  );
}
export default Home;