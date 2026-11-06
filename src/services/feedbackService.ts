import { analyzeEssayWithGPT4 } from './ai/openai';
import type { EssayFeedback } from '@/lib/types';
import { OpenAIServiceError } from './ai/errors';

export async function generateEssayFeedback(
  essay: string,
  college: string,
  prompt: string
): Promise<EssayFeedback> {
  try {
    return await analyzeEssayWithGPT4(essay, prompt, college);
  } catch (error) {
    if (error instanceof OpenAIServiceError) {
      throw error;
    }
    console.error('Error analyzing essay with GPT-4:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to analyze essay. Please try again later.'
    );
  }
}