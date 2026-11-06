// Existing types...

export interface EssayMetrics {
  accepted?: boolean;
  rating?: number;
  feedbackScore?: number;
}

export interface TrainingEssay {
  content: string;
  targetCollege: string;
  prompt: string;
  metrics: EssayMetrics;
}