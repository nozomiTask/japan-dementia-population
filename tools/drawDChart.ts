import * as d3 from 'd3'
import { drawDMap } from './drawDMap'
export const showTooltip = (d) => {
  // const x = coords[0]
  // const y = coords[1]
  const html =
    d.order +
    '位 ' +
    d.area +
    ' ' +
    Math.floor(d.dPopAllSum) +
    '人(' +
    d.year +
    ')'
  const group = d3.select('#viewBox').append(`g`).attr(`id`, `tooltip`)

  const rectElemnt = group
    .append('rect')
    .attr('stroke', '#666')
    .attr('stroke-width', 0.5)
    .attr('background-color', '#fff')

  const textElement = group
    .append('text')
    .html(html)
    .attr('x', '200')
    .attr('y', '350')
    .attr('width', '200')
    .attr('height', '50')
}

export const eraseTooltip = () => {
  d3.select('#tooltip').remove()
}

// export const drawDementiaChart = (ref, data, selectedArea) => {
//   // console.log('prevalence', prevalence_)
//   // console.log('suikei', suikei)
//   // const dPop = arrangeData(suikei, prevalence_)
//   drawDChart(ref, data, selectedArea)
// }

export const drawDChart = (ref, data, selectedArea) => {
  try {
    d3.selectAll('.chart').remove()
  } catch (e) {}
  const { refMap, refChart } = ref
  const { geoData, dPop } = data
  let config = getDChartConfig(refChart)
  // let configMap = getDChartConfig(ref)
  let scales = getDChartScales(dPop, config)
  drawBarsDChart(ref, data, scales, config, selectedArea)
  drawAxesDChart(scales, config)
}

const getDChartConfig = (ref) => {
  let width = 350
  let height = 400
  let margin = {
    top: 10,
    bottom: 40,
    left: 60,
    right: 10,
  }
  //The body is the are that will be occupied by the bars.
  let bodyHeight = height - margin.top - margin.bottom
  //TODO: Compute the width of the body by subtracting the left and right margins from the width.
  let bodyWidth = width - margin.left - margin.right
  //The container is the SVG where we will draw the chart. In our HTML is the svg ta with the id AirlinesChart

  let container = d3 //TODO: use d3.select to select the element with id AirlinesChart
    .select(ref.current)

  container
    .attr('width', width)
    //TODO: Set the height of the container
    .attr('height', height)

  return { width, height, margin, bodyHeight, bodyWidth, container }
}

const getDChartScales = (dPop, config) => {
  let { bodyWidth, bodyHeight } = config
  let maximunCount = d3
    //TODO: Use d3.max to get the highest Count value we have on the airlines list.
    .max(dPop, (d) => d.dPopAllSum)

  let xScale = d3
    .scaleLinear()
    //TODO: Set the range to go from 0 to the width of the body
    .range([0, bodyWidth])
    //TODO: Set the domain to go from 0 to the maximun value fount for the field 'Count'
    .domain([0, maximunCount])

  let yScale = d3
    .scaleBand()
    .range([0, bodyHeight])
    .domain(dPop.map((a) => a.area)) //The domain is the list of ailines names
    .padding(0.2)

  return { xScale, yScale }
}

const drawBarsDChart = (ref, data, scales, config, selectedArea) => {
  const { refMap, refChart } = ref
  const { geoData, dPop } = data

  const { margin, bodyHeight, bodyWidth, container } = config // this is equivalent to 'let margin = config.margin; let container = config.container'
  const { xScale, yScale } = scales

  const body = container
    .append('g')
    .attr('class', 'chart')
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)

  const bars = body
    .selectAll('.bar')
    //TODO: Use the .data method to bind the airlines to the bars (elements with class bar)
    .data(dPop)

  //Adding a rect tag for each airline
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

      // const coords = [d3.event.clientX, d3.event.clientY]

      const selectedArea = d.area
      d3.select('#viewBox').remove()
      drawDMap(ref, data, selectedArea)
      showTooltip(d)
    })
    .on('mouseleave', function (d) {
      d3.select(this).attr('fill', '#2a5599')
      eraseTooltip()
    })
}

const drawAxesDChart = (scales, config) => {
  let { xScale, yScale } = scales
  let { container, margin, height } = config
  let axisX = d3.axisBottom(xScale).ticks(5)

  container
    .append('g')
    .attr('class', 'chart')
    .style(
      'transform',
      `translate(${margin.left}px,${height - margin.bottom}px)`
    )
    .style('font', '10px times')
    .call(axisX)

  let axisY = d3
    //TODO: Create an axis on the left for the Y scale

    .axisLeft(yScale)

  //TODO: Append a g tag to the container,
  // translate it based on the margins
  // and call the axisY axis to draw the left axis.
  container
    .append('g')
    .attr('class', 'chart')
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .style('font', '7px times')
    .call(axisY)
}