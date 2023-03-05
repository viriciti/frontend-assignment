import React from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import LocationPin from "./LocationPin";

const Map = ({ location, zoomLevel }) => {
    console.log(location, zoomLevel)
    return (
      <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
                <GoogleMapReact
                
            bootstrapURLKeys={{
              key: "AIzaSyA2MbR4z_w-y6XsPGRXTCQ9xSDEiWDtzms"
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