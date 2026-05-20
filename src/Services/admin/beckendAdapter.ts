import { BACKEND_ATIVO } from "../../config/admin/backend";
import { supabase } from "./supabaseClient";

export const backendAdapter = {

    async salvarImagem(bucket: string, fileName: string, file: string) {

        if (!BACKEND_ATIVO) {
            throw new Error("Erro ao enviar");
        }

        const filePath = `${fileName}.png`;

        const blob = await (await fetch(file)).blob();

        const { error } = await supabase
            .storage
            .from(bucket)
            .upload(filePath, blob, {
                upsert: true,
                contentType: "image/png"
            });

        if (error) throw new Error("erro ao salvar imagem");

        return filePath;
    },

    async salvarTexto(tabela: string, payload: any) {

        if (!BACKEND_ATIVO) {
            throw new Error("enviando... erro ao enviar");
        }

        const { error } = await supabase
            .from(tabela)
            .upsert(payload);

        if (error) throw new Error("erro ao salvar texto");

        return true;
    },

    async carregarTexto(tabela: string) {

        if (!BACKEND_ATIVO) {
            return {};
        }

        const { data, error } = await supabase
            .from(tabela)
            .select("*")
            .limit(1)
            .single();

        if (error) throw new Error("erro ao carregar");

        return data;
    }
};