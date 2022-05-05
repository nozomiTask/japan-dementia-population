import React, { useEffect, useState } from 'react'
import BarPractice from '../../components/d3/BarPractice'
import { Layout } from '../../components/layout/Layout'

const D3Bar = () => {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    setData([100, 70, 150, 50, 200, 130])
  }, [])

  return (
    <Layout>
        <div>
          <h2 className="label">棒グラフ</h2>
          <BarPractice data={data} />
        </div>
    </Layout>
  )
}

export default D3Bar
