// supabaseClient.js 檔案
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbziiuprrymhismfryey.supabase.co'
const supabaseKey = 'sb_publishable_3c9mT_xUU5b8xdSZZCAjeg_h5Wx0dGe'

// 初始化連線
export const supabase = createClient(supabaseUrl, supabaseKey)
    
