/**
 * Type definitions for skills and skill visualization
 */

export interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
}

export type SkillCategory = 'Languages' | 'Frameworks' | 'Frontend' | 'Data' | 'Build & Ops' | 'Cloud';

export interface TooltipPayload {
  visible: boolean;
  skill: Skill | null;
  x: number;
  y: number;
}
