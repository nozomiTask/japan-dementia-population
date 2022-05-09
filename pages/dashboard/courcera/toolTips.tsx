import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import ToolTipsComp from '../../../components/d3/courcera/ToolTipsComp'
import { Layout } from '../../../components/layout/Layout'

const ToolTips = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    d3.csv('../../courcera/dataCountry.csv')
      .then((d) => {
        console.log('dataCountry.csv reading success!')
        setData(d)
      })
      .catch((e) => console.log(`dataCountry.csv failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>{!!data && data.length > 0 && <ToolTipsComp data={data} />}</div>
    </Layout>
  )
}

export default ToolTips
