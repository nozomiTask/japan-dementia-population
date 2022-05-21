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
  city,
  setCity,
}) => {
  interface PREFECTURECITIES {
    prefecture: string
    cities: string[]
  }

  const [geoData, setGeoData] = useState(null)
  const [chartOrNot, setChartOrNot] = useState(true)
  const [table, setTable] = useState<PREFECTURECITIES>(null)
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

    const cities = dPop.map((d) => d.area)
    cities.length > 70 ? setChartOrNot(false) : setChartOrNot(false)
    const table: PREFECTURECITIES = {
      prefecture: prefecture,
      cities: cities,
    }

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonPrefecture, prefecture])
  return (
    <>
      <div className="flex ">
        <div className="flex-col">
          <h2 className="text-2xl text-center">都道府県</h2>
          {chartOrNot && (
            <svg
              id="chartprefecture"
              className="border-solid border-2 border-black"
              width="400"
              height="400"
            ></svg>
          )}{' '}
        </div>
        {!chartOrNot && (
          <div
            className="border-solid border-2 border-black"
            width="350"
            height="400"
          >
            chart@@@@
          </div>
        )}
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
    </>
  )
}

export default PrefectureMap
