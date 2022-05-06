import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
// https://github.com/smartnews-smri/japan-topography
// より　日本地図
const url =
  'https://raw.githubusercontent.com/smartnews-smri/japan-topography/main/data/municipality/topojson/s0010/N03-21_210101.json'

const JapanMap01 = () => {
  const d3Map = useRef(null)

  const [japan, setJapan] = useState(null)

  useEffect(() => {
    const setting = async () => {
      setJapan(await d3.json(url))
    }
    setting()

    return () => setJapan(null)
  }, [])

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 30 }
    const width =
      parseInt(d3.select('#d3JapanMap').style('width')) -
      margin.left -
      margin.right
    const height =
      parseInt(d3.select('#d3JapanMap').style('height')) -
      margin.top -
      margin.bottom

    if (japan) {
      console.log('japan', japan)

      const svg = d3
        .select(d3Map.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background', 'lightgreen')

      console.log(`svg.node() ${svg.node()}`)

      const g = svg.append('g')

      g.append('g')
        .append('rect')
        .attr('x', '10px')
        .attr('y', '10px')
        .attr('width', width + margin.left + margin.right - 20)
        .attr('height', height + margin.top + margin.bottom - 20)
        .attr('fill', '#eef')

      const projection = d3
        .geoConicConformal()
        .parallels([33, 44]) // 標準緯線　北緯33°及び北緯44°
        .rotate([-135, 0]) // 中央子午線　東経135°
        .scale(width)
        .center([0, 36])
        .translate([width / 2, height * 0.9])
        .scale(800)

      const path = d3.geoPath(projection)

      //land
      g.append('g')
        .attr('fill', '#fff')
        .append('path')
        .attr(
          'd',
          path(topojson.merge(japan, japan.objects['N03-21_210101'].geometries))
        )
    }
  }, [japan])

  return (
    <div id="d3JapanMap" className="container">
      <svg ref={d3Map}></svg>
    </div>
  )
}

export default JapanMap01
