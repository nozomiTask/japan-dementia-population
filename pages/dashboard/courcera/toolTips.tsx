import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import ToolTipsComp from '../../../components/d3/courcera/ToolTipsComp'
import { Layout } from '../../../components/layout/Layout'

const ToolTips = () => {
  const [data__, setData__] = useState(null)
  useEffect(() => {
    // d3.csv('../../courcera/dataCountry.csv')
    d3.csv('../../courcera/data2.csv')
      .then((d) => {
        console.log('dataCountry.csv reading success!')
        setData__(d)
      })
      .catch((e) => console.log(`dataCountry.csv failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>
        {!!data__ && data__.length > 0 && <ToolTipsComp data__={data__} />}
      </div>
    </Layout>
  )
}

export default ToolTips
