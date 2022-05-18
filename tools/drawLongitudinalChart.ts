import * as d3 from 'd3'
import { DEMENTIAPOP } from '../types/dementiaPop'

export const drawLChart = (dPop: DEMENTIAPOP[], index) => {
  d3.select('#axisX' + index).remove()
  d3.select('#axisY' + index).remove()
  d3.select('#axisYRate' + index).remove()
  d3.select('#line' + index).remove()
  d3.select('#lineRate' + index).remove()

  const config = getChartConfig(index)
  const scales = getChartScale(dPop, config)

  const data = dPop.map((d) => {
    return {
      value: Math.floor(d.dPopAllSum),
      rate: d.dRateAll65,
      year: d.year,
    }
  })
  drawAxes(scales, config, index)
  drawLine(data, scales, config, index)
}
const getChartConfig = (index) => {
  const width = 700
  const height = 400
  const margin = {
    top: 30,
    left: 80,
    bottom: 40,
    right: 60,
  }

  const bodyWidth = width - margin.left - margin.right
  const bodyHeight = height - margin.top - margin.bottom
  const container = d3.select('#chart' + index)
  container.attr('width', width).attr('height', height)
  return {
    width,
    height,
    margin,
    bodyWidth,
    bodyHeight,
    container,
  }
}

const getChartScale = (dPop: DEMENTIAPOP[], config) => {
  const { bodyWidth, bodyHeight } = config
  const max = d3.max(dPop, (d) => d.dPopAllSum)
  const maxRate = d3.max(dPop, (d) => d.dRateAll65)
  const xScale = d3
    .scaleBand()
    .range([0, bodyWidth])
    .domain(dPop.map((d) => d.year))
    .padding(0.2)
  const yScale = d3.scaleLinear().range([bodyHeight, 0]).domain([0, max])
  const yRateScale = d3
    .scaleLinear()
    .range([bodyHeight, 0])
    .domain([0, maxRate])

  return { xScale, yScale, yRateScale }
}

const drawAxes = (scales, config, index) => {
  const { xScale, yScale, yRateScale } = scales
  const { container, margin, height, width } = config
  const axisX = d3.axisBottom(xScale)
  const axisY = d3.axisLeft(yScale)
  const axisYRate = d3.axisRight(yRateScale)

  container
    .append('g')
    .attr('id', 'axisX' + index)
    .style(
      'transform',
      `translate(${margin.left}px,${height - margin.bottom}px)`
    )
    .style('font', '15px times')
    .call(axisX)

  container
    .append('g')
    .attr('id', 'axisY' + index)
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .style('font', '15px times')
    .call(axisY)

  container
    .append('g')
    .attr('id', 'axisYRate' + index)
    .style('transform', `translate(${width - margin.right}px,${margin.top}px)`)
    .style('font', '15px times')
    .style('stroke', 'red')
    .style('color', 'red')
    .call(axisYRate)
}

const drawLine = (data, scales, config, index) => {
  const { container, margin } = config
  const { xScale, yScale, yRateScale } = scales

  const path = container
    .append('path')
    .datum(data)
    .attr('id', 'line' + index)
    .style('transform', `translate(${margin.left+30}px,${margin.top}px)`)

  const pathRate = container
    .append('path')
    .datum(data)
    .attr('id', 'lineRate' + index)
    .style('transform', `translate(${margin.left+30}px,${margin.top}px)`)

  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value))

  const lineRate = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yRateScale(d.rate))

  path
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    .attr('d', line)

  pathRate
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('d', lineRate)
}
