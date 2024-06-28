export type GeoCoordinates = Array<number>;

export interface PointGeoJSONInterface {
  type: string;
  coordinates: GeoCoordinates;
}
