import { ReactElement, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import "./NavBar.css";

function validateAddress(address: string | undefined): string {
  if (address) {
    const words = address.split(" ");
    // sometimes address will contain zip codes, which we remove with !+word
    // we also remove duplicates by comparing elements to indexOf
    const validAddress = words.filter(
      (word, i, self) => !+word && self.indexOf(word) === i
    );

    return validAddress.join(" ");
  }

  return "Address not available";
}

function getTodayString(): string {
  const today = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayString = today
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");

  return `${weekdays[today.getDay()]}, ${todayString}`;
}

function NavBar(): ReactElement {
  const { geocoding } = useContext(GlobalContext);

  return (
    <nav>
      <header className="location-and-date">
        <h1>{validateAddress(geocoding?.formatted_address)}</h1>
        <p>{getTodayString()}</p>
      </header>
      <HamburgerMenu />
    </nav>
  );
}

export { NavBar };
