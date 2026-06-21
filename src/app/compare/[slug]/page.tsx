/**
 * aiwizardtool.com 对比页程序化模板
 * 路由: /compare/[slug]/page.tsx
 * 框架: Next.js 14 App Router
 *
 * 核心策略（哥飞理论）:
 * - 程序化 SEO: 一名词一页面，C(15,2)=105 个对比页
 * - 每页 ≥ 600 词
 * - generateStaticParams 预渲染所有组合
 * - generateMetadata 动态生成 SEO meta
 * - Schema markup: FAQPage + SoftwareApplication + BreadcrumbList
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

// ============================================================
// 15 个 AI 编程工具 slug 列表
// ============================================================
const TOOLS = [
  "cursor",
  "bolt-new",
  "lovable",
  "v0",
  "claude-code",
  "windsurf",
  "replit-agent",
  "github-copilot",
  "devin",
  "aider",
  "continue",
  "tabnine",
  "codeium",
  "amazon-q-developer",
  "sourcegraph-cody",
] as const;

// ============================================================
// 工具元数据（mock 数据，生产环境从 Prisma/Supabase 获取）
// ============================================================
type ToolMeta = {
  slug: string;
  name: string;
  tagline: string;
  pricing: string;
  freeTier: string;
  languages: string;
  integrations: string;
  contextWindow: string;
  selfHost: string;
  openSource: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  website: string;
  rating: number;
};

const TOOL_DB: Record<string, ToolMeta> = {
  cursor: {
    slug: "cursor",
    name: "Cursor",
    tagline: "The AI-first code editor built on VS Code",
    pricing: "$20/mo (Pro)",
    freeTier: "Free tier: 2,000 completions + 50 slow premium requests",
    languages: "All (VS Code language support)",
    integrations: "VS Code extensions, GitHub, GitLab",
    contextWindow: "200K tokens (Claude 3.5 Sonnet)",
    selfHost: "No",
    openSource: "No (closed source)",
    bestFor: "Professional developers wanting AI-native editing",
    pros: ["Deep codebase indexing", "Composer multi-file edits", "Best-in-class tab completion", "Familiar VS Code UX"],
    cons: ["Closed source", "Pro plan limited fast requests", "No self-hosting"],
    website: "https://cursor.com",
    rating: 4.7,
  },
  "bolt-new": {
    slug: "bolt-new",
    name: "Bolt.new",
    tagline: "Prompt-to-app in the browser by StackBlitz",
    pricing: "$20/mo (Pro)",
    freeTier: "Free tier: limited daily tokens",
    languages: "JavaScript / TypeScript / React / Vue / Svelte",
    integrations: "StackBlitz WebContainers, GitHub export",
    contextWindow: "1M tokens (Claude 3.5 Sonnet)",
    selfHost: "No (cloud only)",
    openSource: "No",
    bestFor: "Non-developers and frontend devs shipping full-stack apps fast",
    pros: ["Zero local setup", "Full-stack in-browser", "Instant preview & deploy", "Great for prototypes"],
    cons: ["Web-only, no desktop IDE", "Limited backend language support", "Can burn tokens quickly"],
    website: "https://bolt.new",
    rating: 4.5,
  },
  lovable: {
    slug: "lovable",
    name: "Lovable",
    tagline: "Build apps by chatting, deploy with one click",
    pricing: "$20/mo (Pro)",
    freeTier: "Free tier: 5 credits/day",
    languages: "JavaScript / TypeScript / React",
    integrations: "Supabase, GitHub, Vercel",
    contextWindow: "200K tokens",
    selfHost: "No",
    openSource: "No",
    bestFor: "Founders and PMs building MVPs without coding",
    pros: ["Conversational app building", "Supabase backend integration", "One-click deploy", "Great UI generation"],
    cons: ["Limited to React/TS stack", "Less control over code", "Token-based pricing"],
    website: "https://lovable.dev",
    rating: 4.4,
  },
  v0: {
    slug: "v0",
    name: "v0 by Vercel",
    tagline: "Generate UI components from text by Vercel",
    pricing: "$20/mo (Premium)",
    freeTier: "Free tier: 10 credits",
    languages: "TypeScript / React / Next.js / Tailwind",
    integrations: "Vercel, GitHub, shadcn/ui",
    contextWindow: "128K tokens",
    selfHost: "No",
    openSource: "No",
    bestFor: "Frontend devs generating shadcn/ui components fast",
    pros: ["Best-in-class UI generation", "shadcn/ui native", "Vercel deploy integration", "Clean component code"],
    cons: ["UI/components only, not full apps", "Limited backend support", "Credit-based"],
    website: "https://v0.dev",
    rating: 4.5,
  },
  "claude-code": {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Anthropic's terminal-based agentic coder",
    pricing: "Included with Claude Pro/Max ($20/$100)",
    freeTier: "Requires Claude subscription",
    languages: "All (terminal-based)",
    integrations: "Any IDE via CLI, GitHub",
    contextWindow: "200K tokens",
    selfHost: "No",
    openSource: "No",
    bestFor: "Developers wanting an agentic CLI coding assistant",
    pros: ["Agentic multi-step tasks", "Works in any terminal", "Strong reasoning", "Anthropic-backed"],
    cons: ["CLI only, no GUI", "Requires Claude subscription", "Can be verbose"],
    website: "https://anthropic.com/claude-code",
    rating: 4.6,
  },
  windsurf: {
    slug: "windsurf",
    name: "Windsurf",
    tagline: "Agentic IDE by Codeium with Cascade",
    pricing: "$15/mo (Pro)",
    freeTier: "Free tier: generous unlimited completions",
    languages: "All (VS Code based)",
    integrations: "VS Code extensions, GitHub",
    contextWindow: "1M tokens",
    selfHost: "No",
    openSource: "No",
    bestFor: "Devs wanting an agentic IDE alternative to Cursor",
    pros: ["Cascade agentic flow", "Generous free tier", "1M token context", "Codeium models"],
    cons: ["Newer, smaller community", "Less mature than Cursor", "Closed source"],
    website: "https://windsurf.com",
    rating: 4.4,
  },
  "replit-agent": {
    slug: "replit-agent",
    name: "Replit Agent",
    tagline: "Build and deploy apps from prompts on Replit",
    pricing: "$25/mo (Core)",
    freeTier: "Limited free tier",
    languages: "Python / JavaScript / Go / Rust / many",
    integrations: "Replit hosting, GitHub, databases",
    contextWindow: "128K tokens",
    selfHost: "No",
    openSource: "No",
    bestFor: "Learners and indie devs building in the cloud",
    pros: ["Full cloud dev environment", "Multi-language", "One-click deploy", "Built-in hosting"],
    cons: ["Tied to Replit platform", "Less powerful than desktop IDEs", "Credit-based agent"],
    website: "https://replit.com",
    rating: 4.3,
  },
  "github-copilot": {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "The original AI pair programmer by GitHub/OpenAI",
    pricing: "$10/mo (Individual)",
    freeTier: "Free tier: limited suggestions for students/maintainers",
    languages: "All (IDE support)",
    integrations: "VS Code, JetBrains, Neovim, GitHub",
    contextWindow: "8K-128K tokens (model dependent)",
    selfHost: "Enterprise only",
    openSource: "No",
    bestFor: "Teams wanting a mature, well-integrated AI assistant",
    pros: ["Mature & widely adopted", "Enterprise features", "Multi-IDE support", "GitHub-native"],
    cons: ["Less agentic than Cursor/Windsurf", "Weaker multi-file edits", "Context window smaller"],
    website: "https://github.com/features/copilot",
    rating: 4.4,
  },
  devin: {
    slug: "devin",
    name: "Devin",
    tagline: "Autonomous AI software engineer by Cognition",
    pricing: "$500/mo (Teams)",
    freeTier: "No free tier",
    languages: "All (full dev environment)",
    integrations: "GitHub, Slack, Jira, shell, browser",
    contextWindow: "Large (proprietary)",
    selfHost: "No",
    openSource: "No",
    bestFor: "Teams delegating end-to-end tasks to an AI engineer",
    pros: ["Fully autonomous", "Plans & executes multi-step tasks", "Slack/Jira integration", "Enterprise-grade"],
    cons: ["Very expensive", "Not a daily IDE", "Task-based, not pair-programming"],
    website: "https://devin.ai",
    rating: 4.2,
  },
  aider: {
    slug: "aider",
    name: "Aider",
    tagline: "Open-source AI pair programming in the terminal",
    pricing: "Free (bring your own API key)",
    freeTier: "Free & open source",
    languages: "All (terminal-based)",
    integrations: "Git (auto-commits), any LLM API",
    contextWindow: "Model-dependent",
    selfHost: "Yes (local)",
    openSource: "Yes (Apache 2.0)",
    bestFor: "Open-source fans wanting a free, hackable AI coder",
    pros: ["Free & open source", "Auto Git commits", "Works with any LLM", "Local & private"],
    cons: ["CLI only", "Requires API key setup", "Less polished UX"],
    website: "https://aider.chat",
    rating: 4.5,
  },
  continue: {
    slug: "continue",
    name: "Continue",
    tagline: "Open-source AI code assistant for VS Code & JetBrains",
    pricing: "Free (open source) + paid Hub",
    freeTier: "Free & open source",
    languages: "All (VS Code / JetBrains)",
    integrations: "VS Code, JetBrains, any LLM, Ollama",
    contextWindow: "Model-dependent",
    selfHost: "Yes (local models via Ollama)",
    openSource: "Yes (Apache 2.0)",
    bestFor: "Devs wanting a free, customizable, local AI assistant",
    pros: ["Free & open source", "Local model support (Ollama)", "Highly customizable", "VS Code + JetBrains"],
    cons: ["Requires setup", "Less polished than Cursor", "Smaller team"],
    website: "https://continue.dev",
    rating: 4.3,
  },
  tabnine: {
    slug: "tabnine",
    name: "Tabnine",
    tagline: "Privacy-focused AI code completion",
    pricing: "$12/mo (Pro)",
    freeTier: "Free tier: basic completion",
    languages: "All (IDE support)",
    integrations: "VS Code, JetBrains, Vim, Visual Studio",
    contextWindow: "Model-dependent",
    selfHost: "Yes (enterprise)",
    openSource: "No",
    bestFor: "Enterprises needing privacy & on-prem AI",
    pros: ["Privacy-first", "On-prem option", "Mature completion", "Enterprise-grade"],
    cons: ["Less agentic", "Weaker chat/reasoning", "Behind on new features"],
    website: "https://tabnine.com",
    rating: 4.0,
  },
  codeium: {
    slug: "codeium",
    name: "Codeium",
    tagline: "Free AI code completion + chat (now Windsurf)",
    pricing: "Free (individual) / $19/mo (Pro)",
    freeTier: "Free unlimited completions for individuals",
    languages: "All (IDE support)",
    integrations: "VS Code, JetBrains, Vim, Visual Studio",
    contextWindow: "Model-dependent",
    selfHost: "Enterprise only",
    openSource: "No",
    bestFor: "Individual devs wanting a free Copilot alternative",
    pros: ["Generous free tier", "Fast completions", "Multi-IDE", "Enterprise option"],
    cons: ["Less agentic than Cursor", "Now pivoting to Windsurf IDE", "Weaker reasoning"],
    website: "https://codeium.com",
    rating: 4.2,
  },
  "amazon-q-developer": {
    slug: "amazon-q-developer",
    name: "Amazon Q Developer",
    tagline: "AWS's AI coding assistant (formerly CodeWhisperer)",
    pricing: "$19/mo (Pro)",
    freeTier: "Free tier: limited",
    languages: "All (IDE support)",
    integrations: "VS Code, JetBrains, AWS, Visual Studio",
    contextWindow: "Model-dependent",
    selfHost: "No (AWS-hosted)",
    openSource: "No",
    bestFor: "AWS-heavy teams wanting deep cloud integration",
    pros: ["AWS-native", "Security scanning", "Free tier available", "Enterprise features"],
    cons: ["AWS-centric", "Less agentic", "Weaker community"],
    website: "https://aws.amazon.com/q/developer/",
    rating: 4.1,
  },
  "sourcegraph-cody": {
    slug: "sourcegraph-cody",
    name: "Sourcegraph Cody",
    tagline: "AI assistant with deep codebase understanding",
    pricing: "$9/mo (Pro)",
    freeTier: "Free tier: limited",
    languages: "All (IDE support)",
    integrations: "VS Code, JetBrains, Sourcegraph",
    contextWindow: "Large (code graph)",
    selfHost: "Yes (enterprise)",
    openSource: "Yes (Apache 2.0 core)",
    bestFor: "Large codebases needing code-graph-aware AI",
    pros: ["Deep codebase search", "Code graph context", "Self-host option", "Multi-IDE"],
    cons: ["Setup heavy", "Less polished chat", "Best with Sourcegraph"],
    website: "https://sourcegraph.com/cody",
    rating: 4.2,
  },
};

// ============================================================
// 工具函数: slug 解析
// ============================================================
function parseCompareSlug(slug: string): { toolA: string; toolB: string } | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  if (!TOOLS.includes(a as (typeof TOOLS)[number])) return null;
  if (!TOOLS.includes(b as (typeof TOOLS)[number])) return null;
  if (a === b) return null;
  return { toolA: a, toolB: b };
}

// ============================================================
// 生成所有 C(15,2) = 105 个对比组合
// ============================================================
function generateAllPairs(): string[] {
  const pairs: string[] = [];
  for (let i = 0; i < TOOLS.length; i++) {
    for (let j = i + 1; j < TOOLS.length; j++) {
      pairs.push(`${TOOLS[i]}-vs-${TOOLS[j]}`);
    }
  }
  return pairs;
}

// ============================================================
// generateStaticParams: 预渲染所有 105 个对比页
// ============================================================
export async function generateStaticParams() {
  return generateAllPairs().map((slug) => ({ slug }));
}

// ============================================================
// generateMetadata: 为每个对比页生成 SEO meta
// ============================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) return {};

  const a = TOOL_DB[parsed.toolA];
  const b = TOOL_DB[parsed.toolB];
  if (!a || !b) return {};

  const title = `${a.name} vs ${b.name}: Which AI Coding Tool is Better? (2025)`;
  const description = `Detailed ${a.name} vs ${b.name} comparison: pricing, features, language support, integrations, pros & cons. Find out which AI coding tool fits your workflow in 2025.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://aiwizardtool.com/compare/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://aiwizardtool.com/compare/${params.slug}`,
      siteName: "AI Wizard Tool",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      `${a.name} vs ${b.name}`,
      `${a.name} alternative`,
      `${b.name} alternative`,
      `compare ${a.name} and ${b.name}`,
      `${a.name} ${b.name} comparison`,
      "ai coding tools",
      "vibe coding tools",
    ],
  };
}

// ============================================================
// JSON-LD Schema 生成器
// ============================================================
function buildFaqSchema(a: ToolMeta, b: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which is better, ${a.name} or ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `It depends on your use case. ${a.name} is best for ${a.bestFor.toLowerCase()}, while ${b.name} excels for ${b.bestFor.toLowerCase()}. See our detailed comparison above for a recommendation based on your scenario.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${a.name} free to use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${a.name} pricing: ${a.pricing}. ${a.freeTier}.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${b.name} free to use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${b.name} pricing: ${b.pricing}. ${b.freeTier}.`,
        },
      },
      {
        "@type": "Question",
        name: `Can ${a.name} replace ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In many workflows yes, but they target different users. ${a.name} is optimized for ${a.bestFor.toLowerCase()}, whereas ${b.name} is optimized for ${b.bestFor.toLowerCase()}. Evaluate your primary need before switching.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${a.name} or ${b.name} support self-hosting?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${a.name} self-hosting: ${a.selfHost}. ${b.name} self-hosting: ${b.selfHost}.`,
        },
      },
    ],
  };
}

function buildSoftwareAppSchema(tool: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web, macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: tool.pricing.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: "128",
    },
    description: tool.tagline,
    url: tool.website,
  };
}

function buildBreadcrumbSchema(a: ToolMeta, b: ToolMeta, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aiwizardtool.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://aiwizardtool.com/compare" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
        item: `https://aiwizardtool.com/compare/${slug}`,
      },
    ],
  };
}

// ============================================================
// 相关对比推荐（内链）
// ============================================================
function getRelatedCompares(toolA: string, toolB: string, count = 6): string[] {
  const related: string[] = [];
  for (const t of TOOLS) {
    if (t === toolA || t === toolB) continue;
    related.push(`${toolA}-vs-${t}`);
    if (related.length >= count) break;
    related.push(`${toolB}-vs-${t}`);
    if (related.length >= count) break;
  }
  return related.slice(0, count);
}

// ============================================================
// 子组件
// ============================================================
function CompareRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr>
      <td className="border border-gray-300 p-3 font-medium bg-gray-50">{label}</td>
      <td className="border border-gray-300 p-3">{a}</td>
      <td className="border border-gray-300 p-3">{b}</td>
    </tr>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="border border-gray-200 rounded p-4">
      <summary className="font-medium cursor-pointer">{q}</summary>
      <p className="mt-2 text-gray-700">{children}</p>
    </details>
  );
}

// ============================================================
// 对比页主组件
// ============================================================
export default async function ComparePage({
  params,
}: {
  params: { slug: string };
}) {
  const parsed = parseCompareSlug(params.slug);
  if (!parsed) notFound();

  const a = TOOL_DB[parsed.toolA];
  const b = TOOL_DB[parsed.toolB];
  if (!a || !b) notFound();

  const faqSchema = buildFaqSchema(a, b);
  const appSchemaA = buildSoftwareAppSchema(a);
  const appSchemaB = buildSoftwareAppSchema(b);
  const breadcrumbSchema = buildBreadcrumbSchema(a, b, params.slug);
  const related = getRelatedCompares(parsed.toolA, parsed.toolB);

  const webOnlySlugs = ["bolt-new", "lovable", "v0", "replit-agent"];
  const agenticSlugs = ["cursor", "windsurf", "claude-code", "devin", "aider"];

  return (
    <article className="compare-page mx-auto max-w-4xl px-4 py-10">
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchemaA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchemaB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <a href="/">Home</a> &rsaquo; <a href="/compare">Compare</a> &rsaquo;{" "}
        <span className="text-gray-700">{a.name} vs {b.name}</span>
      </nav>

      {/* 1. H1 标题 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3">
          {a.name} vs {b.name}: Which AI Coding Tool is Better?
        </h1>
        <p className="text-gray-500">Updated 2025 &middot; In-depth comparison by AI Wizard Tool editors</p>
      </header>

      {/* 2. 快速总结（~100 词） */}
      <section className="quick-summary bg-gray-50 border-l-4 border-blue-500 p-5 mb-8 rounded">
        <h2 className="text-xl font-semibold mb-2">Quick Summary</h2>
        <p>
          {a.name} and {b.name} are two of the most popular AI coding tools in 2025, but they serve different needs. {a.name} is {a.tagline.toLowerCase()}, best suited for {a.bestFor.toLowerCase()}. {b.name}, on the other hand, is {b.tagline.toLowerCase()} and shines for {b.bestFor.toLowerCase()}. In this {a.name} vs {b.name} comparison we break down pricing, features, language support, integrations, pros, cons, and real-world use cases so you can pick the right tool for your vibe coding workflow. Read on for the full breakdown.
        </p>
      </section>

      {/* 3. 对比表（10+ 行） */}
      <section className="comparison-table mb-8">
        <h2 className="text-2xl font-semibold mb-4">{a.name} vs {b.name}: Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Feature</th>
                <th className="border border-gray-300 p-3 text-left">{a.name}</th>
                <th className="border border-gray-300 p-3 text-left">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Tagline" a={a.tagline} b={b.tagline} />
              <CompareRow label="Pricing" a={a.pricing} b={b.pricing} />
              <CompareRow label="Free Tier" a={a.freeTier} b={b.freeTier} />
              <CompareRow label="Language Support" a={a.languages} b={b.languages} />
              <CompareRow label="Integrations" a={a.integrations} b={b.integrations} />
              <CompareRow label="Context Window" a={a.contextWindow} b={b.contextWindow} />
              <CompareRow label="Self-Hosting" a={a.selfHost} b={b.selfHost} />
              <CompareRow label="Open Source" a={a.openSource} b={b.openSource} />
              <CompareRow label="Best For" a={a.bestFor} b={b.bestFor} />
              <CompareRow label="Editor Rating" a={`${a.rating}/5`} b={`${b.rating}/5`} />
              <CompareRow label="Desktop IDE" a={webOnlySlugs.includes(a.slug) ? "No (web)" : "Yes"} b={webOnlySlugs.includes(b.slug) ? "No (web)" : "Yes"} />
              <CompareRow label="Agentic Tasks" a={agenticSlugs.includes(a.slug) ? "Yes" : "Limited"} b={agenticSlugs.includes(b.slug) ? "Yes" : "Limited"} />
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 价格详细对比 */}
      <section className="pricing mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pricing Comparison: {a.name} vs {b.name}</h2>
        <p>
          Price is often the deciding factor. {a.name} costs <strong>{a.pricing}</strong>, with {a.freeTier.toLowerCase()}. {b.name} costs <strong>{b.pricing}</strong>, with {b.freeTier.toLowerCase()}. For individual developers on a budget, both offer paid plans starting around $10-$25/mo, with free tiers that let you evaluate the tool before committing. For teams, compare seat-based pricing and enterprise tiers directly on their websites, as volume discounts often apply. Remember to factor in API token costs if the tool uses a bring-your-own-key model, since heavy usage can push real monthly costs well above the sticker price. Always run a one-month trial on real work before buying annual seats.
        </p>
      </section>

      {/* 5. 适用场景对比 */}
      <section className="use-cases mb-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-5 rounded">
          <h3 className="font-semibold text-lg mb-2">{a.name} is best for you if...</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are {a.bestFor.toLowerCase()}.</li>
            <li>{a.pros[0]} matters to you.</li>
            <li>{a.pros[1]} is a key workflow requirement.</li>
            <li>You are comfortable with {a.pricing} pricing.</li>
          </ul>
        </div>
        <div className="bg-green-50 p-5 rounded">
          <h3 className="font-semibold text-lg mb-2">{b.name} is best for you if...</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are {b.bestFor.toLowerCase()}.</li>
            <li>{b.pros[0]} matters to you.</li>
            <li>{b.pros[1]} is a key workflow requirement.</li>
            <li>You are comfortable with {b.pricing} pricing.</li>
          </ul>
        </div>
      </section>

      {/* 6. 优缺点对比 */}
      <section className="pros-cons mb-8 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">{a.name} Pros &amp; Cons</h3>
          <div className="text-green-700 font-medium mb-1">Pros</div>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            {a.pros.map((p) => (<li key={p}>{p}</li>))}
          </ul>
          <div className="text-red-700 font-medium mb-1">Cons</div>
          <ul className="list-disc pl-5 space-y-1">
            {a.cons.map((c) => (<li key={c}>{c}</li>))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{b.name} Pros &amp; Cons</h3>
          <div className="text-green-700 font-medium mb-1">Pros</div>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            {b.pros.map((p) => (<li key={p}>{p}</li>))}
          </ul>
          <div className="text-red-700 font-medium mb-1">Cons</div>
          <ul className="list-disc pl-5 space-y-1">
            {b.cons.map((c) => (<li key={c}>{c}</li>))}
          </ul>
        </div>
      </section>

      {/* 7. 最终推荐 */}
      <section className="verdict mb-8 bg-yellow-50 border border-yellow-200 p-5 rounded">
        <h2 className="text-2xl font-semibold mb-3">Final Verdict</h2>
        <p className="mb-3">
          Both {a.name} and {b.name} are excellent AI coding tools, but the right choice depends on your primary workflow. If you prioritize {a.pros[0].toLowerCase()} and {a.pros[1].toLowerCase()}, go with <strong>{a.name}</strong>. If you value {b.pros[0].toLowerCase()} and {b.pros[1].toLowerCase()}, choose <strong>{b.name}</strong>. For professional daily coding, {a.rating >= b.rating ? a.name : b.name} edges ahead with a higher editor rating. For budget-conscious developers, check which offers a more generous free tier based on your usage volume.
        </p>
        <p>
          <strong>Our pick:</strong> {a.rating >= b.rating ? a.name : b.name} for {a.rating >= b.rating ? a.bestFor.toLowerCase() : b.bestFor.toLowerCase()}.
        </p>
      </section>

      {/* 8. FAQ（PAA 优化） */}
      <section className="faq mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem q={`Which is better, ${a.name} or ${b.name}?`}>
            It depends on your use case. {a.name} is best for {a.bestFor.toLowerCase()}, while {b.name} excels for {b.bestFor.toLowerCase()}. See the verdict above.
          </FaqItem>
          <FaqItem q={`Is ${a.name} free to use?`}>
            {a.name} pricing: {a.pricing}. {a.freeTier}.
          </FaqItem>
          <FaqItem q={`Is ${b.name} free to use?`}>
            {b.name} pricing: {b.pricing}. {b.freeTier}.
          </FaqItem>
          <FaqItem q={`Can ${a.name} replace ${b.name}?`}>
            In many workflows yes, but they target different users. {a.name} is optimized for {a.bestFor.toLowerCase()}, whereas {b.name} is optimized for {b.bestFor.toLowerCase()}.
          </FaqItem>
          <FaqItem q={`Does ${a.name} or ${b.name} support self-hosting?`}>
            {a.name} self-hosting: {a.selfHost}. {b.name} self-hosting: {b.selfHost}.
          </FaqItem>
        </div>
      </section>

      {/* 9. 相关对比推荐（内链） */}
      <section className="related mb-8">
        <h2 className="text-2xl font-semibold mb-4">Related Comparisons</h2>
        <ul className="grid grid-cols-2 gap-2">
          {related.map((slug) => {
            const [x, , y] = slug.split("-vs-");
            const xa = TOOL_DB[x]?.name ?? x;
            const ya = TOOL_DB[y]?.name ?? y;
            return (
              <li key={slug}>
                <a href={`/compare/${slug}`} className="text-blue-600 hover:underline">{xa} vs {ya}</a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 联盟 CTA */}
      <section className="cta bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to try {a.name} or {b.name}?</h2>
        <p className="mb-4">
          Start building with the AI coding tool that fits your workflow. Click below to get started (affiliate link — we may earn a commission at no extra cost to you).
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`${a.website}?ref=aiwizardtool`} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100" rel="sponsored nofollow noopener" target="_blank">
            Try {a.name} &rarr;
          </a>
          <a href={`${b.website}?ref=aiwizardtool`} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100" rel="sponsored nofollow noopener" target="_blank">
            Try {b.name} &rarr;
          </a>
        </div>
      </section>
    </article>
  );
}
