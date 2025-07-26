export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'design' | 'development' | 'productivity' | 'collaboration';
  tags: string[];
  url: string;
  pricing: 'free' | 'freemium' | 'paid';
  useCase: string[];
}

export const tools: Tool[] = [
  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative interface design tool with powerful prototyping features',
    category: 'design',
    tags: ['ui-design', 'prototyping', 'collaboration'],
    url: 'https://figma.com',
    pricing: 'freemium',
    useCase: ['ui-design', 'prototyping', 'design-systems']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI-powered image generation tool for creating stunning visuals',
    category: 'design',
    tags: ['ai-art', 'image-generation', 'creative'],
    url: 'https://midjourney.com',
    pricing: 'paid',
    useCase: ['concept-art', 'illustrations', 'marketing-assets']
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Easy-to-use graphic design platform with AI-powered features',
    category: 'design',
    tags: ['graphic-design', 'templates', 'marketing'],
    url: 'https://canva.com',
    pricing: 'freemium',
    useCase: ['social-media', 'presentations', 'marketing-materials']
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: 'Adobe\'s AI-powered creative tool for generating images and text effects',
    category: 'design',
    tags: ['ai-art', 'adobe', 'creative-suite'],
    url: 'https://firefly.adobe.com',
    pricing: 'paid',
    useCase: ['image-generation', 'text-effects', 'creative-projects']
  },

  // Development Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion and generation tool',
    category: 'development',
    tags: ['code-completion', 'ai-coding', 'productivity'],
    url: 'https://github.com/features/copilot',
    pricing: 'paid',
    useCase: ['code-generation', 'debugging', 'learning']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built on VS Code with advanced AI features',
    category: 'development',
    tags: ['code-editor', 'ai-coding', 'productivity'],
    url: 'https://cursor.sh',
    pricing: 'freemium',
    useCase: ['code-generation', 'refactoring', 'debugging']
  },
  {
    id: 'replit',
    name: 'Replit',
    description: 'Online IDE with AI-powered coding assistance',
    category: 'development',
    tags: ['online-ide', 'collaboration', 'ai-coding'],
    url: 'https://replit.com',
    pricing: 'freemium',
    useCase: ['prototyping', 'learning', 'collaborative-coding']
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code completion that learns from your codebase',
    category: 'development',
    tags: ['code-completion', 'ai-coding', 'productivity'],
    url: 'https://tabnine.com',
    pricing: 'freemium',
    useCase: ['code-completion', 'productivity', 'learning']
  },

  // Productivity Tools
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered workspace for notes, docs, and project management',
    category: 'productivity',
    tags: ['note-taking', 'project-management', 'ai-writing'],
    url: 'https://notion.so',
    pricing: 'freemium',
    useCase: ['documentation', 'project-planning', 'knowledge-management']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and task assistance',
    category: 'productivity',
    tags: ['ai-chat', 'writing', 'problem-solving'],
    url: 'https://chat.openai.com',
    pricing: 'freemium',
    useCase: ['writing', 'research', 'problem-solving']
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant for writing, analysis, and coding',
    category: 'productivity',
    tags: ['ai-chat', 'writing', 'analysis'],
    url: 'https://claude.ai',
    pricing: 'freemium',
    useCase: ['writing', 'analysis', 'research']
  },
  {
    id: 'gamma',
    name: 'Gamma',
    description: 'AI-powered presentation and document creation tool',
    category: 'productivity',
    tags: ['presentations', 'ai-writing', 'design'],
    url: 'https://gamma.app',
    pricing: 'freemium',
    useCase: ['presentations', 'reports', 'documentation']
  },

  // Collaboration Tools
  {
    id: 'miro',
    name: 'Miro',
    description: 'Collaborative whiteboarding platform with AI features',
    category: 'collaboration',
    tags: ['whiteboarding', 'collaboration', 'brainstorming'],
    url: 'https://miro.com',
    pricing: 'freemium',
    useCase: ['brainstorming', 'planning', 'design-thinking']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication platform with AI-powered features',
    category: 'collaboration',
    tags: ['communication', 'team-collaboration', 'productivity'],
    url: 'https://slack.com',
    pricing: 'freemium',
    useCase: ['team-communication', 'project-coordination', 'knowledge-sharing']
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Modern project management tool for software teams',
    category: 'collaboration',
    tags: ['project-management', 'issue-tracking', 'productivity'],
    url: 'https://linear.app',
    pricing: 'freemium',
    useCase: ['project-management', 'issue-tracking', 'team-coordination']
  }
];

export const categories = {
  design: 'Design & Creative',
  development: 'Development & Coding',
  productivity: 'Productivity & Writing',
  collaboration: 'Collaboration & Communication'
}; 