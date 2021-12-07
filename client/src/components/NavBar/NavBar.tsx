import { ReactElement } from "react";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";

function NavBar(): ReactElement {
  return (
    <nav>
      <h1>San Diego, CA, US</h1>
      <p>Wednesday, Nov 10 2021</p>
      <HamburgerMenu />
    </nav>
  );
}

export { NavBar };
