'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions, QuizQuestion, QuizOption } from '@/data/quiz';

export default function Quiz() {
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
      const role = newAnswers.find(answer => 
        ['ux-ui-designer', 'graphic-designer', 'frontend-dev'].includes(answer.id)
      )?.id || '';
      
      const task = newAnswers.find(answer => 
        ['wireframing', 'prototyping', 'visual-design', 'coding', 'user-research', 'brainstorming', 'project-management'].includes(answer.id)
      )?.id || '';
      
      const preference = newAnswers.find(answer => 
        ['free', 'paid'].includes(answer.id)
      )?.id || '';

      // Redirect to results page with query parameters
      const queryParams = new URLSearchParams({
        role,
        task,
        preference
      });
      
      router.push(`/results?${queryParams.toString()}`);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer options */}
      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span className="text-lg font-medium text-gray-900">{option.text}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <div className="text-sm text-gray-500">
          {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
      </div>
    </div>
  );
} 