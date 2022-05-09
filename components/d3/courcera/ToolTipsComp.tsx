import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
// https://observablehq.com/@d3/d3v6-migration-guide
// D3 6.0 migration guide
const ToolTipsComp = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [hidden, setHidden] = useState(true)
  //--------- week 4 = Updating data  =====
  useEffect(() => {
    const tooltip = d3
      .select('#tooltip')
      .style('border', 'solid 1px black')
      .style('padding', '5px')
      .style('position', 'absolute')
      .attr('className', 'hidden')

    const barchart = d3.select('#barchart')
    const timeline = d3.select('#timeline')

    const width = 300
    const height = 200

    barchart.attr('height', height)
    barchart.attr('width', width)

    timeline.attr('height', height)
    timeline.attr('width', width)

    drawLineChart(data, timeline, width, height)
    drawBarChart(data, barchart, width, height)
  }, [data])

  const showTooltip = (text, coords) => {
    const x = coords[0]
    const y = coords[1]

    d3.select('#tooltip')
      .text(text)
      .style('top', `${y}px`)
      .style('left', `${x}px`)
      .style('background-color', 'white')

    setHidden(false)
  }
  const drawLineChart = (data, timeline, width, height) => {
    data = data.history
    const margin = { left: 40, bottom: 20, right: 20, top: 20 }

    const bodyWidth = width - margin.left - margin.right
    const bodyHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleLinear()
      .range([0, bodyWidth])
      .domain(d3.extent(data, (d) => d.year))

    const yScale = d3
      .scaleLinear()
      .range([bodyHeight, 0])
      .domain([0, d3.max(data, (d) => d.value)])

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value))

    timeline
      .select('#body')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .select('path')
      .datum(data)
      .attr('d', lineGenerator)

    timeline
      .select('#xAxis')
      .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5))

    timeline
      .select('#yAxis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat((d) => d / 1e12 + 'T')
      )
  }
  const drawBarChart = (data, barchart, width, height) => {
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
      .domain([0, d3.max(data, (d) => +d[2016])])

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
      .on('mouseenter', (event, d) => {
        console.log(`(x:${event.clientX}, y:${event.clientY})`)
        showTooltip(d.Country, [event.clientX, event.clientY])
      })
      .on('mousemove', (event, d) => {
        showTooltip(d.Country, [event.clientX, event.clientY + 30])
      })
      .on('mouseleave', (event, d) => {
        setHidden(true)
        // d3.select('#tooltip')
        // .style('display', 'none')
      })
  }
  return (
    <div>
      <h2>{'Tool Tips'}</h2>
      <svg id="barchart">
        <g id="body" />
      </svg>
      <svg id="timeline">
        <g id="xAxis" />
        <g id="yAxis" />
        <g id="body">
          <path
            id="path"
            // style="stroke: black"
          />
        </g>
      </svg>
      <div id="tooltip" className={`hidde=${hidden}`}>
        ToolTip
      </div>
    </div>
  )
}

export default ToolTipsComp
