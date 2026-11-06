import OpenAI from 'openai';

export class OpenAIServiceError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'OpenAIServiceError';
  }
}

export function handleOpenAIError(error: unknown): never {
  console.error('OpenAI Error:', error);

  if (error instanceof OpenAIServiceError) {
    throw error;
  }

  if (error instanceof OpenAI.APIError) {
    switch (error.code) {
      case 'invalid_api_key':
        throw new OpenAIServiceError(
          'Invalid OpenAI API key. Please check your configuration.',
          error.code
        );
      case 'insufficient_quota':
        throw new OpenAIServiceError(
          'OpenAI API quota exceeded. Please try again later.',
          error.code
        );
      case 'rate_limit_exceeded':
        throw new OpenAIServiceError(
          'Too many requests. Please wait a moment and try again.',
          error.code
        );
      case 'context_length_exceeded':
        throw new OpenAIServiceError(
          'Essay is too long for analysis. Please shorten it and try again.',
          error.code
        );
      case 'invalid_request_error':
        throw new OpenAIServiceError(
          'Invalid request to OpenAI API. Please check your essay and try again.',
          error.code
        );
      default:
        throw new OpenAIServiceError(
          `OpenAI API error: ${error.message}`,
          error.code
        );
    }
  }

  if (error instanceof SyntaxError) {
    throw new OpenAIServiceError(
      'Failed to parse OpenAI response. Please try again.',
      'parse_error'
    );
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new OpenAIServiceError(
      'Network error. Please check your internet connection.',
      'network_error'
    );
  }

  throw new OpenAIServiceError(
    error instanceof Error ? error.message : 'An unexpected error occurred',
    'unknown_error'
  );
}