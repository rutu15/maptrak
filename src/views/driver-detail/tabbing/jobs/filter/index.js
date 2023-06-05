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
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { getCustomFormToDate } from "@utils/commonFunctions";
import {
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  FETCH_TRUCKS,
  FETCH_TRUCKS_SUCCESS,
  FETCH_TRUCKS_FAILURE,
  GET_CTOS,
  GET_CTOS_SUCCESS,
  GET_CTOS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Popup from "./popup";
import { RequestFilterStyle } from "./style";

function OnlineRequestFilter(props) {
  const classes = RequestFilterStyle();
  const materilClasses = materialCommonStyles();
  const [state, dispatch] = useStore();
  useEffect(() => {
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

    dispatch({ type: FETCH_TRUCKS });
    API.get("trucks")
      .then((response) => {
        dispatch({
          type: FETCH_TRUCKS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_TRUCKS_FAILURE, payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (state.driver?.getDriverById?.cities?.id) {
      const params = {
        cityId: state.driver?.getDriverById?.cities?.id,
      };
      if (state?.common?.ctosData === null) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.driver?.getDriverById?.cities?.id]);
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
                          labelId="type-of-job-label"
                          id="type-of-job-id"
                          value={props.filterData.jobType}
                          name="jobType"
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
                        <label className="label-text">Truck Rego</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.filterData.truckRego}
                          onChange={(e) => props.handleFilter(e)}
                          name="truckRego"
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select truck rego</MenuItem>
                          {state?.trucks?.loadingTrucks ? (
                            <MenuItem>Loading...</MenuItem>
                          ) : (
                            state?.trucks?.trucksData?.rows?.map(
                              (item, index) => {
                                return (
                                  <MenuItem key={index} value={item.id}>
                                    {item.rego}
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
                          value={props.filterData.jobStatus}
                          onChange={(e) => props.handleFilter(e)}
                          name="jobStatus"
                          displayEmpty
                          placeholder="Select job Status"
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
                        <label className="label-text">CTO</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.filterData.cargoLocation}
                          onChange={(e) => props.handleFilter(e)}
                          name="cargoLocation"
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
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Reporting period</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          value={props.period}
                          onChange={props.handlePeriodChange}
                          placeholder="06/12/2021"
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select Period</MenuItem>
                          <MenuItem value={1}>Today</MenuItem>
                          <MenuItem value={2}>Yesterday</MenuItem>
                          <MenuItem value={3}>Last 3 days</MenuItem>
                          <MenuItem value={4}>Last 7 days</MenuItem>
                          <MenuItem value={5}>Last fortnight</MenuItem>
                          <MenuItem value={6}>Last 30 days</MenuItem>
                          <MenuItem
                            value={7}
                            onClick={(e) => props.handlePeriodChange(e, true)}
                          >
                            {props.show
                              ? getCustomFormToDate(
                                  props.customDate.startDate,
                                  props.customDate.endDate
                                )
                              : "Custom Range"}
                          </MenuItem>
                        </Select>
                        <Popup
                          open={props.open}
                          handleSubmit={props.handleCustomDateSubmit}
                          handleClose={props.handleClose}
                          data={props.customDate}
                          handleChange={(e, type) =>
                            props.handleCustomChange(e, type)
                          }
                        />
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
