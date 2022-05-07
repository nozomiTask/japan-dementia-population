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

const CourceraD3 = ({ data, data1, dataPie, geoJson, dataset, dataEQ }) => {
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
  //--------- week 3 = line =====

  const refSvg1 = useRef(null)

  useEffect(() => {
    data1 && showData4(data1)
  }, [data1])

  const showData4 = (data1) => {
    const bodyWidth = 400
    const bodyHeight = 200
    const maxValue = d3.max(data1, (d) => d.price)
    data1 = data1.map((d) => ({
      date: new Date(d.date),
      price: +d.price, // +は強制的にstringからnumberにする
    }))

    const yScale = d3.scaleLinear().range([bodyHeight, 0]).domain([0, maxValue])

    const svg1 = d3.select(refSvg1.current)
    const body = svg1
      .append('g')
      .attr('id', 'body')
      .attr('transform', 'translate(50,50)')
    const yAxis = d3.axisLeft(yScale)
    body.append('g').call(yAxis)

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data1, (d) => d.date))
      .range([0, bodyWidth])

    body
      .append('g')
      .attr('transform', 'translate(0,' + bodyHeight + ')')
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')))

    const valueline = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .defined((d) => !!d.price)
    body
      .append('path')
      .datum(data1)
      .attr('d', (d) => valueline(d))
      .attr('className', 'line')
      .style('fill', 'none')
      .style('stroke', 'blue')
  }
  //--------- week 3 = Pie  =====
  const refSvg2 = useRef(null)

  useEffect(() => {
    !!dataPie && showData5(dataPie)
  }, [dataPie])

  const showData5 = (dataPie) => {
    const bodyHeight = 200
    const bodyWidth = 400

    const data = dataPie.map((d) => ({
      country: d.country,
      sales: +d.sales,
    }))
    const pie = d3.pie().value((d) => d.sales)
    console.log('pie data', pie(data))
    const colorScale = d3
      .scaleOrdinal()
      .range(d3.schemeCategory10)
      .domain(data.map((d) => d.country))

    const arc = d3
      .arc()
      .outerRadius(bodyHeight / 2)
      .innerRadius(50)

    const svg = d3
      .select(refSvg2.current)
      .attr('height', 300)
      .attr('width', 500)

    const body = svg
      .append('g')
      .attr('transform', 'translate(150,150)')
      .attr('id', 'body')

    const g = body.selectAll('.arc').data(pie(data)).enter().append('g')
    g.append('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.country)) //Note!! d.data.country
  }

  //--------- week 3 = Pie  =====
  const refSvg3 = useRef(null)

  useEffect(() => {
    !!geoJson && !!dataset && !!dataEQ && showData6(geoJson, dataset, dataEQ)
  }, [geoJson, dataset, dataEQ])

  const showData6 = (mapInfo, dataset, dataEQ) => {
    // console.log(data)
    const dataIndex = {}
    for (let c of dataset) {
      const country = c.Country
      dataIndex[country] = +c.Magnitude
    }
    // console.log('dataIndex: ', dataIndex)

    mapInfo.features = mapInfo.features.map((d) => {
      const country = d.properties.name
      const magnitude = dataIndex[country]
      d.properties.Magnitude = magnitude
      return d
    })
    // console.log('mapInfo', mapInfo)

    const maxEarthquake = d3.max(
      mapInfo.features,
      (d) => d.properties.Magnitude
    )
    const minEarthquake = d3.min(
      mapInfo.features,
      (d) => d.properties.Magnitude
    )
    const medianEarthquake = d3.median(
      mapInfo.features,
      (d) => d.properties.Magnitude
    )

    // console.log(`${mapInfo.features.map((d) => d.properties.Magnitude)}`)

    const cScale = d3
      .scaleLinear()
      .domain([0, medianEarthquake, maxEarthquake])
      .range(['white', 'orange', 'red'])

    const bodyHeight = 400
    const bodyWidth = 400
    const svg = d3
      .select(refSvg3.current)
      .attr('height', 300)
      .attr('width', 500)

    const body = svg
      .append('g')
      .attr('transform', 'translate(0,0)')
      .attr('id', 'body')

    // console.log(geoJson)
    const projection = d3
      .geoMercator()
      .scale(50)
      .translate([bodyWidth / 2, bodyHeight / 2])
    const path = d3.geoPath().projection(projection)

    body
      .selectAll('path')
      .data(mapInfo.features)
      .enter()
      .append('path')
      .attr('d', (d) => path(d))
      .attr('stroke', '#999')
      // .attr('fill', (d, i) => cScale(d.properties.Magnitude) ?? 'white')
      .attr('fill', '#eee')

    body
      .selectAll('circle')
      .data(dataEQ)
      .enter()
      .append('circle')
      .attr('r', 1)
      .attr('fill', '#0055AA')
      .style('opacity', 0.2)
      .attr('cx', (d) => projection([+d.Longitude, +d.Latitude])[0])
      .attr('cy', (d) => projection([+d.Longitude, +d.Latitude])[1])
  }
  return (
    <>
      <div>Courcera:Information Visualization</div>
      <br />
      <br />
      <div>{'week 2'}</div>
      <button onClick={() => addClient()}>Add</button>{' '}
      <button onClick={() => removeClient()}>Remove</button>
      <div ref={refDiv}></div>
      <svg ref={refSvg}></svg>
      <br />
      <br />
      <br />
      <div>{'week 3 line chart'}</div>
      <svg ref={refSvg1} id="container" height="300" width="500">
        <g id="xAxis"></g>
        <g id="yAxis"></g>
      </svg>
      <br />
      <br />
      <br />
      <div>{'week 3 pie chart'}</div>
      <svg ref={refSvg2}></svg>
      <br />
      <br />
      <br />
      <div>{'week 3 map'}</div>
      <svg ref={refSvg3}></svg>
    </>
  )
}

export default CourceraD3
