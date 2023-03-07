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

const SpeedProfile = React.memo(({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const updateChart = (newData) => {
      setChartData([...newData]);
    };
    const throttledUpdateChart = throttle(updateChart, 100);

    const interval = setInterval(() => {
      const transformedTimeData = data.map((update) => ({
        ...update,
        time: Math.round(update.time / 3600000, 2)
      }));
      throttledUpdateChart(transformedTimeData);
    }, 100);

    return () => {
      clearInterval(interval);
      throttledUpdateChart.cancel();
    };
  }, [data]);

  return (
    <>
      <h4>Speed Profile</h4>
      <LineChart width={1100} height={300} data={chartData}>
        <XAxis
          label={{ value: "Time", angle: 0, position: "insideLeft" }}
          tick={() => null}
        />
        <YAxis
          label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </>
  );
});

export default SpeedProfile;
