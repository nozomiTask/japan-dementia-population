import * as d3 from 'd3'
import { showTooltip } from './tooltips'
export const drawDTable = (
  data,
  prefecture,
  setPrefecture,
  city,
  setCity,
  loadingPrefecture,
  setLoadingPrefecture
) => {
  const { index } = data
  d3.selectAll('#text' + index).remove()

  //   const { geoData, dPop } = data
  let config = getDChartConfig(index)
  drawDTableData(data, config, index, prefecture, setPrefecture, city, setCity)
}

const drawDTableData = (
  data,
  config,
  index,
  prefecture,
  setPrefecture,
  city,
  setCity
) => {
  const { container, margin } = config
  const { dPop } = data
  const cities = dPop.map((d) => d.area)

  const text = container.selectAll('text').data(cities).enter()

  const wAll = 320 //固定幅
  const hAll = 350 //固定高
  let w_ = 0 //横に配置したい個数
  let h_ = 0 //縦に配置したい個数
  let w = 0
  let h = 0
  let fontSize = 0

  const len = cities.length

  if (len <= 200) {
    w_ = 4 //横4つ
    h_ = 50 //縦50こ
    fontSize = 7
  }
  if (len <= 160) {
    w_ = 4 //横4つ
    h_ = 40 //縦50こ
    fontSize = 8
  }
  if (len <= 120) {
    w_ = 4 //横4つ
    h_ = 30 //縦50こ
    fontSize = 9
  }
  if (len <= 90) {
    w_ = 3 //横4つ
    h_ = 30 //縦50こ
    fontSize = 10
  }
  if (len <= 60) {
    w_ = 3 //横4つ
    h_ = 20 //縦50こ
    fontSize = 12
  }
  if (len <= 45) {
    w_ = 3 //横4つ
    h_ = 15 //縦50こ
    fontSize = 14
  }
  if (len <= 30) {
    w_ = 2 //横4つ
    h_ = 15 //縦50こ
    fontSize = 16
  }
  if (len <= 20) {
    w_ = 2 //横4つ
    h_ = 10 //縦50こ
    fontSize = 16
  }

  w = Math.floor(wAll / w_)
  h = Math.floor(hAll / h_)

  text
    .append('text')
    .attr('id', 'text' + index)
    .attr('x', (d, i) => w * Math.floor(i / h_))
    .attr('y', (d, i) => h * (i % h_))
    .attr('text-anchor', 'start')
    .text((d, i) => (i + 1).toString() + '位 ' + d)
    .style('transform', `translate(${margin.left}px,${margin.top}px)`)
    .attr('font-size', fontSize.toString() + 'px')
    .attr('fill', (d) => {
      let filledColor = null
      if (index === 'all') filledColor = d === prefecture ? 'red' : 'black'
      if (index === 'prefecture') filledColor = d === city ? 'red' : 'black'
      return filledColor
    })
    .on('click', function (d) {
      d3.select(this).attr('fill', 'red')
      if (index === 'all') {
        setPrefecture(d)
        setCity('')
      }
      if (index === 'prefecture') {
        setPrefecture(prefecture)
        setCity(d)
      }
      //   drawDMap(data, index, prefecture, setPrefecture, city_, setCity)
      const dd = dPop.find((dp) => dp.area === d)
      showTooltip(dd, index)
    })
  // .on('mouseleave', function (d) {
  //   d3.select(this).attr('fill', 'black')
  // })
}

const getDChartConfig = (index) => {
  let width = 400
  let height = 400
  let margin = {
    top: 35,
    bottom: 15,
    left: 15,
    right: 15,
  }
  const bodyHeight = height - margin.top - margin.bottom
  const bodyWidth = width - margin.left - margin.right
  const container = d3.select('#table' + index)

  container.attr('width', width).attr('height', height)

  return { width, height, margin, bodyHeight, bodyWidth, container }
}
