import *as d3 from "d3"
import { useEffect, useState } from "react"
import Brush from "../../../components/d3/courcera/Brush"
import { Layout } from "../../../components/layout/Layout"
const Bush = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    d3.csv('../../courcera/brush.csv')
      .then((d) => {
        console.log('dataBrush.csv reading success!')
        setData(d)
      })
      .catch((e) => console.log(`dataBrush.csv failed message: ${e}`))
  }, [])
  return (
    <Layout>
      <div>{!!data && <Brush data={data} />}</div>
    </Layout>
  )
}

export default Bush
