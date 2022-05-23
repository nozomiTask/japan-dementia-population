npm i next-page-tester
を入れること

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

国立社会保障・人口問題研究所
担当：人口構造研究部

3. 男女･年齢（5 歳）階級別の推計結果一覧（Excel 約 8.0MB）
   https://www.ipss.go.jp/pp-shicyoson/j/shicyoson18/t-page.asp

## アルゴリズム



### 1 日本地図

## 2 都道府県地図

## 3 　有病率、人数グラフ

framework:
d3Japan.tsx
global var. prefecture, city,

component:

#### JapanMapAndChart.tsx(日本地図と都道府県リスト)

arrangeData に渡す
parameter：index="all"
arrangeData からもらうデータ：各都道府県データ
index === 'all' &&　 s['市などの別'] === 'a'

#### PrefectureMapAndChart.tsx（選択都道府県地図と当該市町村リスト）

parameter：index="prefecture"
arrangeData からもらうデータ：該当各市区町村データ（ただし、東京は区を含む）
index === 'prefecture' &&

(
prefecture === '東京都' &&
['0', '1', '2', '3'].indexOf(s['市などの別']) !== -1 &&
//東京都は、区を含めて、市区町村を抽出
)||(
prefecture !== '東京都' &&
['1', '2', '3'].indexOf(s['市などの別']) !== -1 &&
)

s['都道府県'] === prefecture

#### SelecetedAreaGraph.tsx（選択範囲のグラフ）

parameter：
if (prefecture === '' && city === '')
index = 'alljapan'
index === 'alljapan' &&
s['コード'] === '0000' //全国データのみ抽出
arrangeData からは全国データがもどってくる
そのままつかう

if (prefecture !== '' && city === '')
index = 'all'
arrangeData からは都道府県データがもどってくる
選択都道府県 prefecture を抽出して使う

if (prefecture !== '' && city !== '')
index = 'prefecture'
arrangeData からは当該市区町村データがもどってくる
選択市区町村 city を抽出して使う

arrangeData サイドでは、

if (
index === 'alljapan' &&
s['コード'] === '0000' //全国データのみ抽出
) {
dp = getPopData(params)
dps.push(dp as DEMENTIAPOP)
} else if (
index === 'all' &&
s['市などの別'] === 'a' //都道府県名のみ抽出
) {
dp = getPopData(params)
dps.push(dp as DEMENTIAPOP)
} else if (
index === 'prefecture' &&
s['都道府県'] === prefecture &&
(//東京都は、区を含めて、市区町村を抽出
(prefecture === '東京都' &&
['0', '1', '2', '3'].indexOf(s['市などの別']) !== -1) ||
//東京都は、区を含めて、市区町村を抽出
(prefecture !== '東京都' &&
['1', '2', '3'].indexOf(s['市などの別']) !== -1))
) {
dp = getPopData(params)
dps.push(dp as DEMENTIAPOP)
}
})

if (index === 'alljapan') area = '全国'
if (index === 'all') area = s['都道府県']
if (index === 'prefecture') area = s['市区町村']
