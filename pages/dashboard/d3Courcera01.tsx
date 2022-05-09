import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Layout } from '../../components/layout/Layout'
import CourceraD301 from '../../components/d3/courcera/CourceraD301'


interface DATA {
  Name: string
  Weight: number
  Height: number
}

const D3Courcera01 = () => {
  const [dataLink, setDataLink] = useState(null)
  const [dataHierarchy, setDataHierarchy] = useState(null)
  const [dataEvent, setDataEvent] = useState(null)
  useEffect(() => {
    d3.json('../data.json')
      .then((d) => {
        console.log('data.json reading success!')
        setDataLink(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.json('../dataHierarchy.json')
      .then((d) => {
        console.log('dataHierarchy.json reading success!')
        setDataHierarchy(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.csv('../dataEvent.csv')
      .then((d) => {
        console.log('dataEvent.csv reading success!')
        setDataEvent(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>
        {!!dataEvent && !!dataLink && !!dataHierarchy && (
          <CourceraD301
            dataLink={dataLink}
            dataHierarchy={dataHierarchy}
            dataEvent={dataEvent}
          />
        )}
      </div>
    </Layout>
  )
}

export default D3Courcera01
