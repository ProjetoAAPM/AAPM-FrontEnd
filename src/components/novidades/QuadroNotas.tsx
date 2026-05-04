import fundo from "../../assets/images/FundoNotas.png";

function QuadroNotas() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <h1 className="text-white text-3xl p-10">Quadro de Notas</h1>
    </div>
  );
}

export default QuadroNotas;