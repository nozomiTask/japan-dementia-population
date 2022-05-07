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
        <svg ref={ref} className="bar"></svg>
        <svg ref={ref1} className="bar"></svg>
      </div>
    </>
  )
}

export default CourceraD3Assignment
