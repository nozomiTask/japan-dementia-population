import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import {
  drawAirlinesChart,
  groupByAirline,
} from '../../tools/courseraAssignment'
import {
  drawAirports,
  drawMap,
  groupByAirport,
} from '../../tools/courseraMapAssigment'
const CourceraD3Assignment = ({ routes, geoJson }) => {
  const ref = useRef(null)
  const ref1 = useRef(null)

  useEffect(() => {
    if (!!routes && !!geoJson) {
      const airlines = groupByAirline(routes)
      drawAirlinesChart(airlines, ref)
      console.log('airlines ', airlines)
      drawMap(geoJson, ref1)
      const airports = groupByAirport(routes)
      console.log('airports ', airports)
      drawAirports(airports, ref1)
    }
  }, [routes, geoJson])

  return (
    <>
      <div>Courcera:Information Visualization</div>
      <div className="flex flex-wrap">
        <div>
          <h2 className="text-2xl text-center">Airlines</h2>
          <svg
            ref={ref}
            className="bar border-solid border-2 border-black"
            width="400"
            height="400"
          ></svg>
        </div>
        <div>
          <h2 className="text-2xl text-center">Airports</h2>
          <svg
            ref={ref1}
            className="border-solid border-2 border-black"
            width="600"
            height="400"
          ></svg>
        </div>
      </div>
    </>
  )
}

export default CourceraD3Assignment
