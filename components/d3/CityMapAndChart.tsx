import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeCityData } from '../../tools/arrangeCityData'
import { drawLChart } from '../../tools/drawLongitudinalChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const CityMap = ({ suikei, geoJson, prevalence, prefecture, city }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)

  useEffect(() => {
    const index = 'city'
    const dPop = arrangeData(suikei, prevalence, prefecture, city, index)
    const selectedArea = ''
    const data = { geoData, dPop }
    if (dPop.length > 0 && dPop[0].area === city) {
      drawLChart(dPop, prefecture, city, index)
    }
    // !!refMap && !!geoData && drawDMap(ref, data, selectedArea, index)
    // !!refChart &&
    //   !!suikei &&
    //   !!prevalence &&
    //   drawDChart(ref, data, selectedArea, index)
  }, [city])
  return (
    <>
      <div className="flex ">
        <div>
          <h2 id="titlecity" className="text-2xl text-center">
            市区町村
          </h2>
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

export default CityMap
