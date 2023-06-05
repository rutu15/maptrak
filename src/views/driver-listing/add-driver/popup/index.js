import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import {
  allowOnlyFloat,
  allowAlphaNumeric,
  allowNumberWithSpaceValidation,
} from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { AddDriverPopupStyle } from "./style";

function Popup(props) {
  const classes = AddDriverPopupStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
  const [state] = useStore();
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.customModal}
      scroll={scroll}
    >
      <div className="close-modal">
        <img src={closeIcon} alt="Close" onClick={props.handleClose} />
      </div>
      <form
        noValidate
        autoComplete="off"
        className={classes.customForm}
        onSubmit={props.formik.handleSubmit}
      >
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <DialogTitle id="alert-dialog-title">
          {props.isEdit ? "Edit" : "Add"} Driver
        </DialogTitle>
        {state.driver.gettingDriverById === true ? (
          <CircularProgress
            color="inherit"
            size={80}
            className="cirularProgess"
          />
        ) : (
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="fullname">
                    Full name
                  </label>
                  <TextField
                    id="name"
                    placeholder="Full name"
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
                  <label className="label-text" htmlFor="phone">
                    Employee Number
                  </label>
                  <TextField
                    id="employeeNumber"
                    placeholder="Employee number"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowAlphaNumeric}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.employeeNumber}
                    error={
                      props.formik.touched.employeeNumber &&
                      Boolean(props.formik.errors.employeeNumber)
                    }
                    helperText={
                      props.formik.touched.employeeNumber &&
                      props.formik.errors.employeeNumber
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="fullname">
                    Password
                  </label>
                  <TextField
                    id="password"
                    placeholder="Password"
                    variant="outlined"
                    type="password"
                    autoComplete="off"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.password}
                    error={
                      props.formik.touched.password &&
                      Boolean(props.formik.errors.password)
                    }
                    helperText={
                      props.formik.touched.password &&
                      props.formik.errors.password
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <TextField
                    id="confirmPassword"
                    placeholder="Confirm password"
                    variant="outlined"
                    type="password"
                    autoComplete="off"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.confirmPassword}
                    error={
                      props.formik.touched.confirmPassword &&
                      Boolean(props.formik.errors.confirmPassword)
                    }
                    helperText={
                      props.formik.touched.confirmPassword &&
                      props.formik.errors.confirmPassword
                    }
                  />
                </FormControl>
              </div>
            </div>

            <div className="form-row">
              <div className="form-gourp ">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="email">
                    Email
                  </label>
                  <TextField
                    id="email"
                    placeholder="Email address"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.email}
                    error={
                      props.formik.touched.email &&
                      Boolean(props.formik.errors.email)
                    }
                    helperText={
                      props.formik.touched.email && props.formik.errors.email
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="phone">
                    Phone Number
                  </label>
                  <TextField
                    id="phone"
                    placeholder="Phone Number"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowNumberWithSpaceValidation}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.phone}
                    error={
                      props.formik.touched.phone &&
                      Boolean(props.formik.errors.phone)
                    }
                    helperText={
                      props.formik.touched.phone && props.formik.errors.phone
                    }
                  />
                  {props.formik.touched.phone && props.formik.errors.phone ? (
                    ""
                  ) : (
                    <FormHelperText>
                      {
                        "0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX"
                      }
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">City</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={props.formik.values.cityId}
                    onChange={props.formik.handleChange}
                    name="cityId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select city
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
                <div className="label-wrapper">
                  <label className="label-text">ASIC Type</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={props.formik.values.asicTypeId}
                    onChange={props.formik.handleChange}
                    name="asicTypeId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select ASIC Type
                    </MenuItem>
                    {state?.common?.loadingAsicType ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.asicTypeData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>

                  <FormHelperText className="error-text">
                    {props.formik.touched.asicTypeId &&
                      props.formik.errors.asicTypeId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>

            <div className="form-row">
              <div className="form-gourp ">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="driverType">
                    Type of driver
                  </label>
                  <Select
                    value={props.formik.values.driverTypeId}
                    onChange={props.formik.handleChange}
                    name="driverTypeId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Driver Type
                    </MenuItem>
                    {state?.common?.loadingDriverType ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.driverTypeData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>

                  <FormHelperText className="error-text">
                    {props.formik.touched.driverTypeId &&
                      props.formik.errors.driverTypeId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Driver Licence Type</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={props.formik.values.licenseTypeId}
                    onChange={props.formik.handleChange}
                    name="licenseTypeId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Driver Licence Type
                    </MenuItem>
                    {state?.common?.loadingDriverLicenseType ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.driverLicenseTypeData?.map(
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

                  <FormHelperText className="error-text">
                    {props.formik.touched.licenseTypeId &&
                      props.formik.errors.licenseTypeId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Status</label>
                  <Select
                    id="active"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    onChange={props.formik.handleChange("active")}
                    value={props.formik.values.active}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Please Select Status
                    </MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.active && props.formik.errors.active}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <label className="label-text">Drivers Wage</label>
            <div className="form-row">
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Week Days</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="weekdayWage"
                    name="weekdayWage"
                    variant="outlined"
                    type="text"
                    placeholder="Week days wage"
                    onKeyPress={allowOnlyFloat}
                    value={props.formik.values.weekdayWage}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.weekdayWage &&
                      Boolean(props.formik.errors.weekdayWage)
                    }
                    helperText={
                      props.formik.touched.weekdayWage &&
                      props.formik.errors.weekdayWage
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Saturday</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="saturdayWage"
                    name="saturdayWage"
                    variant="outlined"
                    type="text"
                    placeholder="Saturday wage"
                    onKeyPress={allowOnlyFloat}
                    value={props.formik.values.saturdayWage}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.saturdayWage &&
                      Boolean(props.formik.errors.saturdayWage)
                    }
                    helperText={
                      props.formik.touched.saturdayWage &&
                      props.formik.errors.saturdayWage
                    }
                  />
                </FormControl>
              </div>
              zz
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Sunday</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="sundayWage"
                    name="sundayWage"
                    variant="outlined"
                    type="text"
                    placeholder="Sunday wage"
                    onKeyPress={allowOnlyFloat}
                    value={props.formik.values.sundayWage}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.sundayWage &&
                      Boolean(props.formik.errors.sundayWage)
                    }
                    helperText={
                      props.formik.touched.sundayWage &&
                      props.formik.errors.sundayWage
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Public Holiday 1</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="publicHoliday1Wage"
                    name="publicHoliday1Wage"
                    variant="outlined"
                    type="text"
                    placeholder="Public holiday 1 wage"
                    onKeyPress={allowOnlyFloat}
                    value={props.formik.values.publicHoliday1Wage}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.publicHoliday1Wage &&
                      Boolean(props.formik.errors.publicHoliday1Wage)
                    }
                    helperText={
                      props.formik.touched.publicHoliday1Wage &&
                      props.formik.errors.publicHoliday1Wage
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <div className="label-wrapper">
                  <label className="label-text">Public Holiday 2</label>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="publicHoliday2Wage"
                    name="publicHoliday2Wage"
                    variant="outlined"
                    type="text"
                    placeholder="Public holiday 2 wage"
                    onKeyPress={allowOnlyFloat}
                    value={props.formik.values.publicHoliday2Wage}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.publicHoliday2Wage &&
                      Boolean(props.formik.errors.publicHoliday2Wage)
                    }
                    helperText={
                      props.formik.touched.publicHoliday2Wage &&
                      props.formik.errors.publicHoliday2Wage
                    }
                  />
                </FormControl>
              </div>
            </div>
          </DialogContent>
        )}

        <DialogActions className="bottom-button-block">
          <Button
            className="primary-btn gray-border-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            onClick={props.handleClose}
          >
            CANCEL
          </Button>
          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            type="submit"
            disabled={state.driver?.addingDriver || state.driver?.editingDriver}
          >
            {state.driver?.addingDriver || state.driver?.editingDriver ? (
              <CircularProgress color="inherit" />
            ) : props.isEdit ? (
              "Edit Driver"
            ) : (
              "Add Driver"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Popup;
