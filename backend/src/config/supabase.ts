import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import WebSocket from "ws";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

// Create a Supabase admin client with the service role key.
// IMPORTANT: This client bypasses RLS and has full database access.
// It should only be used on the backend.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    fetch: fetch,
    headers: { 'x-my-custom-header': 'skillskools' },
  },
  realtime: {
    transport: WebSocket
  }
});
