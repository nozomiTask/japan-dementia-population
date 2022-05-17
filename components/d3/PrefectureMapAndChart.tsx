import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangePrefectureData } from '../../tools/arrangePrefectureData'
import { prefList } from '../../pages/dashboard/d3Japan'
import topojson from 'topojson-client'
import { prefectureList } from '../../tools/prefectureList'

const PrefectureMap = ({
  suikei,
  geoJsonPrefecture,
  prevalence,
  prefecture,
  setPrefecture,
  setCity,
}) => {
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    const dPop = arrangePrefectureData(suikei, prevalence, prefecture)
    const selectedArea = ''
    const data = { geoJsonPrefecture, geoData, dPop }
    const index = 'prefecture'
    if (geoJsonPrefecture) {
      const prefNo1 = prefectureList[prefecture]
      const prefNo2 = Object.keys(geoJsonPrefecture.objects)[0]
      prefNo1 === prefNo2 &&
        geoJsonPrefecture &&
        drawDMap(data, selectedArea, index, prefecture, setPrefecture, setCity)
      prefNo1 === prefNo2 &&
        geoJsonPrefecture &&
        drawDChart(
          data,
          selectedArea,
          index,
          prefecture,
          setPrefecture,
          setCity
        )
      selectedArea !== '' && setCity(selectedArea)
    }
  }, [geoJsonPrefecture, prefecture])
  return (
    <>
      <div className="flex ">
        <div>
          <h2 className="text-2xl text-center">都道府県</h2>
          <svg
            id="chartprefecture"
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="mapprefecture"
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
