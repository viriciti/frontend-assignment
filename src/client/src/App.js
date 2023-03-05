import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";

// AIzaSyA2MbR4z_w-y6XsPGRXTCQ9xSDEiWDtzms
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
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427
};

function App() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:3000");

  //   socket.addEventListener("message", (event) => {
  //     const data = JSON.parse(event.data);
  //     setData(data);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  // console.log(data);
  return (
    <div>
      <Map location={location} zoomLevel={17} />
    </div>
  );
}

export default App;
