import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const Brush = ({ data }) => {
  // const ref = useRef(null)
  //--------- week 4 = Updating data  =====
  useEffect(() => {
    const svg = d3
      .select('#container')
      .attr('height', 350)
      .attr('width', 350)
      .style('border', 'solid 1px #000')
      .attr('margin-top', 10)
    const body = d3.select('#body').style('transform', 'translate(40px,10px)')

    showData(data, body)
    const brush = d3.brush()
    brush.on('brush', function (event) {
      const coords = event.selection
      body.selectAll('circle').attr('fill', function () {
        const cx = d3.select(this).attr('cx')
        const cy = d3.select(this).attr('cy')
        const selected = isSelected(coords, cx, cy)
        return selected ? 'red' : 'blue'
      })
    })
    body.append('g').attr('class', 'brush').call(brush)
  }, [data])

  const showData = (data, body) => {
    const bodyWidth = 300
    const bodyHeight = 300

    const xExtent = d3.extent(data, (d) => +d.Weight)
    const xScale = d3
      .scaleLinear()
      .range([0, bodyWidth])
      .domain([xExtent[0] - 5, xExtent[1] + 5])

    const yExtent = d3.extent(data, (d) => +d.Height)
    const yScale = d3
      .scaleLinear()
      .range([0, bodyHeight])
      .domain([yExtent[0] - 5, yExtent[1] + 5])

    const join = body.selectAll('circle').data(data)

    const newelements = join
      .enter()
      .append('circle')
      .attr('fill', 'blue')
      .attr('r', '5')

    join
      .merge(newelements)
      .transition()
      .attr('cx', (d) => xScale(+d.Weight))
      .attr('cy', (d) => yScale(+d.Height))

    const yAxis = d3.axisLeft(yScale)
    const yAxisGroup = d3
      .select('#yAxis')
      .style('transform', 'translate(40px, 10px)')
      .call(yAxis)

    const xAxis = d3.axisBottom(xScale)
    const xAxisGroup = d3
      .select('#xAxis')
      .style('transform', `translate(40px, ${bodyHeight + 10}px)`)
      .call(xAxis)

    // zoom
    const zoom = d3.zoom()
    zoom.on('zoom', function (event) {
      const newXScale = event.transform.rescaleX(xScale)
      const newYScale = event.transform.rescaleY(yScale)

      xAxis.scale(newXScale)
      xAxisGroup.call(xAxis)
      yAxis.scale(newYScale)
      yAxisGroup.call(yAxis)

      join
        .merge(newelements)
        .attr('cx', (d) => newXScale(+d.Weight))
        .attr('cy', (d) => newYScale(+d.Height))
    })
    const container = d3.select('#container')
    container.call(zoom)
  }

  // brush in or out area
  const isSelected = (coords, x, y) => {
    const x0 = coords[0][0]
    const x1 = coords[1][0]
    const y0 = coords[0][1]
    const y1 = coords[1][1]

    return x0 <= x && x <= x1 && y0 <= y && y <= y1
  }

  return (
    <>
      <h2>{'Brush & Zoom'}</h2>
      <svg id="container">
        <g id="body"></g>
        <g id="yAxis"></g>
        <g id="xAxis"></g>
      </svg>
    </>
  )
}

export default Brush
