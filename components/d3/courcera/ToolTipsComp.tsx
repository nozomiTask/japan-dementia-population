import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
// https://observablehq.com/@d3/d3v6-migration-guide
// D3 6.0 migration guide
const ToolTipsComp = ({ data__ }) => {
  // const [selectedCountry, setSelectedCountry] = useState(null)
  const [hidden, setHidden] = useState(true)
  const [data, setData] = useState(null)
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(200)

  //--------- week 4 = Updating data  =====
  useEffect(() => {
    !!data__ && data__.length > 0 && setData(prepareData(data__))
  }, [data__])

  useEffect(() => {
    if (!!data && data.length > 0) {
      drawBarChart(data)
    }
  }, [data])

  const prepareData = (datax) => {
    return datax.map((d) => {
      const years = Object.keys(d).filter((k) => !isNaN(+d[k]))
      d['history'] = []
      for (const year of years) {
        d['history'].push({
          year: year,
          value: +d[year],
        })
      }
      d[2016] = +d[2016]
      return d
    })
  }

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
  const drawLineChart = (datum) => {
    const timeline = d3
      .select('#timeline')
      .attr('height', height)
      .attr('width', width)

    const data = datum.history
    const margin = { left: 40, bottom: 20, right: 20, top: 20 }

    const bodyWidth = width - margin.left - margin.right
    const bodyHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleLinear()
      .range([0, bodyWidth])
      .domain(d3.extent(data, (d) => d.year))
    console.log('in lineChart data_:', data)
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
      .style('fill', 'none')
      .style('stroke', 'blue')

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
  const drawBarChart = (data) => {
    const barchart = d3
      .select('#barchart')
      .attr('height', height)
      .attr('width', width)

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
    let selectedCountry = undefined
    barChartBody
      .enter()
      .append('rect')
      // .style('fill', 'green')
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => bodyHeight - yScale(d[2016]))
      .attr('y', (d) => yScale(d[2016]))
      .attr('x', (d) => xScale(d.Country))
      .on('mouseenter', (d) => {
        console.log(`(x:${d3.event.clientX}, y:${d3.event.clientY})`)
        showTooltip(d.Country, [d3.event.clientX, d3.event.clientY])
      })
      .on('mousemove', (d) => {
        showTooltip(d.Country, [d3.event.clientX, d3.event.clientY])
      })
      .on('mouseleave', (d) => {
        setHidden(true)
        // d3.select('#tooltip')
        // .style('display', 'none')
      })
      .on('click', (d) => {
        selectedCountry = d.Country
        console.log('selectedCountry', selectedCountry)
        console.log('d:', d)
        drawBarChart(data)
        drawLineChart(d)
      })
      .merge(barChartBody)
      .attr('fill', (d) => (selectedCountry === d.Country ? 'red' : '#556677'))

    const tooltip = d3
      .select('#tooltip')
      .style('border', 'solid 1px black')
      .style('padding', '5px')
      .style('position', 'absolute')
      .style('background-color', 'lightyellow')
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
      <div id="tooltip" className={hidden ? 'hidden' : 'block'}>
        ToolTip
      </div>
    </div>
  )
}

export default ToolTipsComp

/*
    <style>
        body {
            padding-left: 20px;
        }

        svg {
            border: solid 1px #000;
            margin-top: 10px;
        }

        #tooltip {
            position: fixed;
            top: 10px;
            left: 0px;
            padding: 5px;
            background-color: rgba(255, 255, 255, 0.8);
            border: solid 1px black;
            display: none;
        }

        path {
            fill: none
        }
    </style>
*/
