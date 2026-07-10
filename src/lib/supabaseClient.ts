import { createClient } from "@supabase/supabase-js";

// Values normally come from .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
// We fall back to the known project values so the site never crashes if an env
// var is missing on a given deploy. The anon/publishable key is safe to ship in
// the browser — Row Level Security limits it to reading active quizzes and
// inserting submissions.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://mmsyicktcybmvxjkejpw.supabase.co";
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "sb_publishable_QC2q3hnzye2nKbygP5-Odg_ShBz4nid";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
