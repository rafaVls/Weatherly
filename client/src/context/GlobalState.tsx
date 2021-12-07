import { Coordinates } from "../common/types/Geocoding";
import { State } from "../common/types/State";

import { createContext, useReducer, ReactNode } from "react";
import { AppReducer } from "./AppReducer";

let initialState: State = {
  latitude: null,
  longitude: null,
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

      const url = `//localhost:5000/forecast?lat=${lat}&lon=${lon}`;
      const res = await fetch(url);
      const { forecast_imperial, forecast_metric } = await res.json();

      dispatch({
        type: "GET_FORECAST",
        forecast: {
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

  async function getGeocoding(address: string): Promise<void> {
    try {
      const url = `//localhost:5000/geocoding?address=${address}`;
      const res = await fetch(url);
      const { data } = await res.json();

      dispatch({
        type: "GET_GEOCODING",
        geocoding: data,
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
        forecast: state.forecast,
        geocoding: state.geocoding,
        setCoordinates,
        getForecast,
        getGeocoding,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
