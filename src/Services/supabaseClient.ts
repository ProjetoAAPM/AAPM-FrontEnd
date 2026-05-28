import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ustgtzntghomnpsztjft.supabase.co";
const supabaseKey = "sb_publishable_1xaapgJol2PER955vtXx5Q_alnt2H2_";

export const supabase = createClient(supabaseUrl, supabaseKey);


/*
caso de erro: desinstala node_modules e package-lock 
e instale apenas o npm install novamente*/