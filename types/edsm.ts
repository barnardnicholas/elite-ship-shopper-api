export interface EDSMSystem {
  distance: number;
  name: string;
  id: number;
  coords: {
    x: number;
    y: number;
    z: number;
  };
}

export interface EDSMSystemWithID extends EDSMSystem {
  id: number;
}
