import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    });

    return () => {
      socket.close();
    };
  }, []);

  return <div></div>;
}

export default App;
