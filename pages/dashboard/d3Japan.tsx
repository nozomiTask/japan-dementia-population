import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import JapanMap from '../../components/d3/JapanMapAndChart'
import * as d3 from 'd3'

const D3Japan = () => {
  const [suikei, setSuikei] = useState(null)
  const [geoJson, setGeoJson] = useState(null)
  const [prevalence, setPrevalence] = useState(null)
  useEffect(() => {
    d3.csv('../assets/modified_suikei_kekka.csv')
      .then((d) => {
        console.log('modified_suikei_kekka.csv reading success!')
        setSuikei(d)
      })
      .catch((e) =>
        console.log(`modified_suikei_kekka.csv failed message: ${e}`)
      )
      
    d3.json('../assets/japan.geo.json')
      .then((d) => {
        setGeoJson(d)
        console.log('japan.geo.json reading success!')
      })
      .catch((e) => console.log(`japan.geo.json failed message: ${e}`))

    d3.csv('../assets/prevalence.csv')
      .then((d) => {
        setPrevalence(d)
        console.log('prevalence.csv reading success!')
      })
      .catch((e) => console.log(`prevalence.csv failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div className="container">
        <a href="https://zenn.dev/ignorant_kenji/articles/76dab0a748516470452b">
          <span className="text-3xl text-blue-500">認知症（とMCI）の人の数</span>
        </a>
        <div>
          {!!suikei && !!geoJson && !!prevalence && (
            <JapanMap
              suikei={suikei}
              geoJson={geoJson}
              prevalence={prevalence}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default D3Japan
