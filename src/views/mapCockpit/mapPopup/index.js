import React from "react";

import MapNormalPopup from "./mapNormalPopup";
import MapRedPopup from "./mapRedPopup";
import { MapPopupStyle } from "./style";

function mapPopup(props) {
  const classes = MapPopupStyle();

  return (
    <div className={classes.MapPopupWrapper}>
      {props.isActive ? (
        <MapRedPopup data={props.data} showRego={props.showRego} />
      ) : (
        <MapNormalPopup data={props.data} showRego={props.showRego} />
      )}
    </div>
  );
}
export default mapPopup;
