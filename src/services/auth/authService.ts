import { getSupabaseClient } from '@/lib/supabase';

export async function getCurrentUser() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error('Authentication error: ' + error.message);
  }
  if (!user) {
    throw new Error('You must be logged in to submit essays');
  }

  return user;
}