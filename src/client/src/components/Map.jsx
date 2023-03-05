import React from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import env from "../.env.json";
import LocationPin from "./LocationPin";

const Map = ({ location, zoomLevel }) => {
    return (
      <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: env.env.REACT_APP_GOOGLE_MAPS_API_KEY
            }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
}
export default Map;