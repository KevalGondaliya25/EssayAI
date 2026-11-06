import { TrainingEssay } from '@/lib/types';
import { preprocessEssay } from './textCleaner';
import { extractFeatures } from './featureExtractor';

export interface ProcessedEssayData {
  processedText: string;
  features: ReturnType<typeof extractFeatures>;
  metrics: TrainingEssay['metrics'];
  college: string;
}

export async function buildTrainingDataset(essays: TrainingEssay[]): Promise<ProcessedEssayData[]> {
  return essays.map(essay => ({
    processedText: preprocessEssay(essay.content),
    features: extractFeatures(essay.content),
    metrics: essay.metrics,
    college: essay.targetCollege
  }));
}