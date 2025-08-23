
import React from 'react';
import type { ReviewSuggestion } from '../types';
import { FeedbackCard } from './FeedbackCard';
import { LoaderIcon } from './icons';

interface ReviewFeedbackProps {
  review: ReviewSuggestion[] | null;
  isLoading: boolean;
  error: string | null;
}

export const ReviewFeedback: React.FC<ReviewFeedbackProps> = ({ review, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
          <LoaderIcon className="w-12 h-12 animate-spin text-brand-iris" />
          <p className="mt-4 text-lg font-semibold text-brand-subtle">Analyzing your code...</p>
          <p className="text-sm text-brand-muted">The AI is thinking hard to give you the best feedback.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-brand-love/10 border border-brand-love rounded-lg">
          <h3 className="text-xl font-bold text-brand-love">An Error Occurred</h3>
          <p className="mt-2 text-brand-rose">{error}</p>
        </div>
      );
    }
    
    if (review === null) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-brand-overlay rounded-lg h-full">
                <h3 className="text-xl font-bold text-brand-subtle">Awaiting Review</h3>
                <p className="mt-2 text-brand-muted">Enter your code and click "Review Code" to get AI-powered feedback.</p>
            </div>
        );
    }

    if (review.length === 0) {
      return (
        <div className="text-center p-8 bg-brand-pine/10 border border-brand-pine rounded-lg">
          <h3 className="text-xl font-bold text-brand-foam">Great Job!</h3>
          <p className="mt-2 text-brand-foam/80">The AI couldn't find any issues to suggest. Your code looks clean!</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-text mb-4">Review Suggestions</h2>
        {review.map((suggestion, index) => (
          <FeedbackCard key={index} suggestion={suggestion} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full bg-brand-surface p-6 rounded-xl shadow-lg border border-brand-overlay">
      {renderContent()}
    </div>
  );
};
