import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography, Button } from "@material-ui/core";
import moment from "moment-timezone";

import { useStore } from "@store/store";
import DownloadImage from "@assets/images/download.svg";
import {
  GET_JOB_RUNSHEET,
  GET_JOB_RUNSHEET_SUCCESS,
  GET_JOB_RUNSHEET_FAILURE,
  UPDATE_JOB_RUNSHEET,
  UPDATE_JOB_RUNSHEET_SUCCESS,
  UPDATE_JOB_RUNSHEET_FAILURE,
  DOWNLOAD_PDF_JOB_RUNSHEET,
  DOWNLOAD_PDF_JOB_RUNSHEET_SUCCESS,
  DOWNLOAD_PDF_JOB_RUNSHEET_FAILURE,
  DOWNLOAD_CSV_JOB_RUNSHEET,
  DOWNLOAD_CSV_JOB_RUNSHEET_SUCCESS,
  DOWNLOAD_CSV_JOB_RUNSHEET_FAILURE,
  UPDATE_JOB_DURATION,
  UPDATE_JOB_DURATION_SUCCESS,
  UPDATE_JOB_DURATION_FAILURE,
} from "@utils/actionTypes";
import { utcToLocalTime } from "@utils/commonFunctions";
import API from "@services/axios";
import TableListing from "./table-listing";
import Map from "./map";
import Popup from "./job-duration-popup";
import { TimeReportStyle } from "./style";

function TimeReport(props) {
  const classes = TimeReportStyle();
  const [, dispatch] = useStore();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(null);
  const [duration, setDuration] = useState("");
  const [durError, setDurError] = useState("");

  // API calling to get list of job runsheet
  const getJobRunsheet = () => {
    let temp = [];
    dispatch({ type: GET_JOB_RUNSHEET });
    API.get(`jobs/${id}/jobRunsheetReport`)
      .then((response) => {
        dispatch({
          type: GET_JOB_RUNSHEET_SUCCESS,
          payload: response.data.data,
        });

        temp = response?.data?.data?.jobRunsheetReport?.map((item) => {
          return {
            ...item,
            time: utcToLocalTime(
              item.time,
              response?.data?.data?.timezone,
              "yyyy-MM-DD HH:mm:ss"
            ),
            timezone: response.data.data?.timezone,
          };
        });
        setData(temp);
      })
      .catch((error) => {
        dispatch({ type: GET_JOB_RUNSHEET_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getJobRunsheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
    setStarted(data[0]?.time);
  };

  const handleClose = () => {
    setOpen(false);
    setDuration("");
    setDurError("");
  };

  const handleDate = (e) => {
    setStarted(e);
  };
  // Update and logic for validation
  const handleChange = (event, id) => {
    const newArray = [...data];
    const time = moment(event).format("YYYY/MM/DD HH:mm:ss");
    newArray[id] = {
      ...newArray[id],
      time: time,
    };

    const getTime = (id) => {
      return moment(newArray[id].time).toDate();
    };
    if (id === 0) {
      if (getTime(id) > getTime(id + 1)) {
        console.log("condition 1")
        newArray[id].error = "Invalid Time";
        setError(true);
      } else {
        newArray[id].error = "";
        setError(false);
      }
    } else if (id === newArray.length - 1) {
      if (getTime(id) < getTime(id - 1)) {
        console.log("condition 2")
        newArray[id].error = "Invalid Time";
        setError(true);
      } else {
        setError(false);
        newArray[id].error = "";
      }
    } else if (getTime(id) > getTime(id + 1) || getTime(id) < getTime(id - 1)) {
      console.log("condition 3")
      newArray[id - 1].error = "";
      newArray[id].error = "Invalid Time";
      setError(true);
    } else {
      setError(false);
      newArray[id].error = "";
    }
    setData(newArray);
  };

  // API calling to update runsheet
  const handleSubmit = () => {
    let temp = [];
    temp = data.map((item) => {
      const time = moment(item.time).format("YYYY-MM-DD HH:mm:ss");
      return {
        id: item.id,
        jobRunsheetStatuseCode: item.jobRunsheetStatuses?.code,
        time: moment.tz(time, item.timezone),
      };
    });

    dispatch({ type: UPDATE_JOB_RUNSHEET });
    API.put(`jobs/${id}/jobRunsheetReport`, { data: temp })
      .then((response) => {
        dispatch({
          type: UPDATE_JOB_RUNSHEET_SUCCESS,
          payload: response.data.data,
        });
        props.getJobs();
        toast.success("Job Runsheet Updated Successfully");
      })
      .catch((error) => {
        dispatch({ type: UPDATE_JOB_RUNSHEET_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };

  // API calling to download CSV file
  const handleDownloadCsv = () => {
    dispatch({ type: DOWNLOAD_CSV_JOB_RUNSHEET });
    API.get(`jobs/${id}/downloadJobRunsheetCSV`)
      .then((response) => {
        dispatch({
          type: DOWNLOAD_CSV_JOB_RUNSHEET_SUCCESS,
          payload: response.data.data,
        });
        window.location.href = response.data.data;
      })
      .catch((error) => {
        dispatch({ type: DOWNLOAD_CSV_JOB_RUNSHEET_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };

  // API calling to download PDF file
  const handleDownloadPdf = () => {
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

  const handleDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "") {
      setDurError("Duration is required");
    } else {
      setDurError("");
    }
  };
  const handleUpdate = () => {
    if (duration === "") {
      setDurError("Duration is required");
    } else {
      dispatch({ type: UPDATE_JOB_DURATION });
      API.put(`jobs/${id}/updateJobDuration`, {
        startTime: moment.tz(
          moment(started).format("YYYY-MM-DD HH:mm:ss"),
          data[0]?.timezone
        ),
        ...(!!duration ? { jobDuration: parseInt(duration) } : {}),
      })
        .then((response) => {
          dispatch({
            type: UPDATE_JOB_DURATION_SUCCESS,
            payload: response.data.data,
          });
          getJobRunsheet();
          handleClose();
          props.getJobs();
        })
        .catch((error) => {
          dispatch({ type: UPDATE_JOB_DURATION_FAILURE, payload: error });
          toast.error(error?.response?.data?.message);
        });
    }
  };

  return (
    <div className={classes.TimeReportWrapper}>
      {data.length !== 0 && (
        <div className="map-wrapper">
          <Map />
        </div>
      )}
      {data.length !== 0 && (
        <div className={classes.tabHeadingRow}>
          <div className={classes.titleWrapper}>
            <Typography variant="h2">Run Sheet</Typography>
          </div>
          {["Review Completed", "Completed"].includes(
            props.jobsData?.jobStatuses?.name
          ) && (
            <div className={classes.buttonWrapper}>
              <div className="btn-inner-wrapper">
                <Button
                  className="blue-btn primary-btn"
                  color="inherit"
                  disableElevation
                  underlinenone="true"
                  onClick={handleClickOpen}
                >
                  Edit Job Duration
                </Button>

                <Button
                  className="blue-btn primary-btn"
                  color="inherit"
                  disableElevation
                  underlinenone="true"
                  onClick={handleDownloadCsv}
                >
                  <img src={DownloadImage} alt="Download" />
                  Download csv
                </Button>
                <Button
                  className="blue-btn primary-btn"
                  color="inherit"
                  disableElevation
                  underlinenone="true"
                  onClick={handleDownloadPdf}
                >
                  <img src={DownloadImage} alt="Download" />
                  Download pdf
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <TableListing
        handleChange={handleChange}
        data={data}
        handleSubmit={handleSubmit}
        error={error}
        jobsData={props.jobsData}
      />
      <Popup
        open={open}
        handleClose={handleClose}
        handleDate={handleDate}
        started={started}
        handleUpdate={handleUpdate}
        duration={duration}
        handleDuration={handleDuration}
        error={durError}
      />
    </div>
  );
}
export default TimeReport;
