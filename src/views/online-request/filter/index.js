import React, { useEffect } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  SwipeableDrawer,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import filterIcon from "@assets/images/filter-icon.svg";
import closeIcon from "@assets/images/close.svg";
import {
  GET_JOB_STATUS,
  GET_JOB_STATUS_SUCCESS,
  GET_JOB_STATUS_FAILURE,
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_CARGO_TYPE,
  GET_CARGO_TYPE_SUCCESS,
  GET_CARGO_TYPE_FAILURE,
  GET_CTOS,
  GET_CTOS_SUCCESS,
  GET_CTOS_FAILURE,
  GET_REQUEST_STATUS,
  GET_REQUEST_STATUS_SUCCESS,
  GET_REQUEST_STATUS_FAILURE,
} from "@utils/actionTypes";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import API from "@services/axios";
import { RequestFilterStyle } from "./style";

function OnlineRequestFilter(props) {
  const [state, dispatch] = useStore();
  const classes = RequestFilterStyle();
  const materilClasses = materialCommonStyles();

  useEffect(() => {
    if (state?.common?.citiesData === null) {
      dispatch({ type: GET_CITIES });
      API.get("master/cities")
        .then((response) => {
          dispatch({
            type: GET_CITIES_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_CITIES_FAILURE, payload: error });
        });
    }

    if (state?.common?.jobStatusData === null) {
      dispatch({ type: GET_JOB_STATUS });
      API.get("master/jobStatuses")
        .then((response) => {
          dispatch({
            type: GET_JOB_STATUS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_JOB_STATUS_FAILURE, payload: error });
        });
    }

    if (state?.common?.jobTypeData === null) {
      dispatch({ type: GET_JOBTYPES });
      API.get("master/jobTypes")
        .then((response) => {
          dispatch({
            type: GET_JOBTYPES_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_JOBTYPES_FAILURE, payload: error });
        });
    }

    if (state?.common?.requestStatusData === null) {
      dispatch({ type: GET_REQUEST_STATUS });
      API.get("master/onlineRequestStatuses")
        .then((response) => {
          dispatch({
            type: GET_REQUEST_STATUS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_REQUEST_STATUS_FAILURE, payload: error });
        });
    }
    if (state?.common?.cargoTypeData === null) {
      dispatch({ type: GET_CARGO_TYPE });
      API.get("master/cargoTypes")
        .then((response) => {
          dispatch({
            type: GET_CARGO_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_CARGO_TYPE_FAILURE, payload: error });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.filterData.city) {
      const params = {
        cityId: props.filterData?.city,
      };
      dispatch({ type: GET_CTOS });
      API.get("master/ctos", { params })
        .then((response) => {
          dispatch({
            type: GET_CTOS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_CTOS_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filterData.city]);
  return (
    <div className={classes.RequestFilterWrapper}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="primary-btn blue-btn lg"
            variant="contained"
            color="primary"
            disableElevation
            onClick={props.toggleDrawer(anchor, true)}
          >
            <img src={filterIcon} alt="Filter" />
            Filter
          </Button>
          <SwipeableDrawer
            className={classes.drawerWrapper}
            anchor={anchor}
            open={props.getState[anchor]}
            onClose={props.toggleDrawer(anchor, false)}
            onOpen={props.toggleDrawer(anchor, true)}
          >
            <div className="drawer-wrapper">
              <div className="filter-form">
                <form noValidate autoComplete="off" className="custom-form">
                  <div className="form-row">
                    <div className="filter-title-block form-group">
                      <Typography variant="h2">Filter</Typography>
                      <img
                        src={closeIcon}
                        alt="Close"
                        onClick={props.toggleDrawer(anchor, false)}
                      />
                    </div>
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Type of Job</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          name="jobType"
                          value={props.filterData?.jobType}
                          onChange={(e) => props.handleFilter(e)}
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select job type</MenuItem>
                          {state?.common?.loadingJobType ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.jobTypeData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Cargo Type</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          name="cargoType"
                          value={props.filterData?.cargoType}
                          onChange={(e) => props.handleFilter(e)}
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select Cargo Type</MenuItem>
                          {state?.common?.loadingCargoType ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.cargoTypeData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Request Status</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          name="requestStatus"
                          value={props.filterData?.requestStatus}
                          onChange={(e) => props.handleFilter(e)}
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select Request Status</MenuItem>
                          {state?.common?.loadingRequestStatus ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.requestStatusData?.map(
                              (item, index) => {
                                return (
                                  <MenuItem key={index} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              }
                            )
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Job Status</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.filterData?.jobStatus}
                          name="jobStatus"
                          onChange={(e) => props.handleFilter(e)}
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select job status</MenuItem>
                          {state?.common?.loadingJobStatus ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.jobStatusData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">City</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.filterData?.city}
                          onChange={(e) => props.handleFilter(e)}
                          name="city"
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select city</MenuItem>
                          {state?.common?.loadingCities ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.citiesData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">CTO</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.filterData?.cto}
                          onChange={(e) => props.handleFilter(e)}
                          name="cto"
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select CTO</MenuItem>
                          {state?.common?.loadingCtos ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.common?.ctosData?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="button-wrapper-inner">
                <Button
                  className="primary-btn gray-border-btn btn"
                  color="inherit"
                  disableElevation
                  onClick={() => props.handleReset(anchor)}
                >
                  RESET
                </Button>
                <Button
                  className="orange-btn primary-btn btn"
                  color="inherit"
                  disableElevation
                  onClick={() => props.handleSubmit(anchor)}
                >
                  APPLY
                </Button>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default OnlineRequestFilter;
