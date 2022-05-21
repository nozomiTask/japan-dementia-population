import React, { useEffect, useRef, useState } from 'react'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { prefectureList } from '../../tools/prefectureList'
import { arrangeData } from '../../tools/arrangeData'
import * as d3 from 'd3'
import { drawDTable } from '../../tools/drawDTable'
const PrefectureMap = ({
  suikei,
  geoJsonPrefecture,
  prevalence,
  prefecture,
  setPrefecture,
  city,
  setCity,
}) => {
  interface PREFECTURECITIES {
    prefecture: string
    cities: string[]
  }

  const [geoData, setGeoData] = useState(null)
  const [chartOrNot, setChartOrNot] = useState(true)
  useEffect(() => {
    const index = 'prefecture'
    const dPop_ = arrangeData(suikei, prevalence, prefecture, '', index).filter(
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

    const data = { geoJsonPrefecture, geoData, dPop }

    if (geoJsonPrefecture) {
      const prefNo1 = prefectureList[prefecture]
      const prefNo2 = Object.keys(geoJsonPrefecture.objects)[0]

      prefNo1 === prefNo2 &&
        geoJsonPrefecture &&
        drawDMap(data, index, prefecture, setPrefecture, city, setCity)
      prefNo1 === prefNo2 &&
        geoJsonPrefecture &&
        chartOrNot &&
        drawDChart(data, index, prefecture, setPrefecture, city, setCity)
      prefNo1 === prefNo2 &&
        geoJsonPrefecture &&
        !chartOrNot &&
        drawDTable(data, index, prefecture, setPrefecture, city, setCity)
    }
  }, [
    prefecture,
    city,
    chartOrNot,
    suikei,
    prevalence,
    geoJsonPrefecture,
    geoData,
  ])

  const changeTable = () => {
    setChartOrNot(!chartOrNot)
  }
  return (
    <>
      <div className="flex ">
        <div>
          <span className="ml-20 text-2xl text-center">{'    '} 都道府県</span>
          {chartOrNot && (
            <svg
              id="chartprefecture"
              className="border-solid border-2 border-black"
              width="400"
              height="400"
            ></svg>
          )}{' '}
          {!chartOrNot && (
            <svg
              id="tableprefecture"
              className="border-solid border-2 border-black"
              width="400"
              height="400"
            ></svg>
          )}
        </div>
        <div>
          <h2 id="titlemapprefecture" className="text-2xl text-center">
            地図
          </h2>
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
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={changeTable}
      >
        切替
      </button>
    </>
  )
}

export default PrefectureMap
