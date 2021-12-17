import { ReactElement } from "react";
import "./HamburgerMenu.css";

function HamburgerMenu(): ReactElement {
  return (
    <button className="hamburger-container">
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
}

export { HamburgerMenu };
