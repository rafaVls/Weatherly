import { ReactElement } from "react";
import "./ConditionCard.css";

interface Props {
  name: string;
  value?: string;
  icon: string;
}

function ConditionCard({ name, value, icon }: Props): ReactElement {
  return (
    <div className="condition-card">
      <figure className="condition-icon">
        {/* the iconify script turns this span into an svg*/}
        <span className="iconify" data-icon={icon}></span>
        <figcaption>{name}</figcaption>
      </figure>
      <p className="condition-value">{value}</p>
    </div>
  );
}

export { ConditionCard };
