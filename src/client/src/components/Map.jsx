import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import env from "../.env.json";
import LocationPin from "./LocationPin";

const Map = ({ location, zoomLevel }) => {
  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: env.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }}
        defaultCenter={location}
        defaultZoom={10}
        center={location}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
};
export default Map;
