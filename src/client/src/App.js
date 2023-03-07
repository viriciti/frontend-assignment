import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Stats from "./components/Stats";
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
  return (
    <div className="font-mono flex flex-col" style={{ rowGap: "5em" }}>
      <h1>Viriciti</h1>
      {data_.length ? (
        <>
          <div
            className="flex flex-col md:flex-row"
            style={{ columnGap: "5em", justifyContent: "space-between" }}
          >
            <div className="md:w-2/5">
              <Map location={data_[data_.length - 1].gps} zoomLevel={17} />
            </div>
            <div className="md:w-3/5">
              <Stats
                currentSpeed={data_[data_.length - 1].speed}
                stateOfCharge={data_[data_.length - 1].soc}
                energy={data_[data_.length - 1].energy}
                odometer={data_[data_.length - 1].odo}
              />
            </div>
          </div>
          <div style={{ padding: "1em" }}>
            <SpeedProfile
              data={data_.map((p) => ({ speed: p.speed, time: p.time }))}
            />
          </div>
          <div>
            <ChargeProfile
              data={data_.map((p) => ({ soc: p.soc, time: p.time }))}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
