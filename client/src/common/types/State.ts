import { Forecast } from "./Forecast";
import { Coordinates, Geocoding } from "./Geocoding";

export type State = {
  latitude: number | null;
  longitude: number | null;
  forecast: MultiUnitForecast | null;
  geocoding: Geocoding | null;
  error?: unknown | undefined;
  setCoordinates?: (latitude: number, longitude: number) => void;
  getForecast?: (position: Coordinates) => void;
  getGeocoding?: (address: string) => void;
  getCoordinates?: (address: string) => void;
};

export type Actions =
  | { type: "SET_COORDINATES"; latlon: Coordinates }
  | { type: "GET_FORECAST"; forecast: MultiUnitForecast }
  | { type: "GET_GEOCODING"; geocoding: Geocoding }
  | { type: "ERROR"; error: unknown };

interface MultiUnitForecast {
  imperial: Forecast;
  metric: Forecast;
}
