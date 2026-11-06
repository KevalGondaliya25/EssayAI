import React from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabase() {
  const [isConfigured, setIsConfigured] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkConfig = async () => {
      try {
        const { data, error } = await supabase.from('essays').select('id').limit(1);
        if (error) throw error;
        setIsConfigured(true);
      } catch (e) {
        setError('Please connect to Supabase using the button in the top right.');
      }
    };
    checkConfig();
  }, []);

  return { isConfigured, error };
}