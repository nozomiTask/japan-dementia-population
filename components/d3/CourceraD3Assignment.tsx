import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { groupByAirline } from '../../tools/courseraAssignment'

const CourceraD3Assignment = ({ data }) => {
  const refSvg1 = useRef(null)

  useEffect(() => {
    const airlines = groupByAirline(data)
    console.log(airlines)
  }, [data])

  return (
    <>
      <div>Courcera:Information Visualization</div>
      <svg ref={refSvg1}></svg>
      <svg ref={refSvg1}></svg>
    </>
  )
}

export default CourceraD3Assignment
