import { Forecast } from "./Forecast";
import { Coordinates, Geocoding } from "./Geocoding";

export type State = {
  latitude: number | null;
  longitude: number | null;
  globalForecast: MultiUnitForecast | null;
  forecast: Forecast | null;
  geocoding: Geocoding | null;
  error?: unknown | undefined;
  setCoordinates?: (latitude: number, longitude: number) => void;
  getForecast?: (position: Coordinates) => void;
  setForecast?: (units: "metric" | "imperial") => void;
  getGeocoding?: (address: string) => void;
  getCoordinates?: (address: string) => void;
};

export type Actions =
  | { type: "SET_COORDINATES"; latitude: number; longitude: number }
  | { type: "GET_FORECAST"; globalForecast: MultiUnitForecast }
  | { type: "SET_FORECAST"; forecast: Forecast }
  | { type: "GET_GEOCODING"; geocoding: Geocoding }
  | { type: "ERROR"; error: unknown };

export interface MultiUnitForecast {
  imperial: Forecast;
  metric: Forecast;
}
