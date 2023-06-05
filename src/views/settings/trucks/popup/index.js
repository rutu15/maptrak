import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import calendarIcon from "@assets/images/calendar-icon.svg";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  const [state] = useStore();
  const materilClasses = materialCommonStyles();

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
        scroll={scroll}
      >
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          <div className="close-modal">
            <img src={closeIcon} alt="Close" onClick={props.handleClose} />
          </div>
          {props.error && <Alert severity="error">{props.error}</Alert>}
          <DialogTitle id="alert-dialog-title">
            {props.isEdit ? "Edit" : "Add"} Truck
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="name">
                    Name
                  </label>

                  <TextField
                    id="truckName"
                    name="truckName"
                    placeholder="Truck name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.truckName}
                    onKeyPress={allowAlphaNumeric}
                    error={
                      props.formik.touched.truckName &&
                      Boolean(props.formik.errors.truckName)
                    }
                    helperText={
                      props.formik.touched.truckName &&
                      props.formik.errors.truckName
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Truck Number</label>
                  <TextField
                    id="vehicleNumber"
                    name="vehicleNumber"
                    placeholder="Truck number"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowAlphaNumeric}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.vehicleNumber}
                    error={
                      props.formik.touched.vehicleNumber &&
                      Boolean(props.formik.errors.vehicleNumber)
                    }
                    helperText={
                      props.formik.touched.vehicleNumber && props.formik.errors.vehicleNumber
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Rego Number</label>
                  <TextField
                    id="rego"
                    name="rego"
                    placeholder="Rego number"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowAlphaNumeric}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.rego}
                    error={
                      props.formik.touched.rego &&
                      Boolean(props.formik.errors.rego)
                    }
                    helperText={
                      props.formik.touched.rego && props.formik.errors.rego
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="name">
                    Registration due on
                  </label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      className="custom-datepicker"
                      keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                      name="registrationDueDate"
                      placeholder="DD/MM/YYYY"
                      autoOk
                      value={props.formik.values.registrationDueDate}
                      onChange={(value) =>
                        props.formik.setFieldValue("registrationDueDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText className="error-text">
                    {props.formik.touched.registrationDueDate &&
                      props.formik.errors.registrationDueDate}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Service due on</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      className="custom-datepicker"
                      keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                      name="serviceDueDate"
                      placeholder="DD/MM/YYYY"
                      autoOk
                      value={props.formik.values.serviceDueDate}
                      onChange={(value) =>
                        props.formik.setFieldValue("serviceDueDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText className="error-text">
                    {props.formik.touched.serviceDueDate &&
                      props.formik.errors.serviceDueDate}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Truck Type</label>
                  <Select
                    id="typeId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    placeholder="Please Select Truck Type"
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    onChange={props.formik.handleChange("typeId")}
                    value={props.formik.values.typeId}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Truck Type
                    </MenuItem>
                    {state.common?.loadingTruckType ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state.common.truckTypeData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.typeId && props.formik.errors.typeId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">City</label>
                  <Select
                    id="cityId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    placeholder="Please Select City"
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    onChange={props.formik.handleChange("cityId")}
                    value={props.formik.values.cityId}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select City
                    </MenuItem>
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
                  <FormHelperText className="error-text">
                    {props.formik.touched.cityId && props.formik.errors.cityId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Fleet</label>
                  <TextField
                    id="fleet"
                    name="fleet"
                    placeholder="Fleet"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowAlphaNumeric}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.fleet}
                    error={
                      props.formik.touched.fleet &&
                      Boolean(props.formik.errors.fleet)
                    }
                    helperText={
                      props.formik.touched.fleet && props.formik.errors.fleet
                    }
                  />
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              onClick={props.handleClose}
            >
              CANCEL
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              type="submit"
              disabled={state.trucks.addingTruck || state.trucks.editingTruck}
            >
              {state.trucks.addingTruck || state.trucks.editingTruck ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Truck"
              ) : (
                "Add Truck"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
