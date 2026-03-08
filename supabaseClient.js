// supabaseClient.js 檔案
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 初始化連線
export const supabase = createClient(supabaseUrl, supabaseKey);
    
