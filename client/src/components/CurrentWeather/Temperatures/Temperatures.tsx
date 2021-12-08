import { ReactElement } from "react";

function Temperatures(): ReactElement {
  return (
    <div className="temperatures">
      <p className="current">
        78<sup>°F</sup>
      </p>
      <div className="min-max">
        <p className="max">Max 82</p>
        <p className="min">Min 74</p>
      </div>
    </div>
  );
}

export { Temperatures };
