import type { EssaySubmission, EssayFeedback } from '@/lib/types';
import { generateEssayFeedback } from './feedbackService';
import { getCurrentUser } from './auth/authService';
import { saveEssayWithFeedback } from './database/essayRepository';
import { OpenAIServiceError } from './ai/errors';

export async function analyzeEssay(submission: EssaySubmission): Promise<EssayFeedback> {
  try {
    // Get current user
    const user = await getCurrentUser();

    // Generate feedback
    const feedback = await generateEssayFeedback(
      submission.essay,
      submission.college,
      submission.prompt
    );

    // Save essay and feedback
    await saveEssayWithFeedback(user.id, submission, feedback);

    return feedback;
  } catch (error) {
    if (error instanceof OpenAIServiceError) {
      throw error;
    }
    console.error('Error analyzing essay:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to analyze essay. Please try again.'
    );
  }
}