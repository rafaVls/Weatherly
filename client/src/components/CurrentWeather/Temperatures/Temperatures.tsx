import { ReactElement, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { Temp } from "../../../common/types/Forecast";
import "./Temperatures.css";

function Temperatures(): ReactElement {
  const { forecast } = useContext(GlobalContext);
  const [temperatures, setTemperatures] = useState({
    current: 0,
    max: 0,
    min: 0,
  });

  useEffect(() => {
    if (forecast) {
      const currentTemp = forecast.current.temp as number;
      const dailyTemp = forecast.daily[0].temp as Temp;

      setTemperatures({
        current: +currentTemp.toFixed(0),
        max: +dailyTemp.max.toFixed(0),
        min: +dailyTemp.min.toFixed(0),
      });
    }
  }, [forecast]);

  return (
    <div className="temperatures">
      <p className="current">
        {temperatures.current}
        <sup>°F</sup>
      </p>
      <div className="min-max">
        <p className="max">Max {temperatures.max}</p>
        <div className="separator"></div>
        <p className="min">Min {temperatures.min}</p>
      </div>
    </div>
  );
}

export { Temperatures };
