
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewFeedback } from './components/ReviewFeedback';
import { reviewCode } from './services/geminiService';
import type { ReviewSuggestion } from './types';
import { LANGUAGES } from './constants';

function App() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const [review, setReview] = useState<ReviewSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to review.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const suggestions = await reviewCode(code, language);
      setReview(suggestions);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <ReviewFeedback
          review={review}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
