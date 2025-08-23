
import React from 'react';
import type { ReviewSuggestion } from '../types';

interface FeedbackCardProps {
  suggestion: ReviewSuggestion;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-brand-overlay border border-brand-muted/50 rounded-lg p-5 transition-all duration-300 hover:border-brand-iris hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-brand-foam flex-grow">{suggestion.title}</h3>
        <span className="flex-shrink-0 bg-brand-iris/20 text-brand-iris text-xs font-mono font-bold py-1 px-3 rounded-full">
          Line: {suggestion.lineNumber}
        </span>
      </div>
      <p className="mt-3 text-brand-text leading-relaxed">
        {suggestion.suggestion}
      </p>
    </div>
  );
};
