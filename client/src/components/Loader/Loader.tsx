import { ReactElement } from "react";
import "./Loader.css";

function Loader(): ReactElement {
  return (
    <section className="loader-container">
      <div className="loader"></div>
    </section>
  );
}

export { Loader };
