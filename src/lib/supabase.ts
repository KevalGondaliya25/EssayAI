import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Create a lazy-loaded Supabase client
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return null;
    }

    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}