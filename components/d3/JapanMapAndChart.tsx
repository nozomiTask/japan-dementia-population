import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const JapanMapAndChart = ({ suikei, geoJson, prevalence, setPrefecture }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)
  const refMap = useRef(null)
  const refChart = useRef(null)

  useEffect(() => {
    const dPop = arrangeData(suikei, prevalence)
    const selectedArea = ''
    const ref = { refMap, refChart }
    const data = { geoJson, geoData, dPop }
    const index = 'all'
    !!refMap && !!geoData && drawDMap(ref, data, selectedArea, index, '')
    !!refChart &&
      !!suikei &&
      !!prevalence &&
      drawDChart(ref, data, selectedArea, index, "")
    selectedArea && selectedArea !== '' && setPrefecture(selectedArea)
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
          <h2 className="text-2xl text-center">グラフ</h2>
          <svg
            id="chart"
            ref={refChart}
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="map"
            ref={refMap}
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
