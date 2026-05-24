import Carrossel from "../components/novidades/Carrossel";
import Jornal from "../components/novidades/Jornal";
import QuadroNotas from "../components/novidades/QuadroNotas";

interface NovidadesProps {
    modoAdmin?: boolean;
}

function Novidades({
    modoAdmin = false
}: NovidadesProps) {

    return (
        <div>

            <section
                id="carrossel"
                className="w-full h-auto"
            >
                <Carrossel />
            </section>

            <section
                id="jornal"
                className="bg-[#101625] min-h-[90vh]"
            >
                <Jornal />
            </section>

            <section
                id="quadroNotas"
                className="bg-[#101625] flex justify-center py-5 xl:py-5"
            >
                <QuadroNotas isAdmin={modoAdmin} />
            </section>

        </div>
    );
}

export default Novidades;