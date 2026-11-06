export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  model: 'gpt-4'
} as const;

export const PROMPTS = {
  systemPrompt: (college: string) => `You are an expert college admissions essay reviewer for ${college}. 
Analyze the following essay based on the prompt provided. Consider:
1. Relevance to the prompt
2. Personal story and authenticity
3. Writing quality and style
4. Impact and memorability
5. Alignment with ${college}'s values and culture

Provide specific, actionable feedback.`,

  userPrompt: (prompt: string, essay: string) => 
    `Essay Prompt: ${prompt}\n\nEssay: ${essay}`
} as const;