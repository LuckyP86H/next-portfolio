/**
 * Professional experience entries for the Bento "Experience" panel.
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
    org: 'Clari',
    period: '2021 — Present',
    kind: 'Full-time',
    current: true,
    points: [
      'Lead backend infrastructure development in Java and Spring Boot, building scalable microservices for enterprise clients.',
      'Implemented and optimized Gradle and Bazel build systems, improving build times by ~35% across the org.',
      'Designed and deployed cloud-native solutions with Docker and AWS in cross-functional teams.',
    ],
  },
  {
    role: 'Volunteer',
    org: 'MongoDB Local Event',
    period: '2023',
    kind: 'Community',
    points: [
      "Helped organize and run MongoDB's local developer event — registration, technical setup, and speaker coordination.",
      'Participated in hands-on workshops on MongoDB best practices and use cases.',
    ],
  },
];

export default experience;
