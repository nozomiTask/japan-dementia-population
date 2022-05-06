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
const CourceraD3 = ({ data }) => {
  const refDiv = useRef(null)
  const refSvg = useRef(null)
  const [clients, setClients] = useState<CLIENT[]>([])
  const [count, setCount] = useState<number>(0)

  const container = d3.select(refDiv.current)

  useEffect(() => {}, [])
  const showData = () => {
    const join = container.selectAll('div').data(clients)
    join
      .enter()
      .append('div')
      .text((d) => d.Name + ' New')
    join.exit().remove()
    join.text((d) => d.Name + ' Updated')
  }

  useEffect(() => {
    clients && showData()
  }, [count])

  const addClient = () => {
    let clts: CLIENT[] = []
    clts = clients
    clts.push({
      Name: 'Client' + count.toString(),
    } as CLIENT)
    setClients(clts)
    setCount((prev) => prev + 1)
  }
  const removeClient = () => {
    if (clients.length > 0) {
      setCount((prev) => prev - 1)
      setClients(clients.slice(0, -1))
    }
  }

  // const write = (text) => {
  //   container2.append('div').text(text)
  // }

  useEffect(() => {
    data && showData3(data)
  }, [data])

  const showData3 = (members: DATA[]) => {
    const max = d3.max(members, (d) => d.Weight)
    const widthScale = d3.scaleLinear().range([0, 200]).domain([0, max])
    const positionScale = d3
      .scaleBand()
      .range([0, 200])
      .domain(members.map((d) => d.Name))
      .padding(0.2)

    const container3 = d3
      .select(refSvg.current)
      .attr('width', 350)
      .attr('height', 250)
      .style('border', 'solid 1px black')

    const body = container3
      .append('g')
      .attr('id', 'body')
      .style('transform', `translate(50px,10px)`)

    container3.append('g').attr('id', 'yAxis')

    container3.append('g').attr('id', 'xAxis')

    body
      .selectAll('rect')
      .data(members)
      .enter()
      .append('rect')
      .attr('fill', 'blue')
      .attr('width', (d) => widthScale(d.Weight))
      .attr('height', positionScale.bandwidth())
      .attr('x', 0)
      .attr('y', (d) => positionScale(d.Name))

    const xAxis = d3.axisBottom(widthScale).ticks(4)
    d3.select('#xAxis').call(xAxis).attr('transform', 'translate(50,220)')

    const yAxis = d3.axisLeft(positionScale)
    d3.select('#yAxis').call(yAxis).attr('transform', 'translate(50,10)')
  }

  return (
    <>
      <div>Courcera:Information Visualization</div>
      <button onClick={() => addClient()}>Add</button>{' '}
      <button onClick={() => removeClient()}>Remove</button>
      <div ref={refDiv}></div>
      <svg ref={refSvg}></svg>
    </>
  )
}

export default CourceraD3
