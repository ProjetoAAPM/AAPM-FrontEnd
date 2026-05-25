import { BACKEND_ATIVO, FORMULARIOS_ID } from "../../config/admin/backend";
import { supabase } from "./supabaseClient";

export interface FormularioData {
  id?: number;
  titulo: string;
  local: string;
  data: string;
  hora: string;
  link: string;
}

export const formularioService = {
  async listarFormularios(): Promise<FormularioData[]> {
    try {
      if (!BACKEND_ATIVO) {
        const dados = localStorage.getItem("formularios_local");
        return dados ? JSON.parse(dados) : [];
      }

      const { data, error } = await supabase
        .from("conteudo_site")
        .select("texto")
        .eq("id", FORMULARIOS_ID)
        .single();

      if (error || !data?.texto) return [];

      return JSON.parse(data.texto);
    } catch (err) {
      console.error("Erro ao listar formulários:", err);
      return [];
    }
  },

  async criarFormulario(formulario: Omit<FormularioData, "id">) {
    const existentes = await this.listarFormularios();
    const novo = { ...formulario, id: Date.now() };
    const atualizados = [...existentes, novo];

    return this.salvarNoBanco(atualizados);
  },

  async atualizarFormulario(id: number, dadosAtualizados: Partial<FormularioData>) {
    const existentes = await this.listarFormularios();
    const atualizados = existentes.map(item =>
      item.id === id ? { ...item, ...dadosAtualizados } : item
    );
    return this.salvarNoBanco(atualizados);
  },

  async deletarFormulario(id: number) {
    const existentes = await this.listarFormularios();
    const filtrados = existentes.filter(item => item.id !== id);
    return this.salvarNoBanco(filtrados);
  },

  async salvarNoBanco(lista: FormularioData[]) {
    if (!BACKEND_ATIVO) {
        localStorage.setItem("formularios_local", JSON.stringify(lista));
        return true;
    }

    try {
        const { data: existe, error: errorBusca } = await supabase
            .from("conteudo_site")
            .select("id")
            .eq("id", FORMULARIOS_ID)
            .maybeSingle();

        if (errorBusca) throw errorBusca;

        if (existe) {
            const { error: errorUpdate } = await supabase
                .from("conteudo_site")
                .update({ texto: JSON.stringify(lista) })
                .eq("id", FORMULARIOS_ID);

            if (errorUpdate) throw errorUpdate;
        } else {
            const { error: errorInsert } = await supabase
                .from("conteudo_site")
                .insert({ texto: JSON.stringify(lista) });

            if (errorInsert) throw errorInsert;
        }

            return true;
        } catch (error) {
            console.error("Erro ao salvar formulários:", error);
            throw error;
        }
    }
};