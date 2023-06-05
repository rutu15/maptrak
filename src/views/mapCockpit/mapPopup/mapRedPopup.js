import React from "react";

import { routes } from "@utils/constant";
import { utcToTimezone } from "@utils/commonFunctions";

function MapRedPopup(props) {
  return (
    <>
      <div className="map-popup-block">
        <div className="map-popup-block-inner">
          {props.showRego && (
            <h2>{props.data?.trucks ? props.data?.trucks?.rego : "-"}</h2>
          )}
          <div className="tracking-process">
            <div className="tracking-row">
              <h3>JOB</h3>
              <ul className="tracking-list">
                {/* Added jobType  https://wymap.atlassian.net/browse/MAPTRAK-773 */}
                <li>
                  <p className="title-text">Jobtype</p>
                  <p className="timing-text">
                    {props.data?.jobTypes ? props.data?.jobTypes?.name : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text">Job Number</p>
                  <p
                    className="timing-text-link"
                    onClick={() =>
                      window.location.replace(
                        `${routes.jobDetail}/${props.data?.id}`
                      )
                    }
                  >
                    {props.data?.id ? props.data?.id : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text">Driver</p>
                  <p className="timing-text">
                    {props.data?.drivers ? props.data?.drivers?.name : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text">CTO</p>
                  <p className="timing-text">
                    {props.data?.ctos ? props.data?.ctos?.name : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text">Cargo Type</p>
                  <p className="timing-text">
                    {props.data?.cargoTypes
                      ? props.data?.cargoTypes?.name
                      : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text"> Job Started</p>
                  <p className="timing-text">
                    {props.data?.startedAt
                      ? utcToTimezone(
                          props.data?.startedAt,
                          props.data?.cities?.timezone,
                          "DD/MM/yyyy hh:mm a"
                        )
                      : "-"}
                  </p>
                </li>
                <li>
                  <p className="title-text"> Job Status</p>
                  <p className="timing-text">
                    {props.data?.jobStatuses
                      ? props.data?.jobStatuses?.name
                      : "-"}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="waiting-time-wrapper">
          <p>Waiting time over 2 hours</p>
        </div>
      </div>
    </>
  );
}

export default MapRedPopup;
