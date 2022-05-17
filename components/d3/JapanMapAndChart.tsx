import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const JapanMapAndChart = ({ suikei, geoJson, prevalence, setPrefecture,setCity }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)

  useEffect(() => {
    const dPop = arrangeData(suikei, prevalence)
    const selectedArea = ''
    const data = { geoJson, geoData, dPop }
    const index = 'all'
    drawDMap(data, selectedArea, index, '', setPrefecture, setCity)
    drawDChart(data, selectedArea, index, '', setPrefecture, setCity)
    selectedArea !== '' && setPrefecture(selectedArea)
  }, [geoData, geoJson, prevalence, suikei])
  return (
    <>
      <div id="map-container">
        <a href="https://qiita.com/alclimb/items/31d4360c74a8f8935256">
          参考文献
        </a>
      </div>
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
