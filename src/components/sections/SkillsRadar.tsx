'use client';

import { useEffect, useRef, useState } from 'react';
import { skills, skillCategories, colorForCategory } from '@content/skills';
import createSkillsRadar from '@lib/visualization/skills-radar';
import type { TooltipPayload } from '@/types/skills';

export default function SkillsRadar() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipPayload>({
    visible: false,
    skill: null,
    x: 0,
    y: 0,
  });

  // Redraw whenever the active category changes. The SVG scales itself via viewBox,
  // so no resize handling is required for responsiveness.
  useEffect(() => {
    createSkillsRadar(svgRef, skills, selectedCategory, colorForCategory, setTooltip);
  }, [selectedCategory]);

  const toggle = (category: string) =>
    setSelectedCategory((prev) => (prev === category ? null : category));

  return (
    <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {skillCategories.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggle(category)}
              aria-pressed={active}
              className={`border px-2.5 py-1 text-xs transition-colors ${
                active
                  ? 'border-chic-cyan bg-chic-cyan/10 text-chic-cyan'
                  : 'border-chic-border text-chic-muted hover:border-chic-cyan/50 hover:text-chic-fg'
              }`}
              style={{ borderLeftWidth: '3px', borderLeftColor: colorForCategory(category) }}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          ref={svgRef}
          className="d3-chart aspect-[520/400] w-full"
          aria-label="Skills radar chart"
        />
        {tooltip.visible && tooltip.skill && (
          <div
            className="pointer-events-none absolute z-20 max-w-[240px] border border-chic-cyan/40 bg-chic-panel p-2.5 text-xs shadow-glow-sm"
            style={{
              left: `${Math.max(8, tooltip.x + 12)}px`,
              top: `${Math.max(8, tooltip.y - 10)}px`,
            }}
          >
            <div className="font-semibold text-chic-fg">
              {tooltip.skill.name} · {tooltip.skill.level}%
            </div>
            <div className="text-chic-cyan">{tooltip.skill.category}</div>
            <div className="mt-1 leading-snug text-chic-muted">{tooltip.skill.description}</div>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-chic-muted">
        {selectedCategory
          ? `Showing ${selectedCategory}`
          : 'Showing top skills — pick a category to filter'}
      </p>
    </div>
  );
}
