import type { FillLayer } from "react-map-gl"

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer: FillLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "percentile",
      stops: [
        [0, "#3288bd"],
        [1, "#16c780"]
      ]
    },
    "fill-opacity": 0.8
  }
}
