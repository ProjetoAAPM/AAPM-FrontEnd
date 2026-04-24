import moeda from "../../assets/images/moeda.png";

export default function Moeda({ progresso }) {
  return (
    <div className="absolute bottom-25 right-2 w-24 sm:w-32 md:w-48 lg:w-64 h-auto">
    <img
        src={moeda}
        alt="Moeda"
        className="w-[40px] sm:w-[80px] md:w-[90px] lg:w-[100px] h-auto object-contain"
    />
    </div>
  );
}