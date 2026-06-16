import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
}

// Create a Supabase client with the anon key.
// IMPORTANT: This client enforces RLS and is safe for frontend usage.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
