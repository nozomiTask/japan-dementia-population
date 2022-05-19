import * as d3 from 'd3'
import { drawDMap } from './drawDMap'
import { showTooltip } from './tooltips'
export const drawDChart = (
  data,
  selectedArea,
  index,
  prefecture,
  setPrefecture,
  setCity
) => {
  d3.select('#chartBar' + index).remove()
  d3.select('#chartAxisX' + index).remove()
  d3.select('#chartAxisY' + index).remove()

  const { geoData, dPop } = data
  let config = getDChartConfig(index)
  let scales = getDChartScales(dPop, config)
  drawBarsDChart(
    data,
    scales,
    config,
    selectedArea,
    index,
    prefecture,
    setPrefecture,
    setCity
  )
  drawAxesDChart(scales, config, index)
}

const getDChartConfig = (index) => {
  let width = 350
  let height = 400
  let margin = {
    top: 10,
    bottom: 40,
    left: 60,
    right: 10,
  }
  const bodyHeight = height - margin.top - margin.bottom
  const bodyWidth = width - margin.left - margin.right
  const container = d3.select('#chart' + index)

  container.attr('width', width).attr('height', height)

  return { width, height, margin, bodyHeight, bodyWidth, container }
}

const getDChartScales = (dPop, config) => {
  const { bodyWidth, bodyHeight } = config
  const maximunCount = d3.max(dPop, (d) => d.dPopAllSum)
  const xScale = d3.scaleLog().range([1, bodyWidth]).domain([1, maximunCount])
  const yScale = d3
    .scaleBand()
    .range([0, bodyHeight])
    .domain(dPop.map((a) => a.area))
    .padding(0.2)

  return { xScale, yScale }
}

const drawBarsDChart = (
  data,
  scales,
  config,
  selectedArea,
  index,
  prefecture,
  setPrefecture,
  setCity
) => {
  const { geoData, dPop } = data
  const { margin, bodyHeight, bodyWidth, container } = config // this is equivalent to 'let margin = config.margin; let container = config.container'
  const { xScale, yScale } = scales

  const body = container
    .append('g')
    .attr('id', 'chartBar' + index)
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)

  const bars = body
    .selectAll('rect')
    .data(dPop)

  bars
    .enter()
    .append('rect')
    .attr('height', yScale.bandwidth())
    .attr('y', (d) => yScale(d.area))
    .attr('width', (d) => xScale(d.dPopAllSum))
    .attr('fill', (d) => {
      if (d.area === selectedArea) return 'red'
      return '#2a5599'
    })

    .on('mouseenter', function (d) {
      d3.select(this).attr('fill', 'red')

      const selectedArea = d.area
      d3.select('#viewBox' + index).remove()
      drawDMap(data, selectedArea, index, prefecture, setPrefecture, setCity)
      showTooltip(d, index)
    })
    .on('mouseleave', function (d) {
      d3.select(this).attr('fill', '#2a5599')
    })
}

const drawAxesDChart = (scales, config, index) => {
  let { xScale, yScale } = scales
  let { container, margin, height } = config
  let axisX = d3.axisBottom(xScale).ticks(4).tickFormat(d3.format(",.0f"))

  container
    .append('g')
    .attr('id', 'chartAxisX' + index)
    .style(
      'transform',
      `translate(${margin.left}px,${height - margin.bottom}px)`
    )
    .style('font', '10px times')
    .call(axisX)

  let axisY = d3.axisLeft(yScale)

  container
    .append('g')
    .attr('id', 'chartAxisY' + index)
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .style('font', '7px times')
    .call(axisY)
}
