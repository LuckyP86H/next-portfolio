import * as d3 from 'd3';
import { RefObject, Dispatch, SetStateAction } from 'react';

type Skill = {
  name: string;
  level: number;
  category: string;
  description: string;
};

type TooltipPayload = { visible: boolean; skill: Skill | null; x: number; y: number };

// Accept either a React state setter (Dispatch<SetStateAction<TooltipPayload>>) or a simple callback
type TooltipSetter = ((payload: TooltipPayload) => void) | Dispatch<SetStateAction<TooltipPayload>>;

const createSimplifiedSkillsChart = (
  svgRef: RefObject<SVGSVGElement>,
  skills: Skill[],
  selectedCategory: string | null,
  colorScale: any,
  setTooltipContent?: TooltipSetter
) => {
  try {
    if (!svgRef?.current) return false;

    const svg = d3.select(svgRef.current as any);
    svg.selectAll('*').remove();

    let filteredSkills = selectedCategory
      ? skills.filter((skill) => skill.category === selectedCategory)
      : skills.slice();

    if (!selectedCategory && filteredSkills.length > 6) {
      filteredSkills = filteredSkills.sort((a, b) => b.level - a.level).slice(0, 6);
    }

    // Compute sizing from the svg's container so the chart scales responsively.
  const container = (svgRef.current?.parentElement ?? svgRef.current) as Element;
  const bbox = container.getBoundingClientRect();
    const width = Math.max(320, Math.round(bbox.width) || 600);
    const height = Math.max(240, Math.round(bbox.height) || 400);
  // Use more compact margins for smaller containers
  const baseVerticalMargin = Math.round(Math.max(24, height * 0.08));
  const baseHorizontalMargin = Math.round(Math.max(24, width * 0.08));
  const margin = { top: baseVerticalMargin, right: baseHorizontalMargin, bottom: baseVerticalMargin, left: baseHorizontalMargin };

  const innerRadius = Math.max(6, Math.round(Math.min(width, height) * 0.02));
  // Make outer radius respect both width and height but prefer height as limiting factor to avoid overflow
  const outerRadius = Math.max(26, Math.min((width - margin.left - margin.right) / 2, (height - margin.top - margin.bottom) / 2));

    svg
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const angleScale = d3.scalePoint().domain(filteredSkills.map((d) => d.name)).range([0, 2 * Math.PI - (2 * Math.PI / filteredSkills.length)]);

    const radiusScale = d3.scaleLinear().domain([0, 100]).range([innerRadius, outerRadius]);

  const ticks = outerRadius > 90 ? [20, 40, 60, 80, 100] : outerRadius > 60 ? [25, 50, 75, 100] : [50, 100];
    // Draw concentric ticks scaled to outerRadius
    ticks.forEach((t) => {
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radiusScale(t))
        .attr('fill', 'none')
        .attr('stroke', 'rgba(229, 231, 235, 0.3)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');
      g.append('text')
        .attr('x', Math.max(6, innerRadius / 2))
        .attr('y', -radiusScale(t) + Math.min(6, outerRadius * 0.04))
        .attr('font-size', Math.max(9, Math.round(outerRadius * 0.06)) + 'px')
        .attr('fill', 'rgba(156, 163, 175, 0.8)')
        .attr('text-anchor', 'start')
        .text(String(t));
    });

    filteredSkills.forEach((skill) => {
      const angle = typeof angleScale(skill.name) === 'number' ? (angleScale(skill.name) as number) : 0;

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', Math.cos(angle - Math.PI / 2) * outerRadius)
        .attr('y2', Math.sin(angle - Math.PI / 2) * outerRadius)
        .attr('stroke', 'rgba(229, 231, 235, 0.5)')
        .attr('stroke-width', 1);
    });

    const line = d3
      .lineRadial<Skill>()
      .angle((d) => (angleScale(d.name) as number) - Math.PI / 2)
      .radius((d) => radiusScale(d.level))
      .curve((d3 as any).curveCardinalClosed.tension(0.5));

    g.append('path')
      .datum(filteredSkills)
      .attr('d', line as any)
      .attr('fill', 'rgba(59, 130, 246, 0.15)')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round');

  const pointRadius = Math.max(3, Math.round(outerRadius * 0.06));
  const labelRadiusPadding = Math.min(Math.round(Math.max(24, width * 0.06)), Math.round(outerRadius * 0.9));

    filteredSkills.forEach((skill) => {
      const angle = typeof angleScale(skill.name) === 'number' ? (angleScale(skill.name) as number) : 0;
      const radius = radiusScale(skill.level);

      g.append('circle')
        .attr('cx', Math.cos(angle - Math.PI / 2) * radius)
        .attr('cy', Math.sin(angle - Math.PI / 2) * radius)
        .attr('r', pointRadius)
        .attr('fill', String(colorScale(skill.category)))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('cursor', 'pointer')
        .on('mouseover', function (event: any) {
          d3.select(this).transition().duration(200).attr('r', Math.max(pointRadius + 2, pointRadius * 1.4));
          if (setTooltipContent) {
            // Prefer coordinates relative to the svg container so callers can position an absolute tooltip inside the same container
            const containerEl = (svgRef.current as Element).parentElement ?? svgRef.current;
            const [cx, cy] = d3.pointer(event, containerEl as any);
            setTooltipContent({ visible: true, skill, x: Math.round(cx), y: Math.round(cy) });
          }
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('r', pointRadius);
          if (setTooltipContent) setTooltipContent({ visible: false, skill: null, x: 0, y: 0 });
        });

      g.append('text')
        .attr('x', Math.cos(angle - Math.PI / 2) * (radius + Math.max(10, outerRadius * 0.05)))
        .attr('y', Math.sin(angle - Math.PI / 2) * (radius + Math.max(10, outerRadius * 0.05)))
        .attr('text-anchor', 'middle')
        .attr('font-size', Math.max(10, Math.round(outerRadius * 0.06)) + 'px')
        .attr('font-weight', '700')
        .attr('fill', String(colorScale(skill.category)))
        .text(String(skill.level));

  // place labels just outside the outer radius but cap to avoid huge offsets
  const labelRadius = Math.min(outerRadius + labelRadiusPadding, Math.round(Math.max(outerRadius + 12, height * 0.48)));
      const labelX = Math.cos(angle - Math.PI / 2) * labelRadius;

      const textAnchor = labelX > 0 ? 'start' : labelX < 0 ? 'end' : 'middle';

      g.append('text')
        .attr('x', labelX)
        .attr('y', Math.sin(angle - Math.PI / 2) * labelRadius)
        .attr('dx', textAnchor === 'start' ? Math.min(8, Math.round(width * 0.01)) : textAnchor === 'end' ? -Math.min(8, Math.round(width * 0.01)) : 0)
        .attr('dy', Math.sin(angle - Math.PI / 2) > 0 ? Math.min(8, Math.round(height * 0.02)) : -Math.min(6, Math.round(height * 0.02)))
        .attr('text-anchor', textAnchor)
        .attr('font-size', Math.max(11, Math.round(outerRadius * 0.07)) + 'px')
        .attr('font-weight', '700')
        .attr('fill', String(colorScale(skill.category)))
        .text(skill.name);
    });

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', Math.max(24, Math.round(margin.top * 0.6)))
      .attr('text-anchor', 'middle')
      .attr('font-size', Math.max(14, Math.round(outerRadius * 0.12)) + 'px')
      .attr('font-weight', '700')
      .attr('fill', 'currentColor')
      .text(selectedCategory ? `${selectedCategory} Skills` : 'Top Skills');

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating simplified chart:', error);
    return false;
  }
};

export default createSimplifiedSkillsChart;
