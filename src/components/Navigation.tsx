'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              AI Tool Recommender
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className={`text-sm font-medium transition-colors ${
                isActive('/quiz') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quiz
            </Link>
            <Link
              href="/results"
              className={`text-sm font-medium transition-colors ${
                isActive('/results') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Results
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 