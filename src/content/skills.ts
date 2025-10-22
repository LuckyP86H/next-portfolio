import type { Skill } from '../types/skills';

/**
 * Skills data - displayed in the About page skills visualization
 */
export const skills: Skill[] = [
  {
    name: 'Java (JDK 17)',
    level: 80,
    category: 'Languages',
    description: 'Primary language for backend development. Experienced with new JDK 17 features, streams, concurrency, and collections.'
  },
  {
    name: 'Spring',
    level: 80,
    category: 'Frameworks',
    description: 'Expert in Spring Boot, Spring Cloud, and microservices architecture with REST APIs.'
  },
  {
    name: 'Python',
    level: 40,
    category: 'Languages',
    description: 'Used for scripting, data analysis, and automation tasks.'
  },
  {
    name: 'React',
    level: 30,
    category: 'Frontend',
    description: 'Building interactive user interfaces with modern React and hooks.'
  },
  {
    name: 'Next.js',
    level: 20,
    category: 'Frontend',
    description: 'Creating server-rendered React applications with Next.js.'
  },
  {
    name: 'PostgreSQL',
    level: 60,
    category: 'Data',
    description: 'Database design, performance tuning, and complex query optimization.'
  },
  {
    name: 'MongoDB',
    level: 50,
    category: 'Data',
    description: 'Document database for flexible schema applications, including aggregation framework.'
  },
  {
    name: 'Gradle',
    level: 70,
    category: 'Build & Ops',
    description: 'Build automation with custom tasks and dependency management.'
  },
  {
    name: 'Bazel',
    level: 60,
    category: 'Build & Ops',
    description: 'Fast, scalable build system with incremental builds and caching.'
  },
  {
    name: 'GitHub Actions',
    level: 55,
    category: 'Build & Ops',
    description: 'CI/CD workflow automation directly integrated with repositories.'
  },
  {
    name: 'AWS',
    level: 40,
    category: 'Cloud',
    description: 'Experience with EC2, S3, Lambda, and other core AWS services.'
  }
];

export default skills;
