import {
  MouseEvent,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Toggle } from "./Toggle/Toggle";
import { GlobalContext } from "../../context/GlobalState";
import "./HamburgerMenu.css";

function HamburgerMenu(): ReactElement {
  const [searchValue, setValue] = useState("");
  const menuElement = useRef<HTMLDivElement>(null);
  const { geocoding, setCoordinates, getForecast, getGeocoding } =
    useContext(GlobalContext);

  useEffect(() => {
    if (geocoding && setCoordinates && getForecast) {
      const { lat, lng } = geocoding.geometry.location;
      setCoordinates(lat, lng);
      getForecast({ lat, lng });
    }
  }, [geocoding]);

  function clickHandler(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    menuElement.current?.classList.toggle("open");
    e.currentTarget.classList.toggle("toggled");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    getGeocoding && getGeocoding(searchValue);
    setValue("");
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
          {/* <Toggle */}
          {/*   options={{ firstOption: "km/h", secondOption: "mph" }} */}
          {/*   toggleUnits="speed" */}
          {/* /> */}
          {/* <Toggle */}
          {/*   options={{ firstOption: "°C", secondOption: "°F" }} */}
          {/*   toggleUnits="temp" */}
          {/* /> */}
        </ul>
        <form
          className="search-box-container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="search-box">Search by city</label>
          <input
            id="search-box"
            className="search-box"
            type="search"
            placeholder="London"
            value={searchValue}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}

export { HamburgerMenu };
