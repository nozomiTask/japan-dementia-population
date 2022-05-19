import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeCityData } from '../../tools/arrangeCityData'
import { drawLChart } from '../../tools/drawLongitudinalChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const CityChart = ({
  suikei,
  geoJson,
  prevalence,
  prefecture,
  setPrefecture,
  city,
  setCity,
}) => {
  const [geoData, setgGeoData] = useState(geoJson.features)

  useEffect(() => {
    const index = 'city'
    const dPop = arrangeData(suikei, prevalence, prefecture, city, index)

    if (dPop.length > 0 && dPop[0].area === city) {
      drawLChart(dPop, prefecture, city, index)
    }
  }, [prefecture, city])

  const japan = () => {
    setPrefecture('')
    setCity('全国')
  }
  return (
    <>
      <div className="flex ">
        <div className="mt-8 text-2xl text-center">
          <button className="btn-primary" onClick={() => japan()}>
            全国ボタン
          </button>
          <h2 id="titlecity"></h2>
          <svg
            id="chartcity"
            className="border-solid border-2 border-black"
          ></svg>
        </div>
        {/* <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="mapcity"
            className="bar border-solid border-2 border-black"
            width="400"
            height="400"
          >
            {' '}
          </svg>
        </div> */}
      </div>
    </>
  )
}

export default CityChart