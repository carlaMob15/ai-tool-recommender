'use client';

import { useState, useEffect } from 'react';

export default function GitHubContribution() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const fullText = '✨ Help this project grow – Contribute on GitHub';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 80); // Slightly faster typing

      return () => clearTimeout(timeout);
    } else {
      // Add a delay before restarting the animation
      const restartTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayText('');
        setIsTyping(true);
      }, 3000); // Wait 3 seconds before restarting

      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-8 sm:py-12 border-t border-gray-200">
      <div className="container">
        <div className="text-center px-4">
          <a
            href="https://github.com/carlaMob15/ai-tool-recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <div className="text-lg sm:text-xl font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {displayText}
              {isTyping && currentIndex < fullText.length && (
                <span className="animate-pulse text-blue-600">|</span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
              Click to view the repository
            </div>
          </a>
        </div>
      </div>
    </div>
  );
} 