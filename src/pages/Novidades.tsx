import Carrossel from "../components/novidades/Carrossel";
import Jornal from "../components/novidades/Jornal";
import QuadroNotas from "../components/novidades/QuadroNotas";

function Novidades() {

    return (
        <div>
            <section id="carrossel" className="min-h-[100vh]">
                <Carrossel />
            </section>

            <section id="jornal" className="bg-[#101625] min-h-[90vh]">
                <Jornal />
            </section>

            <section
                id="quadroNotas"
                className="bg-[#101625] min-h-[90vh] flex justify-center py-5"
            >
                <QuadroNotas />
            </section>
        </div>
    );
}

export default Novidades;