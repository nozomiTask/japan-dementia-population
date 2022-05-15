import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeData } from '../../tools/arrangeData'
import { arrangeCityData } from '../../tools/arrangeCityData'
import { arrangePrefectureData } from '../../tools/arrangePrefectureData'

const PrefectureMap = ({ suikei, geoJson, prevalence, prefecture, setCity }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)
  const refMap = useRef(null)
  const refChart = useRef(null)

  useEffect(() => {
    const dPop = arrangePrefectureData(suikei, prevalence, prefecture)
    const selectedArea = ''
    const ref = { refMap, refChart }
    const data = { geoData, dPop }
    !!refMap && !!geoData && drawDMap(ref, data, selectedArea)
    !!refChart &&
      !!suikei &&
      !!prevalence &&
      drawDChart(ref, data, selectedArea)
      selectedArea && selectedArea !== '' && setCity(selectedArea)
  }, [geoData, geoJson, prevalence, suikei])
  return (
    <>
      <div className="flex ">
        <div>
          <h2 className="text-2xl text-center">グラフ</h2>
          <svg
            id="chartPrefecture"
            ref={refChart}
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="mapPrefecture"
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

export default PrefectureMap
