/**
 * aiwizardtool.com - Database Seed Script
 * Imports 5 categories + 15 AI coding tools into Supabase
 * Run: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: 'AI Editors', slug: 'ai-editors', description: 'AI-powered code editors and IDEs', icon: '⌨️', sortOrder: 1 },
  { name: 'App Generators', slug: 'app-generators', description: 'Generate full-stack apps with AI', icon: '🚀', sortOrder: 2 },
  { name: 'Code Assistants', slug: 'code-assistants', description: 'AI coding assistants and copilots', icon: '🤖', sortOrder: 3 },
  { name: 'AI Agents', slug: 'ai-agents', description: 'Autonomous AI software engineers', icon: '🧠', sortOrder: 4 },
  { name: 'UI Generators', slug: 'ui-generators', description: 'Generate UI components with AI', icon: '🎨', sortOrder: 5 },
];

const tools = [
  {
    name: 'Cursor',
    slug: 'cursor',
    shortDesc: 'The AI-first code editor for vibe coding',
    description: 'Cursor is an AI code editor. It helps developers write code faster. You can chat with AI inside the editor. The AI can read your code and answer questions. It works like a chat but inside your editor. Many developers use it for vibe coding projects. It works with most programming languages. You can try it for free. It has tab completion, inline editing, and a chat panel. You can ask it to explain code, fix bugs, or write new features. It is built on top of VS Code so it feels familiar.',
    websiteUrl: 'https://cursor.com',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: true,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'mcp', 'ai-editor', 'vs-code']),
    features: JSON.stringify(['Tab autocomplete', 'AI chat panel', 'Inline editing', 'MCP support', 'Multi-file editing', 'Codebase context']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'ai-editors',
  },
  {
    name: 'Bolt.new',
    slug: 'bolt-new',
    shortDesc: 'Build full-stack apps with AI in your browser',
    description: 'Bolt.new is a web-based AI app generator. You type what you want to build. The AI writes the code and runs it in the browser. You do not need to set up anything. It is good for making small web apps fast. It uses StackBlitz technology. You can deploy your app with one click. It supports React, Vue, and other frameworks. Many people use it for vibe coding. You can start for free with some limits.',
    websiteUrl: 'https://bolt.new',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: true,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'app-generator', 'no-setup', 'browser-based']),
    features: JSON.stringify(['Browser-based IDE', 'One-click deploy', 'Full-stack generation', 'Live preview', 'Framework support']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'app-generators',
  },
  {
    name: 'Lovable',
    slug: 'lovable',
    shortDesc: 'AI that builds production-ready web apps',
    description: 'Lovable is an AI tool that builds web apps. You describe what you want. The AI writes the full app for you. It uses React and Supabase. You can connect your own database. It is good for non-developers who want to build apps. The app is ready to deploy. You can edit the code if you want. It has a free plan with limited credits. Paid plans give more credits and features.',
    websiteUrl: 'https://lovable.dev',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: true,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'app-generator', 'react', 'supabase']),
    features: JSON.stringify(['Full-stack generation', 'Supabase integration', 'GitHub sync', 'Custom domains', 'Team collaboration']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'app-generators',
  },
  {
    name: 'v0',
    slug: 'v0',
    shortDesc: 'Generate UI components with AI by Vercel',
    description: 'v0 is a UI generator made by Vercel. You describe the UI you want. The AI makes React components for you. It uses Tailwind CSS and shadcn/ui. You can copy the code and use it in your project. It is good for making UI fast. You do not have to write CSS. The free plan gives you some credits each month. It is useful for vibe coding projects that need good-looking UI.',
    websiteUrl: 'https://v0.dev',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: true,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'ui-generator', 'react', 'tailwind', 'shadcn']),
    features: JSON.stringify(['React component generation', 'Tailwind CSS output', 'shadcn/ui components', 'Copy-paste code', 'Iterative editing']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'ui-generators',
  },
  {
    name: 'Claude Code',
    slug: 'claude-code',
    shortDesc: 'Anthropic\'s agentic AI coding tool in your terminal',
    description: 'Claude Code is an AI coding tool made by Anthropic. It runs in your terminal. It can read your files, write code, and run commands. It is good for complex coding tasks. You talk to it like a person. It can work on many files at the same time. It supports MCP protocol. You need a Claude API key to use it. It charges based on how many tokens you use. Many developers say it is very smart.',
    websiteUrl: 'https://docs.anthropic.com/en/docs/claude-code',
    pricingType: 'PAID',
    isOpenSource: false,
    isFeatured: true,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'mcp', 'terminal', 'agentic', 'anthropic']),
    features: JSON.stringify(['Terminal-based', 'MCP support', 'Multi-file editing', 'Shell command execution', 'Agentic workflows']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'ai-agents',
  },
  {
    name: 'Windsurf',
    slug: 'windsurf',
    shortDesc: 'The AI IDE with Cascade agentic AI flow',
    description: 'Windsurf is an AI editor made by Codeium. It has a special feature called Cascade. Cascade can plan and do coding tasks step by step. It reads your code and understands the project. It has tab autocomplete and AI chat. It supports MCP protocol. It is free to start. Paid plans give more AI usage. Many developers use it as an alternative to Cursor. It works on Windows, Mac, and Linux.',
    websiteUrl: 'https://windsurf.com',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'mcp', 'ai-editor', 'cascade']),
    features: JSON.stringify(['Cascade agentic AI', 'Tab autocomplete', 'MCP support', 'Cross-platform', 'Codebase awareness']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'ai-editors',
  },
  {
    name: 'Replit Agent',
    slug: 'replit-agent',
    shortDesc: 'AI agent that builds and deploys apps on Replit',
    description: 'Replit Agent is an AI that builds apps inside Replit. You describe what you want. The agent writes the code, installs packages, and runs the app. You can deploy it with one click. It is good for beginners. You do not need to set up your computer. Everything runs in the cloud. It supports many programming languages. The free plan has limits. Replit Core gives more features.',
    websiteUrl: 'https://replit.com/agent',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'app-generator', 'cloud-ide', 'beginner-friendly']),
    features: JSON.stringify(['Cloud-based IDE', 'Auto deployment', 'Package management', 'Multi-language support', 'Live collaboration']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'app-generators',
  },
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    shortDesc: 'AI pair programmer by GitHub and OpenAI',
    description: 'GitHub Copilot is an AI coding assistant made by GitHub and OpenAI. It gives you code suggestions as you type. You press Tab to accept the suggestion. It works in VS Code, JetBrains, and other editors. It can write functions, tests, and documentation. It is not a vibe coding tool. It is more for traditional coding with AI help. There is a free plan with limits. The Pro plan costs $10 per month.',
    websiteUrl: 'https://github.com/features/copilot',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['code-assistant', 'autocomplete', 'github', 'openai']),
    features: JSON.stringify(['Inline code suggestions', 'Multi-editor support', 'Test generation', 'Documentation help', 'Chat interface']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Devin',
    slug: 'devin',
    shortDesc: 'The world\'s first AI software engineer',
    description: 'Devin is an AI made by Cognition. It is called the first AI software engineer. You give it a task and it works on it by itself. It can browse the web, write code, run tests, and fix bugs. It works like a real developer on your team. It costs $500 per month for a team plan. It is mostly used by companies. It is good for long and complex coding tasks. You give it instructions and check the result later.',
    websiteUrl: 'https://cognition.ai/devin',
    pricingType: 'PAID',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'ai-agent', 'autonomous', 'enterprise']),
    features: JSON.stringify(['Autonomous coding', 'Web browsing', 'Test execution', 'Bug fixing', 'Long-horizon tasks']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'ai-agents',
  },
  {
    name: 'Aider',
    slug: 'aider',
    shortDesc: 'Open-source AI pair programming in your terminal',
    description: 'Aider is a free and open-source AI coding tool. It runs in your terminal. You connect it to your own AI model like Claude or GPT-4. It can edit multiple files at once. It uses git to track changes. It is good for developers who want control. You can use any AI model you like. It does not cost money for the tool itself, only for the AI API. Many developers prefer it because it is open.',
    websiteUrl: 'https://aider.chat',
    githubUrl: 'https://github.com/paul-gauthier/aider',
    pricingType: 'FREE',
    isOpenSource: true,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'open-source', 'terminal', 'bring-your-own-api']),
    features: JSON.stringify(['Multi-file editing', 'Git integration', 'BYO API key', 'Multi-model support', 'Map of entire codebase']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Continue',
    slug: 'continue',
    shortDesc: 'Open-source AI code assistant for VS Code and JetBrains',
    description: 'Continue is a free and open-source AI coding extension. It works in VS Code and JetBrains. You connect your own AI model. It supports MCP protocol. It has tab autocomplete and AI chat. You can use it with many different AI providers. It is good for developers who want privacy and control. The extension is free. You pay for the AI API you use. It has a large community of users.',
    websiteUrl: 'https://continue.dev',
    githubUrl: 'https://github.com/continuedev/continue',
    pricingType: 'FREE',
    isOpenSource: true,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['vibe-coding', 'open-source', 'mcp', 'vs-code', 'jetbrains']),
    features: JSON.stringify(['MCP support', 'Tab autocomplete', 'Multi-provider', 'VS Code extension', 'JetBrains plugin']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Tabnine',
    slug: 'tabnine',
    shortDesc: 'AI code completion that keeps your code private',
    description: 'Tabnine is an AI code completion tool. It gives you suggestions as you type. It is known for privacy. Your code does not go to a public AI. You can run it locally on your computer. It works in many editors like VS Code, JetBrains, and more. It supports many programming languages. There is a free plan. The Pro plan gives better AI suggestions. It is good for companies that care about code privacy.',
    websiteUrl: 'https://tabnine.com',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['code-assistant', 'autocomplete', 'privacy', 'local-ai']),
    features: JSON.stringify(['Privacy-first AI', 'Local model option', 'Multi-editor', 'Multi-language', 'Team features']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Codeium',
    slug: 'codeium',
    shortDesc: 'Free AI code acceleration for individuals',
    description: 'Codeium is a free AI coding tool. It gives code suggestions as you type. It is free for individual developers. It works in many editors and IDEs. It supports over 70 programming languages. It has autocomplete and AI chat. For companies, there is a paid enterprise version. The free version has most features. Many developers use it because it costs nothing. It is made by the same team as Windsurf.',
    websiteUrl: 'https://codeium.com',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['code-assistant', 'autocomplete', 'free', 'multi-language']),
    features: JSON.stringify(['Free for individuals', '70+ languages', 'Multi-editor', 'Autocomplete', 'AI chat']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Amazon Q Developer',
    slug: 'amazon-q-developer',
    shortDesc: 'AWS AI assistant for software development',
    description: 'Amazon Q Developer is an AI coding assistant made by Amazon. It works in VS Code and JetBrains. It is connected to AWS services. If you use AWS, it can help you write AWS code better. It knows about AWS documentation and services. There is a free version with limits. The Pro version costs $19 per user per month. It is best for developers who work with AWS. It can help with code review and security issues.',
    websiteUrl: 'https://aws.amazon.com/q/developer/',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['code-assistant', 'aws', 'cloud', 'security']),
    features: JSON.stringify(['AWS integration', 'Security scanning', 'Code review', 'Multi-editor', 'Free tier available']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
  {
    name: 'Sourcegraph Cody',
    slug: 'sourcegraph-cody',
    shortDesc: 'AI coding assistant with deep codebase understanding',
    description: 'Sourcegraph Cody is an AI coding assistant. It is made by Sourcegraph. It can understand large codebases. It connects to your code repository. It can answer questions about your code. It has autocomplete and chat. It works in VS Code and JetBrains. There is a free plan. The Pro plan costs $9 per month. Enterprise plans are available for big companies. It is good when you have a large project with many files.',
    websiteUrl: 'https://sourcegraph.com/cody',
    pricingType: 'FREEMIUM',
    isOpenSource: false,
    isFeatured: false,
    isActive: true,
    status: 'approved',
    tags: JSON.stringify(['code-assistant', 'codebase-search', 'enterprise', 'vs-code']),
    features: JSON.stringify(['Codebase context', 'Large repo support', 'Multi-editor', 'Enterprise features', 'Multiple AI models']),
    source: 'manual',
    publishedAt: new Date(),
    categorySlug: 'code-assistants',
  },
];

async function main() {
  console.log('🚀 Starting seed...');

  // 1. Insert categories
  console.log('\n📁 Creating categories...');
  const categoryMap = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
    console.log(`  ✓ ${cat.name} (id: ${created.id})`);
  }

  // 2. Insert tools
  console.log('\n🔧 Creating tools...');
  for (const tool of tools) {
    const { categorySlug, ...toolData } = tool;
    const categoryId = categoryMap[categorySlug];

    const created = await prisma.tool.upsert({
      where: { slug: toolData.slug },
      update: { ...toolData, categoryId },
      create: { ...toolData, categoryId },
    });
    console.log(`  ✓ ${created.name} (id: ${created.id})`);
  }

  console.log('\n✅ Seed completed!');
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Tools: ${tools.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
