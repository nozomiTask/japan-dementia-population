import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import JapanMap from '../../components/d3/JapanMapAndChart'
import * as d3 from 'd3'
import JapanMapAndChart from '../../components/d3/JapanMapAndChart'
import PrefectureMapAndChart from '../../components/d3/PrefectureMapAndChart'
import CityMapAndChart from '../../components/d3/CityMapAndChart'
import CityChart from '../../components/d3/CityMapAndChart'

export const prefList = {
  日本: '00',
  北海道: '01',
  青森県: '02',
  岩手県: '03',
  宮城県: '04',
  秋田県: '05',
  山形県: '06',
  福島県: '07',
  茨城県: '08',
  栃木県: '09',
  群馬県: '10',
  埼玉県: '11',
  千葉県: '12',
  東京都: '13',
  神奈川県: '14',
  新潟県: '15',
  富山県: '16',
  石川県: '17',
  福井県: '18',
  山梨県: '19',
  長野県: '20',
  岐阜県: '21',
  静岡県: '22',
  愛知県: '23',
  三重県: '24',
  滋賀県: '25',
  京都府: '26',
  大阪府: '27',
  兵庫県: '28',
  奈良県: '29',
  和歌山県: '30',
  鳥取県: '31',
  島根県: '32',
  岡山県: '33',
  広島県: '34',
  山口県: '35',
  徳島県: '36',
  香川県: '37',
  愛媛県: '38',
  高知県: '39',
  福岡県: '40',
  佐賀県: '41',
  長崎県: '42',
  熊本県: '43',
  大分県: '44',
  宮崎県: '45',
  鹿児島県: '46',
  沖縄県: '47',
}

const D3Japan = () => {
  const [suikei, setSuikei] = useState(null)
  const [geoJson, setGeoJson] = useState(null)
  const [geoJsonPrefecture, setGeoJsonPrefecture] = useState(null)
  const [prevalence, setPrevalence] = useState(null)
  const [prefecture, setPrefecture] = useState('東京都')
  const [city, setCity] = useState('三鷹市')

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

  useEffect(() => {
    if (prefecture !== '') {
      const fileName =
        '../assets/topojson/' + prefList[prefecture] + '.topojson' //都道府県ファイルを選択
      d3.json(fileName)
        .then((d) => {
          setGeoJsonPrefecture(d)
          console.log(`${fileName} reading success!`)
        })
        .catch((e) =>
          console.log(`${fileName} japan.geo.json failed message: ${e}`)
        )
    }
  }, [prefecture])
  return (
    <Layout>
      <div className="container">
        {/* <a href="https://zenn.dev/ignorant_kenji/articles/76dab0a748516470452b"> */}
        <span className="text-3xl text-blue-500">認知症（とMCI）の人の数</span>
        {/* </a> */}
        <div className="flex-col">
          <div>
            {!!suikei && !!geoJson && !!prevalence && (
              <JapanMapAndChart
                suikei={suikei}
                geoJson={geoJson}
                prevalence={prevalence}
                setPrefecture={setPrefecture}
                setCity={setCity}
              />
            )}
          </div>
          <div>
            {!!suikei && !!geoJson && !!prevalence && (
              <PrefectureMapAndChart
                suikei={suikei}
                geoJsonPrefecture={geoJsonPrefecture}
                prevalence={prevalence}
                prefecture={prefecture}
                setPrefecture={setPrefecture}
                setCity={setCity}
              />
            )}
          </div>
          <div>
            {!!suikei && !!geoJson && !!prevalence && (
              <CityChart
                suikei={suikei}
                geoJson={geoJson}
                prevalence={prevalence}
                prefecture={prefecture}
                setPrefecture={setPrefecture}
                city={city}
                setCity={setCity}

              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default D3Japan
