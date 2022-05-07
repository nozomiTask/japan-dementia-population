import * as d3 from 'd3'

export const drawMap = (geoJson, ref1) => {
  let config = getMapConfig(ref1)
  let projection = getMapProjection(config)
  drawBaseMap(config.container, geoJson.features, projection)
}

const getMapConfig = (ref1) => {
  let width = 600
  let height = 400
  let container = d3

    //TODO: select the svg with id Map
    .select(ref1.current)
    //TODO: set the width and height of the conatiner to be equal the width and height variables.
    .attr('width', width)
    .attr('height', height)

  return { width, height, container }
}

const getMapProjection = (config) => {
  let { width, height } = config
  let projection =
    //TODO: Create a projection of type Mercator.
    d3.geoMercator()

  projection.scale(97).translate([width / 2, height / 2 + 20])

  //   store.mapProjection = projection
  return projection
}

const drawBaseMap = (container, countries, projection) => {
  let path = d3.geoPath().projection(projection) //TODO: create a geoPath generator and set its projection to be the projection passed as parameter.

  container
    .selectAll('path')
    .data(countries)
    .enter()
    .append('path')
    .attr('d', (d) => path(d)) //TODO: use the path generator to draw each country )
    .attr('stroke', '#ccc')
    .attr('fill', '#eee')
}

export const groupByAirport = (data) => {
  //We use reduce to transform a list into a object where each key points to an aiport. This way makes it easy to check if is the first time we are seeing the airport.
  let result = data.reduce((result, d) => {
    //The || sign in the line below means that in case the first option is anything that Javascript consider false (this insclude undefined, null and 0), the second option will be used. Here if result[d.DestAirportID] is false, it means that this is the first time we are seeing the airport, so we will create a new one (second part after ||)

    let currentDest = result[d.DestAirportID] || {
      AirportID: d.DestAirportID,
      Airport: d.DestAirport,
      Latitude: +d.DestLatitude,
      Longitude: +d.DestLongitude,
      City: d.DestCity,
      Country: d.DestCountry,
      Count: 0,
    }
    currentDest.Count += 1
    result[d.DestAirportID] = currentDest

    //After doing for the destination airport, we also update the airport the airplane is departing from.
    let currentSource = result[d.SourceAirportID] || {
      AirportID: d.SourceAirportID,
      Airport: d.SourceAirport,
      Latitude: +d.SourceLatitude,
      Longitude: +d.SourceLongitude,
      City: d.SourceCity,
      Country: d.SourceCountry,
      Count: 0,
    }
    currentSource.Count += 1
    result[d.SourceAirportID] = currentSource

    return result
  }, {})

  //We map the keys to the actual ariorts, this is an way to transform the object we got in the previous step into a list.
  result = Object.keys(result).map((key) => result[key])
  return result
}

export const drawAirports = (airports, ref1) => {
  let config = getMapConfig(ref1) //get the config
  let projection = getMapProjection(config) //get the projection
  let container = config.container //get the container

  let circles = container.selectAll('circle')

  //TODO: bind the airports to the circles using the .data method.
  circles
    .data(airports)
    //TODO: for each new airport (hint: .enter)
    //      - Set the radius to 1
    //      - set the x and y position of the circle using the projection to convert longitude and latitude to x and y porision.
    //      - Set the fill color of the circle to  "#2a5599"
    .enter()
    .append('circle')
    .attr('r', 1)
    .attr('fill', '#2a5599')
    .attr('cx', (d) => projection([d.Longitude, d.Latitude])[0])
    .attr('cy', (d) => projection([d.Longitude, d.Latitude])[1])
}
