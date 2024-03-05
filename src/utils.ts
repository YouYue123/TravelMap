import type GeoJSON from "geojson"

const travelledCountryCode: Array<String> = [
  "TH",
  "IN",
  "ID",
  "NP",
  "CN",
  "TW",
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
  "IS",
  "MN",
  "AT",
  "PT",
  "CH",
  "IT",
  "VN",
]

const workedCountryCode: Array<String> = ["SG", "MY", "NL", "GB"]

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const { features } = featureCollection

  return {
    type: "FeatureCollection",
    features: features
      .filter(
        (feature) =>
          travelledCountryCode.includes(feature.properties?.ISO_A2) ||
          workedCountryCode.includes(feature.properties?.ISO_A2)
      )
      .map((feature) => {
        const properties = {
          ...feature.properties,
          percentile: travelledCountryCode.includes(feature.properties?.ISO_A2) ? 0 : 1
        }
        return { ...feature, properties }
      })
  }
}
