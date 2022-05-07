import * as d3 from 'd3'

export const groupByAirline = (data) => {
  //Iterate over each route, producing a dictionary where the keys is are the ailines ids and the values are the information of the airline.
  let result = data.reduce((result, d) => {
    let currentData = result[d.AirlineID] || {
      AirlineID: d.AirlineID,
      AirlineName: d.AirlineName,
      Count: 0,
    }

    currentData.Count += 1 //TODO: Increment the count (number of routes) of ariline.

    result[d.AirlineID] = currentData //TODO: Save the updated information in the dictionary using the airline id as key.

    return result
  }, {})

  //We use this to convert the dictionary produced by the code above, into a list, that will make it easier to create the visualization.
  result = Object.keys(result).map((key) => result[key])
  result = result.sort((a, b) => d3.descending(a.count, b.count)) //TODO: Sort the data in descending order of count.

  return result
}
