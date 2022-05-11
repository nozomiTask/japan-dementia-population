import * as d3 from 'd3'

export const drawJapanChart = (ref1, suikei, prevalence) => {
  /*
将来の地域別男女5歳階級別人口（各年10月1日時点の推計人口：2015年は国勢調査による実績値）
市などの別：
a＝都道府県，0＝政令市の区（東京23区を含む），1＝政令市，2＝その他の市，3＝町村
変数名：
コード,市などの別,都道府県,市区町村,年,総数,0～4歳","5～9歳","・・・
85～89歳","90歳以上,,,,,,,65～74歳","75歳以上,,,,,65～74歳割合,75歳以上割合
*/

  console.log('prevalence', prevalence)
  console.log('suikei', suikei)

  interface DementiaPop {
    area: string
    dPop: number
    year: string
    gender: string // male, female
    dementiaCategory: string //dementia, mci, dementiaAndMci
  }

  const dp: DementiaPop[] = []
  const Age = [
    '0～4歳',
    '5～9歳',
    '10～14歳',
    '15～19歳',
    '20～24歳',
    '25～29歳',
    '30～34歳',
    '35～39歳',
    '40～44歳',
    '45～49歳',
    '50～54歳',
    '55～59歳',
    '60～64歳',
    '65～69歳',
    '70～74歳',
    '75～79歳',
    '80～84歳',
    '85～89歳',
    '90歳以上',
  ]
  suikei.forEach((s) => {
    const ages = Object.keys(s)
    ages.forEach((age_) => {
      const age = age_.split('/') && age_.split('/')[0]
      const gender =
        age_.split('/') && age_.split('/')[1] === 'm'
          ? '男'
          : age_.split('/')[1] === 'f'
          ? '女'
          : '全体'
      if (!!age) {
        if (s['市などの別'] === 'a') {
          const area = s['都道府県']
const year = s["年"]
    // dPop: number””
    // dementiaCategory: string //dementia, mci, dementiaAndMci
    //     }
      }
    })
  })
}

const getChartConfig = (ref) => {
  let width = 350
  let height = 400
  let margin = {
    top: 10,
    bottom: 50,
    left: 130,
    right: 10,
  }
  let bodyHeight = height - margin.top - margin.bottom
  let bodyWidth = width - margin.left - margin.right
  let container = d3
    .select(ref.current)
    .attr('width', width)
    .attr('height', height)

  return { width, height, margin, bodyHeight, bodyWidth, container }
}
