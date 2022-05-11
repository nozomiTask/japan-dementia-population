import * as d3 from 'd3'
import { arrangeData } from './arrangeData'

export const drawJapanChart = (ref1, suikei, prevalence_) => {
  console.log('prevalence', prevalence_)
  console.log('suikei', suikei)
  const prevalence = arrangeData(suikei, prevalence_)
}

const getChartConfig = (ref) => {
  let width = 350
  let height = 400
  let margin = {
    top: 10,
    bottom: 50,
    left: 130,
    right: 10,
  }
  let bodyHeight = height - margin.top - margin.bottom
  let bodyWidth = width - margin.left - margin.right
  let container = d3
    .select(ref.current)
    .attr('width', width)
    .attr('height', height)

  return { width, height, margin, bodyHeight, bodyWidth, container }
}
