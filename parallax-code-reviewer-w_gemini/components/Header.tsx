
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-6 lg:px-8 border-b border-brand-overlay">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-iris">
          Parallax Code Reviewer <span className="font-light text-brand-subtle">w/Gemini</span>
        </h1>
        <p className="text-brand-subtle mt-2">
          See your code from a new perspective.
        </p>
      </div>
    </header>
  );
};