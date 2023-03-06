import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Stats from "./components/Stats";
import Grid from "@mui/material/Grid";
import SpeedProfile from "./components/SpeedProfile";
import ChargeProfile from "./components/ChargeProfile";
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
  const [data_, setData] = useState([]);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.addEventListener("message", (event) => {
      if (data_.length === 1000) socket.close();
      let data = JSON.parse(event.data);
      setData((prev) => [
        ...prev,
        {
          ...data,
          gps: {
            lat: data.gps.split("|").map((loc) => Number(loc))[0],
            lng: data.gps.split("|").map((loc) => Number(loc))[1]
          }
        }
      ]);
    });

    return () => {
      socket.removeEventListener("message");
      socket.close();
    };
  }, []);
  console.log(data_);
  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:3000");

  //   socket.addEventListener("message", (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("incoming data", data);
  //     setData((prevData) => [
  //       ...prevData,
  //       {
  //         ...data,
  //         gps: {
  //           lat: data.gps.split("|").map((loc) => Number(loc))[0],
  //           lng: data.gps.split("|").map((loc) => Number(loc))[1]
  //         }
  //       }
  //     ]);
  //   });

  //   return () => {
  //     console.log("entered");
  //     socket.close();
  //   };
  // }, []);
  return (
    <div>
      {data_.length ? (
        <Grid container spacing={10}>
          <Grid item xs={4} md={4}>
            <Map location={data_[data_.length - 1].gps} zoomLevel={17} />
          </Grid>
          <Grid item xs={8} md={8}>
            <Stats
              currentSpeed={data_[data_.length - 1].speed}
              stateOfCharge={data_[data_.length - 1].soc}
              energy={data_[data_.length - 1].energy}
              odometer={data_[data_.length - 1].odo}
            />
          </Grid>
          <Grid item xs={6} md={12}>
            <div style={{ padding: "2em" }}>
              <SpeedProfile
                data={data_.map((p) => ({ speed: p.speed, time: p.time }))}
              />
            </div>
          </Grid>
          <Grid item xs={6} md={12}>
            <ChargeProfile
              data={data_.map((p) => ({ soc: p.soc, time: p.time }))}
            />
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}

export default App;
