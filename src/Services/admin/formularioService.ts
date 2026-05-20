/* 
instalar: npm install @supabase/supabase-js
caso de erro: desinstala node_modules e package-lock 
e instale apenas o npm install novamente*/

import { BACKEND_ATIVO } from "../../config/admin/backend";
import { supabase } from "./supabaseClient";

export interface FormularioData {
    id?: number;
    titulo: string;
    local: string;
    data: string;
    hora: string;
    link: string;
}

const STORAGE_KEY = "formularios_local";

export const formularioService = {

    async listarFormularios(): Promise<FormularioData[]> {

        if (!BACKEND_ATIVO) {

            const dados = localStorage.getItem(STORAGE_KEY);

            return dados ? JSON.parse(dados) : [];
        }

        const { data, error } = await supabase
            .from("formularios")
            .select("*")
            .order("data", { ascending: true })
            .order("hora", { ascending: true });

        if (error) throw error;

        return data || [];
    },

    async criarFormulario(formulario: Omit<FormularioData, "id">) {

        if (!BACKEND_ATIVO) {

            const existentes = await this.listarFormularios();

            const novoFormulario: FormularioData = {
                ...formulario,
                id: Date.now(),
            };

            const atualizados = [...existentes, novoFormulario];

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(atualizados)
            );

            return novoFormulario;
        }

        const { data, error } = await supabase
            .from("formularios")
            .insert([formulario])
            .select()
            .single();

        if (error) throw error;

        return data;
    },

    async atualizarFormulario(
        id: number,
        formulario: Partial<FormularioData>
    ) {

        if (!BACKEND_ATIVO) {

            const existentes = await this.listarFormularios();

            const atualizados = existentes.map((item) => {

                if (item.id === id) {
                    return {
                        ...item,
                        ...formulario,
                    };
                }

                return item;
            });

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(atualizados)
            );

            return true;
        }

        const { data, error } = await supabase
            .from("formularios")
            .update(formulario)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    },

    async deletarFormulario(id: number) {

        if (!BACKEND_ATIVO) {

            const existentes = await this.listarFormularios();

            const filtrados = existentes.filter(
                (item) => item.id !== id
            );

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(filtrados)
            );

            return true;
        }

        const { error } = await supabase
            .from("formularios")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
};