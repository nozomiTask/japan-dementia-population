import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeData } from '../../tools/arrangeData'
import { drawDTable } from '../../tools/drawDTable'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const JapanMapAndChart = ({
  suikei,
  geoJson,
  prevalence,
  prefecture,
  setPrefecture,
  city,
  setCity,
  loadingPrefecture,
  setLoadingPrefecture,
}) => {
  const [geoData, setGeoData] = useState(geoJson.features)
  const [chartOrNot, setChartOrNot] = useState(true)

  useEffect(() => {
    //
    const index = 'all'
    const dPop__ = arrangeData(index, suikei, prevalence, prefecture, city)
    if (dPop__) {
      const dPop_ = dPop__.filter((d) => d.year === '2020年')
      let order = 0
      const dPop = dPop_
        .sort((a, b) => d3.descending(a.dPopAllSum, b.dPopAllSum))
        .map((d) => {
          order += 1
          d.order = order
          return d
        })
      const index = 'all'
      const data = { geoData, dPop, index }
      if (geoData) {
        drawDMap(
          data,
          prefecture,
          setPrefecture,
          '',
          setCity,
          loadingPrefecture,
          setLoadingPrefecture
        )
      }
      chartOrNot
        ? drawDChart(
            data,
            prefecture,
            setPrefecture,
            city,
            setCity,
            loadingPrefecture,
            setLoadingPrefecture
          )
        : drawDTable(
            data,
            prefecture,
            setPrefecture,
            city,
            setCity,
            loadingPrefecture,
            setLoadingPrefecture
          )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    prevalence,
    suikei,
    geoJson,
    geoData,
    chartOrNot,
    prefecture,
    loadingPrefecture,
  ])

  const changeTable = () => {
    setChartOrNot(!chartOrNot)
  }
  return (
    <>
      <div id="map-container"></div>

      <div className="mt-10 flex ">
        <div>
          <span className="ml-20 text-2xl text-center">{'    '} 都道府県</span>
          {chartOrNot && (
            <svg
              id="chartall"
              className="border-solid border-2 border-black   shadow-2xl"
              width="400"
              height="400"
            ></svg>
          )}{' '}
          {!chartOrNot && (
            <svg
              id="tableall"
              className="border-solid border-2 border-black  shadow-2xl"
              width="400"
              height="400"
            ></svg>
          )}
        </div>
        <div>
          <h2 id="titlemapall" className="text-2xl text-center">
            地図
          </h2>
          <svg
            id="mapall"
            className="bar border-solid border-2 border-black  shadow-2xl"
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

export default JapanMapAndChart
