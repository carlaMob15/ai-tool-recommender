import Link from 'next/link';
import TrendingTools from '@/components/TrendingTools';
import GitHubContribution from '@/components/GitHubContribution';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Find Your Perfect
              <span className="text-blue-600 block">AI Tools</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Take our simple quiz and get personalized AI tool recommendations 
              that match your role, workflow, and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Link
                href="/quiz"
                className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Start Quiz
              </Link>
              <Link
                href="#trending"
                className="btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                View Trending Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Perfect for Every Role
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re a designer, developer, or creative professional, 
              we&apos;ll help you discover the right AI tools for your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🎨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Designers
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                AI tools for UI/UX design, graphic design, and visual creation
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">💻</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Developers
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                AI-powered coding assistants and development tools
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Creators
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                AI tools for content creation and productivity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <div id="trending">
        <TrendingTools />
      </div>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Discover Your Perfect AI Tools?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Our simple 3-question quiz takes less than 2 minutes and gives you 
              personalized recommendations based on your specific needs.
            </p>
            <Link
              href="/quiz"
              className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Take the Quiz Now
            </Link>
          </div>
        </div>
      </section>

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
    </main>
  );
}
