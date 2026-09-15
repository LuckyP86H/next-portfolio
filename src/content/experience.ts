/**
 * Professional experience entries for the Bento "Experience" panel.
 * Keep each entry to a few short points; the panel is a log, not a résumé.
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
    period: 'Jul 2026 – Present',
    kind: 'Full-time',
    current: true,
    points: [
      'Backend services in Java and Spring Boot, and the build and deployment infrastructure behind them.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Clari',
    period: '2021 – 2026',
    kind: 'Full-time',
    points: [
      'Built and ran Java / Spring Boot microservices serving enterprise customers.',
      'Cut build times by roughly 35% across the org by tuning the Gradle and Bazel builds.',
      'Shipped cloud-native services on Docker and AWS with cross-functional teams.',
    ],
  },
  {
    role: 'Volunteer',
    org: 'MongoDB Local',
    period: '2023',
    kind: 'Community',
    points: [
      "Helped run MongoDB's local developer event: registration, technical setup, and speaker coordination.",
    ],
  },
];
