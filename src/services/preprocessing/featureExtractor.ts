interface EssayFeatures {
  wordCount: number;
  avgSentenceLength: number;
  uniqueWords: number;
  complexWords: number; // Words with 3+ syllables
}

export function extractFeatures(essay: string): EssayFeatures {
  const sentences = essay.split(/[.!?]+/).filter(Boolean);
  const words = essay.split(/\s+/);
  const uniqueWordsSet = new Set(words.map(w => w.toLowerCase()));
  
  return {
    wordCount: words.length,
    avgSentenceLength: words.length / sentences.length,
    uniqueWords: uniqueWordsSet.size,
    complexWords: countComplexWords(words)
  };
}

function countComplexWords(words: string[]): number {
  return words.filter(word => {
    const syllables = countSyllables(word);
    return syllables >= 3;
  }).length;
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  return word
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    .match(/[aeiouy]{1,2}/g)?.length ?? 1;
}