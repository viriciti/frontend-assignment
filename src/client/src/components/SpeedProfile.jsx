import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";

const SpeedProfile = ({ data }) => {
  return (
    <>
      <h4>Speed Profile</h4>
      <LineChart width={1100} height={300} data={data}>
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={() => null}
        />

        <YAxis
          label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }}
        />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default SpeedProfile;
