import { PROMPTS } from './config';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

export function createEssayPrompt(
  essay: string,
  prompt: string,
  college: string
): ChatCompletionMessageParam[] {
  return [
    { 
      role: "system", 
      content: PROMPTS.systemPrompt(college)
    },
    { 
      role: "user", 
      content: PROMPTS.userPrompt(prompt, essay)
    }
  ];
}