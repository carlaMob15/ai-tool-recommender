'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ToolCard from '@/components/ToolCard';
import GitHubContribution from '@/components/GitHubContribution';

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

interface MatchedTool extends Tool {
  score: number;
  reasons: string[];
}

// Step 3: Define Matching Logic
function matchTools(tools: Tool[], role: string, task: string, preference: string): MatchedTool[] {
  return tools
    .map((tool) => {
      let score = 0;
      const reasons: string[] = [];

      // Match role
      const roleMatches = {
        'ux-ui-designer': ['design', 'ui-design', 'prototyping'],
        'graphic-designer': ['design', 'graphic-design', 'visual-design'],
        'frontend-dev': ['development', 'coding', 'frontend']
      };

      const roleTags = roleMatches[role as keyof typeof roleMatches] || [];
      const hasRoleMatch = roleTags.some(tag => 
        tool.tags.includes(tag) || tool.useCase.includes(tag) || tool.category === tag
      );

      if (hasRoleMatch) {
        score += 2;
        reasons.push(`Perfect for ${role.replace('-', ' ')}`);
      }

      // Match task (based on tags)
      const taskMatches = tool.tags.filter(tag => 
        tag.toLowerCase().includes(task.toLowerCase())
      );
      
      if (taskMatches.length > 0) {
        score += 2;
        reasons.push(`Great for ${task}`);
      }

      // Match free/paid preference
      if (preference === 'free' && tool.pricing === 'free') {
        score += 1;
        reasons.push('Free tool as requested');
      } else if (preference === 'free' && tool.pricing === 'freemium') {
        score += 0.5;
        reasons.push('Free tier available');
      } else if (preference === 'paid' && (tool.pricing === 'paid' || tool.pricing === 'freemium')) {
        score += 1;
        reasons.push('Premium features available');
      }

      return { ...tool, score, reasons };
    })
    .filter(tool => tool.score > 0) // Only include tools with some relevance
    .sort((a, b) => b.score - a.score) // highest score first
    .slice(0, 5); // return top 5 tools
}

export default function ResultsPage() {
  const [toolsData, setToolsData] = useState<ToolsData | null>(null);
  const [matchedTools, setMatchedTools] = useState<MatchedTool[]>([]);
  const [fallbackTools, setFallbackTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loadToolsAndMatch = async () => {
      try {
        // Step 2: Load tools.json
        const response = await fetch('/data/tools.json');
        const data: ToolsData = await response.json();
        setToolsData(data);

        // Step 1: Load Query Parameters
        const role = searchParams.get('role') || '';
        const task = searchParams.get('task') || '';
        const preference = searchParams.get('preference') || '';

        if (role || task || preference) {
          // Step 3: Use matching logic
          const matched = matchTools(data.tools, role, task.toLowerCase(), preference);
          setMatchedTools(matched);

          // Step 5: Add a fallback
          const fallback = data.tools.slice(0, 5);
          setFallbackTools(fallback);
        }
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToolsAndMatch();
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

  if (!toolsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Error Loading Tools
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We couldn&apos;t load the tools database. Please try again.
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

  // Step 5: Use fallback if no matches
  const results = matchedTools.length > 0 ? matchedTools : fallbackTools;
  const isUsingFallback = matchedTools.length === 0;

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
            {isUsingFallback 
              ? `We found ${results.length} popular AI tools that might be useful for you`
              : `Based on your preferences, we found ${results.length} tools that match your needs`
            }
          </p>
        </div>

        {/* Step 4: Render matched tools */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {isUsingFallback ? 'Popular AI Tools' : 'Best Matches'}
          </h3>
          {isUsingFallback && (
            <p className="text-gray-600 mb-6">
              These are some of the most popular AI tools that might be useful for your workflow.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((tool, index) => (
              <ToolCard 
                key={tool.id} 
                result={{
                  tool,
                  score: (tool as MatchedTool).score || 0,
                  reasons: (tool as MatchedTool).reasons || []
                }} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            {isUsingFallback 
              ? 'Want more specific recommendations? Try taking the quiz again with different answers.'
              : 'Not satisfied with these recommendations? Try taking the quiz again with different answers.'
            }
          </p>
          <button
            onClick={handleTakeQuizAgain}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take Quiz Again
          </button>
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