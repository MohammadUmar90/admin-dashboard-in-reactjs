import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function RelevanceChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    
    const relevanceData = d3.rollup(
      data,
      (values) => d3.sum(values, (d) => d.relevance),
      (d) => d.country
    );

    
    const countryData = Array.from(relevanceData, ([country, relevanceCount]) => ({ country, relevanceCount }));

    
    const x = d3.scaleBand().domain(countryData.map((d) => d.country)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(countryData, (d) => d.relevanceCount)]).nice().range([height, 0]);


    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g').call(d3.axisLeft(y));

    
    const line = d3
      .line()
      .x((d) => x(d.country) + x.bandwidth() / 2)
      .y((d) => y(d.relevanceCount));

    
    svg
      .append('path')
      .datum(countryData)
      .attr('class', 'line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', 'blue')
      .style('stroke-width', 2);
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default RelevanceChart;
