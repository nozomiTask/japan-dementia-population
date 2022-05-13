import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { drawJapanMap } from '../../tools/drawJapanMap'
import { drawDementiaChart } from '../../tools/drawJapanChart'
import { arrangeData } from '../../tools/arrangeData'
//https://qiita.com/alclimb/items/31d4360c74a8f8935256

const JapanMap = ({ suikei, geoJson, prevalence }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)
  const [hidden, setHidden] = useState(false)
  const ref = useRef(null)
  const ref1 = useRef(null)

  useEffect(() => {
    const dPop = arrangeData(suikei, prevalence)
    !!ref && !!geoData && drawJapanMap(ref, geoData, dPop)
    !!ref1 &&
      !!suikei &&
      !!prevalence &&
      drawDementiaChart(ref1, dPop, setHidden, ref)
  }, [geoData, geoJson, prevalence, suikei])
  return (
    <>
      <div id="map-container">
        <a href="https://qiita.com/alclimb/items/31d4360c74a8f8935256">
          参考文献
        </a>
      </div>
      <div className="flex ">
        <div>
          <h2 className="text-2xl text-center">グラフ</h2>
          <svg
            id="chart"
            ref={ref1}
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            id="map"
            ref={ref}
            className="bar border-solid border-2 border-black"
            width="400"
            height="400"
          >
            {' '}
          </svg>
        </div>
        {/* <div
          id="tooltip"
          className={hidden ? 'hidden' : 'block'}
        >
          ToolTip
        </div> */}
      </div>
    </>
  )
}

export default JapanMap
