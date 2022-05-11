export const arrangeData = (suikei, prevalence) => {
  interface DementiaPop {
    area: string
    dPop: number
    year: string
    gender: string // male, female, a;ll
    dementiaCategory: string //dementia, mci, dementiaAndMci
  }

  const dp: DementiaPop[] = []
  const year = '2020年'

  suikei.forEach((s) => {
    const ages = Object.keys(s)
      .filter((f) => f.indexOf('/a') !== -1 )
      .map((m) => m.split('/')[0])
    ages.forEach((age_) => {
      const age = age_.split('/')[0]
      const gender =
        age_.split('/') && age_.split('/')[1] === 'm'
          ? '男'
          : age_.split('/')[1] === 'f'
          ? '女'
          : '全体'
      if (!!age) {
        if (s['市などの別'] === 'a' && s['年'] === year) {
          const area = s['都道府県']
          console.log(`${area} ${year}`)
          console.log(`${[...ages.map((g) => s.g)]}`)

          // dPop: number””
          // dementiaCategory: string //dementia, mci, dementiaAndMci
        }
      }
    })
  })
}
/*
将来の地域別男女5歳階級別人口（各年10月1日時点の推計人口：2015年は国勢調査による実績値）
市などの別：
a＝都道府県，0＝政令市の区（東京23区を含む），1＝政令市，2＝その他の市，3＝町村
変数名：
コード,市などの別,都道府県,市区町村,年,総数,0～4歳","5～9歳","・・・
85～89歳","90歳以上,,,,,,,65～74歳","75歳以上,,,,,65～74歳割合,75歳以上割合
*/
