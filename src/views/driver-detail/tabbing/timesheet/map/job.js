import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";

import OrangeImg from "@assets/images/orange_circle.svg";
import BlueImg from "@assets/images/blue_circle.svg";

function JobMapDisplay(props) {
  let polyData = [];
  const [getBound, setBounds] = useState(null);

  props.reportStatus?.map((item) => {
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

  useEffect(() => {
    handleOnReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reportStatus]);
  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={3}
        mapTypeControl={true}
        bounds={getBound}
        streetViewControl={false}
        onReady={handleOnReady}
      >
        {polyData.map((cords, index) => (
          <Marker
            key={`${index}-${cords.status}`}
            name="Marker"
            position={{ lat: cords.lat, lng: cords.lng }}
            icon={{
              url: ["Start Break:", "Finish Break:", "Break:"].includes(
                cords.status
              )
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
})(JobMapDisplay);
