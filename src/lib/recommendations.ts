import { tools, Tool } from '@/data/tools';
import { QuizOption } from '@/data/quiz';

export interface RecommendationResult {
  tool: Tool;
  score: number;
  reasons: string[];
}

export function generateRecommendations(selectedOptions: QuizOption[]): RecommendationResult[] {
  const toolScores = new Map<string, { tool: Tool; score: number; reasons: string[] }>();

  // Initialize all tools with 0 score
  tools.forEach(tool => {
    toolScores.set(tool.id, {
      tool,
      score: 0,
      reasons: []
    });
  });

  // Calculate scores based on selected options
  selectedOptions.forEach(option => {
    tools.forEach(tool => {
      const toolScore = toolScores.get(tool.id)!;
      let matchScore = 0;
      const reasons: string[] = [];

      // Check tag matches
      option.tags.forEach(tag => {
        if (tool.tags.includes(tag)) {
          matchScore += option.weight * 2;
          reasons.push(`Matches your ${tag} needs`);
        }
        if (tool.useCase.includes(tag)) {
          matchScore += option.weight * 1.5;
          reasons.push(`Great for ${tag}`);
        }
      });

      // Check category matches
      if (option.tags.some(tag => tag === tool.category)) {
        matchScore += option.weight * 1.5;
        reasons.push(`Perfect for ${tool.category} work`);
      }

      // Check pricing preferences
      if (option.id === 'free' && tool.pricing === 'free') {
        matchScore += 2;
        reasons.push('Free tool as requested');
      } else if (option.id === 'freemium' && (tool.pricing === 'freemium' || tool.pricing === 'free')) {
        matchScore += 1.5;
        reasons.push('Flexible pricing options');
      } else if (option.id === 'paid' && tool.pricing === 'paid') {
        matchScore += 1;
        reasons.push('Premium features available');
      }

      // Update tool score
      toolScore.score += matchScore;
      toolScore.reasons.push(...reasons);
    });
  });

  // Convert to array and sort by score
  const recommendations = Array.from(toolScores.values())
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  // Remove duplicate reasons
  recommendations.forEach(result => {
    result.reasons = [...new Set(result.reasons)];
  });

  return recommendations;
}

export function getTopRecommendations(recommendations: RecommendationResult[], count: number = 6): RecommendationResult[] {
  return recommendations.slice(0, count);
}

export function getRecommendationsByCategory(recommendations: RecommendationResult[], category: string): RecommendationResult[] {
  return recommendations.filter(result => result.tool.category === category);
}

export function formatPricing(pricing: string): string {
  switch (pricing) {
    case 'free':
      return 'Free';
    case 'freemium':
      return 'Free + Paid';
    case 'paid':
      return 'Paid';
    default:
      return pricing;
  }
} 