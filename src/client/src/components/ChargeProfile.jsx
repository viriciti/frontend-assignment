import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import React, { useState, useEffect } from "react";
import { throttle } from "lodash";

const ChargeProfile = React.memo(({ data }) => {
  const [chartData, setChartData] = useState([]);
  //   const data = [
  //     { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  //     { name: "Page B", uv: 300, pv: 2700, amt: 2700 }
  //   ];
  /*
  {
    energy: 57.933,
    gps: "52.08860778808594|5.108839988708496",
    odo: 88531.453,
    soc: 62,
    speed: 29,
    time: 1511437559000,
  }
*/
  useEffect(() => {
    const updateChart = (newData) => {
      setChartData([...newData]);
    };
    const throttledUpdateChart = throttle(updateChart, 1000);

    const interval = setInterval(() => {
      const transformedTimeData = data.map((update) => ({
        ...update,
        time: Math.round(update.time / 3600000, 2)
      }));
      throttledUpdateChart(transformedTimeData);
    }, 1000);

    return () => {
      clearInterval(interval);
      throttledUpdateChart.cancel();
    };
  }, [chartData]);

  return (
    <>
      <h4>Charge Profile</h4>
      <LineChart width={1100} height={300} data={chartData}>
        <XAxis
          label={{ value: "Time", angle: 0, position: "insideLeft" }}
          tick={() => null}
        />
        <YAxis
          label={{
            value: "State of Charge (%)",
            angle: -90,
            position: "insideLeft"
          }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="soc" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </>
  );
});

export default ChargeProfile;
