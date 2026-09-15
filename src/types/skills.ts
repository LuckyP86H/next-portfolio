/**
 * Type definitions for skills and the skills radar visualization.
 */

export interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
}

export interface TooltipPayload {
  visible: boolean;
  skill: Skill | null;
  x: number;
  y: number;
}
