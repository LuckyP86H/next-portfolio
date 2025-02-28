'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FileDown } from 'lucide-react';
import aboutMeContent from '@/content/aboutMe';
import * as d3 from 'd3';

// Skills data
const skills = [
  { name: 'Java', level: 90, category: 'Backend' },
  { name: 'Spring', level: 85, category: 'Backend' },
  { name: 'Docker', level: 80, category: 'DevOps' },
  { name: 'Kubernetes', level: 75, category: 'DevOps' },
  { name: 'Jenkins', level: 70, category: 'DevOps' },
  { name: 'Bazel', level: 65, category: 'Build Tools' },
  { name: 'Gradle', level: 85, category: 'Build Tools' },
  { name: 'Go', level: 60, category: 'Backend' },
  { name: 'React', level: 65, category: 'Frontend' },
  { name: 'SQL', level: 80, category: 'Data' },
];

export default function About() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Get the basePath from environment
  const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';

  useEffect(() => {
    if (svgRef.current) {
      // Clear previous chart
      d3.select(svgRef.current).selectAll('*').remove();
      createSkillsChart();
    }
  }, []);

  const createSkillsChart = () => {
    if (!svgRef.current) return;

    // D3 code with improved responsive handling
    try {
      // Set dimensions
      const width = svgRef.current.clientWidth;
      const height = 300;
      const margin = { top: 20, right: 80, bottom: 60, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create SVG
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Create scales
      const xScale = d3.scaleBand()
        .domain(skills.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.2);

      const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);

      const colorScale = d3.scaleOrdinal<string>()
        .domain(skills.map(d => d.category))
        .range(d3.schemeCategory10);

      // Create chart group
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add x-axis
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .style('font-size', '12px');

      // Add y-axis
      g.append('g')
        .call(d3.axisLeft(yScale).ticks(5))
        .style('font-size', '12px');

      // Add y-axis label
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left)
        .attr('x', -innerHeight / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Proficiency')
        .style('fill', 'currentColor');

      // Add bars with animation
      g.selectAll('.bar')
        .data(skills)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.name) || 0)
        .attr('width', xScale.bandwidth())
        .attr('y', innerHeight)
        .attr('height', 0)
        .attr('fill', d => colorScale(d.category))
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('y', d => yScale(d.level))
        .attr('height', d => innerHeight - yScale(d.level));

      // Add legend
      const categories = Array.from(new Set(skills.map(d => d.category)));
      const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right + 10}, ${margin.top})`);

      categories.forEach((category, i) => {
        const legendRow = legend.append('g')
          .attr('transform', `translate(0, ${i * 20})`);
        
        legendRow.append('rect')
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', colorScale(category));
        
        legendRow.append('text')
          .attr('x', 15)
          .attr('y', 10)
          .text(category)
          .style('font-size', '12px')
          .style('fill', 'currentColor');
      });
    } catch (error) {
      console.error("Error creating skills chart:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {/* Smaller profile image */}
          <div className="mx-auto md:mx-0 mb-6" style={{ width: '120px', height: '120px', position: 'relative' }}>
            <div 
              style={{ 
                overflow: 'hidden', 
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                border: '4px solid white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <Image
                src={`${basePath}/assets/images/profile.jpg`}
                alt="Paul Xu"
                width={120}
                height={120}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Hello there!</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.625' }}>{aboutMeContent}</p>
            
            <a
              href={`${basePath}/Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 mt-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
              style={{ 
                backgroundColor: '#0284c7', 
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                marginTop: '1rem',
                borderRadius: '0.375rem',
                color: 'white',
                transition: 'background-color 0.2s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            >
              <FileDown style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              Download Resume
            </a>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Skills</h3>
          
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', padding: '1rem' }}>
            <svg ref={svgRef} width="100%" height="300" className="svg-container"></svg>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">Experience</h4>
            <div className="space-y-4">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '1rem' }}>
                <h5 className="font-semibold">Software Engineer</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clari • 2021 - Present</p>
                <p className="mt-2" style={{ color: '#4b5563', marginTop: '0.5rem' }}>
                  Working on backend infrastructure and build systems using Java, Spring, and Bazel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}