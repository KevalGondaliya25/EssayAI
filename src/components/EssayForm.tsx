import React from 'react';
import { colleges } from '@/data/colleges';
import { EssayPrompt } from './EssayPrompt';
import { EssayEditor } from './EssayEditor';
import type { EssaySubmission } from '@/lib/types';

interface EssayFormProps {
  onSubmit: (data: EssaySubmission) => Promise<void>;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export function EssayForm({ onSubmit, isAnalyzing, disabled }: EssayFormProps) {
  const [formData, setFormData] = React.useState<EssaySubmission>({
    essay: '',
    college: '',
    prompt: '',
    wordLimit: 650, // Common App default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.essay || !formData.college || !formData.prompt) return;
    await onSubmit(formData);
  };

  const handleWordLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update if the value is a valid number
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        wordLimit: value === '' ? 650 : Math.min(Math.max(parseInt(value, 10), 1), 10000)
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target College
          </label>
          <select
            value={formData.college}
            onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:bg-gray-100"
            required
            disabled={disabled}
          >
            <option value="">Select a college...</option>
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Word Limit
          </label>
          <input
            type="number"
            value={formData.wordLimit}
            onChange={handleWordLimitChange}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:bg-gray-100"
            min={1}
            max={10000}
            required
            disabled={disabled}
          />
        </div>
      </div>

      <EssayPrompt
        value={formData.prompt}
        onChange={(prompt) => setFormData(prev => ({ ...prev, prompt }))}
        disabled={disabled}
      />

      <EssayEditor
        value={formData.essay}
        onChange={(essay) => setFormData(prev => ({ ...prev, essay }))}
        wordLimit={formData.wordLimit}
        isAnalyzing={isAnalyzing}
      />
    </form>
  );
}