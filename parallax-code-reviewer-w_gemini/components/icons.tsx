
import React from 'react';

// A generic props interface for SVG icons
interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C10.866 6.33 13.134 6.33 14.685 7.584l.323.268.323-.268c1.551-1.254 3.819-1.254 5.37 0l.323.268.323-.268c1.551-1.254 3.819-1.254 5.37 0L18 12l2.175 2.175-5.37 5.37-2.175-2.175L12 14.828l-2.175 2.175-5.37-5.37L6.63 12 4.5 9.825l5.37-5.37.323.268.323-.268zM12 2.25a.75.75 0 01.75.75v.518a25.965 25.965 0 011.637.336.75.75 0 01-.336 1.465 24.465 24.465 0 00-1.301-.271v.228a.75.75 0 01-1.5 0V5.25a24.465 24.465 0 00-1.301.27.75.75 0 01-.336-1.464 25.965 25.965 0 011.637-.336V3a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);


export const LoaderIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3a9 9 0 100 18 9 9 0 000-18z"
            opacity="0.2"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-6.219-8.56"
        />
    </svg>
);
