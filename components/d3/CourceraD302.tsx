import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface CLIENT {
  Name: string
}
interface DATA {
  Name: string
  Weight: number
  Height: number
}

const CourceraD302 = ({ dataEvent }) => {
  const ref = useRef(null)
  //--------- week 4 = Updating data  =====
  useEffect(() => {
    showData(dataEvent)
  }, [dataEvent])

  //   const showData = (data) => {
  // d3.csv('data.csv').then((data) => {
  //   showData(data)
  //   d3.select('#save').on('click', function () {
  //     let name = d3.select('#name').node().value
  //     let weight = d3.select('#weight').node().value
  //     let client = data.find((d) => d.Name === name)
  //     if (client) {
  //       client.Weight = weight
  //     }

  //     showData(data)
  //   })

  //   d3.select('#min-weight').on('change', function () {
  //     let value = this.value
  //     const filteredData = data.filter((c) => +c.Weight > value)
  //     showData(filteredData)
  //   })
  // })

  const showData = (clients) => {
    d3.select('#container')
    // d3.select(ref.current)
      .style('border', 'solid 1px #000')
      .style('margin-top', 10)
    d3.select('#body').style('transform', 'translate(40px,10px)')

    let body = d3.select('#body')

    let max = d3.max(clients, (d) => +d.Weight)
    let scale = d3.scaleLinear().range([0, 60]).domain([0, max])

    let scalePosition = d3
      .scaleBand()
      .rangeRound([0, 130])
      .domain(clients.map((d) => d.Name))
    scalePosition.padding(0.3)
    let join = body.selectAll('rect').data(clients)

    let newelements = join
      .enter()
      .append('rect')
      .style('fill', 'blue')
      .style('stroke', 'white')
      .on('click', function (d) {
        d3.select('#name').node().value = d.Name
        d3.select('#weight').node().value = d.Weight
      })

    join
      .merge(newelements)
      .attr('width', (d) => scale(+d.Weight))
      .attr('height', scalePosition.bandwidth())
      .attr('transform', (d) => `translate(0,${scalePosition(d.Name)})`)

    const yAxis = d3.axisLeft(scalePosition)
    //   const yAxisContainer =
    d3.select('#yAxis')
      .style('transform', 'translate(40px, 10px)')
      .transition()
      .call(yAxis)
  }

  return (
    <>
      <svg ref={ref} id="container" height="160" width="110">
        <g id="body"></g>
        <g id="yAxis"></g>
      </svg>
      <div id="details">
        <div>
          Name: <input id="name" />
        </div>
        <div>
          Weight: <input id="weight" />
        </div>
        <button id="save">Add/Update</button>
        <hr />
      </div>
    </>
  )
}

export default CourceraD302
