import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Stats from "./components/Stats";
import Grid from "@mui/material/Grid";
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

const location = {
  lat: 37.42216,
  lng: -122.08427
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setData({
        ...data,
        gps: {
          lat: data.gps.split("|").map((loc) => Number(loc))[0],
          lng: data.gps.split("|").map((loc) => Number(loc))[1]
        }
      });
    });

    return () => {
      socket.close();
    };
  }, []);
  return (
    <div>
      {data ? (
        <Grid container spacing={10}>
          <Grid item xs={4} md={4}>
            <Map location={data.gps} zoomLevel={17} />
          </Grid>
          <Grid item xs={8} md={8}>
            <Stats
              currentSpeed={data.speed}
              stateOfCharge={data.soc}
              energy={data.energy}
              odometer={data.odo}
            />
          </Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={8}></Grid>
        </Grid>
      ) : null}
    </div>
  );
}

export default App;
