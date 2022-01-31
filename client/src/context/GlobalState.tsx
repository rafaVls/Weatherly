import { Coordinates } from "../common/types/Geocoding";
import { State } from "../common/types/State";

import { createContext, useReducer, ReactNode } from "react";
import { AppReducer } from "./AppReducer";

let initialState: State = {
  latitude: null,
  longitude: null,
  globalForecast: null,
  forecast: null,
  geocoding: null,
};

// Create context
const GlobalContext = createContext(initialState);

type Props = {
  children: ReactNode;
};

function GlobalProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const API_URL = import.meta.env.VITE_API_URL;

  function setCoordinates(latitude: number, longitude: number): void {
    dispatch({
      type: "SET_COORDINATES",
      latitude,
      longitude,
    });
  }

  async function getForecast(position: Coordinates): Promise<void> {
    try {
      const lat = position.lat;
      const lon = position.lng;

      const url = `${API_URL}/forecast?lat=${lat}&lon=${lon}`;
      const res = await fetch(url);
      const { forecast_imperial, forecast_metric } = await res.json();

      dispatch({
        type: "GET_FORECAST",
        globalForecast: {
          imperial: forecast_imperial,
          metric: forecast_metric,
        },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error,
      });
    }
  }

  async function setForecast(units: "metric" | "imperial") {
    const forecast =
      units === "metric"
        ? state.globalForecast?.metric
        : state.globalForecast?.imperial;

    if (forecast) {
      forecast.units =
        units === "metric"
          ? { temp: "°C", wind_speed: "m/s" }
          : { temp: "°F", wind_speed: "mph" };

      dispatch({
        type: "SET_FORECAST",
        forecast,
      });
    } else {
      dispatch({
        type: "ERROR",
        error: new Error("Forecast is undefined"),
      });
    }
  }

  async function getGeocoding(address: string): Promise<void> {
    try {
      const url = `${API_URL}/geocoding?address=${address}`;
      const res = await fetch(url);
      const { data } = await res.json();

      dispatch({
        type: "GET_GEOCODING",
        geocoding: data[0],
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        latitude: state.latitude,
        longitude: state.longitude,
        globalForecast: state.globalForecast,
        forecast: state.forecast,
        geocoding: state.geocoding,
        setCoordinates,
        getForecast,
        setForecast,
        getGeocoding,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
