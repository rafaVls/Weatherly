import { ReactElement, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import {
  Loader,
  Conditions,
  Header,
  HamburgerMenu,
  CurrentWeather,
} from "./components";
import "./App.css";

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
      <section className="app">
        {forecast && geocoding ? (
          <>
            <Header />
            <HamburgerMenu />
            <CurrentWeather />

            <Conditions />
          </>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}

export { App };
