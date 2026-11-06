import { useState, useEffect } from 'react';
import { EssayForm } from './components/EssayForm';
import { Feedback } from './components/Feedback';
import { GraduationCap } from 'lucide-react';
import { Alert } from './components/ui/Alert';
import { AuthModal } from './components/auth/AuthModal';
import { analyzeEssay } from './services/essayService';
import { useSupabase } from './hooks/useSupabase';
import { useAuth } from './hooks/useAuth';
import { useOpenAI } from './hooks/useOpenAI';
import { OpenAIServiceError } from './services/ai/errors';
import type { EssaySubmission, EssayFeedback } from './lib/types';

export default function App() {
  const { isConfigured, error: dbError } = useSupabase();
  const { isAuthenticated, isLoading: authLoading, error: authError } = useAuth();
  const { isConnected: openAIStatus, error: openAIError } = useOpenAI();
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleSubmit = async (data: EssaySubmission) => {
    try {
      setIsAnalyzing(true);
      setAnalysisError(null);
      const result = await analyzeEssay(data);
      setFeedback(result);
    } catch (error) {
      console.error('Error analyzing essay:', error);
      if (error instanceof OpenAIServiceError) {
        setAnalysisError(error.message);
      } else {
        setAnalysisError(
          error instanceof Error 
            ? error.message 
            : 'Failed to analyze essay. Please try again.'
        );
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isDisabled = !isConfigured || !isAuthenticated || openAIStatus === false;
  const showAuthError = !authLoading && !isAuthenticated;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">EssayAI Advisor</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dbError && <Alert message={dbError} variant="warning" />}
        {openAIError && <Alert message={openAIError} variant="error" />}
        {analysisError && <Alert message={analysisError} variant="error" />}

        {showAuthError ? (
          <div className="flex justify-center items-center py-12">
            <AuthModal />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <EssayForm 
                onSubmit={handleSubmit} 
                isAnalyzing={isAnalyzing} 
                disabled={isDisabled}
              />
            </div>

            {feedback && <Feedback feedback={feedback} />}
          </>
        )}
      </main>
    </div>
  );
}