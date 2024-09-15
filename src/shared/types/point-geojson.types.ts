export type GeoCoordinates = [number, number];

export interface PointGeoJSONInterface {
  type: 'Point';
  coordinates: GeoCoordinates;
}
