import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  ASSIGN_DRIVER,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAILURE,
  GET_JOB_STATUS,
  GET_JOB_STATUS_SUCCESS,
  GET_JOB_STATUS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { AssignJobStyle } from "./style";

function AssignJob(props) {
  const classes = AssignJobStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
  const [open, setOpen] = useState(false);
  const [getjob, setJob] = useState("");
  const [state, dispatch] = useStore();
  const [error, setError] = useState("");
  const { id } = useParams();

  // API calling to get the list of jobstatus and not assigned jobs to assign driver
  const fetchJobs = () => {
    dispatch({ type: GET_JOB_STATUS });
    API.get("master/jobStatuses")
      .then((response) => {
        dispatch({
          type: GET_JOB_STATUS_SUCCESS,
          payload: response.data.data,
        });
        const id = response?.data?.data?.find(
          (item) => item.name === "Not Assigned"
        ).id;
        const params = {
          filter: {
            jobStatusId: id,
            cityId: state.driver?.getDriverById?.cities?.id,
          },
        };
        dispatch({ type: FETCH_JOBS });
        API.get("jobs", { params })
          .then((response) => {
            dispatch({
              type: FETCH_JOBS_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: FETCH_JOBS_FAILURE, payload: error });
          });
      })
      .catch((error) => {
        dispatch({ type: GET_JOB_STATUS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    if (open) {
      fetchJobs();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setJob("");
  };

  // API calling to assign job to driver
  const handleSubmit = () => {
    dispatch({ type: ASSIGN_DRIVER });
    API.put(`jobs/${getjob}/assignDriver`, { driverId: id })
      .then((response) => {
        dispatch({
          type: ASSIGN_DRIVER_SUCCESS,
          payload: response.data.data,
        });
        handleClose();
        props.getJobs();
        fetchJobs();
        toast.success("Job Assigned To Driver Successfully");
      })
      .catch((error) => {
        dispatch({ type: ASSIGN_DRIVER_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  return (
    <div className={classes.modalWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={handleClickOpen}
      >
        Assign a job
      </Button>
      <Dialog open={open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={handleClose} />
        </div>
        <form noValidate autoComplete="off" className={classes.customForm}>
          {error && <Alert severity="error">{error}</Alert>}
          <DialogTitle> Assign Job</DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Job Id</label>
                  <Select
                    id="jobId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    value={getjob}
                    onChange={(e) => {
                      setJob(e.target.value);
                    }}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""}>Select Job ID</MenuItem>
                    {state?.job?.loadingJobs ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : state?.job?.jobsData?.count === 0 ? (
                      <MenuItem>No jobs to Assign</MenuItem>
                    ) : (
                      state?.job?.jobsData?.rows?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.id}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              type="button"
              disabled={
                !getjob ||
                state.job.assigningDriver ||
                state.job.reAssigningDriver
              }
              onClick={handleSubmit}
            >
              {state.job.assigningDriver || state.job.reAssigningDriver ? (
                <CircularProgress color="inherit" />
              ) : (
                "Assign"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AssignJob;
