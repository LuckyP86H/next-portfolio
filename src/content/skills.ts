import type { Skill } from '../types/skills';

/**
 * Skills shown in the radar panel. Levels are self-assessed (0–100).
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
    level: 40,
    category: 'Languages',
    description: 'Scripting, data wrangling, and automation.',
  },
  {
    name: 'TypeScript',
    level: 35,
    category: 'Languages',
    description: 'Typed front-end and tooling code, including this site.',
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
    name: 'Spring Cloud',
    level: 65,
    category: 'Backend',
    description: 'Service discovery, configuration, and resilience patterns for microservices.',
  },

  // Frontend
  {
    name: 'React',
    level: 30,
    category: 'Frontend',
    description: 'Interactive interfaces with modern React and hooks.',
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
    name: 'PostgreSQL',
    level: 60,
    category: 'Data',
    description: 'Schema design, performance tuning, and query optimization.',
  },
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

  // Build & Cloud
  {
    name: 'Gradle',
    level: 70,
    category: 'Build & Cloud',
    description: 'Build automation with custom tasks and dependency management.',
  },
  {
    name: 'Docker',
    level: 65,
    category: 'Build & Cloud',
    description: 'Containerized services and reproducible dev environments.',
  },
  {
    name: 'Bazel',
    level: 60,
    category: 'Build & Cloud',
    description: 'Fast, incremental, cached builds at scale.',
  },
  {
    name: 'GitHub Actions',
    level: 55,
    category: 'Build & Cloud',
    description: 'CI/CD workflows integrated with the repository.',
  },
  {
    name: 'Kubernetes',
    level: 50,
    category: 'Build & Cloud',
    description: 'Deploying and operating containerized services.',
  },
  {
    name: 'AWS',
    level: 40,
    category: 'Build & Cloud',
    description: 'EC2, S3, Lambda, and other core services.',
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
  'Build & Cloud': '#a970ff',
};

export const colorForCategory = (category: string): string =>
  categoryColors[category] ?? '#8b98a6';
