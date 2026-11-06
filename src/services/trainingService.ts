import { getSupabaseClient } from '@/lib/supabase';
import type { TrainingEssay } from '@/lib/types';

export async function getTrainingData(): Promise<TrainingEssay[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Database not configured');
  }

  // Only fetch essays with success metrics
  const { data, error } = await supabase
    .from('essays')
    .select('*')
    .not('accepted', 'is', null)
    .not('rating', 'is', null);

  if (error) {
    throw new Error('Failed to fetch training data');
  }

  return data.map(essay => ({
    content: essay.content,
    targetCollege: essay.target_college,
    prompt: essay.prompt,
    metrics: {
      accepted: essay.accepted,
      rating: essay.rating,
      feedbackScore: essay.feedback_score
    }
  }));
}

export async function updateEssayMetrics(essayId: string, metrics: EssayMetrics) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { error } = await supabase
    .from('essays')
    .update({
      accepted: metrics.accepted,
      rating: metrics.rating,
      feedback_score: metrics.feedbackScore
    })
    .eq('id', essayId);

  if (error) {
    throw new Error('Failed to update essay metrics');
  }
}