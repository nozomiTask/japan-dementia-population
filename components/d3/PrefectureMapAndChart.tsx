import React, { useEffect, useRef, useState } from 'react'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { prefectureList } from '../../tools/prefectureList'
import { arrangeData } from '../../tools/arrangeData'
import * as d3 from 'd3'
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
    const index = 'prefecture'

    const dPop_ = arrangeData(suikei, prevalence, prefecture, index).filter(
      (d) => d.year === '2020年'
    )
    let order = 0
    const dPop = dPop_
      .sort((a, b) => d3.descending(a.dPopAllSum, b.dPopAllSum))
      .map((d) => {
        order += 1
        d.order = order
        return d
      })

    const selectedArea = ''
    const data = { geoJsonPrefecture, geoData, dPop }

    if (geoJsonPrefecture) {
      const prefNo1 = prefectureList[prefecture]
      const prefNo2 = Object.keys(geoJsonPrefecture.objects)[0]

try{
  d3.select("#chart"+index).remove()
}catch(e){}

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
