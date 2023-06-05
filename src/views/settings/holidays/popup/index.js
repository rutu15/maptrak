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
  Select,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import calendarIcon from "@assets/images/calendar-new.svg";
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
            {props.isEdit ? "Edit" : "Add"} Holiday
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Holiday Type</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    labelId="type-of-job-label"
                    id="type-of-job-id"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                    name="type"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.type}
                  >
                    <MenuItem value={""}>Select holiday type</MenuItem>
                    <MenuItem value="1">Holiday 1</MenuItem>
                    <MenuItem value="2">Holiday 2</MenuItem>
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.type && props.formik.errors.type}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">City</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    labelId="city-label"
                    id="city-id"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                    name="city"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.city}
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
                    {props.formik.touched.city && props.formik.errors.city}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="name">
                    Name
                  </label>

                  <TextField
                    id="name"
                    name="name"
                    placeholder="Holiday name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.name}
                    onKeyPress={allowAlphaNumeric}
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
                  <label className="label-text">Date</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      className="custom-datepicker"
                      id="date-picker-inline"
                      placeholder="DD/MM/YYYY"
                      name="date"
                      onChange={(value) =>
                        props.formik.setFieldValue("date", value)
                      }
                      value={props.formik.values.date}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText className="error-text">
                    {props.formik.touched.date && props.formik.errors.date}
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
                state.holidays.addingHolidays || state.holidays.editingHolidays
              }
            >
              {state.holidays.addingHolidays ||
              state.holidays.editingHolidays ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit holiday"
              ) : (
                "Add holiday"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
