import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useStore } from "@store/store";
import deleteIcon from "@assets/images/delete.svg";
import editIcon from "@assets/images/edit.svg";
import { getPermissions } from "@utils/commonFunctions";
import { routes } from "@utils/constant";
import {
  DOWNLOAD_PDF_JOB_RUNSHEET,
  DOWNLOAD_PDF_JOB_RUNSHEET_SUCCESS,
  DOWNLOAD_PDF_JOB_RUNSHEET_FAILURE,
  FETCH_TRUCKS,
  FETCH_TRUCKS_SUCCESS,
  FETCH_TRUCKS_FAILURE,
  FETCH_TRAILER,
  FETCH_TRAILER_SUCCESS,
  FETCH_TRAILER_FAILURE,
  UPDATE_JOB_DETAILS,
  UPDATE_JOB_DETAILS_SUCCESS,
  UPDATE_JOB_DETAILS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Popup from "./truck-rego-popup";

function FormBlock(props) {
  const [, dispatch] = useStore();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    if (open) {
      const params = {
        cityId: props?.jobsData?.cities.id,
        order: "asc",
        orderBy: "rego",
      };

      dispatch({ type: FETCH_TRUCKS });
      API.get("trucks", { params })
        .then((response) => {
          dispatch({
            type: FETCH_TRUCKS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((err) => {
          dispatch({ type: FETCH_TRUCKS_FAILURE, payload: err });
        });

      dispatch({ type: FETCH_TRAILER });
      API.get("trailers", { params })
        .then((response) => {
          dispatch({
            type: FETCH_TRAILER_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((err) => {
          dispatch({ type: FETCH_TRAILER_FAILURE, payload: err });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChangeTruck = (e) => {
    setTruck(e.target.value);
  };

  const handleChangeDriver = (e) => {
    setDriver(e.target.value);
  };
  const handleChangeTrailer = (e) => {
    setTrailer(e.target.value);
  };
  const isPermission =
    getPermissions() && getPermissions().includes("jobReview");

  // API calling to  download job runsheet
  const handleDownload = () => {
    dispatch({ type: DOWNLOAD_PDF_JOB_RUNSHEET });
    API.get(`jobs/${id}/downloadJobRunsheetPDF`)
      .then((response) => {
        dispatch({
          type: DOWNLOAD_PDF_JOB_RUNSHEET_SUCCESS,
          payload: response.data.data,
        });
        window.open(response.data.data, "_blank");
      })
      .catch((error) => {
        dispatch({ type: DOWNLOAD_PDF_JOB_RUNSHEET_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
    setDriver(props.jobsData?.drivers?.id);
    setTruck(props.jobsData?.trucks?.id);
    setTrailer(props.jobsData?.trailers ? props.jobsData?.trailers?.id : "");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let data = {
      truckId: truck,
      driverId: driver,
    };
    data = {
      ...data,
      ...(!!trailer ? { trailerId: trailer } : {}),
    };
    dispatch({ type: UPDATE_JOB_DETAILS });
    API.put(`jobs/${id}/updateJobDetails`, data)
      .then((response) => {
        handleClose();
        props.getJobs();
        dispatch({
          type: UPDATE_JOB_DETAILS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_JOB_DETAILS_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div className="white-card edit-block">
      <div className="edit-block-header">
        <div className="inner-heading">
          <p>Job Number</p>
          <span>{props.jobsData?.id ? props.jobsData?.id : "-"}</span>
        </div>

        {/* https://wymap.atlassian.net/browse/MAPTRAK-874 If invoice not generated then only job can edited and deleted */}
        {props.jobsData?.invoiceGenerated === false ? (
          <div className="link-block">
            <span title="Delete" onClick={props.handleDeletePopup}>
              <em>
                <img src={deleteIcon} alt="Delete" />
              </em>
              Delete
            </span>

            <span title="Edit" onClick={props.handleClickOpen}>
              <em>
                <img src={editIcon} alt="Edit" />
              </em>
              Edit
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      {props.jobsData?.description && (
        <div className="edit-block-content">
          <Typography variant="h6">Description:</Typography>
          <p>{props.jobsData?.description}</p>
        </div>
      )}
      <div className="edit-block-list">
        <ul>
          <li>
            <Typography variant="h6">Customer</Typography>
            <div className="value-block">
              <Link
                to={`${routes.customerDetail}/${props.jobsData?.customers?.id}`}
              >
                {props.jobsData?.customers
                  ? props.jobsData?.customers.name
                  : "-"}
              </Link>
            </div>
          </li>
          <li>
            <Typography variant="h6">Job type</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.jobTypes
                  ? props.jobsData?.jobTypes?.name
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Cargo type</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.cargoTypes
                  ? props.jobsData?.cargoTypes.name
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Requester</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.requesterName
                  ? props.jobsData?.requesterName
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Email</Typography>
            <div className="value-block">
              <p>{props.jobsData?.email ? props.jobsData?.email : "-"}</p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Total Weight</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.weight ? props.jobsData?.weight + " Kg" : 0}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Total Quantity</Typography>
            <div className="value-block">
              <p>{props.jobsData?.quantity ? props.jobsData?.quantity : 0}</p>
            </div>
          </li>
          {/* https://wymap.atlassian.net/browse/MAPTRAK-1034 Added weight and qty loaded */}
          <li>
            <Typography variant="h6">Loaded Weight</Typography>
            <div className="value-block">
              <p>
              {props.jobsData?.jobTypes?.name === "Empty" 
                  ? "-"
                  : props?.jobsData?.weightLoaded === null
                  ? 0
                  : props.jobsData?.weightLoaded === undefined 
                  ? "-" 
                  : props?.jobsData?.weightLoaded + " Kg"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Loaded Quantity </Typography>
            <div className="value-block">
              <p>
              {props.jobsData?.jobTypes?.name === "Empty"
                  ? "-"
                  : props?.jobsData?.quantityLoaded === null
                  ? 0
                  : props?.jobsData?.quantityLoaded === undefined 
                  ? "-" 
                  : props?.jobsData?.quantityLoaded}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">City</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.cities ? props.jobsData?.cities.name : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Pick up</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.pickUpLocation
                  ? props.jobsData?.pickUpLocation
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Drop off</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.dropOffLocation
                  ? props.jobsData?.dropOffLocation
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Driver</Typography>
            <div className="value-block">
              {props.jobsData?.drivers && props.jobsData?.drivers ? (
                <Link
                  to={`${routes.driverDetail}/${
                    props.jobsData?.drivers && props.jobsData?.drivers.id
                  }`}
                >
                  {props.jobsData?.drivers?.name}
                </Link>
              ) : (
                "-"
              )}
            </div>
          </li>
          {/* Added truck rego and  truck type https://wymap.atlassian.net/browse/MAPTRAK-847 */}
          <li>
            <Typography variant="h6">Truck Rego</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.trucks ? props.jobsData?.trucks?.rego : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">Truck Type</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.trucks?.truckType
                  ? props.jobsData?.trucks?.truckType?.name
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            <Typography variant="h6">CTO</Typography>
            <p>{props.jobsData?.ctos ? props.jobsData?.ctos.name : "-"}</p>
          </li>
          <li>
            <Typography variant="h6">Status</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.jobStatuses
                  ? props.jobsData?.jobStatuses.name
                  : "-"}
              </p>
            </div>
          </li>
          <li>
            {/* https://wymap.atlassian.net/browse/MAPTRAK-867 shows  HH:xx instead of HH:MM */}
            <Typography variant="h6">Duration</Typography>
            <div className="value-block">
              <label
                className={
                  parseFloat(props.jobsData?.totalDuration / 60).toFixed(2) > 2
                    ? "chart-info-dot yellow-text label-text"
                    : "label-text"
                }
              >
                {props.jobsData?.totalDuration
                  ? parseFloat(props.jobsData?.totalDuration / 60).toFixed(2)
                  : "-"}
              </label>
            </div>
          </li>
          {["Review Completed", "Completed"].includes(
            props.jobsData?.jobStatuses?.name
          ) && (
            <li>
              <Typography variant="h6">Run sheet</Typography>
              <div className="value-block">
                <span onClick={handleDownload}>Download</span>
              </div>
            </li>
          )}
          {/* https://wymap.atlassian.net/browse/MAPTRAK-1034 add job net charge */}
          <li>
            <Typography variant="h6">Job Net Charge</Typography>
            <div className="value-block">
              <p>
                {props.jobsData?.net
                  ? `$${parseFloat(props.jobsData?.net).toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }
                    )}`
                  : "-"}
              </p>
            </div>
          </li>
        </ul>
      </div>
      {isPermission && props.jobsData?.jobStatuses?.name === "Completed" && (
        <div className="btn-wrapper">
          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            type="submit"
            onClick={props.handleReview}
            disabled={props.isClick}
          >
            {props.isClick ? "Review Completed" : "Review"}
          </Button>
        </div>
      )}
      {props.jobsData?.invoiceGenerated === false &&
        ["Completed", "Review Completed"].includes(
          props.jobsData?.jobStatuses?.name
        ) && (
          <div className="btn-wrapper1">
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              type="button"
              onClick={handleClickOpen}
            >
              Update Truck/Trailer/Driver
            </Button>
          </div>
        )}
      <Popup
        open={open}
        handleClose={handleClose}
        driver={driver}
        truck={truck}
        trailer={trailer}
        handleChangeTruck={handleChangeTruck}
        handleChangeDriver={handleChangeDriver}
        handleChangeTrailer={handleChangeTrailer}
        setTrailer={setTrailer}
        handleSubmit={handleSubmit}
        jobsData={props.jobsData}
      />
    </div>
  );
}
export default FormBlock;
