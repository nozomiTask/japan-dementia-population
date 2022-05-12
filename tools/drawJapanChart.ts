import * as d3 from 'd3'
import { arrangeData } from './arrangeData'

export const drawDementiaChart = (ref1, suikei, prevalence_) => {
  // console.log('prevalence', prevalence_)
  // console.log('suikei', suikei)
  const dPop = arrangeData(suikei, prevalence_)
  drawDChart(dPop, ref1)
}

const drawDChart = (dPop, ref) => {
  let config = getDChartConfig(ref)
  let scales = getDChartScales(dPop, config)
  drawBarsDChart(dPop, scales, config)
  drawAxesDChart(dPop, scales, config)
}

const getDChartConfig = (ref) => {
  let width = 350
  let height = 400
  let margin = {
    top: 10,
    bottom: 50,
    left: 130,
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

const drawBarsDChart = (dPop, scales, config) => {
  let { margin, container } = config // this is equivalent to 'let margin = config.margin; let container = config.container'
  let { xScale, yScale } = scales
  let body = container
    .append('g')
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)

  let bars = body
    .selectAll('.bar')
    //TODO: Use the .data method to bind the airlines to the bars (elements with class bar)
    .data(dPop)

  //Adding a rect tag for each airline
  bars
    .enter()
    .append('rect')
    .attr('height', yScale.bandwidth())
    .attr('y', (d) => yScale(d.area))
    //TODO: set the width of the bar to be proportional to the airline count using the xScale
    .attr('width', (d) => xScale(d.dPopAllSum))
    .attr('fill', '#2a5599')

    // assignment 2

    .on('mouseenter', function (d) {
      // <- this is the new code
      //TODO: call the drawRoutes function passing the AirlineID id 'd'
      // drawRoutes(d.AirlineID, routes, ref1)
      //TODO: change the fill color of the bar to "#992a5b" as a way to highlight the bar. Hint: use d3.select(this)
      d3.select(this).attr('fill', '#992a5b')
    })
    //TODO: Add another listener, this time for mouseleave

    //TODO: In this listener, call drawRoutes(null), this will cause the function to remove all lines in the chart since there is no airline withe AirlineID == null.
    //TODO: change the fill color of the bar back to "#2a5599"
    .on('mouseleave', function (d) {
      d3.select(this).attr('fill', '#2a5599')
      // drawRoutes(null, routes, ref1)
    })
}

const drawAxesDChart = (dPop, scales, config) => {
  let { xScale, yScale } = scales
  let { container, margin, height } = config
  let axisX = d3.axisBottom(xScale).ticks(5)

  container
    .append('g')
    .style(
      'transform',
      `translate(${margin.left}px,${height - margin.bottom}px)`
    )
    .style("font", "7px times")
    .call(axisX)

  let axisY = d3
    //TODO: Create an axis on the left for the Y scale

    .axisLeft(yScale)

  //TODO: Append a g tag to the container,
  // translate it based on the margins
  // and call the axisY axis to draw the left axis.
  container
    .append('g')
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .style("font", "7px times")
    .call(axisY)
}
