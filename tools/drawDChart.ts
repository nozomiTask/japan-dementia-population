import * as d3 from 'd3'
import { drawDMap } from './drawDMap'
import { showTooltip } from './tooltips'
export const drawDChart = (data, prefecture, setPrefecture, city, setCity) => {
  const { index } = data

  d3.select('#chartBar' + index).remove()
  d3.select('#chartAxisX' + index).remove()
  d3.select('#chartAxisY' + index).remove()

  const { dPop } = data
  let config = getDChartConfig(index)
  let scales = getDChartScales(dPop, config)
  drawBarsDChart(
    data,
    scales,
    config,
    index,
    prefecture,
    setPrefecture,
    city,
    setCity
  )
  drawAxesDChart(scales, config, index, prefecture, dPop)
}

const getDChartConfig = (index) => {
  let width = 400
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
  const min = Math.floor(maximunCount / 100)
  const xScale = d3.scaleLog().range([1, bodyWidth]).domain([10, maximunCount])
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
  index,
  prefecture,
  setPrefecture,
  city,
  setCity
) => {
  const { geoData, dPop } = data
  const { margin, bodyHeight, bodyWidth, container } = config // this is equivalent to 'let margin = config.margin; let container = config.container'
  const { xScale, yScale } = scales

  const body = container
    .append('g')
    .attr('id', 'chartBar' + index)
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)

  const bars = body.selectAll('rect').data(dPop)

  bars
    .enter()
    .append('rect')
    .attr('height', yScale.bandwidth())
    .attr('y', (d) => yScale(d.area))
    .attr('width', (d) => xScale(d.dPopAllSum))
    .attr('fill', (d) => {
      let filledColor = null
      if (index === 'all')
        filledColor = d.area === prefecture ? 'red' : '#2a5599'
      if (index === 'prefecture')
        filledColor = d.area === city ? 'red' : '#2a5599'
      return filledColor
    })

    .on('click', function (d) {
      d3.select(this).attr('fill', 'red')

      // d3.select('#viewBox' + index).remove()
      if (index === 'all') {
        setPrefecture(d.area)
        setCity('')
      } else if (index === 'prefecture') {
        // setPrefecture(prefecture)
        setCity(d.area)
      }
      // drawDMap(data, index, prefecture, setPrefecture, city, setCity)
      showTooltip(d, index)
    })
  // .on('mouseleave', function (d) {
  //   d3.select(this).attr('fill', '#2a5599')
  // })
}

const drawAxesDChart = (scales, config, index, prefecture, dPop) => {
  let { xScale, yScale } = scales
  let { container, margin, height } = config
  let axisX = d3.axisBottom(xScale).ticks(3).tickFormat(d3.format(',.0f'))

  const num = dPop.length
  let font = '12px times'
  if (num > 20) font = '10px times'
  if (num > 30) font = '8px times'
  if (num > 50) font = '6px times'
  if (num > 100) font = '5px times'
  if (num > 150) font = '2px times'
  // if (prefecture === '北海道' && index === 'prefecture') font = '2px times'
  // if (prefecture === '東京都' && index === 'prefecture') font = '5px times'

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
    .style('font', font)
    .call(axisY)
}
