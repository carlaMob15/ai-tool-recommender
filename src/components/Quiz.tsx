'use client';

import { useState } from 'react';
import { quizQuestions, QuizQuestion, QuizOption } from '@/data/quiz';
import { generateRecommendations, RecommendationResult } from '@/lib/recommendations';
import ToolCard from './ToolCard';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswerSelect = (option: QuizOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Generate recommendations
      const results = generateRecommendations(newAnswers);
      setRecommendations(results);
      setShowResults(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendations([]);
    setShowResults(false);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your AI Tool Recommendations
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Based on your answers, here are the best AI tools for your needs:
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 6).map((result, index) => (
            <ToolCard key={result.tool.id} result={result} rank={index + 1} />
          ))}
        </div>

        {recommendations.length > 6 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Showing top 6 recommendations. {recommendations.length - 6} more tools available.
            </p>
          </div>
        )}
      </div>
    );
  }

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