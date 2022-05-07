import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Layout } from '../../components/layout/Layout'
import CourceraD3Assignment from '../../components/d3/CourceraD3Assignment'
import { ROUTE } from '../../types/route'

const D3CourceraAssignment = () => {
  const [routes, setRoutes] = useState<ROUTE[]>([])
  const [geoJson, setGeoJson] = useState(null)

  useEffect(() => {
    d3.csv('../routes.csv')
      .then((d) => {
        console.log('reading csv data is success!')
        setRoutes(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))

    d3.json('../countries.geo.json')
      .then((d) => {
        console.log('countries.geo.json reading success!')
        setGeoJson(d)
      })
      .catch((e) => console.log(`failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>
        {routes && routes.length > 0 && (
          <CourceraD3Assignment routes={routes} geoJson={geoJson} />
        )}
      </div>
    </Layout>
  )
}

export default D3CourceraAssignment
