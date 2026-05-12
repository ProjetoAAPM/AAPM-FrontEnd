import Carrossel from "../components/novidades/Carrossel";
import Jornal from "../components/novidades/Jornal";
import QuadroNotas from "../components/novidades/QuadroNotas";

function Novidades() {
    return (
        <div>
            <section id="carrossel" className="w-full h-auto">
                <Carrossel />
            </section>

            <section id="jornal" className=" bg-[#101625] min-h-[90vh]">
                <Jornal />
            </section>

            <section id="quadroNotas" className="bg-[#101625] flex justify-center py-5 xl:py-5">
                <QuadroNotas />
            </section>
        </div>
    );
}

export default Novidades;