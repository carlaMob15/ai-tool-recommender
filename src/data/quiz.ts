export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  category: 'role' | 'task' | 'preference';
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
    question: 'What is your primary role?',
    category: 'role',
    options: [
      {
        id: 'ux-ui-designer',
        text: 'UX/UI Designer',
        tags: ['design', 'ui-design', 'ux-design', 'user-experience'],
        weight: 3
      },
      {
        id: 'graphic-designer',
        text: 'Graphic Designer',
        tags: ['design', 'graphic-design', 'visual-design', 'creative'],
        weight: 3
      },
      {
        id: 'frontend-dev',
        text: 'Frontend Developer',
        tags: ['development', 'frontend', 'coding', 'web-development'],
        weight: 3
      }
    ]
  },
  {
    id: 'task',
    question: 'What type of task do you need help with?',
    category: 'task',
    options: [
      {
        id: 'wireframing',
        text: 'Wireframing',
        tags: ['wireframing', 'prototyping', 'ui-design', 'planning'],
        weight: 2
      },
      {
        id: 'prototyping',
        text: 'Prototyping',
        tags: ['prototyping', 'interactive-design', 'ui-design', 'user-testing'],
        weight: 2
      },
      {
        id: 'coding',
        text: 'Coding',
        tags: ['coding', 'development', 'programming', 'implementation'],
        weight: 2
      },
      {
        id: 'visual-design',
        text: 'Visual Design',
        tags: ['visual-design', 'graphic-design', 'illustration', 'creative'],
        weight: 2
      },
      {
        id: 'user-research',
        text: 'User Research',
        tags: ['user-research', 'analytics', 'user-testing', 'insights'],
        weight: 2
      }
    ]
  },
  {
    id: 'preference',
    question: 'What is your preference for tool pricing?',
    category: 'preference',
    options: [
      {
        id: 'free',
        text: 'Free tools only',
        tags: ['free', 'budget-friendly', 'no-cost'],
        weight: 1
      },
      {
        id: 'paid',
        text: 'Paid tools (willing to invest)',
        tags: ['paid', 'premium', 'professional', 'enterprise'],
        weight: 3
      }
    ]
  }
]; 