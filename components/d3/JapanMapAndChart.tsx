import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

//https://qiita.com/alclimb/items/31d4360c74a8f8935256
import {drawJapanMap} from "../../tools/drawJapanMap"
import { drawJapanChart } from '../../tools/drawJapanChart'
const JapanMap = ({suikei,geoJson, prevalence }) => {
  const [geoData, setgGeoData] = useState(geoJson.features)

  const ref = useRef(null)
  const ref1 = useRef(null)
  
  useEffect(() => {
   !!ref && !!geoData && drawJapanMap(ref,geoData)
   !!ref1 && !!suikei && !!prevalence && drawJapanChart(ref1,suikei,prevalence)


 
  }, [geoJson])
  return (
    <>
      <div id="map-container">
        <a
          href="https://qiita.com/alclimb/items/31d4360c74a8f8935256
"
        >
          参考文献
        </a>
      </div>
      <div className="flex flex-wrap">
        <div>
          <h2 className="text-2xl text-center">グラフ</h2>
          <svg
            ref={ref1}
            className="border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">地図</h2>
          <svg
            ref={ref}
            className="bar border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        
      </div>
    </>
  )
}

export default JapanMap
