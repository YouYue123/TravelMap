import mapboxgl from "mapbox-gl"
import { dataLayer } from "mapStyle"
import * as React from "react"
import { createRoot } from "react-dom/client"
import Map, { Layer, Source } from "react-map-gl"
import { updatePercentiles } from "utils"

function App() {
  const [allData, setAllData] = React.useState<GeoJSON.FeatureCollection>()

  React.useEffect(() => {
    /* global fetch */
    fetch("./countries.geojson")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)) // eslint-disable-line
  }, [])

  const data = React.useMemo(() => {
    return allData && updatePercentiles(allData)
  }, [allData])

  return (
    <>
      <Map
        initialViewState={{
          latitude: 1.290270,
          longitude: 103.851959,
          zoom: 1
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={["data"]}
        projection={"equalEarth"}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
      </Map>
    </>
  )
}

const container = document.getElementById("container")
const root = createRoot(container!)
root.render(<App />)
