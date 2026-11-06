import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export function useSupabase() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConfig = async () => {
      const client = getSupabaseClient();
      
      if (!client) {
        setError('Please connect to Supabase using the button in the top right.');
        return;
      }

      try {
        const { error } = await client.from('essays').select('id').limit(1);
        if (error) throw error;
        setIsConfigured(true);
        setError(null);
      } catch (e) {
        setError('Unable to connect to the database. Please check your Supabase configuration.');
        setIsConfigured(false);
      }
    };
    
    checkConfig();
  }, []);

  return { isConfigured, error };
}