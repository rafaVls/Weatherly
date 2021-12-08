import { ReactElement } from "react";
import { Temperatures } from "./Temperatures/Temperatures";

function CurrentWeather(): ReactElement {
  return (
    <section className="current-weather">
      <figure>
        <img src="" alt="" />
        <figcaption>Rainy</figcaption>
      </figure>

      <Temperatures />
    </section>
  );
}

export { CurrentWeather };
