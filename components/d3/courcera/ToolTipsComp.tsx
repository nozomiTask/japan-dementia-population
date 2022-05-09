import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const ToolTipsComp = ({ data }) => {
  // const ref = useRef(null)
  //--------- week 4 = Updating data  =====
  useEffect(() => {
    data.length > 0 && drawBarChart(data)
  }, [data])

  let barchart = d3.select('#barchart')

  let width = 300
  let height = 200

  barchart.attr('height', height)
  barchart.attr('width', width)

  const showTooltip = (text, coords) => {
    d3.select('#tooltip')
      .text(text)
      .style('top', coords[1])
      .style('left', coords[0])
      .style('display', 'block')
  }

  const drawBarChart = (data) => {
    const tooltip = d3
      .select('#tooltip')
      .style('border', 'solid 1px black')
      .style('padding', 5)
      .style('position', 'absolute')

    const margin = { left: 20, bottom: 20, right: 20, top: 20 }

    const bodyWidth = width - margin.left - margin.right
    const bodyHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleBand()
      .range([0, bodyWidth])
      .domain(data.map((d) => d.Country))
      .padding(0.2)

    const yScale = d3
      .scaleLinear()
      .range([bodyHeight, 0])
      .domain([0, d3.max(data, (d) => +d.GDP)])

    const barChartBody = barchart
      .select('#body')
      .attr('transform', `translate(${margin.left},${margin.bottom})`)
      .selectAll('rect')
      .data(data)

    barChartBody
      .enter()
      .append('rect')
      .style('fill', 'green')
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => bodyHeight - yScale(+d.GDP))
      .attr('y', (d) => yScale(+d.GDP))
      .attr('x', (d) => xScale(d.Country))
      .on('mouseenter', (d) => {
        console.log(`(x:${d3.event.clientX}, y:${d3.event.clientY})`)
        showTooltip(d.Country, [d3.event.clientX, d3.event.clientY])
      })
      .on('mouseleave', (d) => {
        d3.select('#tooltip').style('display', 'none')
      })
  }
  return (
    <div>
      <h2>{'Tool Tips'}</h2>
      <svg id="barchart" className="border-solid border-2 border-gray-500">
        <g id="body" />
      </svg>
      <div id="tooltip">ToolTip</div>
    </div>
  )
}

export default ToolTipsComp
