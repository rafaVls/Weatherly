import { ReactElement } from "react";
import "./Toggle.css";

interface Props {
  options: { firstOption: string; secondOption: string };
  toggleUnits: "speed" | "temp";
}

function Toggle({ options, toggleUnits }: Props): ReactElement {
  const inputId = toggleUnits + "-units";
  const labelText = toggleUnits === "speed" ? "Speed" : "Temperature";

  return (
    <li className="unit-toggle">
      <label htmlFor={inputId}>
        <input id={inputId} type="checkbox" />
        <strong>{labelText} units</strong>
        <span>
          <span>{options.firstOption}</span>
          <span>{options.secondOption}</span>
          <span></span>
        </span>
      </label>
    </li>
  );
}

export { Toggle };
