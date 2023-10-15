import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function DonutChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    
    const groupedData = d3.group(data, (d) => d.region);
    const regionLikelihoodData = Array.from(groupedData, ([key, value]) => ({
      region: key,
      likelihoodCount: d3.sum(value, (d) => d.likelihood),
    }));

    const pie = d3.pie().value((d) => d.likelihoodCount);

    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(regionLikelihoodData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', (event, d) => {
        
        svg
          .append('text')
          .attr('class', 'label')
          .attr('text-anchor', 'middle')
          .attr('dy', '-0.5em')
          .style('fill', 'rgb(16, 156, 46)')
          .style('font-size', '25px') 
          .text(`${d.data.region}: ${d.data.likelihoodCount}`);
      })
      .on('mouseout', () => {
        
        svg.select('.label').remove();
      });

    if (data.length === 0) {
      svg
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .text('No data available');
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default DonutChart;
