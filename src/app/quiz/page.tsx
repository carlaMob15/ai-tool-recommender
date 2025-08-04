'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions, QuizQuestion, QuizOption } from '@/data/quiz';
import GitHubContribution from '@/components/GitHubContribution';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const router = useRouter();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswerSelect = (option: QuizOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Extract role, task, and preference from answers
      const roleAnswer = newAnswers.find(a => ['ux-ui-designer', 'graphic-designer', 'frontend-dev'].includes(a.id));
      const taskAnswer = newAnswers.find(a => ['wireframing', 'prototyping', 'coding', 'visual-design', 'user-research'].includes(a.id));
      const preferenceAnswer = newAnswers.find(a => ['free', 'paid'].includes(a.id));

      // Navigate to results page with individual query parameters
      const role = roleAnswer?.id || '';
      const task = taskAnswer?.text || '';
      const preference = preferenceAnswer?.id || '';
      
      router.push(`/results?role=${encodeURIComponent(role)}&task=${encodeURIComponent(task)}&preference=${encodeURIComponent(preference)}`);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Quiz Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container">
          <div className="flex justify-between items-center py-4 sm:py-6 px-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Find Your Perfect AI Tools
            </h1>
            <button
              onClick={handleRestart}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto px-4">
            {/* Progress bar */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {currentQuestion.question}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Choose the option that best describes you
              </p>
            </div>

            {/* Answer options */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option)}
                  className="w-full p-4 sm:p-6 text-left card hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[60px] sm:min-h-[80px] flex items-center"
                >
                  <span className="text-base sm:text-lg font-medium text-gray-900">{option.text}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                ← Back
              </button>
              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Contribution Section */}
      <GitHubContribution />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container">
          <div className="text-center px-4">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">AI Tool Recommender</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto">
              Helping you find the best AI tools to boost your productivity and creativity.
            </p>
            <div className="text-xs sm:text-sm text-gray-500 mb-4">
              © 2024 AI Tool Recommender. Built with Next.js and Tailwind CSS.
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Designed by{' '}
              <a
                href="https://webcreativitystudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Web Creativity Studio
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 