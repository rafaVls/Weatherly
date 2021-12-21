import { ReactElement, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ConditionCard } from "./ConditionCard/ConditionCard";
import "./Conditions.css";

function unixToDate(
  unixTimestamp?: number,
  timeZone: string = "America/Los_Angeles"
): string {
  if (unixTimestamp) {
    const miliseconds = unixTimestamp * 1000;
    const date = new Date(miliseconds);

    return date.toLocaleTimeString("en-GB", { timeZone });
  }

  return "N/A";
}

function Conditions(): ReactElement {
  const { forecast } = useContext(GlobalContext);
  const current = forecast?.imperial.current;
  const daily = forecast?.imperial.daily[0];
  const timeZone = forecast?.imperial.timezone;

  const conditions = [
    {
      id: 1,
      value: `${unixToDate(current?.sunrise, timeZone)} AM`,
      name: "Sunrise",
      icon: "wi:sunrise",
    },
    {
      id: 2,
      value: `${unixToDate(current?.sunset, timeZone)} PM`,
      name: "Sunset",
      icon: "wi:sunset",
    },
    {
      id: 3,
      value: current?.wind_speed + " mph",
      name: "Wind Speed",
      icon: "wi:strong-wind",
    },
    {
      id: 4,
      value: (current?.feels_like as number).toFixed(0) + " °F",
      name: "Feels Like",
      icon: "wi:thermometer",
    },
    {
      id: 5,
      value: current?.humidity + "%",
      name: "Humidity",
      icon: "wi:humidity",
    },
    {
      id: 6,
      value: daily?.pop + "%",
      name: "Precipitation",
      icon: "wi:raindrops",
    },
  ];

  const Cards = conditions.map((item) => (
    <ConditionCard
      key={item.id}
      name={item.name}
      value={item.value?.toString()}
      icon={item.icon}
    />
  ));

  return <section className="conditions-container">{Cards}</section>;
}

export { Conditions };
