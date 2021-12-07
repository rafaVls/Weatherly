import { ReactElement } from "react";
import { ConditionCard } from "./ConditionCard/ConditionCard";

function Conditions(): ReactElement {
  return (
    <section className="conditions-container">
      <ConditionCard />
    </section>
  );
}

export { Conditions };
