import { ReactElement, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";

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
          <nav>
            <h1>San Diego, CA, US</h1>
            <p>Wednesday, Nov 10 2021</p>
            <div className="hamburger-container"></div>
          </nav>

          <section className="current-weather">
            <figure>
              <img src="" alt="" />
              <figcaption>Rainy</figcaption>
            </figure>

            <div className="temperatures">
              <p className="current">
                78<sup>°F</sup>
              </p>
              <div className="min-max">
                <p className="max">Max 82</p>
                <p className="min">Min 74</p>
              </div>
            </div>
          </section>

          <section className="conditions-container">
            <div className="condition-card">
              <figure>
                <img src="" alt="" />
                <figcaption>Sunrise</figcaption>
              </figure>
              <p className="condition-value">06:16 AM</p>
            </div>
            <div className="condition-card"></div>
            <div className="condition-card"></div>
            <div className="condition-card"></div>
            <div className="condition-card"></div>
            <div className="condition-card"></div>
          </section>
        </section>
      ) : (
        <section className="loader-container">
          <div className="loader"></div>
        </section>
      )}
    </>
  );
}

export { App };
