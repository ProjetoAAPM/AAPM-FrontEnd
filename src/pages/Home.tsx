import { useState } from "react";
import Pontuacao from "../components/home/Pontuacao";
import FormularioExtrato from "../components/home/FormularioExtrato";
import Sugestoes from "../components/home/Sugestoes";

function Home({ modoAdmin = false }) {

    const [extrato, setExtrato] = useState<any[]>([]);

    return (
        <div className="bg-[#101625] w-full overflow-x-hidden">

            {!modoAdmin && (
                <section
                    className="
                        min-h-screen
                        flex
                        items-center
                        justify-center

                        pt-24
                        px-2

                        sm:px-4
                        md:px-6
                        lg:px-8
                        xl:px-10
                    "
                >
                    <Pontuacao setExtrato={setExtrato} />
                </section>
            )}

            <section
                className="
                    min-h-[85vh]
                    flex
                    items-center
                    justify-center

                    px-2
                    sm:px-4
                    md:px-6
                    lg:px-8
                    xl:px-10

                    py-6
                    sm:py-10
                    md:py-12
                "
            >
                <FormularioExtrato
                    extrato={extrato}
                    modoAdmin={modoAdmin}
                />
            </section>

            <section
                className="
                    min-h-[85vh]
                    flex
                    items-center
                    justify-center

                    px-2
                    sm:px-4
                    md:px-6
                    lg:px-8
                    xl:px-10

                    py-6
                    sm:py-10
                    md:py-12
                "
            >
                <Sugestoes modoAdmin={modoAdmin} />
            </section>

        </div>
    );
}

export default Home;