import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalState";

function App() {
  const { forecast, geocoding, getForecast, getGeocoding } =
    useContext(GlobalContext);
  const [iconURL, setURL] = useState("");

  useEffect(() => {
    // setting the default location to San Diego. Users can change it
    // through the searchbar or their own location
    getForecast && getForecast({ lat: 32.71, lng: -117.16 });
    getGeocoding && getGeocoding("San Diego");

    if (forecast) {
      setURL(
        `http://openweathermap.org/img/wn/${forecast.metric.current.weather[0].icon}@2x.png`
      );
    }
  }, []);

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
              <img src={iconURL} alt="" />
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
