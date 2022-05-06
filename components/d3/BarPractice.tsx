import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface PROPS {
  data: number[]
}

const BarPractice = ({ data }) => {
  const ref = useRef(null)
  const margin = { top: 20, right: 20, bottom: 50, left: 70 }
  const width = 320 - margin.left - margin.right
  const height = 600 - margin.top - margin.bottom

  useEffect(() => {
    const y = d3.scaleLinear().domain([0, 200]).range([height, 0])
    const label = ['A', 'B', 'C', 'D', 'E', 'F']
    const x = d3.scaleBand().rangeRound([0, width]).domain(label).padding(0.2)

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const bar = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'transform(' + x(label[i]) + ',0)')

    bar
      .append('rect')
      .attr('y', (d) => y(d))
      .attr('x', (d, i) => x(label[i]))
      .attr('height', (d) => height - y(d))
      .attr('width', x.bandwidth())

    svg
      .append('g')
      .attr('className', 'y axis')
      .style('font-size', '16px')
      .call(d3.axisLeft(y))
    svg
      .append('g')
      .attr('className', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .style('font-size', '20px')
      .call(d3.axisBottom(x))
  }, [data])

  return (
    <>
      <svg ref={ref}></svg>
    </>
  )
}

export default BarPractice
