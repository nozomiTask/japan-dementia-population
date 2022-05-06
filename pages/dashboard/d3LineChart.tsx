import React, { useEffect, useState } from 'react'
import BarPractice from '../../components/d3/BarPractice'
import LineChartPractice from '../../components/d3/LineChartPractice'
import { Layout } from '../../components/layout/Layout'

const D3LineChart = () => {
  return (
    <Layout>
      <div>
        <h2 className="label">Line Chart</h2>
        <LineChartPractice />
      </div>
    </Layout>
  )
}

export default D3LineChart
