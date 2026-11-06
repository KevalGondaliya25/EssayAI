import React from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, Send, Loader2 } from 'lucide-react';

interface EssayEditorProps {
  value: string;
  onChange: (value: string) => void;
  wordLimit: number;
  isAnalyzing: boolean;
}

export function EssayEditor({ value, onChange, wordLimit, isAnalyzing }: EssayEditorProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Essay
        </label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your essay here..."
          required
          className="min-h-[300px]"
          disabled={isAnalyzing}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Word count: {wordCount} / {wordLimit}
          {wordCount > wordLimit && (
            <span className="text-red-500 ml-2">
              ({wordCount - wordLimit} words over limit)
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={!value || wordCount > wordLimit || isAnalyzing}
          className="flex items-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Analyze & Improve</span>
              <Send className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}