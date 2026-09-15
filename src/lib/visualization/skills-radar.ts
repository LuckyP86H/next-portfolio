import * as d3 from 'd3';
import type { RefObject } from 'react';
import type { Skill, TooltipPayload } from '../../types/skills';

/**
 * Responsive D3 skills radar.
 *
 * Geometry is drawn in a FIXED viewBox coordinate space and the SVG is sized with
 * width:100% + preserveAspectRatio, so it scales uniformly to any container width.
 * The viewBox is sized for the 300–420px Bento panel it lives in, which keeps the
 * labels legible on a phone without any pixel measurement or ResizeObserver.
 */

export const VIEW_W = 380;
export const VIEW_H = 340;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2 + 10;
const OUTER = 96;
const INNER = 6;
const LABEL_R = OUTER + 18;
const MAX_UNFILTERED = 6;
const LABEL_FONT = 13;
const LABEL_LINE = 15;
const LABEL_WRAP_AT = 10;
const GRID_STROKE = 'rgba(0, 242, 255, 0.14)';

type TooltipSetter = (payload: TooltipPayload) => void;

/** Split long labels at the last space so they never run past the viewBox edge. */
function wrapLabel(name: string): string[] {
  if (name.length <= LABEL_WRAP_AT) return [name];
  const cut = name.lastIndexOf(' ', LABEL_WRAP_AT);
  return cut > 0 ? [name.slice(0, cut), name.slice(cut + 1)] : [name];
}

export function createSkillsRadar(
  svgRef: RefObject<SVGSVGElement | null>,
  skills: Skill[],
  selectedCategory: string | null,
  colorScale: (category: string) => string,
  setTooltip?: TooltipSetter
): void {
  const el = svgRef.current;
  if (!el) return;

  const svg = d3.select(el);
  svg.selectAll('*').remove();

  const data = selectedCategory
    ? skills.filter((s) => s.category === selectedCategory)
    : [...skills].sort((a, b) => b.level - a.level).slice(0, MAX_UNFILTERED);
  if (data.length === 0) return;

  svg
    .attr('viewBox', `0 0 ${VIEW_W} ${VIEW_H}`)
    .attr('width', '100%')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('height', 'auto')
    .style('overflow', 'visible');

  const g = svg.append('g').attr('transform', `translate(${CX}, ${CY})`);
  const n = data.length;
  const angleAt = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2; // start at top
  const rScale = d3.scaleLinear().domain([0, 100]).range([INNER, OUTER]);

  const hide = () => setTooltip?.({ visible: false, skill: null, x: 0, y: 0 });
  const show = (event: MouseEvent, skill: Skill) => {
    if (!setTooltip) return;
    const [mx, my] = d3.pointer(event, el.parentElement ?? el);
    setTooltip({ visible: true, skill, x: Math.round(mx), y: Math.round(my) });
  };

  // Concentric rings
  [25, 50, 75, 100].forEach((t) => {
    g.append('circle')
      .attr('r', rScale(t))
      .attr('fill', 'none')
      .attr('stroke', GRID_STROKE)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
  });

  // Spokes
  data.forEach((_, i) => {
    const a = angleAt(i);
    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', Math.cos(a) * OUTER)
      .attr('y2', Math.sin(a) * OUTER)
      .attr('stroke', GRID_STROKE)
      .attr('stroke-width', 1);
  });

  // Filled area polygon
  const points: [number, number][] = data.map((s, i) => {
    const a = angleAt(i);
    const r = rScale(s.level);
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
  const areaPath = d3.line().curve(d3.curveLinearClosed)(points);
  if (areaPath) {
    g.append('path')
      .attr('d', areaPath)
      .attr('fill', 'rgba(0, 242, 255, 0.12)')
      .attr('stroke', '#00f2ff')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round');
  }

  // Data points + labels
  data.forEach((skill, i) => {
    const a = angleAt(i);
    const r = rScale(skill.level);
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    const color = colorScale(skill.category);

    const dot = g
      .append('circle')
      .attr('cx', px)
      .attr('cy', py)
      .attr('r', 5)
      .attr('fill', color)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1.5)
      .attr('pointer-events', 'none');

    // Level number just inside the point
    g.append('text')
      .attr('x', Math.cos(a) * (r - 13))
      .attr('y', Math.sin(a) * (r - 13))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.32em')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('fill', color)
      .attr('pointer-events', 'none')
      .text(String(skill.level));

    // Skill name outside the ring, wrapped onto two lines when long
    const lx = Math.cos(a) * LABEL_R;
    const ly = Math.sin(a) * LABEL_R;
    const anchor = Math.abs(lx) < 8 ? 'middle' : lx > 0 ? 'start' : 'end';
    const lines = wrapLabel(skill.name);
    const label = g
      .append('text')
      .attr('text-anchor', anchor)
      .attr('font-size', `${LABEL_FONT}px`)
      .attr('font-weight', '600')
      .attr('fill', color)
      .attr('pointer-events', 'none');
    lines.forEach((line, li) => {
      label
        .append('tspan')
        .attr('x', lx)
        .attr('y', li === 0 ? ly - ((lines.length - 1) * LABEL_LINE) / 2 : null)
        .attr('dy', li === 0 ? '0.32em' : `${LABEL_LINE}px`)
        .text(line);
    });

    // Generous invisible hit target so the tooltip is easy to reach on touch screens.
    g.append('circle')
      .attr('cx', px)
      .attr('cy', py)
      .attr('r', 14)
      .attr('fill', 'transparent')
      .attr('cursor', 'pointer')
      .on('mouseenter', (event: MouseEvent) => {
        dot.transition().duration(150).attr('r', 7);
        show(event, skill);
      })
      .on('mouseleave', () => {
        dot.transition().duration(150).attr('r', 5);
        hide();
      })
      .on('click', (event: MouseEvent) => show(event, skill));
  });

  // Heading
  svg
    .append('text')
    .attr('x', CX)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('font-weight', '700')
    .attr('fill', '#e6edf3')
    .text(selectedCategory ? `${selectedCategory} skills` : 'Top skills');
}
