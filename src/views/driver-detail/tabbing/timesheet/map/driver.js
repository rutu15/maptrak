import React from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";

import BlueImg from "@assets/images/blue_circle.svg";

function DriveMapDisplay(props) {
  let polyData = [];
  let bounds = new props.google.maps.LatLngBounds();

  polyData.push({
    lat: parseFloat(props.latitude),
    lng: parseFloat(props.longitude),
  });
  for (var i = 0; i < polyData.length; i++) {
    bounds.extend(polyData[i]);
  }

  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={20}
        mapTypeControl={true}
        bounds={bounds}
        streetViewControl={false}
        initialCenter={polyData[0]}
      >
        <Marker
          name="Marker"
          position={{ lat: props.latitude, lng: props.longitude }}
          icon={{
            url: BlueImg,
            anchor: new props.google.maps.Point(7, 7),
            scaledSize: new props.google.maps.Size(12, 12),
          }}
        />
        <Polyline
          path={[
            {
              lat: parseFloat(props.latitude),
              lng: parseFloat(props.longitude),
            },
          ]}
          options={{
            strokeColor: "#00548E",
            strokeOpacity: 1,
            strokeWeight: 4,
          }}
        />
      </Map>
    </div>
  );
}

const LoadingContainer = () => "";

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACE_API,
  LoadingContainer: LoadingContainer,
})(DriveMapDisplay);
