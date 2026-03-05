import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exquisitor-auth-proxy.exquisitor01.workers.dev";
const supabaseAnonKey = "sb_publishable_FfueJRM8CVNcxYOwKp-OWA_Jer6Wl4I";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. " +
      "The app will render normally but Supabase features (auth, database, storage) will be unavailable.",
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = !!supabase;
