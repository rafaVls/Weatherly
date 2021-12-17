export interface Geocoding {
  address_components: Component[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface Component {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  bounds: Bounds;
  location: Coordinates;
  location_type: string;
  viewport: Bounds;
}

interface Bounds {
  northeast: Coordinates;
  southwest: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
