export interface EssayAnalysis {
  suggestions: string[];
  improvedEssay: string;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    style: string;
    impact: string;
  };
}

export interface OpenAIConfig {
  apiKey: string;
  model: string;
}