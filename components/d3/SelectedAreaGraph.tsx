import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawDMap } from '../../tools/drawDMap'
import { drawDChart } from '../../tools/drawDChart'
import { arrangeCityData } from '../../tools/arrangeCityData'
import { drawLChart } from '../../tools/drawLongitudinalChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

export const prefCheck = (suikei, prefecture, city): boolean => {
  let ret: boolean = false
  if (prefecture === '' || city === '') return true
  const pref = suikei
    .filter((s) => s['都道府県'] === prefecture && s['年'] === '2020年')
    .map((ss) => ss['市区町村'])

  return pref.indexOf(city) !== -1
}

const SelectedAreaGraph = ({
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
    if (prefCheck(suikei, prefecture, city)) {
      let index = ''
      if (prefecture === '' && city === '') index = 'alljapan'
      if (prefecture !== '' && city === '') index = 'all'
      if (prefecture !== '' && city !== '') index = 'prefecture'

      const dPop = arrangeData(index, suikei, prevalence, prefecture, city)
      if (dPop.length > 0) {
        if (index === 'alljapan') drawLChart(dPop, prefecture, city)
        if (index === 'all')
          drawLChart(
            dPop.filter((d) => d.area === prefecture),
            prefecture,
            city
          )
        if (index === 'prefecture')
          drawLChart(
            dPop.filter((d) => d.area === city),
            prefecture,
            city
          )
      }
    }
  }, [prefecture, city, suikei, prevalence])

  const japan = () => {
    setPrefecture('')
    setCity('')
  }
  return (
    <>
      <button
        className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => japan()}
      >
        全国表示ボタン
      </button>{' '}
      <div className="flex ">
        <div className="mt-8 text-2xl text-center">
          <h2 id="title"></h2>
          <svg id="graph" className="border-solid border-2 border-black"></svg>
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

export default SelectedAreaGraph
