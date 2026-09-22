/**
 * Professional experience and extracurricular entries for the Bento "Experience"
 * panel. Keep each entry to a few short points; the panel is a log, not a résumé.
 * Jobs are listed first (most recent first), then extracurricular entries below,
 * distinguished by `kind`.
 */

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  kind: string;
  current?: boolean;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    org: 'ZoomInfo',
    period: '2026 – Present',
    kind: 'Full-time',
    current: true,
    points: [
      'Building AI Platform capabilities for next-generation conversation intelligence, including agentic task scheduling and scalable data ingestion and streaming.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Clari',
    period: '2022 – 2026',
    kind: 'Full-time',
    points: [
      // Service Foundations
      'Built a reusable, self-service template for creating new backend services end-to-end.',
      'Delivered feature flags as a platform service with server-side SDK integration, event-driven webhooks, and code-reference tooling to track flag usage.',
      // Developer Experience
      'Set up Bazel distributed builds and a custom Java toolchain for a large core monolith.',
      "Built a Bazel remote cache as part of the team's build-velocity work.",
    ],
  },
  {
    role: 'BazelCon 2025',
    org: 'Linux Foundation',
    period: '2025',
    kind: 'Extracurricular',
    points: [
      'Expanded my understanding of large-scale build systems and practices across the Bazel ecosystem.',
    ],
  },
  {
    role: 'MongoDB.local Toronto',
    org: 'MongoDB',
    period: '2024',
    kind: 'Extracurricular',
    points: [
      'Explored Atlas Vector Search and multi-cloud architecture patterns with MongoDB Atlas.',
    ],
  },
];
