import React, { useState } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";

import { useStore } from "@store/store";
import OrangeImg from "@assets/images/orange_circle.svg";
import BlueImg from "@assets/images/blue_circle.svg";
function MapDisplay(props) {
  const [state] = useStore();

  let polyData = [];
  const [getBound, setBounds] = useState(null);
  state.job?.jobRunSheetData?.jobRunsheetReport?.map((item) => {
    polyData.push({
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
      status: item.jobRunsheetStatus,
    });
    return true;
  });
  const handleOnReady = () => {
    const bounds = new props.google.maps.LatLngBounds();
    for (let loc of polyData) bounds.extend({ lat: loc.lat, lng: loc.lng });
    setBounds(bounds);
  };

  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={3}
        mapTypeControl={false}
        bounds={getBound}
        onReady={handleOnReady}
      >
        {polyData.map((cords, index) => (
          <Marker
            key={index}
            name="Marker"
            position={{ lat: cords.lat, lng: cords.lng }}
            icon={{
              url: ["Start Break", "Finish Break"].includes(cords.status)
                ? OrangeImg
                : BlueImg,
              anchor: new props.google.maps.Point(7, 7),
              scaledSize: new props.google.maps.Size(12, 12),
            }}
          />
        ))}
        <Polyline
          path={polyData}
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
})(MapDisplay);
