import { supabase } from "./supabaseClient";

export interface FormularioData {
  id?: number;
  titulo: string;
  local: string;
  data: string;
  hora: string;
  link: string;
}

const ID_FORMULARIOS = 19;

export const formularioService = {
  async listarFormularios(): Promise<FormularioData[]> {
    const { data, error } = await supabase
      .from("conteudo_site")
      .select("texto")
      .eq("id", ID_FORMULARIOS)
      .single();

    if (error) {
      console.error(error);
      return [];
    }

    if (!data?.texto || data.texto.trim() === "") {
      return [];
    }

    try {
      const formularios = JSON.parse(data.texto);

      console.log(
        "SUPABASE RETORNOU:",
        formularios
      );

      return formularios;
    } catch (err) {
      console.error("Erro ao converter formulários:", err);
      return [];
    }
  },

  async criarFormulario(
    novoFormulario: FormularioData
  ): Promise<FormularioData> {

    const formularios =
      await this.listarFormularios();

    const formularioComId = {
      ...novoFormulario,
      id: Date.now(),
    };

    const novaLista = [
      ...formularios,
      formularioComId,
    ];

    console.log(
      "SALVANDO FORMULÁRIO:",
      formularioComId
    );

    console.log(
      "NOVA LISTA:",
      novaLista
    );

    const { error } = await supabase
      .from("conteudo_site")
      .update({
        texto: JSON.stringify(novaLista),
      })
      .eq("id", ID_FORMULARIOS);

    if (error) {
      console.error(error);
      throw new Error(
        "Erro ao criar formulário"
      );
    }

    return formularioComId;
  },

  async atualizarFormulario(
    id: number,
    dadosAtualizados: Partial<FormularioData>
  ) {

    const formularios =
      await this.listarFormularios();

    const novaLista = formularios.map(
      (formulario) =>
        formulario.id === id
          ? {
              ...formulario,
              ...dadosAtualizados,
            }
          : formulario
    );

    const { error } = await supabase
      .from("conteudo_site")
      .update({
        texto: JSON.stringify(novaLista),
      })
      .eq("id", ID_FORMULARIOS);

    if (error) {
      console.error(error);
      throw new Error(
        "Erro ao atualizar formulário"
      );
    }
  },

  async deletarFormulario(id: number) {

    const formularios =
      await this.listarFormularios();

    const novaLista = formularios.filter(
      (formulario) =>
        formulario.id !== id
    );

    const { error } = await supabase
      .from("conteudo_site")
      .update({
        texto: JSON.stringify(novaLista),
      })
      .eq("id", ID_FORMULARIOS);

    if (error) {
      console.error(error);
      throw new Error(
        "Erro ao deletar formulário"
      );
    }
  },
};

