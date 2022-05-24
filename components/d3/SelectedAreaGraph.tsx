import React, { useEffect, useRef, useState } from 'react'
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
  const [allJapan, setAllJapan] = useState(false)
  useEffect(() => {
    if (prefCheck(suikei, prefecture, city)) {
      let index = null
      // if (prefecture === '' && city === '') index = 'alljapan'
      if (prefecture !== '' && city === '') index = 'all'
      if (prefecture !== '' && city !== '') index = 'prefecture'
      if (allJapan) index = 'alljapan'

      if (allJapan) {
        const dPop = arrangeData(index, suikei, prevalence, prefecture, city)
        dPop.length > 0 && drawLChart(dPop, index, prefecture, city)
      }
      if (index === 'all') {
        const dPop = arrangeData(index, suikei, prevalence, prefecture, city)
        dPop.length > 0 &&
          drawLChart(
            dPop.filter((d) => d.area === prefecture),
            index,
            prefecture,
            city
          )
      }

      if (index === 'prefecture') {
        const dPop = arrangeData(index, suikei, prevalence, prefecture, city)
        dPop.length > 0 &&
          drawLChart(
            dPop.filter((d) => d.area === city),
            index,
            prefecture,
            city
          )
      }
    }
  }, [prefecture, city, suikei, prevalence, allJapan])

  const japan = () => {
    setAllJapan(!allJapan)
  }
  return (
    <>
      <button
        className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => japan()}
      >
        全国表示切り替え
      </button>{' '}
      <div className="flex ">
        <div className="mt-2 text-2xl text-center">
          <h2 id="title"></h2>
          <svg
            id="graph"
            className="border-solid border-2 border-black shadow-2xl"
          ></svg>
        </div>
      </div>
    </>
  )
}

export default SelectedAreaGraph
