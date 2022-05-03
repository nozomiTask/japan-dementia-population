import React, { useState } from 'react'
import PieChart from '../../components/d3/PieChart'
import { Layout } from '../../components/layout/Layout'
import * as d3 from 'd3'

const generateData = (value, length = 5) =>
  d3.range(length).map((item, index) => ({
    date: index,
    value: value === null || value === undefined ? Math.random() * 100 : value,
  }))

const d3test = () => {
  interface DATA {
    data: number
    value: number
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<DATA>(generateData(null, 5))
  const [width, height, innerRadius, outerRadius] = [200, 200, 60, 100]

  const changeData = () => {
    setData(generateData(null, 5))
  }
  return (
    <Layout>
      <div className="container">
        <a href="https://zenn.dev/ignorant_kenji/articles/76dab0a748516470452b">
          <span className="text-3xl text-blue-500">reactとd3.js</span>
        </a>
        <div>
          <button onClick={changeData}>Click</button>
        </div>
        <div>
          <h2 className="label">Pie Chart</h2>
          <PieChart
            data={data}
            width={width}
            height={height}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        </div>
      </div>
    </Layout>
  )
}

export default d3test
