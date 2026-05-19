/* import { supabase } from '../supabaseClient'; 

export interface FormularioData {
    id?: number;
    titulo: string;
    local: string;
    data: string;     
    hora: string;      
    link: string;
}

export const formularioService = {

    async listarFormularios() {
        const { data, error } = await supabase
            .from('formularios')
            .select('*')
            .order('data', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    async criarFormulario(formulario: Omit<FormularioData, 'id'>) {
        const { data, error } = await supabase
            .from('formularios')
            .insert([formulario])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async atualizarFormulario(id: number, formulario: Partial<FormularioData>) {
        const { data, error } = await supabase
            .from('formularios')
            .update(formulario)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deletarFormulario(id: number) {
        const { error } = await supabase
            .from('formularios')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
}; */