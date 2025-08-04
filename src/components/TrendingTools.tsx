'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  pricing: string;
  useCase: string[];
  roles?: string[];
  clickCount: number;
}

export default function TrendingTools() {
  const [trendingTools, setTrendingTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        setLoading(true);
        
        // Fetch tools from local tools.json
        const response = await fetch('/data/tools-with-useCases.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tools data');
        }
        
        const data = await response.json();
        
        // Sort tools by clickCount (highest first) and take top 5
        const sortedTools = data.tools
          .sort((a: Tool, b: Tool) => b.clickCount - a.clickCount)
          .slice(0, 5);
        
        setTrendingTools(sortedTools);
      } catch (err) {
        console.error('Error fetching trending tools:', err);
        setError('Failed to load trending tools');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTools();
  }, []);

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trending AI Tools
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Discover what&apos;s popular in the AI world right now
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-4 sm:p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center px-4">
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trending AI Tools
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what&apos;s popular in the AI world right now. These tools are trending based on community engagement and usage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
          {trendingTools.map((tool) => (
            <div key={tool.id} className="card p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {tool.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {tool.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  <span className="text-xs text-gray-400">🔥</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">
                    {tool.clickCount}
                  </span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                {tool.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tool.pricing === 'free' 
                    ? 'bg-green-100 text-green-700'
                    : tool.pricing === 'freemium'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                </span>
                
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Visit →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Data updated regularly from community sources
          </p>
          <Link
            href="/quiz"
            className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
          >
            Get Personalized Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
} 