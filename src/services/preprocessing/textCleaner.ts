import { removeStopWords } from './stopWords';

export function cleanText(text: string): string {
  return text
    .toLowerCase()
    // Remove special characters but keep periods and basic punctuation
    .replace(/[^\w\s.,!?]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  return text.split(/\s+/);
}

export function preprocessEssay(essay: string): string {
  const cleaned = cleanText(essay);
  const tokens = tokenize(cleaned);
  const withoutStopWords = removeStopWords(tokens);
  return withoutStopWords.join(' ');
}