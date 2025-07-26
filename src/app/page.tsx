import Quiz from '@/components/Quiz';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Discover the Perfect AI Tools
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Take our quick quiz and get personalized recommendations for AI tools that match your role, 
          workflow, and goals. Perfect for designers, developers, and creative professionals.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">🎨</div>
            <div className="text-sm font-medium text-gray-900">Designers</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">💻</div>
            <div className="text-sm font-medium text-gray-900">Developers</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-900">Product Managers</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium text-gray-900">Content Creators</div>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-white rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to discover your perfect AI tools?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Take our quick 5-question quiz and get personalized recommendations based on your role, workflow, and goals.
          </p>
          <a
            href="/quiz"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Start the Quiz
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">AI Tool Recommender</h3>
            <p className="text-gray-400 mb-6">
              Helping you find the best AI tools to boost your productivity and creativity.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 AI Tool Recommender. Built with Next.js, TypeScript, and Tailwind CSS.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
