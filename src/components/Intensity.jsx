import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ChartCom({ data, selectedRegion }) {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const filteredData = data.filter(
      (item) => !selectedRegion || item.region === selectedRegion
    );

    
    const sumData = d3.rollups(
      filteredData,
      (v) => d3.sum(v, (d) => d.intensity),
      (d) => d.end_year
    );

    const x = d3
      .scaleBand()
      .domain(sumData.map((d) => d[0]))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sumData, (d) => d[1])])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll('.bar')
      .data(sumData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d[1]))
      .attr('fill', (_, i) => color(i)); 

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y).tickFormat(d3.format('.2s'))); // 
  }, [data, selectedRegion]);

  return <svg ref={svgRef}></svg>;
}
export default ChartCom;
