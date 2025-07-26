export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  category: 'role' | 'workflow' | 'goals' | 'experience';
}

export interface QuizOption {
  id: string;
  text: string;
  tags: string[];
  weight: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'role',
    question: 'What best describes your primary role?',
    category: 'role',
    options: [
      {
        id: 'designer',
        text: 'Designer (UI/UX, Graphic, Product)',
        tags: ['design', 'ui-design', 'graphic-design', 'product-design'],
        weight: 3
      },
      {
        id: 'developer',
        text: 'Developer (Frontend, Backend, Full-stack)',
        tags: ['development', 'coding', 'programming'],
        weight: 3
      },
      {
        id: 'product-manager',
        text: 'Product Manager',
        tags: ['productivity', 'project-management', 'collaboration'],
        weight: 2
      },
      {
        id: 'marketer',
        text: 'Marketer or Content Creator',
        tags: ['marketing', 'content-creation', 'social-media'],
        weight: 2
      }
    ]
  },
  {
    id: 'workflow',
    question: 'What type of work do you spend most time on?',
    category: 'workflow',
    options: [
      {
        id: 'visual-design',
        text: 'Creating visual designs and mockups',
        tags: ['ui-design', 'graphic-design', 'prototyping'],
        weight: 2
      },
      {
        id: 'coding',
        text: 'Writing and debugging code',
        tags: ['code-generation', 'debugging', 'productivity'],
        weight: 2
      },
      {
        id: 'planning',
        text: 'Planning and project management',
        tags: ['project-management', 'planning', 'collaboration'],
        weight: 2
      },
      {
        id: 'content',
        text: 'Creating content and documentation',
        tags: ['writing', 'content-creation', 'documentation'],
        weight: 2
      }
    ]
  },
  {
    id: 'goals',
    question: 'What\'s your main goal with AI tools?',
    category: 'goals',
    options: [
      {
        id: 'productivity',
        text: 'Increase productivity and speed up work',
        tags: ['productivity', 'efficiency', 'automation'],
        weight: 3
      },
      {
        id: 'creativity',
        text: 'Enhance creativity and generate new ideas',
        tags: ['creative', 'ai-art', 'brainstorming'],
        weight: 3
      },
      {
        id: 'learning',
        text: 'Learn new skills and improve existing ones',
        tags: ['learning', 'skill-development', 'education'],
        weight: 2
      },
      {
        id: 'collaboration',
        text: 'Improve team collaboration and communication',
        tags: ['collaboration', 'team-work', 'communication'],
        weight: 2
      }
    ]
  },
  {
    id: 'experience',
    question: 'How experienced are you with AI tools?',
    category: 'experience',
    options: [
      {
        id: 'beginner',
        text: 'Beginner - Just getting started',
        tags: ['beginner-friendly', 'easy-to-use', 'learning'],
        weight: 1
      },
      {
        id: 'intermediate',
        text: 'Intermediate - Used a few tools before',
        tags: ['intermediate', 'feature-rich', 'advanced'],
        weight: 2
      },
      {
        id: 'advanced',
        text: 'Advanced - Experienced with multiple AI tools',
        tags: ['advanced', 'power-user', 'complex'],
        weight: 3
      }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your budget preference for tools?',
    category: 'goals',
    options: [
      {
        id: 'free',
        text: 'Free tools only',
        tags: ['free', 'budget-friendly'],
        weight: 1
      },
      {
        id: 'freemium',
        text: 'Free with paid upgrades available',
        tags: ['freemium', 'flexible-pricing'],
        weight: 2
      },
      {
        id: 'paid',
        text: 'Willing to pay for premium features',
        tags: ['paid', 'premium', 'enterprise'],
        weight: 3
      }
    ]
  }
]; 