import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

const Stats = ({ currentSpeed = 0, stateOfCharge, energy, odometer }) => {
  const [soc, setSOC] = useState(stateOfCharge);

  useEffect(() => {
    if (soc !== stateOfCharge) {
      setSOC(stateOfCharge);
    }
  }, [stateOfCharge, soc]);

  return (
    <div className="flex flex-col flex-wrap	" style={{ rowGap: "10em" }}>
      <div className="flex flex-wrap">
        <div>
          <h4>Current Speed</h4>
          <GaugeChart
            id="gauge-chart2"
            textColor="black"
            nrOfLevels={20}
            animate={false}
            percent={currentSpeed / 100}
            formatTextValue={(value) => value + " km/h"}
          />
        </div>
        <div>
          <h4>State of Charge</h4>
          <div>
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={20}
              textColor="black"
              animate={false}
              percent={soc / 100}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex-grow">
          <button class="border-2 border-purple-500 hover:border-gray-500 p-8">
            Energy: {energy} kW
          </button>
        </div>
        <div className="flex-grow">
          <button class="border-2 border-purple-500 hover:border-gray-500 p-8">
            Odometer: {odometer} km
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
