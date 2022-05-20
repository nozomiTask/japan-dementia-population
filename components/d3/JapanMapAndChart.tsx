import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const JapanMapAndChart = ({
  suikei,
  geoJson,
  prevalence,
  prefecture,
  setPrefecture,
  city,
  setCity,
}) => {
  const [geoData, setGeoData] = useState(geoJson.features)

  useEffect(() => {
    const index = 'all'
    const dPop__ = arrangeData(suikei, prevalence, '', '', index)
    const dPop_ = dPop__.filter((d) => d.year === '2020年')
    let order = 0
    const dPop = dPop_
      .sort((a, b) => d3.descending(a.dPopAllSum, b.dPopAllSum))
      .map((d) => {
        order += 1
        d.order = order
        return d
      })

    const data = { geoJson, geoData, dPop }
    drawDMap(data, index, '', setPrefecture, '', setCity)
    drawDChart(data, index, '', setPrefecture, '', setCity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData, geoJson, prevalence, suikei])
  return (
    <>
      <div id="map-container"></div>
      <div className="flex ">
        <div>
          <h2 className="text-2xl text-center">全国</h2>
          <svg
            id="chartall"
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="mapall"
            className="bar border-solid border-2 border-black"
            width="400"
            height="400"
          >
            {' '}
          </svg>
        </div>
      </div>
    </>
  )
}

export default JapanMapAndChart
