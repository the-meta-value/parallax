
import React from 'react';
import { LANGUAGES } from '../constants';
import { SparklesIcon } from './icons';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  return (
    <div className="flex flex-col gap-4 bg-brand-surface p-6 rounded-xl shadow-lg border border-brand-overlay">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
            <label htmlFor="language-select" className="block text-sm font-medium text-brand-subtle mb-1">Language</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-brand-overlay border border-brand-muted text-brand-text rounded-md shadow-sm p-2 focus:ring-brand-iris focus:border-brand-iris"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="code-textarea" className="block text-sm font-medium text-brand-subtle mb-1">Code to Review</label>
        <textarea
          id="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-96 font-mono text-sm bg-brand-overlay border border-brand-muted rounded-md p-4 focus:ring-brand-iris focus:border-brand-iris transition-colors duration-200"
          spellCheck="false"
        />
      </div>

      <button
        onClick={onReview}
        disabled={isLoading}
        className="flex items-center justify-center w-full bg-brand-iris hover:bg-opacity-80 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 disabled:bg-brand-muted disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Analyzing Code...' : 'Review Code'}
      </button>
    </div>
  );
};
