// Create a utility module that holds the simplified chart creator
// This file should be placed in your project as: src/utils/createSimplifiedSkillsChart.js

/**
 * Creates a simplified D3 chart for skills visualization
 * This is designed to work with a specific dataset structure and provide a cleaner,
 * more reliable rendering than the complex implementation.
 */
const createSimplifiedSkillsChart = (svgRef, skills, selectedCategory, colorScale, setTooltipContent) => {
    try {
      if (!svgRef.current) return false;
      
      // Clear any existing content
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      
      // Select only the top skills (limit to 6) to avoid overcrowding
      let filteredSkills = selectedCategory 
        ? skills.filter(skill => skill.category === selectedCategory)
        : skills;
        
      // Sort by level and take top skills if too many
      if (!selectedCategory && filteredSkills.length > 6) {
        filteredSkills = filteredSkills
          .sort((a, b) => b.level - a.level)
          .slice(0, 6);
      }
      
      // Set dimensions
      const width = 600;
      const height = 400;
      const margin = { top: 60, right: 120, bottom: 60, left: 120 };
      const innerRadius = 20;
      const outerRadius = Math.min(
        (width - margin.left - margin.right) / 2, 
        (height - margin.top - margin.bottom) / 2
      );
      
      // Set SVG attributes
      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');
      
      // Create a group for the chart and center it
      const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
      
      // Create scales
      const angleScale = d3.scalePoint()
        .domain(filteredSkills.map(d => d.name))
        .range([0, 2 * Math.PI - (2 * Math.PI / filteredSkills.length)]);
      
      const radiusScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerRadius, outerRadius]);
      
      // Add circular grid lines
      const ticks = [20, 40, 60, 80, 100];
      ticks.forEach(t => {
        g.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', radiusScale(t))
          .attr('fill', 'none')
          .attr('stroke', 'rgba(229, 231, 235, 0.3)')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '2,2');
        
        // Add tick labels
        g.append('text')
          .attr('x', 5)
          .attr('y', -radiusScale(t) + 4)
          .attr('font-size', '10px')
          .attr('fill', 'rgba(156, 163, 175, 0.8)')
          .attr('text-anchor', 'start')
          .text(t);
      });
      
      // Draw axes for each skill
      filteredSkills.forEach(skill => {
        const angle = angleScale(skill.name);
        
        // Draw axis line
        g.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', Math.cos(angle - Math.PI / 2) * outerRadius)
          .attr('y2', Math.sin(angle - Math.PI / 2) * outerRadius)
          .attr('stroke', 'rgba(229, 231, 235, 0.5)')
          .attr('stroke-width', 1);
      });
      
      // Create the radar chart shape
      const line = d3.lineRadial()
        .angle(d => angleScale(d.name) - Math.PI / 2)
        .radius(d => radiusScale(d.level))
        .curve(d3.curveCardinalClosed.tension(0.5));
      
      g.append('path')
        .datum(filteredSkills)
        .attr('d', line)
        .attr('fill', 'rgba(59, 130, 246, 0.15)')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round');
      
      // Add data points
      filteredSkills.forEach(skill => {
        const angle = angleScale(skill.name);
        const radius = radiusScale(skill.level);
        
        // Draw data point
        g.append('circle')
          .attr('cx', Math.cos(angle - Math.PI / 2) * radius)
          .attr('cy', Math.sin(angle - Math.PI / 2) * radius)
          .attr('r', 6)
          .attr('fill', colorScale(skill.category))
          .attr('stroke', '#fff')
          .attr('stroke-width', 2)
          .attr('cursor', 'pointer')
          .on('mouseover', function(event) {
            // Show tooltip
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 8);
              
            if (setTooltipContent) {
              setTooltipContent({
                visible: true,
                skill: skill,
                x: event.pageX,
                y: event.pageY
              });
            }
          })
          .on('mouseout', function() {
            // Hide tooltip
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 6);
              
            if (setTooltipContent) {
              setTooltipContent({
                visible: false,
                skill: null,
                x: 0,
                y: 0
              });
            }
          });
        
        // Add skill level text
        g.append('text')
          .attr('x', Math.cos(angle - Math.PI / 2) * (radius + 15))
          .attr('y', Math.sin(angle - Math.PI / 2) * (radius + 15))
          .attr('text-anchor', 'middle')
          .attr('font-size', '11px')
          .attr('font-weight', 'bold')
          .attr('fill', colorScale(skill.category))
          .text(skill.level);
        
        // Add skill name with better positioning
        const labelRadius = outerRadius + 30;  // Push labels further out
        
        // Calculate x position with extra adjustment based on angle
        const labelX = Math.cos(angle - Math.PI / 2) * labelRadius;
        
        // Adjust text anchor based on position for better readability
        const textAnchor = 
          labelX > width / 6 ? 'start' : 
          labelX < -width / 6 ? 'end' : 
          'middle';
          
        g.append('text')
          .attr('x', labelX)
          .attr('y', Math.sin(angle - Math.PI / 2) * labelRadius)
          .attr('dx', textAnchor === 'start' ? 5 : (textAnchor === 'end' ? -5 : 0))
          .attr('dy', Math.sin(angle - Math.PI / 2) > 0 ? 5 : -5)
          .attr('text-anchor', textAnchor)
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('fill', colorScale(skill.category))
          .text(skill.name);
      });
      
      // Add chart title
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', 'currentColor')
        .text(selectedCategory ? `${selectedCategory} Skills` : 'Top Skills');
        
      return true;
    } catch (error) {
      console.error("Error creating simplified chart:", error);
      return false;
    }
  };
  
  // Export the function for use in other files
  export default createSimplifiedSkillsChart;