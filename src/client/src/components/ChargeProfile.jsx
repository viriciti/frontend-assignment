import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import React from "react";

const ChargeProfile = ({ data }) => {
  return (
    <>
      <h4>Charge Profile</h4>
      <LineChart width={1100} height={300} data={data}>
        <XAxis
          label={{ value: "Time", angle: 0, position: "insideLeft" }}
          tick={() => null}
        />
        <YAxis
          label={{
            value: "State of Charge (%)",
            angle: -90,
            position: "center"
          }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="soc" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default ChargeProfile;
