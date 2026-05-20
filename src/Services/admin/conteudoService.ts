import { supabase } from "./supabaseClient";
import { BACKEND_ATIVO } from "../../config/admin/backend";

const TABELA = "conteudo_site";
const BUCKET = "fotos_tcc";

export async function buscarConteudo(id: string) {
  if (!BACKEND_ATIVO) {
    return localStorage.getItem(id);
  }

  const { data, error } = await supabase
    .from(TABELA)
    .select("texto")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.texto;
}

export async function salvarConteudo(id: string, texto: string) {
  if (!BACKEND_ATIVO) {
    localStorage.setItem(id, texto);
    return;
  }

  const { error } = await supabase
    .from(TABELA)
    .upsert({
      id,
      texto,
    });

  if (error) {
    console.error("Erro ao salvar conteúdo:", error);
  }
}

export async function salvarImagem(id: string, file: File) {
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

  const extensao = file.name.split(".").pop();
  const nomeArquivo = `${id}-${Date.now()}.${extensao}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(nomeArquivo, file, {
      upsert: true,
    });

  if (error) {
    console.error("Erro upload imagem:", error);
    return null;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(nomeArquivo);

  const url = data.publicUrl;

  await salvarConteudo(`img-${id}`, url);

  return url;
}

export async function buscarImagem(id: string) {
  return await buscarConteudo(`img-${id}`);
}