import type GeoJSON from "geojson"

const travelledCountryCode: Array<String> = [
  "SG",
  "MY",
  "TH",
  "IN",
  "ID",
  "NP",
  "AU",
  "HK",
  "CN",
  "TW",
  "NL",
  "KP",
  "RU",
  "US",
  "EG",
  "ES",
  "FR",
  "BE",
  "MX",
  "DE",
  "HR",
  "GB",
  "IS",
  "MN"
]

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const { features } = featureCollection

  return {
    type: "FeatureCollection",
    features: features
      .filter((feature) => travelledCountryCode.includes(feature.properties?.ISO_A2))
      .map((feature) => {
        const properties = {
          ...feature.properties,
          percentile: 0
        }
        return { ...feature, properties }
      })
  }
}
