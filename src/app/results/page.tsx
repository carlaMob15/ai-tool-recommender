'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QuizOption } from '@/data/quiz';
import { generateRecommendations, RecommendationResult } from '@/lib/recommendations';
import ToolCard from '@/components/ToolCard';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'design' | 'development' | 'productivity' | 'collaboration';
  tags: string[];
  url: string;
  pricing: 'free' | 'freemium' | 'paid';
  useCase: string[];
}

interface ToolsData {
  tools: Tool[];
  categories: {
    design: string;
    development: string;
    productivity: string;
    collaboration: string;
  };
}

export default function ResultsPage() {
  const [toolsData, setToolsData] = useState<ToolsData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loadToolsAndGenerateRecommendations = async () => {
      try {
        // Load tools from JSON file
        const response = await fetch('/data/tools.json');
        const data: ToolsData = await response.json();
        setToolsData(data);

        // Get answers from URL params
        const answersParam = searchParams.get('answers');
        if (answersParam) {
          const answers: QuizOption[] = JSON.parse(decodeURIComponent(answersParam));
          
          // Generate recommendations using the loaded tools
          const results = generateRecommendations(answers);
          setRecommendations(results);
        }
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToolsAndGenerateRecommendations();
  }, [searchParams]);

  const handleTakeQuizAgain = () => {
    router.push('/quiz');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  if (!toolsData || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Recommendations Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We couldn&apos;t generate recommendations based on your answers. Please try taking the quiz again.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleTakeQuizAgain}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Results Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Your AI Tool Recommendations
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={handleTakeQuizAgain}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Take Quiz Again
              </button>
              <button
                onClick={handleBackToHome}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Here are your personalized AI tool recommendations
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Based on your answers, we&apos;ve found {recommendations.length} tools that match your needs
          </p>
        </div>

        {/* Top Recommendations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((result, index) => (
              <ToolCard key={result.tool.id} result={result} rank={index + 1} />
            ))}
          </div>
        </div>

        {/* Recommendations by Category */}
        {toolsData.categories && (
          <div className="space-y-12">
            {Object.entries(toolsData.categories).map(([categoryKey, categoryName]) => {
              const categoryRecommendations = recommendations.filter(
                result => result.tool.category === categoryKey
              );
              
              if (categoryRecommendations.length === 0) return null;

              return (
                <div key={categoryKey}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryRecommendations.map((result, index) => (
                      <ToolCard 
                        key={result.tool.id} 
                        result={result} 
                        rank={recommendations.findIndex(r => r.tool.id === result.tool.id) + 1} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Not satisfied with these recommendations? Try taking the quiz again with different answers.
          </p>
          <button
            onClick={handleTakeQuizAgain}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
} 