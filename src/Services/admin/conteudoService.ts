import { BACKEND_ATIVO } from "../../config/admin/backend";
import { supabase } from "./supabaseClient";

export async function buscarConteudo(id: number): Promise<string | null> {
    if (!BACKEND_ATIVO) {
        return localStorage.getItem(`conteudo-${id}`);
    }

    try {
        const { data, error } = await supabase
            .from("conteudo_site")
            .select("texto")
            .order("id", { ascending: true });

        if (error || !data || data.length === 0) {
            return null;
        }

        const index = id - 1;
        const valor = data[index]?.texto;

        if (!valor || valor.trim() === "") {
            return null;
        }

        return valor;
    } catch (err) {
        console.error("Erro ao buscar conteúdo:", err);
        return null;
    }
}

export async function salvarConteudo(id: number, texto: string): Promise<boolean> {
    if (!BACKEND_ATIVO) {
        localStorage.setItem(`conteudo-${id}`, texto);
        return true;
    }

    try {
        const { data: registros } = await supabase
            .from("conteudo_site")
            .select("id")
            .order("id", { ascending: true });

        const index = id - 1;
        const registroExistente = registros?.[index];

        if (registroExistente) {
            const { error: updateError } = await supabase
                .from("conteudo_site")
                .update({ texto })
                .eq("id", registroExistente.id);

            if (updateError) throw updateError;
        } else {
            const totalAtual = registros ? registros.length : 0;
            const lacunasNecessarias = index - totalAtual;

            if (lacunasNecessarias > 0) {
                const linhasPreenchimento = Array(lacunasNecessarias).fill({ texto: "" });
                const { error: gapError } = await supabase
                    .from("conteudo_site")
                    .insert(linhasPreenchimento);
                if (gapError) throw gapError;
            }

            const { error: insertError } = await supabase
                .from("conteudo_site")
                .insert({ texto });

            if (insertError) throw insertError;
        }

        return true;
    } catch (err) {
        console.error("Erro ao salvar conteúdo de forma posicional:", err);
        return false;
    }
}

export async function buscarImagem(id: number): Promise<string | null> {
    return await buscarConteudo(id);
}

export async function salvarImagem(id: number, file: File): Promise<string | null> {
    if (!BACKEND_ATIVO) {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                localStorage.setItem(`img-${id}`, base64);
                resolve(base64);
            };
            reader.readAsDataURL(file);
        });
    }

    try {
        const nomeArquivo = `midia-${id}-${Date.now()}-${file.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from("fotos_tcc")
            .upload(nomeArquivo, file, { upsert: true });

        if (uploadError) {
            console.error("Erro no upload da imagem:", uploadError);
            return null;
        }

        const { data } = supabase.storage
            .from("fotos_tcc")
            .getPublicUrl(nomeArquivo);

        const url = data.publicUrl;
        
        await salvarConteudo(id, url);
        
        return url;
    } catch (err) {
        console.error("Erro ao salvar imagem:", err);
        return null;
    }
}

export async function limparTodoConteudo(): Promise<boolean> {
    if (!BACKEND_ATIVO) {
        for (let i = 1; i <= 12; i++) {
            localStorage.removeItem(`conteudo-${i}`);
            localStorage.removeItem(`img-${i}`);
        }
        return true;
    }

    try {
        const { error } = await supabase
            .from("conteudo_site")
            .update({ texto: "" })
            .neq("id", 0);

        if (error) {
            console.error("Erro ao limpar dados do Supabase:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Erro ao limpar dados do Supabase:", err);
        return false;
    }
}