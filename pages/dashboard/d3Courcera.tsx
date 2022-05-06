import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Layout } from '../../components/layout/Layout'
import CourceraD3 from '../../components/d3/CourceraD3'

interface DATA {
  Name: string
  Weight: number
  Height: number
}

const D3Courcera = () => {
  const [data, setData] = useState<DATA>(null)

  useEffect(() => {
    d3.csv('../dataPersons.csv')
      .then((d) => {
        console.log('success!')
        setData(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>{data && <CourceraD3 data={data} />}</div>
    </Layout>
  )
}

export default D3Courcera
