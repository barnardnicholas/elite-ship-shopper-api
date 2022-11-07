export interface Station {
  id: number;
  name: string;
  modules: number[];
  distance_to_star: number;
}

export interface System {
  id: number;
  name: string;
  distance: number;
  stations: Station[];
}

export type Itinerary = Record<number, System>;

export interface Coords {
  x: number;
  y: number;
  z: number;
}

export type SearchResponseData = Record<string, System>;
