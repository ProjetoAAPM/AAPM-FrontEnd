import Inicio from "../components/landingPage/Inicio";
import SobreNos from "../components/landingPage/SobreNos";

function LandingPage() {
    return (
        <div>
            <section id="inicio">
                <Inicio />
            </section>

            <section id="sobre" className=" bg-[#101625] min-h-screen">
                <SobreNos />
            </section>
        </div>
    );
}

export default LandingPage;