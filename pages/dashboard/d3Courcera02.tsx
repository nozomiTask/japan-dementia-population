import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Layout } from '../../components/layout/Layout'
import CourceraD301 from '../../components/d3/CourceraD301'
import CourceraD302 from '../../components/d3/CourceraD302'

interface DATA {
  Name: string
  Weight: number
  Height: number
}

const D3Courcera02 = () => {
  const [dataLink, setDataLink] = useState(null)
  const [dataHierarchy, setDataHierarchy] = useState(null)
  const [dataEvent, setDataEvent] = useState(null)
  useEffect(() => {
    d3.csv('../dataEvent.csv')
      .then((d) => {
        console.log('dataEvent.csv reading success!')
        setDataEvent(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>{!!dataEvent && <CourceraD302 dataEvent={dataEvent} />}</div>
    </Layout>
  )
}

export default D3Courcera02
