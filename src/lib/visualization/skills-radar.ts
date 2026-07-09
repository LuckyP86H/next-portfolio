import * as d3 from 'd3';
import type { RefObject } from 'react';
import type { Skill, TooltipPayload } from '../../types/skills';

/**
 * Responsive D3 skills radar.
 *
 * Geometry is drawn in a FIXED viewBox coordinate space and the SVG is sized with
 * width:100% + preserveAspectRatio, so it scales uniformly to any container width
 * without clipping or breaking the layout on mobile. No pixel measurement / ResizeObserver
 * needed — the browser handles scaling.
 */

const VIEW_W = 520;
const VIEW_H = 400;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2 + 8;
const OUTER = 112;
const INNER = 6;
const LABEL_R = OUTER + 22;
const MAX_UNFILTERED = 6;

type TooltipSetter = (payload: TooltipPayload) => void;

export function createSkillsRadar(
  svgRef: RefObject<SVGSVGElement | null>,
  skills: Skill[],
  selectedCategory: string | null,
  colorScale: (category: string) => string,
  setTooltip?: TooltipSetter
): boolean {
  try {
    const el = svgRef.current;
    if (!el) return false;

    const svg = d3.select(el);
    svg.selectAll('*').remove();

    let data = selectedCategory
      ? skills.filter((s) => s.category === selectedCategory)
      : skills.slice();

    if (!selectedCategory && data.length > MAX_UNFILTERED) {
      data = [...data].sort((a, b) => b.level - a.level).slice(0, MAX_UNFILTERED);
    }
    if (data.length === 0) return false;

    svg
      .attr('viewBox', `0 0 ${VIEW_W} ${VIEW_H}`)
      .attr('width', '100%')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('height', 'auto')
      .style('max-height', '100%')
      .style('overflow', 'visible');

    const g = svg.append('g').attr('transform', `translate(${CX}, ${CY})`);
    const n = data.length;
    const angleAt = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2; // start at top
    const rScale = d3.scaleLinear().domain([0, 100]).range([INNER, OUTER]);

    // Concentric rings + tick labels
    [25, 50, 75, 100].forEach((t) => {
      g.append('circle')
        .attr('r', rScale(t))
        .attr('fill', 'none')
        .attr('stroke', 'rgba(0, 242, 255, 0.12)')
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
        .attr('stroke', 'rgba(0, 242, 255, 0.12)')
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

      g.append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', 5)
        .attr('fill', color)
        .attr('stroke', '#000000')
        .attr('stroke-width', 1.5)
        .attr('cursor', 'pointer')
        .on('mouseover', function (event: MouseEvent) {
          d3.select(this).transition().duration(150).attr('r', 7);
          if (setTooltip) {
            const parent = (el.parentElement ?? el) as Element;
            const [mx, my] = d3.pointer(event, parent);
            setTooltip({ visible: true, skill, x: Math.round(mx), y: Math.round(my) });
          }
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(150).attr('r', 5);
          if (setTooltip) setTooltip({ visible: false, skill: null, x: 0, y: 0 });
        });

      // Level number just inside the point
      g.append('text')
        .attr('x', Math.cos(a) * (r - 12))
        .attr('y', Math.sin(a) * (r - 12))
        .attr('text-anchor', 'middle')
        .attr('dy', '0.32em')
        .attr('font-size', '9px')
        .attr('font-weight', '700')
        .attr('fill', color)
        .text(String(skill.level));

      // Skill name outside the ring
      const lx = Math.cos(a) * LABEL_R;
      const ly = Math.sin(a) * LABEL_R;
      const anchor = Math.abs(lx) < 8 ? 'middle' : lx > 0 ? 'start' : 'end';
      g.append('text')
        .attr('x', lx)
        .attr('y', ly)
        .attr('dy', '0.32em')
        .attr('text-anchor', anchor)
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .attr('fill', color)
        .text(skill.name);
    });

    // Heading
    svg
      .append('text')
      .attr('x', CX)
      .attr('y', 22)
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', '700')
      .attr('fill', '#e6edf3')
      .text(selectedCategory ? `${selectedCategory} skills` : 'Top skills');

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error rendering skills radar:', error);
    return false;
  }
}

export default createSkillsRadar;
