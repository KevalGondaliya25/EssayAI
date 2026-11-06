import React from 'react';
import { Textarea } from './ui/textarea';

interface EssayPromptProps {
  value: string;
  onChange: (value: string) => void;
}

export function EssayPrompt({ value, onChange }: EssayPromptProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Essay Prompt
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the essay prompt here..."
        required
        className="min-h-[100px]"
      />
    </div>
  );
}