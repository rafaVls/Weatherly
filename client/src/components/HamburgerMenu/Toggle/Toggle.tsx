import { ReactElement, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import "./Toggle.css";

function Toggle(): ReactElement {
  const { setForecast } = useContext(GlobalContext);

  function clickHandler(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const unitSystem = getUnitSystem(e.currentTarget.checked);

    setForecast && setForecast(unitSystem);
  }

  function getUnitSystem(checkboxState: boolean): "metric" | "imperial" {
    return checkboxState ? "metric" : "imperial";
  }

  return (
    <div className="unit-toggle">
      <label htmlFor="measurement-units">
        <input
          id="measurement-units"
          type="checkbox"
          onClick={(e) => clickHandler(e)}
        />
        <strong>Measurement units</strong>
        <span>
          <span>°F, mph</span>
          <span>°C, m/s</span>
          <span></span>
        </span>
      </label>
    </div>
  );
}

export { Toggle };
