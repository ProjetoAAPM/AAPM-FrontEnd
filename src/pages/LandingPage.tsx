import Inicio from "../components/landingPage/Inicio";
import SobreNos from "../components/landingPage/SobreNos";
import Planos from "../components/landingPage/Planos";

function LandingPage() {
    return (
        <div>
            <section id="inicio">
                <Inicio />
            </section>

            <section id="sobre" className="bg-[#101625] min-h-screen">
                <SobreNos />
            </section>

            <section id="planos" className="bg-[#101625] min-h-screen">
                <Planos />
            </section>
        </div>
    );
}

export default LandingPage;