import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import moment from "moment-timezone";

import { useStore } from "@store/store";
import redLooseMarker from "@assets/images/red-loose-pin.svg";
import redUldMarker from "@assets/images/red-uld-pin.svg";
import GreenUldMarker from "@assets/images/green-uld-pin.svg";
import GreenLooseMarker from "@assets/images/green-loose-pin.svg";
import GreenConsignmentMarker from "@assets/images/map-green-marker.svg";
import RedConsignmentMarker from "@assets/images/map-red-marker.svg";
import MapPopup from "../mapPopup";

// to support handle click in infowindow content
function InfoWindowEx(props) {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef.current.infowindow.setContent(contentElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}

function MapDisplay(props) {
  const [activeMarker, setActiveMarker] = useState({});
  const [isOpenInfoWindow, setOpenInfoWindow] = useState(false);
  const [redPopup, setRedPopup] = useState(false);
  // const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState({});
  const [getMarker, setMarker] = useState({});

  const [state] = useStore();
  const { rego } = props;

  // function handleWindowSizeChange() {
  //   setWidth(window.innerWidth);
  // }
  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

  useEffect(() => {
    if (props.openFilter) {
      onInfoWindowClose();
    }
  }, [props.openFilter]);

  // let isMobile = width <= 768;
  const onMarkerClick = (item, isClick) => (props, marker) => {
    // if (rego === true) {
    //   marker.set("label", data?.trucks?.rego);
    //   marker.set("color", "red");
    // }
    const dt1 = new Date();
    const dt2 = new Date(item?.jobRunsheets[0].time);
    const diffTime = Math.abs(dt1 - dt2);
    let hours = Math.floor(diffTime / (1000 * 60 * 60));
    if ((activeMarker && marker.name !== activeMarker.name) || !activeMarker) {
      if ([2, 8].includes(item?.jobRunsheets[0]?.jobRunsheetStatuses?.id)) {
        if (hours >= 2) {
          setRedPopup(true);
        }
      } else {
        setRedPopup(false);
      }
      setData(item);
      setActiveMarker(marker);
      setOpenInfoWindow(true);
    }

    if (isClick) {
      getMarker.panTo(marker?.getPosition());
      getMarker.setZoom(15);
    }
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setOpenInfoWindow(false);
  };

  const onMapClicked = () => {
    if (activeMarker) {
      setActiveMarker(null);
      setOpenInfoWindow(false);
    }
  };

  // Update icon on basis of jobType and waiting time
  // Calulation of waiting time over
  const iconUpdater = (item) => {
    const dt1 = moment.tz("UTC");
    const dt2 = moment(item?.jobRunsheets[0] && item?.jobRunsheets[0].time);
    const diffTime = Math.abs(dt1 - dt2);
    let hours = Math.floor(diffTime / (1000 * 60 * 60));
    if (item.cargoTypes) {
      if (item.cargoTypes?.name === "ULD") {
        if ([2, 8].includes(item?.jobRunsheets[0]?.jobRunsheetStatuses?.id)) {
          if (hours >= 2) {
            return redUldMarker;
          } else {
            return GreenLooseMarker;
          }
        } else {
          return GreenUldMarker;
        }
      }
      if (item.cargoTypes?.name === "Loose") {
        if ([2, 8].includes(item?.jobRunsheets[0]?.jobRunsheetStatuses?.id)) {
          if (hours >= 2) {
            return redLooseMarker;
          } else {
            return GreenLooseMarker;
          }
        } else {
          return GreenLooseMarker;
        }
      }
    } else {
      if ([2, 8].includes(item?.jobRunsheets[0]?.jobRunsheetStatuses?.id)) {
        if (hours >= 2) {
          return RedConsignmentMarker;
        } else {
          return GreenConsignmentMarker;
        }
      } else {
        return GreenConsignmentMarker;
      }
    }
  };

  return (
    <div className="map-block">
      <Map
        ref={(map) => setMarker(map?.map)}
        className="map"
        google={props.google}
        onClick={onMapClicked}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={5}
        initialCenter={{ lat: -33.9488463, lng: 151.1556124 }}
      >
        {state.mapCockpit?.mapcockpitData?.map((item, index) => {
          return (
            <Marker
              key={index}
              name={`Marker ${index} `}
              onMouseover={onMarkerClick(item)}
              onClick={onMarkerClick(item, "isClick")}
              label={{
                text: rego === true ? item?.trucks?.rego : null,
                fontWeight: "bold",
              }}
              position={{
                lat: item?.jobRunsheets[0]?.latitude,
                lng: item?.jobRunsheets[0]?.longitude,
              }}
              icon={{
                labelOrigin: new props.google.maps.Point(11, 50),
                url: iconUpdater(item),
                scaledSize: new props.google.maps.Size(48, 48),
              }}
            />
          );
        })}

        <InfoWindowEx
          marker={activeMarker}
          onClose={onInfoWindowClose}
          visible={isOpenInfoWindow}
        >
          <MapPopup isActive={redPopup} data={data} showRego={props.rego} />
        </InfoWindowEx>
      </Map>
    </div>
  );
}

const LoadingContainer = () => "";

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACE_API,
  LoadingContainer: LoadingContainer,
})(MapDisplay);
