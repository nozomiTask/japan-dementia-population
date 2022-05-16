import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangePrefectureData } from '../../tools/arrangePrefectureData'

const PrefectureMap = ({
  suikei,
  geoJsonPrefecture,
  prevalence,
  prefecture,
  setCity,
}) => {



  const [geoData, setgGeoData] = useState(geoJsonPrefecture.features)
  const refMap = useRef(null)
  const refChart = useRef(null)

  useEffect(() => {
    const dPop = arrangePrefectureData(suikei, prevalence, prefecture)
    const selectedArea = ''
    const ref = { refMap, refChart }
    const data = { geoJsonPrefecture, geoData, dPop }
    const index = 'prefecture'
    !!refMap && !!geoData && drawDMap(ref, data, selectedArea, index)
    !!refChart &&
      !!suikei &&
      !!prevalence &&
      drawDChart(ref, data, selectedArea, index)
    selectedArea && selectedArea !== '' && setCity(selectedArea)
  }, [geoData, geoJsonPrefecture, prevalence, suikei])
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
