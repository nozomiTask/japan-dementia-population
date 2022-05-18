import { DEMENTIAPOP } from '../types/dementiaPop'
import * as d3 from 'd3'
export const arrangeData = (
  suikei,
  prevalence,
  prefecture,
  city,
  index
): DEMENTIAPOP[] => {
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

  const age65Stratified = [
    '65～69歳',
    '70～74歳',
    '75～79歳',
    '80～84歳',
    '85～89歳',
    '90歳以上',
  ]

  const dps: DEMENTIAPOP[] = []
  const source = 'MCIJapan'
  const prvlnc = prevalence.filter((p) => p.source === source)
  suikei.forEach((s) => {
    const ages = Object.keys(s)
      .filter((f) => f.indexOf('/a') !== -1)
      .map((m) => m.split('/')[0])

    if (
      (index === 'city' && s['市区町村'] === city) ||
      (index === 'prefecture' &&
        s['市などの別'] !== 'a' &&
        s['市などの別'] !== '0' &&
        s['都道府県'] === prefecture) ||
      (index === 'prefecture' &&
        s['市などの別'] === '0' &&
        s['都道府県'] === prefecture &&
        s['市などの別'].indexOf('区')) ||
      (index === 'all' && s['市などの別'] === 'a')
    ) {
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
      let dPopMale65 = 0
      let dPopFemale65 = 0
      let dPopAll65 = 0
      let PopMale65 = 0
      let PopFemale65 = 0
      let PopAll65 = 0

      for (let a in ages) {
        dPopMaleSum += dPopMale[ages[a]]
        dPopFemaleSum += dPopFemale[ages[a]]
        dPopAllSum += dPopAll[ages[a]]

        if (age65Stratified.indexOf(ages[a]) !== -1) {
          dPopMale65 += dPopMale[ages[a]]
          dPopFemale65 += dPopFemale[ages[a]]
          dPopAll65 += dPopAll[ages[a]]
          PopMale65 += +s[ages[a] + '/m']
          PopFemale65 += +s[ages[a] + '/f']
          PopAll65 += +s[ages[a] + '/a']
        }
      }
      const dRateMale65 = dPopMale65 / PopMale65
      const dRateFemale65 = dPopFemale65 / PopFemale65
      const dRateAll65 = dPopAll65 / PopAll65

      let area = null
      if (index === 'city' || index === 'prefecture') area = s['市区町村']
      else if (index === 'all') area = s['都道府県']

      const year = s['年']
      const dp: DEMENTIAPOP = {
        area: area,
        dPopMale: dPopMale,
        dPopFemale: dPopFemale,
        dPopAll: dPopAll,
        dPopMaleSum: dPopMaleSum,
        dPopFemaleSum: dPopFemaleSum,
        dPopAllSum: dPopAllSum,
        dPopMale65: dPopMale65,
        dPopFemale65: dPopFemale65,
        dPopAll65: dPopAll65,
        PopMale65: PopMale65,
        PopFemale65: PopFemale65,
        PopAll65: PopAll65,
        dRateMale65: dRateMale65,
        dRateFemale65: dRateFemale65,
        dRateAll65: dRateAll65,
        year: year,
        order: 0,
        dementiaCategory: 'dementia', //dementia, mci, dementiaAndMci
        source: source,
      }
      dps.push(dp as DEMENTIAPOP)
      // dPop: number””
      // dementiaCategory: string //dementia, mci, dementiaAndMci
    }
  })

  return dps
}
/*
将来の地域別男女5歳階級別人口（各年10月1日時点の推計人口：2015年は国勢調査による実績値）
市などの別：
a＝都道府県，0＝政令市の区（東京23区を含む），1＝政令市，2＝その他の市，3＝町村
変数名：
コード,市などの別,都道府県,市区町村,年,総数,0～4歳","5～9歳","・・・
85～89歳","90歳以上,,,,,,,65～74歳","75歳以上,,,,,65～74歳割合,75歳以上割合
*/
