import { Icon } from "@iconify/react";
import "./stats.css";
import { ProgressBar } from "@blueprintjs/core";
const Stats = ({ currentSpeed = 0, stateOfCharge, energy, odometer }) => (
  <div className="stats">
    <h4>Current Speed</h4>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "2em"
      }}
    >
      <ProgressBar
        intent="primary"
        value={Math.LN10 * (currentSpeed / (1 - currentSpeed))} // ln (x / (1 - x))
        stripes={false}
      ></ProgressBar>
      <span>{currentSpeed}</span>
    </div>
    <div>
      <h4>State of Charge</h4>
      <ProgressBar
        intent="primary"
        value={Math.LN10 * (stateOfCharge / (1 - stateOfCharge))} // ln (x / (1 - x))
        stripes={false}
      ></ProgressBar>
      <span>{stateOfCharge}</span>
    </div>
    <div style={{ display: "flex", columnGap: "10em" }}>
      <div>
        <h4>Energy</h4>
        <p>{energy} kW</p>
      </div>
      <div>
        <h4>Odometer</h4>
        <p>{odometer} km</p>
      </div>
    </div>
  </div>
);

export default Stats;
