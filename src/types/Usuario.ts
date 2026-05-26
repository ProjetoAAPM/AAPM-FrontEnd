export type Usuario = {
  nome: string;
  foto: string;
  tipo_usuario: "aluno" | "professor";
  especialidade?: string;
  curso?: string;
  dataInicio?: string;
  dataFinal?: string;
  premium: boolean;
};