import * as d3 from 'd3'
import { DEMENTIAPOP } from '../types/dementiaPop'

export const drawLChart = (dPop: DEMENTIAPOP[], index, prefecture, city) => {
  d3.select('#axisX').remove()
  d3.select('#axisY').remove()
  d3.select('#axisYRate').remove()
  d3.select('#line').remove()
  d3.select('#lineRate65').remove()
  d3.select('#lineRate85').remove()
  d3.selectAll('#circle').remove()
  d3.selectAll('#circleRate65').remove()
  d3.selectAll('#circleRate85').remove()
  d3.select('#titleLongitudinal').remove()

  const title = d3.select('#title').append('h2')

  let area = prefecture + city
  if (index === 'alljapan') area = '全国'

  const text = area + 'の認知症・MCI推計人数(黒線)と有病率（65歳以上赤線、85歳以上青線）'
  title.attr('id', 'titleLongitudinal').append('text').text(text)

  const config = getChartConfig()
  const scales = getChartScale(dPop, config)

  const data = dPop.map((d) => {
    return {
      value: Math.floor(d.dPopAllSum),
      rate65: d.dRateAll65,
      rate85:d.dRateAll85,
      year: d.year,
    }
  })

  drawAxes(scales, config)
  drawLine(data, scales, config)
  drawCircle(data, scales, config)
}
const getChartConfig = () => {
  const width = 800
  const height = 400
  const margin = {
    top: 50,
    left: 80,
    bottom: 40,
    right: 60,
  }

  const bodyWidth = width - margin.left - margin.right
  const bodyHeight = height - margin.top - margin.bottom
  const container = d3.select('#graph')
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
  const min = d3.min(dPop, (d) => d.dPopAllSum)

  const maxRate = d3.max(dPop, (d) => d.dRateAll85)
  const xScale = d3
    .scaleBand()
    .range([0, bodyWidth])
    .domain(dPop.map((d) => d.year))
    .padding(0.2)
  const yScale = d3
    .scaleLinear()
    .range([bodyHeight, 0])
    .domain([min - max / 10, max])
  const yRateScale = d3
    .scaleLinear()
    .range([bodyHeight, 0])
    .domain([0, maxRate])

  return { xScale, yScale, yRateScale }
}

const drawAxes = (scales, config) => {
  const { xScale, yScale, yRateScale } = scales
  const { container, margin, height, width } = config
  const axisX = d3.axisBottom(xScale)
  const axisY = d3.axisLeft(yScale)
  const axisYRate = d3.axisRight(yRateScale)

  container
    .append('g')
    .attr('id', 'axisX')
    .style(
      'transform',
      `translate(${margin.left}px,${height - margin.bottom}px)`
    )
    .style('font', '15px times')
    .call(axisX)

  container
    .append('g')
    .attr('id', 'axisY')
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .style('font', '15px times')
    .call(axisY)

  container
    .append('g')
    .attr('id', 'axisYRate')
    .style('transform', `translate(${width - margin.right}px,${margin.top}px)`)
    .style('font', '15px times')
    .style('stroke', 'red')
    .style('color', 'red')
    .call(axisYRate)
}

const drawLine = (data, scales, config) => {
  const { container, margin } = config
  const { xScale, yScale, yRateScale } = scales

  const path = container
    .append('path')
    .datum(data)
    .attr('id', 'line')
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

  const pathRate65 = container
    .append('path')
    .datum(data)
    .attr('id', 'lineRate65')
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

    const pathRate85 = container
    .append('path')
    .datum(data)
    .attr('id', 'lineRate85')
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value))

  const lineRate65 = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yRateScale(d.rate65))
    
    const lineRate85 = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yRateScale(d.rate85))

  path
    // .transition()
    // .duration(750)
    // .ease(d3.easeLinear)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('d', line)

  pathRate65
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 1)
    .attr('d', lineRate65)

    pathRate85
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 1)
    .attr('d', lineRate85)

}

const drawCircle = (data, scales, config) => {
  const { container, margin } = config
  const { xScale, yScale, yRateScale } = scales

  const circles = container.selectAll('circle').data(data).enter()
  circles
    .append('circle')
    .attr('id', 'circle')
    .attr('cx', (d) => xScale(d.year))
    .attr('cy', (d) => yScale(d.value))
    .attr('fill', 'black')
    .attr('r', 6)
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)
  
    circles
    .append('circle')
    .attr('id', 'circleRate65')
    .attr('cx', (d) => xScale(d.year))
    .attr('cy', (d) => yRateScale(d.rate65))
    .attr('fill', 'red')
    .attr('r', 6)
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

    circles
    .append('circle')
    .attr('id', 'circleRate85')
    .attr('cx', (d) => xScale(d.year))
    .attr('cy', (d) => yRateScale(d.rate85))
    .attr('fill', 'blue')
    .attr('r', 6)
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

  const texts = container.append('g').selectAll('text').data(data).enter()
  texts
    .append('text')
    .attr('id', 'circle')
    .attr('x', (d) => xScale(d.year) - 30)
    .attr('y', (d) => yScale(d.value) + 30)
    .text((d) => d.value + '人')
    .style('font-size', (d) => {
      if (d.value > 100000) return '14px'
      else return '20px'
    })
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

  texts
    .append('text')
    .attr('id', 'circleRate65')
    .attr('x', (d) => xScale(d.year) - 10)
    .attr('y', (d) => yRateScale(d.rate65) - 20)
    .text((d) => d3.format('.0f')(d.rate65 * 100) + '%')
    .style('font-size', '20px')
    .style('fill', 'red')
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)

    texts
    .append('text')
    .attr('id', 'circleRate85')
    .attr('x', (d) => xScale(d.year) - 10)
    .attr('y', (d) => yRateScale(d.rate85) - 20)
    .text((d) => d3.format('.0f')(d.rate85 * 100) + '%')
    .style('font-size', '20px')
    .style('fill', 'blue')
    .style('transform', `translate(${margin.left + 30}px,${margin.top}px)`)
}
