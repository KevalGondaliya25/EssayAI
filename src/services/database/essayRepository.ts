import { getSupabaseClient } from '@/lib/supabase';
import type { EssaySubmission, EssayFeedback } from '@/lib/types';

export async function saveEssayWithFeedback(
  userId: string,
  submission: EssaySubmission,
  feedback: EssayFeedback
) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Database not configured');
  }

  // Store the essay
  const { data: essayData, error: essayError } = await supabase
    .from('essays')
    .insert({
      content: submission.essay,
      target_college: submission.college,
      prompt: submission.prompt,
      user_id: userId
    })
    .select()
    .single();

  if (essayError) {
    throw new Error('Failed to save essay: ' + essayError.message);
  }

  // Store the feedback
  const { error: feedbackError } = await supabase
    .from('essay_feedback')
    .insert({
      essay_id: essayData.id,
      suggestions: feedback.suggestions,
      improved_content: feedback.improvedEssay,
      strengths: feedback.analysis.strengths,
      weaknesses: feedback.analysis.weaknesses,
      style_analysis: feedback.analysis.style,
      impact_analysis: feedback.analysis.impact
    });

  if (feedbackError) {
    throw new Error('Failed to save feedback: ' + feedbackError.message);
  }

  return essayData;
}