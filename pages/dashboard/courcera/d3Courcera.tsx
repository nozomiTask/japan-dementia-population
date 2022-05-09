import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Layout } from '../../../components/layout/Layout'
import CourceraD3 from '../../../components/d3/courcera/CourceraD3'

interface DATA {
  Name: string
  Weight: number
  Height: number
}

const D3Courcera = () => {
  const [data, setData] = useState(null)
  const [data1, setData1] = useState(null)
  const [dataPie, setDataPie] = useState(null)
  const [geoJson, setGeoJson] = useState(null)
  const [dataset, setDataset] = useState(null)
  const [dataEQ, setDataEQ] = useState(null)
  useEffect(() => {
    d3.csv('../../dataPersons.csv')
      .then((d) => {
        console.log('success!')
        setData(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.csv('../../data1.csv')
      .then((d) => {
        console.log('data1.csv reading success!')
        setData1(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.csv('../../dataPie.csv')
      .then((d) => {
        console.log('dataPie.csv reading success!')
        setDataPie(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.json('../../countries.geo.json')
      .then((d) => {
        console.log('countries.geo.json reading success!')
        setGeoJson(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.csv('../../dataset.csv')
      .then((d) => {
        console.log('dataset.csv reading success!')
        setDataset(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
      .catch((e) => console.log(`failed message: ${e}`))

    d3.csv('../../dataEQ.csv')
      .then((d) => {
        console.log('dataEQ.csv reading success!')
        setDataEQ(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>
        {data && (
          <CourceraD3
            data={data}
            data1={data1}
            dataPie={dataPie}
            geoJson={geoJson}
            dataset={dataset}
            dataEQ={dataEQ}
          />
        )}
      </div>
    </Layout>
  )
}

export default D3Courcera
