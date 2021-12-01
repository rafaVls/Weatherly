import * as React from "react";

function App() {
  return (
    <>
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
    </>
  );
}

export { App };
