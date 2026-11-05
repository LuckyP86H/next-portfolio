import type { Skill } from '../types/skills';

/**
 * Skills shown in the radar panel. Levels are self-assessed (0–100) and calibrated
 * against evidence: years of production use at work, plus what the projects in
 * projects.ts actually exercise (language mix, services built, tests written).
 *   ~80+  daily production use for years
 *   ~60   comfortable and productive; reaches for it unprompted
 *   ~40   shipped real projects with it; still looks things up
 *   ~20   learning, small projects only
 * Keep at least three skills per category so a filtered radar is still a polygon;
 * the unfiltered view shows the six highest levels.
 */
export const skills: Skill[] = [
  // Languages
  {
    name: 'Java',
    level: 80,
    category: 'Languages',
    description: 'Primary backend language: modern Java (17+), streams, records, concurrency, and collections.',
  },
  {
    name: 'Python',
    level: 65,
    category: 'Languages',
    description: 'Services, task queues, and tooling: Celery pipelines, FastAPI, and an MCP server.',
  },
  {
    name: 'TypeScript',
    level: 55,
    category: 'Languages',
    description: 'Strict TypeScript across full-stack apps on Cloudflare Workers, with unit and e2e tests.',
  },
  {
    name: 'Go',
    level: 25,
    category: 'Languages',
    description: 'A ConnectRPC backend with auth interceptors and tests; still learning the idioms.',
  },

  // Backend
  {
    name: 'Spring Boot',
    level: 80,
    category: 'Backend',
    description: 'Production REST services, configuration, and testing with Spring Boot.',
  },
  {
    name: 'REST APIs',
    level: 70,
    category: 'Backend',
    description: 'Designing and running microservice APIs for enterprise customers.',
  },
  {
    name: 'Celery',
    level: 50,
    category: 'Backend',
    description: 'Task queues and canvas workflows (chords, retries, idempotent tasks) and how they fail under worker loss.',
  },
  {
    name: 'FastAPI / Alembic',
    level: 45,
    category: 'Backend',
    description: 'Python API services with FastAPI and Alembic-managed schema migrations.',
  },
  {
    name: 'Protobuf / ConnectRPC',
    level: 45,
    category: 'Backend',
    description: 'Schema-first service contracts, with Go and TypeScript generated from one .proto.',
  },

  // Frontend
  {
    name: 'React',
    level: 45,
    category: 'Frontend',
    description: 'React 19 apps with hooks and reducers: games, a Celery monitor UI, and a bookstore.',
  },
  {
    name: 'SvelteKit / Astro',
    level: 30,
    category: 'Frontend',
    description: 'Svelte 5 and Astro apps on Workers, with server routes, streaming (SSE), and no-JS fallbacks.',
  },
  {
    name: 'Tailwind CSS',
    level: 30,
    category: 'Frontend',
    description: 'Utility-first styling for fast, consistent UI work.',
  },
  {
    name: 'Next.js',
    level: 20,
    category: 'Frontend',
    description: 'Static and server-rendered React apps, like this portfolio.',
  },

  // Data
  {
    name: 'SQL',
    level: 60,
    category: 'Data',
    description: 'Complex queries, indexing, and reading query plans.',
  },
  {
    name: 'MongoDB',
    level: 50,
    category: 'Data',
    description: 'Document modelling and the aggregation framework.',
  },
  {
    name: 'Redis',
    level: 45,
    category: 'Data',
    description: 'Caching, Celery result backends, and sorted-set leaderboards.',
  },

  // AI & Agents
  {
    name: 'LLM Agents & Tool Use',
    level: 55,
    category: 'AI & Agents',
    description: 'Tool-calling loops with validated calls, step budgets, SSE streaming, and labelled non-AI fallbacks.',
  },
  {
    name: 'RAG / pgvector',
    level: 45,
    category: 'AI & Agents',
    description: 'Embeddings, pgvector similarity search, and swappable LLM providers through LiteLLM.',
  },
  {
    name: 'MCP',
    level: 40,
    category: 'AI & Agents',
    description: 'Building Model Context Protocol servers that give agents safe, scoped access to local data.',
  },

  // Infrastructure & Tooling
  {
    name: 'Gradle / Bazel',
    level: 65,
    category: 'Infrastructure & Tooling',
    description: 'Build automation and fast, incremental, cached builds at scale.',
  },
  {
    name: 'Docker / Kubernetes',
    level: 50,
    category: 'Infrastructure & Tooling',
    description: 'Containerized services and their deployment and operation.',
  },
  {
    name: 'GitHub Actions',
    level: 60,
    category: 'Infrastructure & Tooling',
    description: 'CI for lint, types, unit and e2e tests, plus Dependabot, across every project.',
  },
  {
    name: 'Cloudflare',
    level: 45,
    category: 'Infrastructure & Tooling',
    description: 'Workers, D1, and Durable Objects for small full-stack apps.',
  },
  {
    name: 'AWS',
    level: 40,
    category: 'Infrastructure & Tooling',
    description: 'EC2, S3, Lambda, and other core services.',
  },
  {
    name: 'RabbitMQ',
    level: 40,
    category: 'Infrastructure & Tooling',
    description: 'Acks, prefetch, requeue and dead-lettering for asynchronous, event-driven workflows.',
  },
  {
    name: 'IoC',
    level: 40,
    category: 'Infrastructure & Tooling',
    description: 'Inversion of control and dependency-injection patterns for testable services.',
  },
];

/**
 * Canonical category list (stable insertion order) used to build the filter UI.
 * Deriving it here keeps the category -> skills mapping in one place.
 */
export const skillCategories: string[] = skills.reduce<string[]>((acc, skill) => {
  if (!acc.includes(skill.category)) acc.push(skill.category);
  return acc;
}, []);

/** Neon category colors tuned for high contrast on the pure-black theme. */
export const categoryColors: Record<string, string> = {
  Languages: '#00f2ff',
  Backend: '#ff2fb9',
  Frontend: '#39ff14',
  Data: '#ffb000',
  'AI & Agents': '#4d9fff',
  'Infrastructure & Tooling': '#a970ff',
};

export const colorForCategory = (category: string): string =>
  categoryColors[category] ?? '#8b98a6';
