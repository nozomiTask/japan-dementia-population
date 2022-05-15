import { DEMENTIAPOP } from '../types/dementiaPop'
import * as d3 from 'd3'
export const arrangeCityData = (suikei, prevalence): DEMENTIAPOP[] => {
  const sources = [
    'AsiaPaciﬁcHighIncome',
    'EastAsia',
    'SouthAsiaSouthEastAsia',
    'WesternEurope',
    'NorthAmerica',
    'LatinAmerica',
    'Japan',
    'MCIJapan',
  ]

  const dps: DEMENTIAPOP[] = []
  const year = '2020年'
  const areaUnit = 'a'
  const source = 'Japan'
  const prvlnc = prevalence.filter((p) => p.source === source)
  suikei.forEach((s) => {
    const ages = Object.keys(s)
      .filter((f) => f.indexOf('/a') !== -1)
      .map((m) => m.split('/')[0])
    if (s['市などの別'] === areaUnit && s['年'] === year) {
      let dPopMale = {}
      let dPopFemale = {}
      let dPopAll = {}

      ages.forEach((a) => {
        dPopMale[a] = +s[a + '/m'] * +prvlnc.find((d) => d.gender === 'male')[a]
        dPopFemale[a] =
          +s[a + '/f'] * +prvlnc.find((d) => d.gender === 'female')[a]
        dPopAll[a] = dPopMale[a] + dPopFemale[a]
      })
      let dPopMaleSum = 0
      let dPopFemaleSum = 0
      let dPopAllSum = 0

      for (let a in ages) {
        dPopMaleSum += dPopMale[ages[a]]
        dPopFemaleSum += dPopFemale[ages[a]]
        dPopAllSum += dPopAll[ages[a]]
      }

      const dp: DEMENTIAPOP = {
        area: s['都道府県'],
        dPopMale: dPopMale,
        dPopFemale: dPopFemale,
        dPopAll: dPopAll,
        dPopMaleSum: dPopMaleSum,
        dPopFemaleSum: dPopFemaleSum,
        dPopAllSum: dPopAllSum,
        year: year,
        order: 0,
        dementiaCategory: 'dementia', //dementia, mci, dementiaAndMci
      }
      dps.push(dp as DEMENTIAPOP)
      // dPop: number””
      // dementiaCategory: string //dementia, mci, dementiaAndMci
    }
  })

  const dps_ = dps.sort((a, b) => d3.descending(a.dPopAllSum, b.dPopAllSum))
  let order = 0

  const dps__: DEMENTIAPOP[] = dps_.map((d) => {
    order += 1
    d.order = order
    return d
  })

  return dps__
}
/*
将来の地域別男女5歳階級別人口（各年10月1日時点の推計人口：2015年は国勢調査による実績値）
市などの別：
a＝都道府県，0＝政令市の区（東京23区を含む），1＝政令市，2＝その他の市，3＝町村
変数名：
コード,市などの別,都道府県,市区町村,年,総数,0～4歳","5～9歳","・・・
85～89歳","90歳以上,,,,,,,65～74歳","75歳以上,,,,,65～74歳割合,75歳以上割合
*/
