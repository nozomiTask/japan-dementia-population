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

const CourceraD301 = ({ dataLink, dataHierarchy, dataEvent }) => {
  //--------- week 3 = Force  =====
  const refSvg4 = useRef(null)
  const refSvg5 = useRef(null)
  const refSvg6 = useRef(null)
  // const [data2, setData2] = useState(null)
  useEffect(() => {
    !!dataLink && showData7(dataLink)
    // !!dataLink && console.log(`dataLink ${dataLink.nodes}`)
  }, [dataLink])

  const createElements = (dataLink, body) => {
    body
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(dataLink.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'black')

    body
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(dataLink.links)
      .enter()
      .append('line')
  }

  const updateElements = () => {
    d3.select('.nodes')
      .selectAll('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)

    d3.select('.links')
      .selectAll('line')
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
      // .attr("stroke-width",4)
      .attr('stroke', '#0e9aa7')
  }

  const showData7 = (dataLink) => {
    const bodyHeight = 200
    const bodyWidth = 400

    const svg = d3
      .select(refSvg4.current)
      .attr('height', 300)
      .attr('width', 500)
    const body = svg
      .append('g')
      // .attr('transform', 'translate(0,0)')
      .attr('id', 'body')

    !!dataLink && createElements(dataLink, body)

    const simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id((d) => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(bodyWidth / 2, bodyHeight / 2))

    simulation.nodes(dataLink.nodes).on('tick', updateElements)
    simulation.force('link').links(dataLink.links)
  }
  //--------- week 4 = hieralchy  =====

  useEffect(() => {
    !!refSvg5 && showData8(dataHierarchy)
  }, [dataHierarchy])

  const showData8 = (dataHierarchy) => {
    const bodyHeight = 200
    const bodyWidth = 300
    const svg = d3
      .select(refSvg5.current)
      .attr('height', 300)
      .attr('width', 500)

    const body = svg
      .append('g')
      .attr('transform', 'translate(0,0)')
      .attr('id', 'body')

    const treemap = d3.treemap().size([bodyWidth, bodyHeight]).paddingInner(2)
    const root = d3.hierarchy(dataHierarchy).sum((d) => d.sales)
    treemap(root)
    // console.log('rootLeaves', root.leaves())

    const cScale = d3.scaleOrdinal(d3.schemeCategory10)

    const cell = body
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${+d.x0},${+d.y0})`)

    cell
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => cScale(d.parent.data.name))

    cell
      .append('text')
      .text((d) => d.data.name)
      .attr('fill', 'white')
      .attr('alignment-baseline', 'hanging')
  }

  /*
  アロー関数ではthisがつかない

  If we use an arrow function, D3 is not able to change the "this" inside the function. So this means that if you need to use "this", you cannot use the arrow function,
  */
  //--------- week 4 = event  =====

  useEffect(() => {
    !!refSvg6 && showData9(dataEvent)
  }, [dataEvent])

  const showData9 = (data) => {
    const bodyHeight = 200
    const bodyWidth = 250
    const svg = d3
      .select(refSvg6.current)
      .attr('height', 300)
      .attr('width', 300)
      .attr('id', 'container')

    const body = svg
      .append('g')
      .attr('transform', 'translate(40,0)')
      .attr('id', 'body')

    const max = d3.max(data, (d) => +d.Weight)
    const scale = d3.scaleLinear().range([0, 160]).domain([0, max])

    const scalePosition = d3
      .scaleBand()
      .rangeRound([0, 130])
      .domain(data.map((d) => d.Name))
      .padding(0.2)

    const join = body.selectAll('rect').data(data)
    join
      .enter()
      .append('rect')
      .style('fill', 'blue')
      .style('stroke', 'white')
      .attr('width', (d) => scale(+d.Weight))
      .attr('height', (d) => scalePosition.bandwidth())
      .attr('transform', (d) => `translate(0,${scalePosition(d.Name)})`)
      .on('click', (d) => {
        d3.select('#detail').text(d.Name)
      })
      .on('mouseover', function (d) {
        this.style.fill = 'red'
      })
      .on('mouseout', function (d) {
        this.style.fill = 'blue'
      })

    const yAxis = d3.axisLeft(scalePosition)

    body.append('g').attr('id', 'yAxis')

    d3.select('#yAxis')
      .attr('transform', 'translate(0, 0)')
      .transition()
      .call(yAxis)

    let line = d3
      .select('#container')
      .append('g')
      .attr('transform', 'translate(0,0)')

    line
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', 130)
      .attr('stroke', 'red')
      .attr('stroke-width', '3px')

    d3.select('#container').on('mouseover', function()  {
      const x = d3.mouse(this)[0]
      const y = d3.event.y
      line.attr('transform', `translate(${x},-10)`)
    })
  }
  return (
    <>
      <div className="flex flex-wrap">Courcera:Information Visualization</div>
      <div>
        <div>{'week 4 force'}</div>
        <svg ref={refSvg4}></svg>
      </div>
      <div>
        <br />
        <div>{'week 4 hierarchy treemap'}</div>
        <svg ref={refSvg5}></svg>
      </div>
      <div>
        <div>{'week 4 d3.event'}</div>
        <svg ref={refSvg6}></svg>
        <div id="detail"></div>
      </div>
    </>
  )
}

export default CourceraD301
