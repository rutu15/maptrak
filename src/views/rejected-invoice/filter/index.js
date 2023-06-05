import React, { useEffect } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Checkbox,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import filterIcon from "@assets/images/filter-icon.svg";
import closeIcon from "@assets/images/close.svg";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { getCustomFormToDate } from "@utils/commonFunctions";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Popup from "./popup";
import { RequestFilterStyle } from "./style";

function OnlineRequestFilter(props) {
  const classes = RequestFilterStyle();
  const materilClasses = materialCommonStyles();
  const [state, dispatch] = useStore();
  useEffect(() => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.get("customers", {
      params: {
        orderBy: "name",
        order: "asc",
        filter: { parent: 0, status: true },
      },
    })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMERS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });

    if (state.common.citiesData === null) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const customerMenuData = [];
  state?.customer?.customers?.rows?.map((item) => {
    customerMenuData.push({
      label: item.name,
      value: item.id,
    });
    return true;
  });
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
                        <label className="label-text">Customer</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          name="customer"
                          displayEmpty
                          className={materilClasses.customSelect}
                          multiple
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <> Select Customer</>;
                            }

                            return customerMenuData
                              .filter((m) => selected.includes(m.value))
                              .map((m) => m.label)
                              .join(",");
                          }}
                          IconComponent={() => <ExpandMore />}
                          onChange={props.handleFilter}
                          value={props.filterData.customer}
                        >
                          <MenuItem value="" disabled>
                            Select Job Type
                          </MenuItem>
                          {customerMenuData.map((item, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={item.value}
                                className="custom-checkbox custom-Multicheckbox"
                              >
                                <Checkbox
                                  checked={
                                    props.filterData?.customer?.indexOf(
                                      item.value
                                    ) > -1
                                  }
                                  icon={
                                    <img src={uncheckedIcon} alt="CheckBox" />
                                  }
                                  checkedIcon={
                                    <img src={checkedIcon} alt="CheckBox" />
                                  }
                                />
                                <ListItemText primary={item.label} />
                              </MenuItem>
                            );
                          })}
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
                    <div className="form-gourp">
                      <div className="label-wrapper">
                        <label className="label-text">Status</label>
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          name="status"
                          onChange={props.handleFilter}
                          value={props.filterData.status}
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select Status</MenuItem>
                          <MenuItem value={1}>Rejected</MenuItem>
                          <MenuItem value={2}>Resolved</MenuItem>
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
                          value={props.filterData?.cityId}
                          onChange={(e) => props.handleFilter(e)}
                          name="cityId"
                          displayEmpty
                          className={materilClasses.customSelect}
                          MenuProps={{
                            classes: { paper: materilClasses.customSelect },
                          }}
                          IconComponent={() => <ExpandMore />}
                        >
                          <MenuItem value={""}>Select City</MenuItem>
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
