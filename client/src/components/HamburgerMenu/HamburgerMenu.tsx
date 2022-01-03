import { MouseEvent, ReactElement, useRef } from "react";
import "./HamburgerMenu.css";

function HamburgerMenu(): ReactElement {
  const menuElement = useRef<HTMLDivElement>(null);

  function clickHandler(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    menuElement.current?.classList.toggle("open");
    e.currentTarget.classList.toggle("toggled");
  }

  return (
    <>
      <button className="hamburger-container" onClick={(e) => clickHandler(e)}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <div className="menu" ref={menuElement}>
        <ul className="toggles-container">
          <li className="unit-toggle">
            <label htmlFor="speed-units">
              <input id="speed-units" type="checkbox" />
              <strong>Speed units</strong>
              <span>
                <span>km/h</span>
                <span>mph</span>
                <span></span>
              </span>
            </label>
          </li>
          <li className="unit-toggle">
            <label htmlFor="temp-units">
              <input id="temp-units" type="checkbox" />
              <strong>Temperature and units</strong>
              <span>
                <span>°C</span>
                <span>°F</span>
                <span></span>
              </span>
            </label>
          </li>
        </ul>
        <div className="search-box-container">
          <label htmlFor="search-box">Search by city</label>
          <input
            id="search-box"
            className="search-box"
            type="search"
            placeholder="London"
          />
        </div>
      </div>
    </>
  );
}

export { HamburgerMenu };
