import Carrossel from "../components/novidades/Carrossel";
import Jornal from "../components/novidades/Jornal";
import QuadroNotas from "../components/novidades/QuadroNotas";

function Novidades() {

    return (
        <div>
            <section id="carrossel">
                <Carrossel />
            </section>

            <section id="jornal" className=" bg-[#101625] min-h-screen">
                <Jornal />
            </section>

            <section id="quadroNotas" className="bg-[#101625] min-h-screen">
                <QuadroNotas />
            </section>
        </div>
    );
}

export default Novidades;