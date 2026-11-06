import OpenAI from 'openai';
import { OPENAI_CONFIG } from './config';
import { handleOpenAIError } from './errors';

export async function testOpenAIConnection(): Promise<boolean> {
  try {
    if (!OPENAI_CONFIG.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: OPENAI_CONFIG.apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [{ role: "user", content: "Test connection" }],
      max_tokens: 5
    });

    return response.choices.length > 0;
  } catch (error) {
    handleOpenAIError(error);
  }
}