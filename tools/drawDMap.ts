import * as d3 from 'd3'
import { drawDChart } from './drawDChart'
import { prefectureList } from './prefectureList'
import * as topojson from 'topojson-client'
import { centerXY } from './centerXY'
import { showTooltip } from './tooltips'
// import { drag } from 'd3-drag'
import { zoom } from 'd3-zoom'

export const drawDMap = (data, prefecture, setPrefecture, city, setCity) => {
  const { index, dPop } = data

  d3.select('#label-group' + index).remove()
  d3.select('#viewBox' + index).remove()

  const width = 400 // 描画サイズ: 幅
  const height = 400 // 描画サイズ: 高さ
  // const centerPos = [137.0, 38.2] // 地図のセンター位置
  let centerPos = null
  let geoData_ = null
  let scale = null
  if (prefecture !== '' && index === 'prefecture') {
    const prefNo = prefectureList[prefecture]
    const obj = data.geoJsonPrefecture?.objects[prefNo]
    const geoData__ = topojson.feature(data.geoJsonPrefecture, obj).features
    geoData_ = geoData__ //.filter((g) => g.properties.N03_003 === null)
    centerPos = centerXY(geoData_)
    scale = 10000
    if (index === 'prefecture' && prefecture === '北海道') scale = 2500
  }
  // if (centerPos[0]===NaN)
  if (index === 'all') {
    centerPos = [137.0, 38.2]
    geoData_ = data.geoData
    scale = 1000 // 地図のスケール
  }

  // 地図の投影設定
  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height / 2])
    .scale(scale)

  // 地図をpathに投影(変換)
  const path = d3.geoPath().projection(projection)

  // SVG要素を追加
  const svg = d3
    .select('#map' + index)
    .append(`svg`)
    .attr(`viewBox`, `0 0 ${width} ${height}`)
    .attr(`width`, `100%`)
    .attr(`height`, `100%`)
    .attr('id', 'viewBox' + index)
    .attr('cursor', 'grab')

  const map = svg
    .selectAll(`path`)
    .data(geoData_)
    .enter()
    .append(`path`)
    .attr(`d`, path)
    .attr(`stroke`, `#666`)
    .attr(`stroke-width`, 0.25)
    .attr('id', 'mapArea' + index)
    .attr(`fill`, (d) => {
      const getAreaNameFromTopojson = getAreaName(index, d, prefecture)
      let filledColor = null
      if (index === 'all')
        filledColor = getAreaNameFromTopojson === prefecture ? 'red' : `#2a5599`
      if (index === 'prefecture')
        filledColor = getAreaNameFromTopojson === city ? 'red' : `#2a5599`
      return filledColor
    })
    .attr(`fill-opacity`, (item: any) => {
      // メモ
      // item.properties.name_ja に都道府県名が入っている
      let sArea = getAreaName(index, item, prefecture)

      const opac_ = data.dPop.find((d) => sArea === d.area)
      const opac = opac_ ? opac_.dPopAllSum : 0

      // 透明度を指定する (0.0 - 1.0)
      const max = d3.max(data.dPop, (d) => +d.dPopAllSum)
      return Math.sqrt(opac / max)
    })

    /**
     * 都道府県領域の MouseOver イベントハンドラ
     */
    // .on(`mouseover`, function (item: any) {
    .on(`click`, function (item: any) {
      d3.selectAll('#mapArea' + index).attr('fill', '#2566CC')

      displayLabel(item, svg, data, prefecture, setPrefecture, city, setCity)
      let sArea = getAreaName(index, item, prefecture)
      if (index === 'all') {
        setPrefecture(sArea)
        setCity('')
      }
      if (index === 'prefecture') {
        setPrefecture(prefecture)
        setCity(sArea)
      }
      const dd = dPop.find((dp) => dp.area === sArea)
      showTooltip(dd, index)
      // マウス位置の都道府県領域を赤色に変更
      // d3.select(this).attr(`fill`, `#CC4C39`)
      d3.select(this).attr(`fill`, `red`)
      // d3.select(this).attr(`stroke-width`, `1`)
    })

  const drag = d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
  const zoom = d3.zoom().on('zoom', zoomed)

  svg.call(drag)
  svg.call(zoom)

  function dragstarted() {
    d3.select(this).raise() //this があるからアロー関数はダメ
    svg.attr('cursor', 'grabbing')
  }

  function dragged(event, d) {
    const tl = projection.translate()
    projection.translate([tl[0] + d3.event.dx, tl[1] + d3.event.dy])
    const path = d3.geoPath().projection(projection)
    map.attr('d', path)
  }

  function dragended() {
    svg.attr('cursor', 'grab')
  }

  //https://www.kabuku.co.jp/developers/how-to-enable-zoom-in-svg
  function zoomed() {
    const VB = d3.select('#viewBox' + index)
    const [minX_, minY_, width_, height_] = VB.attr('viewBox').split(' ')
    const [minX, minY, width, height] = [+minX_, +minY_, +width_, +height_]
    const { x, y, k } = d3.event.transform
    // 大きさをscale倍する
    let zoomedWidth = width * k
    let zoomedHeight = height * k

    //変化の制限
    if (zoomedWidth > 800) {
      zoomedWidth = 800
      zoomedHeight = 800
    }
    if (zoomedWidth < 200) {
      zoomedWidth = 200
      zoomedHeight = 200
    }
    console.log(`width ${width} height ${height} k ${k} `)
    console.log(`zoomedWidth ${zoomedWidth} zoomedHeight ${zoomedHeight}`)

    // 中心の座標を計算する
    const centerX = minX + width / 2.0
    const centerY = minY + height / 2.0
    // scale倍したあとのmin-xとmin-yを計算する
    const zoomedMinX = centerX - zoomedWidth / 2.0
    const zoomedMinY = centerY - zoomedHeight / 2.0
    const zoomedViewBox = [
      zoomedMinX,
      zoomedMinY,
      zoomedWidth,
      zoomedHeight,
    ].join(' ')
    VB.attr('viewBox', zoomedViewBox)
  }

  /**
   * 都道府県領域の MouseMove イベントハンドラ
   */
  // .on('mousemove', function (item: any) {
  // adjustLocation(svg, index)
  // })

  /**
   * 都道府県領域の MouseOut イベントハンドラ
   */
  // .on(`mouseout`, function (item: any) {
  //   eraseLabel(svg, index)

  //   // マウス位置の都道府県領域を青色に戻す
  //   d3.select(this).attr(`fill`, `#2566CC`)
  //   d3.select(this).attr(`stroke-width`, `0.25`)
  // })
}

// イベントハンドラー処理
// mouseleave
const eraseLabel = (svg, index) => {
  // ラベルグループを削除
  try {
    svg.select('#label-group' + index).remove()
  } catch (e) {}
}

//mousemove
const adjustLocation = (svg, index) => {
  // テキストのサイズ情報を取得
  const textSize = svg
    .select('#label-text' + index)
    .node()
    .getBBox()

  // マウス位置からラベルの位置を指定
  const labelPos = {
    x: d3.event.offsetX - textSize.width,
    y: d3.event.offsetY - textSize.height,
  }

  // ラベルの位置を移動
  svg
    .select('#label-group' + index)
    .attr(`transform`, `translate(${labelPos.x}, ${labelPos.y})`)
}

// mouseover or click
const displayLabel = (
  item,
  svg,
  data,
  prefecture,
  setPrefecture,
  city,
  setCity
) => {
  const { index, dPop } = data
  // ラベル用のグループ
  const group = svg.append(`g`).attr(`id`, `label-group` + index)

  // 地図データから都道府県名を取得する
  let sArea = getAreaName(index, item, prefecture)

  const label = sArea

  if (index === 'all') setPrefecture(label)
  if (index === 'prefcture') setCity(label)

  //チャートへの書き入れ
  drawDChart(data, prefecture, setPrefecture, city, setCity)
  const dd = dPop.find((d) => d.area === label)
  dd && showTooltip(dd, index)

  // 矩形を追加: テキストの枠
  // const rectElement = group
  //   .append(`rect`)
  //   .attr(`id`, `label-rect` + index)
  //   .attr(`stroke`, `#666`)
  //   .attr(`stroke-width`, 0.5)
  //   .attr(`fill`, `#fff`)

  // テキストを追加
  // const textElement = group
  //   .append(`text`)
  //   .attr(`id`, `label-text` + index)
  //   .text(label)

  // テキストのサイズから矩形のサイズを調整
  // const padding = { x: 5, y: 0 }
  // const textSize = textElement.node().getBBox()
  // rectElement
  //   .attr(`x`, textSize.x - padding.x)
  //   .attr(`y`, textSize.y - padding.y)
  //   .attr(`width`, textSize.width + padding.x * 2)
  //   .attr(`height`, textSize.height + padding.y * 2)
}

const getAreaName = (index, d, prefecture) => {
  let ret = null
  if (index === 'all') ret = d.properties.name_ja
  if (index === 'prefecture') {
    if (prefecture !== '東京都' && d.properties.N03_003) {
      ret = d.properties.N03_003
    } else ret = d.properties.N03_004
  }
  return ret
}
