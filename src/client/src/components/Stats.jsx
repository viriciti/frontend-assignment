import "./stats.css";
import GaugeChart from "react-gauge-chart";
import Grid from "@mui/material/Grid";

const Stats = ({ currentSpeed = 0, stateOfCharge, energy, odometer }) => (
  <div className="stats">
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: "2em",
          width: "50%"
        }}
      >
        <h4>Current Speed</h4>
        <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={currentSpeed} />
      </div>
      <div>
        <h4>State of Charge</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "2em",
            width: "50%"
          }}
        >
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={20}
            percent={stateOfCharge}
          />
        </div>
      </div>
    </div>

    <div style={{ display: "flex", columnGap: "10em" }}>
      <div>
        <h4>Energy</h4>
        <p>{energy} kW</p>
      </div>
      <div>
        <h4>Odometer</h4>
        <p>{Math.floor(odometer)} km</p>
      </div>
    </div>
  </div>
);

export default Stats;
