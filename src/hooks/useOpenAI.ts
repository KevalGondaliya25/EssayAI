import { useState, useEffect } from 'react';
import { testOpenAIConnection } from '../services/ai/openaiTest';

export function useOpenAI() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const status = await testOpenAIConnection();
        setIsConnected(status);
        setError(status ? null : 'OpenAI API connection failed. Please check your API key.');
      } catch (e: any) {
        setIsConnected(false);
        setError(e.message || 'Failed to connect to OpenAI API');
      }
    };

    checkConnection();
  }, []);

  return { isConnected, error };
}