import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress,
  MenuItem,
  Select,
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
            {props.isEdit ? "Edit" : "Add"} Trailer
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="name">
                    Name
                  </label>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Trailer name"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowAlphaNumeric}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.name}
                    error={
                      props.formik.touched.name &&
                      Boolean(props.formik.errors.name)
                    }
                    helperText={
                      props.formik.touched.name && props.formik.errors.name
                    }
                  />
                </FormControl>
              </div>
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
            </div>
            <div className="form-row">
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
                      name="registrationDate"
                      placeholder="DD/MM/YYYY"
                      autoOk
                      value={props.formik.values.registrationDate}
                      onChange={(value) =>
                        props.formik.setFieldValue("registrationDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText className="error-text">
                    {props.formik.touched.registrationDate &&
                      props.formik.errors.registrationDate}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Service due on</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      className="custom-datepicker"
                      keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                      name="serviceDate"
                      placeholder="DD/MM/YYYY"
                      autoOk
                      value={props.formik.values.serviceDate}
                      onChange={(value) =>
                        props.formik.setFieldValue("serviceDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText className="error-text">
                    {props.formik.touched.serviceDate &&
                      props.formik.errors.serviceDate}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
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
              disabled={
                state.trailer.addingTrailer || state.trailer.editingTrailer
              }
            >
              {state.trailer.addingTrailer || state.trailer.editingTrailer ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Trailer"
              ) : (
                "Add Trailer"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
