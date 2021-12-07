import { ReactElement } from "react";

function ConditionCard(): ReactElement {
  return (
    <div className="condition-card">
      <figure>
        <img src="" alt="" />
        <figcaption>Sunrise</figcaption>
      </figure>
      <p className="condition-value">06:16 AM</p>
    </div>
  );
}

export { ConditionCard };
