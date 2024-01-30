// export type GeoCoordinates = [number, number];
export type GeoCoordinates = Array<number>;

// type GeoCoordinatesObject = {
//   latitude: number;
//   longitude: number;
// };
// export type GeoCoordinates = GeoCoordinatesArray | GeoCoordinatesObject;
export interface PointGeoJSONInterface {
  type: string;
  coordinates: GeoCoordinates;
}
