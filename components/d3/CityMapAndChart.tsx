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
    let index = 'city'
    if (prefecture === '' && city === '') index = 'all'
    if (prefecture !== '' && city === '') index = 'prefectureall'
    if (prefecture !== '' && city !== '') index = 'city'
    if (prefecture === '' && city === '全国') index = 'all'
    if (prefCheck(suikei, prefecture, city)) {
      const dPop = arrangeData(suikei, prevalence, prefecture, city, index)
      dPop && dPop.length > 0 && drawLChart(dPop, prefecture, city, index)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefecture, city])

  const prefCheck = (suikei, prefecture, city): boolean => {
    let ret: boolean = false
    if (prefecture === '' || city === '') return true
    const pref = suikei
      .filter((s) => s['都道府県'] === prefecture && s['年'] === '2020年')
      .map((ss) => ss['市区町村'])

    return pref.indexOf(city) !== -1
  }

  const japan = () => {
    setPrefecture('')
    setCity('全国')
  }
  return (
    <>
      <div className="flex ">
        <div className="mt-8 text-2xl text-center">
          <button className="btn-primary" onClick={() => japan()}>
            全国表示ボタン
          </button>
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

export default CityChart
