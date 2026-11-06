import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { Download, Copy } from 'lucide-react';

interface FeedbackProps {
  feedback: {
    suggestions: string[];
    improvedEssay: string;
    analysis: {
      strengths: string[];
      weaknesses: string[];
      style: string;
      impact: string;
    };
  };
}

export function Feedback({ feedback }: FeedbackProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Key Suggestions</h2>
        <ul className="space-y-3">
          {feedback.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Improved Essay</h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(feedback.improvedEssay)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        <div className="prose max-w-none">
          <ReactMarkdown>{feedback.improvedEssay}</ReactMarkdown>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Strengths</h3>
            <ul className="space-y-2">
              {feedback.analysis.strengths.map((strength, index) => (
                <li key={index} className="text-green-600">• {strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Areas for Improvement</h3>
            <ul className="space-y-2">
              {feedback.analysis.weaknesses.map((weakness, index) => (
                <li key={index} className="text-amber-600">• {weakness}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-2">Writing Style Analysis</h3>
          <p className="text-gray-700">{feedback.analysis.style}</p>
        </div>
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-2">Impact Assessment</h3>
          <p className="text-gray-700">{feedback.analysis.impact}</p>
        </div>
      </section>
    </div>
  );
}