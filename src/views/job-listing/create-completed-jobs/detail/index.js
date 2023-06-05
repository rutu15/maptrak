import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { CreateJobStyle } from "../style";

function Detail(props) {
  const classes = CreateJobStyle();
  const materilClasses = materialCommonStyles();
  const [state] = useStore();

  return (
    <>
      <div className="form-row">
        <div className="form-gourp two-column">
          <FormControl variant="outlined">
            <label className="label-text">City</label>
            <Select
              id="cityId"
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              name="cityId"
              onChange={props.formik.handleChange}
              value={props.formik.values.cityId}
              IconComponent={() => <ExpandMore />}
            >
              <MenuItem value={""} disabled>
                All
              </MenuItem>
              {state?.common?.loadingCities ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.common?.citiesData?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() =>
                        props.formik.setFieldValue(
                          "cityTimezone",
                          item.timezone
                        )
                      }
                    >
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.cityId && props.formik.errors.cityId}
            </FormHelperText>
          </FormControl>
        </div>

        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Job Type</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("jobTypeId")}
              value={props.formik.values.jobTypeId}
              IconComponent={() => <ExpandMore />}
              disabled={!props.formik.values.cityId}
            >
              <MenuItem value={""} disabled>
                Select job type
              </MenuItem>
              {state?.common?.loadingJobType ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.common?.jobTypeData?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() =>
                        props.formik.setFieldValue("jobTypeLabel", item.name)
                      }
                    >
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.jobTypeId && props.formik.errors.jobTypeId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-gourp two-column">
          <FormControl variant="outlined">
            <label className="label-text">Requester Name</label>
            <TextField
              id="requesterName"
              placeholder="Requester name"
              variant="outlined"
              type="text"
              name="requesterName"
              onKeyPress={allowAlphaNumeric}
              onChange={props.formik.handleChange}
              value={props.formik.values.requesterName}
              error={
                props.formik.touched.requesterName &&
                Boolean(props.formik.errors.requesterName)
              }
              helperText={
                props.formik.touched.requesterName &&
                props.formik.errors.requesterName
              }
            />
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Customer</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("customerId")}
              value={props.formik.values.customerId}
              IconComponent={() => <ExpandMore />}
              disabled={!props.formik.values.cityId}
            >
              <MenuItem value={""} disabled>
                Select customer
              </MenuItem>
              {state?.customer?.loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state.customer?.customers?.rows?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.customerId &&
                props.formik.errors.customerId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Cargo Type</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("cargoTypeId")}
              value={props.formik.values.cargoTypeId}
              IconComponent={() => <ExpandMore />}
              disabled={[
                "Transfer",
                "Interstate",
                "Ad-Hoc",
                "Airside",
                "Metro",
                "Empty",
              ].includes(props.formik.values.jobTypeLabel)}
            >
              <MenuItem value={""} disabled>
                Select Cargo Type
              </MenuItem>
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
            <FormHelperText className="error-text">
              {props.formik.touched.cargoTypeId &&
                props.formik.errors.cargoTypeId}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Assign Driver</label>
            <Select
              name="driverId"
              id="driverId"
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("driverId")}
              value={props.formik.values.driverId}
              IconComponent={() => <ExpandMore />}
              disabled={!props.formik.values.cityId}
            >
              <MenuItem value={""}>Select Driver</MenuItem>
              {state?.driver?.gettingDrivers ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.driver?.getDriversData?.rows
                  ?.filter((item) => {
                    return item.active === 1;
                  })
                  .map((itm, indx) => {
                    return (
                      <MenuItem key={indx} value={itm.id}>
                        {itm.name}
                      </MenuItem>
                    );
                  })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.driverId && props.formik.errors.driverId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Truck</label>
            <Select
              name="truckId"
              id="truckId"
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("truckId")}
              value={props.formik.values.truckId}
              IconComponent={() => <ExpandMore />}
              disabled={!props.formik.values.cityId}
            >
              <MenuItem value={""}>Select Truck</MenuItem>
              {state?.truck?.loadingTrucks ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.trucks?.trucksData?.rows?.map((itm, indx) => {
                  return (
                    <MenuItem
                      key={indx}
                      value={itm.id}
                      onClick={() =>
                        props.formik.setFieldValue(
                          "truckType",
                          itm?.truckType?.name
                        )
                      }
                    >
                      {itm.rego}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.truckId && props.formik.errors.truckId}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Trailer</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("trailerId")}
              value={props.formik.values.trailerId}
              IconComponent={() => <ExpandMore />}
              disabled={
                !props.formik.values.cityId ||
                props.formik.values?.truckType === "Rigid"
              }
            >
              <MenuItem value={""}>Select Trailer</MenuItem>
              {state?.truck?.loadingTrailer ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.trailer?.trailersData?.rows?.map((itm, indx) => {
                  return (
                    <MenuItem key={indx} value={itm.id}>
                      {itm.rego}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.trailerId && props.formik.errors.trailerId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row date-time-wrapper">
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Job Started Time</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
              <KeyboardDateTimePicker
                id="startedAt"
                name="startedAt"
                variant="outlined"
                placeholder="DD/MM/YY HH:MM:SS"
                ampm={false}
                format="dd/MM/yyyy HH:mm:ss"
                className="custom-datepicker"
                disableFuture
                keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                autoOk
                onChange={(value) =>
                  props.formik.setFieldValue("startedAt", value)
                }
                value={props.formik.values.startedAt}
              />
            </MuiPickersUtilsProvider>
            <FormHelperText className="error-text">
              {props.formik.touched.startedAt && props.formik.errors.startedAt}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Job Completed Time</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
              <KeyboardDateTimePicker
                name="completedAt"
                id="completedAt"
                variant="outlined"
                ampm={false}
                placeholder="DD/MM/YY HH:MM:SS"
                format="dd/MM/yyyy HH:mm:ss"
                className="custom-datepicker"
                disableFuture
                minDate={new Date(props.formik.values.startedAt)}
                keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                autoOk
                onChange={(value) =>
                  props.formik.setFieldValue("completedAt", value)
                }
                value={props.formik.values.completedAt}
                disabled={!props.formik.values.startedAt}
              />
            </MuiPickersUtilsProvider>
            <FormHelperText className="error-text">
              {props.formik.touched.completedAt &&
                props.formik.errors.completedAt}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Detail;
