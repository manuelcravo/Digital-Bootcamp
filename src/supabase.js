import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Null until the keys are set in .env.local, so the page still renders without them.
export const supabase = url && key ? createClient(url, key) : null;
