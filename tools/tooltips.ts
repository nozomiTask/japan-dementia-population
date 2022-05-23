import * as d3 from 'd3'
import { drawDMap } from './drawDMap'
export const showTooltip = (d, index) => {
  d3.select('#tooltip' + index).remove()

  if (d) {
    const html =
      d.order +
      '位 ' +
      d.area +
      ' ' +
      Math.floor(d.dPopAllSum) +
      '人(' +
      d.year +
      ')'
    const group = d3
      .select('#viewBox' + index)
      .append(`g`)
      .attr(`id`, `tooltip` + index)

    const rectElemnt = group
      .append('rect')
      .attr('stroke', '#666')
      .attr('stroke-width', 0.5)
      .attr('background-color', '#fff')

    const textElement = group
      .append('text')
      .html(html)
      .attr('x', '10')
      .attr('y', '20')
      .attr('width', '200')
      .attr('height', '20')
  }
}
