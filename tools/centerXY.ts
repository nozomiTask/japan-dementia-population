import * as d3 from 'd3'

//領域のacrの中心点の計算
export const centerXY = (features) => {
  var count = 0,
    X = 0,
    Y = 0

  features.forEach((f) => {
    count++
    X += d3.geoCentroid(f)[0]
    Y += d3.geoCentroid(f)[1]
  })

  return [X / count, Y / count]
}
