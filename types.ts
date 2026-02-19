
export interface BusRoute {
  name: string;
  description: string;
  totalStops: number;
  stops: string[];
  stopsEn: string[];
}

export type SegmentType = 'WALK' | 'BUS' | 'RICKSHAW';
export type AmenityType = 'PHARMACY' | 'FOOD' | 'RESTROOM' | 'SCHOOL' | 'COLLEGE' | 'MOSQUE';

export interface Amenity {
  id: string;
  name: string;
  type: AmenityType;
  coord: [number, number];
  description?: string;
}

export interface RouteSegment {
  type: SegmentType;
  busName?: string;
  from: string;
  to: string;
  fromCoord: [number, number];
  toCoord: [number, number];
  description: string;
  distanceKm?: number;
}

export interface TripSuggestion {
  id: string;
  segments: RouteSegment[];
  totalTransfers: number;
  summary: string;
}

export interface StopCoordinate {
  name: string;
  lat: number;
  lng: number;
}
