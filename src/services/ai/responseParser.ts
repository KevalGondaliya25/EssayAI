/* eslint-disable no-control-regex */
import type { ChatCompletion } from "openai/resources/chat";
import type { EssayAnalysis } from "./types";
import { OpenAIServiceError } from "./errors";

export function parseOpenAIResponse(response: ChatCompletion): EssayAnalysis {
  try {
    const functionCall = response.choices[0]?.message?.function_call;

    if (!functionCall?.arguments) {
      throw new OpenAIServiceError(
        "Invalid response format from OpenAI API",
        "invalid_response"
      );
    }

    let result;

    const sanitizedArguments = functionCall.arguments.replace(
      /[\x00-\x1F\x7F]/g,
      ""
    );

    try {
      result = JSON.parse(sanitizedArguments);
    } catch {
      throw new OpenAIServiceError(
        "Failed to parse OpenAI response JSON",
        "parse_error"
      );
    }

    // Validate all required fields exist and are of correct type
    if (!Array.isArray(result.suggestions) || !result.suggestions.length) {
      throw new OpenAIServiceError(
        "Invalid or missing suggestions in response",
        "validation_error"
      );
    }

    if (typeof result.improvedEssay !== "string" || !result.improvedEssay) {
      throw new OpenAIServiceError(
        "Invalid or missing improved essay in response",
        "validation_error"
      );
    }

    if (!Array.isArray(result.strengths) || !result.strengths.length) {
      throw new OpenAIServiceError(
        "Invalid or missing strengths in response",
        "validation_error"
      );
    }

    if (!Array.isArray(result.weaknesses) || !result.weaknesses.length) {
      throw new OpenAIServiceError(
        "Invalid or missing weaknesses in response",
        "validation_error"
      );
    }

    if (typeof result.styleAnalysis !== "string" || !result.styleAnalysis) {
      throw new OpenAIServiceError(
        "Invalid or missing style analysis in response",
        "validation_error"
      );
    }

    if (typeof result.impactAnalysis !== "string" || !result.impactAnalysis) {
      throw new OpenAIServiceError(
        "Invalid or missing impact analysis in response",
        "validation_error"
      );
    }

    return {
      suggestions: result.suggestions,
      improvedEssay: result.improvedEssay,
      analysis: {
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        style: result.styleAnalysis,
        impact: result.impactAnalysis,
      },
    };
  } catch (error) {
    if (error instanceof OpenAIServiceError) {
      throw error;
    }
    throw new OpenAIServiceError(
      "Failed to parse OpenAI response. Please try again.",
      "parse_error"
    );
  }
}
