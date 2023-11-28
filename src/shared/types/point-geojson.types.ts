type GeoCoordinatesArray = [number, number];
type GeoCoordinatesObject = {
  latitude: number;
  longitude: number;
};
export type GeoCoordinates = GeoCoordinatesArray | GeoCoordinatesObject;
export interface PointGeoJSONInterface {
  type: 'Point';
  coordinates: GeoCoordinates;
}
