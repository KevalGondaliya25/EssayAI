import OpenAI from "openai";
import { OPENAI_CONFIG } from "./config";
import { handleOpenAIError } from "./errors";
import { validateEssayInput } from "./validation";
import { createEssayPrompt } from "./prompts";
import type { EssayAnalysis } from "./types";
import { parseOpenAIResponse } from "./responseParser";

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!OPENAI_CONFIG.apiKey) {
      throw new Error("OpenAI API key is not configured");
    }
    openaiClient = new OpenAI({
      apiKey: OPENAI_CONFIG.apiKey,
      dangerouslyAllowBrowser: true,
      maxRetries: 3,
      timeout: 30000,
    });
  }
  return openaiClient;
}

export async function analyzeEssayWithGPT4(
  essay: string,
  prompt: string,
  college: string
): Promise<EssayAnalysis> {
  try {
    validateEssayInput(essay, prompt, college);

    const openai = getOpenAIClient();
    const messages = createEssayPrompt(essay, prompt, college);
    console.log(" openai --------------", openai);

    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
      functions: [
        {
          name: "provide_essay_feedback",
          parameters: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                items: { type: "string" },
                description:
                  "List of specific, actionable suggestions for improvement",
              },
              improvedEssay: {
                type: "string",
                description: "Improved version of the essay",
              },
              strengths: {
                type: "array",
                items: { type: "string" },
                description: "List of essay strengths",
              },
              weaknesses: {
                type: "array",
                items: { type: "string" },
                description: "List of areas needing improvement",
              },
              styleAnalysis: {
                type: "string",
                description: "Analysis of writing style",
              },
              impactAnalysis: {
                type: "string",
                description: "Analysis of essay's potential impact",
              },
            },
            required: [
              "suggestions",
              "improvedEssay",
              "strengths",
              "weaknesses",
              "styleAnalysis",
              "impactAnalysis",
            ],
          },
        },
      ],
      function_call: { name: "provide_essay_feedback" },
    });

    console.log("response from openaI", response);
    if (!response.choices?.[0]?.message?.function_call) {
      throw new Error("Invalid response from OpenAI API");
    }

    return parseOpenAIResponse(response);
  } catch (error) {
    throw handleOpenAIError(error);
  }
}
