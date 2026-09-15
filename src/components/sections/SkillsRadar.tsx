'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { skills, skillCategories, colorForCategory } from '@content/skills';
import { createSkillsRadar, VIEW_W, VIEW_H } from '@lib/visualization/skills-radar';
import type { TooltipPayload } from '@/types/skills';

const HIDDEN: TooltipPayload = { visible: false, skill: null, x: 0, y: 0 };

export default function SkillsRadar() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipPayload>(HIDDEN);

  // Redraw whenever the active category changes. The SVG scales itself via viewBox,
  // so no resize handling is required for responsiveness.
  useEffect(() => {
    createSkillsRadar(svgRef, skills, selectedCategory, colorForCategory, setTooltip);
  }, [selectedCategory]);

  const toggle = (category: string) => {
    setTooltip(HIDDEN);
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  // Keep the tooltip inside the chart: anchor it to whichever side of the pointer has room.
  const tooltipStyle = (): CSSProperties => {
    const w = wrapRef.current?.clientWidth ?? 0;
    const h = wrapRef.current?.clientHeight ?? 0;
    const style: CSSProperties = {};
    if (w && tooltip.x > w / 2) style.right = Math.max(0, w - tooltip.x + 12);
    else style.left = Math.max(0, tooltip.x + 12);
    if (h && tooltip.y > h / 2) style.bottom = Math.max(0, h - tooltip.y + 12);
    else style.top = Math.max(0, tooltip.y + 12);
    return style;
  };

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

      <div
        ref={wrapRef}
        className="relative flex min-h-0 flex-1 items-center justify-center"
        onClick={(e) => {
          // A tap anywhere that isn't a data point dismisses a touch-opened tooltip.
          if (!(e.target instanceof SVGCircleElement)) setTooltip(HIDDEN);
        }}
      >
        <svg
          ref={svgRef}
          className="d3-chart w-full max-w-[440px]"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
          role="img"
          aria-label="Skills radar chart"
        />
        {tooltip.visible && tooltip.skill && (
          <div
            className="pointer-events-none absolute z-20 max-w-[240px] border border-chic-cyan/40 bg-chic-panel p-2.5 text-xs shadow-glow-sm"
            style={tooltipStyle()}
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
          : 'Showing top skills. Pick a category to filter.'}
      </p>
    </div>
  );
}
