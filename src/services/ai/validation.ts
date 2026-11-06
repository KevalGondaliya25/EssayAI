export function validateEssayInput(essay: string, prompt: string, college: string): void {
  if (!essay?.trim()) {
    throw new Error('Essay content is required');
  }
  if (!college?.trim()) {
    throw new Error('Target college is required');
  }
  if (!prompt?.trim()) {
    throw new Error('Essay prompt is required');
  }
}