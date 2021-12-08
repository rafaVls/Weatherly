import { ReactElement, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Loader, Conditions, NavBar, CurrentWeather } from "./components";

function App(): ReactElement {
  const {
    latitude,
    longitude,
    forecast,
    geocoding,
    setCoordinates,
    getForecast,
    getGeocoding,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      setCoordinates && setCoordinates(32.71, -117.16);
    }

    if (latitude && longitude) {
      // setting the default location to San Diego. Users can change it
      // through the searchbar or their own location
      getForecast && getForecast({ lat: 32.71, lng: -117.16 });
      getGeocoding && getGeocoding("San Diego");
    }
  }, [latitude, longitude]);

  return (
    <>
      {forecast && geocoding ? (
        <section className="mobile-container">
          <NavBar />
          <CurrentWeather />

          <Conditions />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

export { App };
