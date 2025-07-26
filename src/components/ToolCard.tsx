import { RecommendationResult } from '@/lib/recommendations';
import { formatPricing } from '@/lib/recommendations';

interface ToolCardProps {
  result: RecommendationResult;
  rank: number;
}

export default function ToolCard({ result, rank }: ToolCardProps) {
  const { tool, score, reasons } = result;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      case 'productivity':
        return 'bg-green-100 text-green-800';
      case 'collaboration':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'freemium':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      {/* Header with rank */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              {rank}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
          </div>
          <div className="text-sm text-gray-500">
            Score: {Math.round(score)}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{tool.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPricingColor(tool.pricing)}`}>
            {formatPricing(tool.pricing)}
          </span>
        </div>
      </div>

      {/* Reasons */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Why this tool matches your needs:</h4>
        <ul className="space-y-2">
          {reasons.slice(0, 3).map((reason, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-sm text-gray-600">{reason}</span>
            </li>
          ))}
        </ul>
        
        {reasons.length > 3 && (
          <p className="text-xs text-gray-500 mt-2">
            +{reasons.length - 3} more reasons
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
        >
          Visit {tool.name}
        </a>
      </div>
    </div>
  );
} 