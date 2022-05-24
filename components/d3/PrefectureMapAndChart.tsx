import React, { useEffect, useRef, useState } from 'react'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { prefectureList } from '../../tools/prefectureList'
import { arrangeData } from '../../tools/arrangeData'
import * as d3 from 'd3'
import { drawDTable } from '../../tools/drawDTable'
import { prefCheck } from './SelectedAreaGraph'
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

  const [chartPrefectureOrNot, setChartPrefectureOrNot] = useState(true)
  useEffect(() => {
    // prefecture !== "" && city !==""
    const check = prefCheck(suikei, prefecture, city)
    if (check) {
      const index = 'prefecture'
      const dPop_ = arrangeData(
        index,
        suikei,
        prevalence,
        prefecture,
        city
      ).filter((d) => d.year === '2020年')
      let order = 0
      const dPop = dPop_
        .sort((a, b) => d3.descending(a.dPopAllSum, b.dPopAllSum))
        .map((d) => {
          order += 1
          d.order = order
          return d
        })

      // if (dPop.length > 50) setChartPrefectureOrNot(false)

      if (geoJsonPrefecture) {
        const prefNo1 = prefectureList[prefecture]
        const prefNo2 = Object.keys(geoJsonPrefecture.objects)[0]
        if (prefNo1 === prefNo2) {
          const data = { geoJsonPrefecture, dPop, index }
          drawDMap(data, prefecture, setPrefecture, city, setCity)
          chartPrefectureOrNot
            ? drawDChart(data, prefecture, setPrefecture, city, setCity)
            : drawDTable(data, prefecture, setPrefecture, city, setCity)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    prefecture,
    city,
    chartPrefectureOrNot,
    suikei,
    prevalence,
    geoJsonPrefecture,
  ])

  const changePrefctureTable = () => {
    setChartPrefectureOrNot(!chartPrefectureOrNot)
  }
  return (
    <>
      <div className="mt-10 flex shadow-2xl">
        <div>
          <span className="ml-20 text-2xl text-center">{'    '} 市区町村</span>
          {chartPrefectureOrNot && (
            <svg
              id="chartprefecture"
              className="border-solid border-2 border-black"
              width="400"
              height="400"
            ></svg>
          )}{' '}
          {!chartPrefectureOrNot && (
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
        onClick={changePrefctureTable}
      >
        切替
      </button>
    </>
  )
}

export default PrefectureMap
