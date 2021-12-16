import { ReactElement, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Temperatures } from "./Temperatures/Temperatures";
import "./CurrentWeather.css";

function getDayIcon(icon: string): string {
  return `http://openweathermap.org/img/wn/${icon}@4x.png`;
}

function CurrentWeather(): ReactElement {
  const { forecast } = useContext(GlobalContext);
  const weather = forecast?.metric.current.weather[0];

  return (
    <section className="current-weather">
      <figure>
        <img
          src={weather && getDayIcon(weather.icon)}
          alt={weather?.description}
          title={weather?.main}
        />
        <figcaption>{weather?.main}</figcaption>
      </figure>

      <Temperatures />
    </section>
  );
}

export { CurrentWeather };
