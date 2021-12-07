import { Actions, State } from "../common/types/State";

function AppReducer(state: State, action: Actions): State {
  switch (action.type) {
    case "SET_COORDINATES":
      const { latitude, longitude } = action;

      return {
        ...state,
        latitude,
        longitude,
      };

    case "GET_FORECAST":
      return {
        ...state,
        forecast: action.forecast,
      };

    case "GET_GEOCODING":
      return {
        ...state,
        geocoding: action.geocoding,
      };

    case "ERROR":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export { AppReducer };
