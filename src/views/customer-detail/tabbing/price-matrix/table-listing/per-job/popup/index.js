import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  CircularProgress,
} from "@material-ui/core";

import { allowOnlyFloatFour } from "@utils/commonFunctions";
import closeIcon from "@assets/images/close.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  return (
    <>
      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          <DialogTitle>Edit Pricing</DialogTitle>
          <DialogContent>
            <label className="label-text">
              {props?.truckTypes ? `${props?.jobTypes} - ${props?.truckTypes} Hourly Pricing` : props?.jobTypes}
              {/* {props.formik.values?.jobTypes ? props.formik.values?.jobTypes.name : `${props.jobTypes} - ${props.formik.values.truckTypes.name} Hourly Pricing` } */}
            </label>
            <FormControl>
              <div className="weekly-row-wrapper">
                <div className="weekly-row">
                  <label className="label-text">Week Days</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="weekdayCharge"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.weekdayCharge}
                      error={
                        props.formik.touched.weekdayCharge &&
                        Boolean(props.formik.errors.weekdayCharge)
                      }
                      helperText={
                        props.formik.touched.weekdayCharge &&
                        props.formik.errors.weekdayCharge
                      }
                    />
                  </div>
                </div>
                <div className="weekly-row">
                  <label className="label-text">Saturday</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="saturdayCharge"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.saturdayCharge}
                      error={
                        props.formik.touched.saturdayCharge &&
                        Boolean(props.formik.errors.saturdayCharge)
                      }
                      helperText={
                        props.formik.touched.saturdayCharge &&
                        props.formik.errors.saturdayCharge
                      }
                    />
                  </div>
                </div>
                <div className="weekly-row">
                  <label className="label-text">Sunday</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="sundayCharge"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.sundayCharge}
                      error={
                        props.formik.touched.sundayCharge &&
                        Boolean(props.formik.errors.sundayCharge)
                      }
                      helperText={
                        props.formik.touched.sundayCharge &&
                        props.formik.errors.sundayCharge
                      }
                    />
                  </div>
                </div>

                <div className="weekly-row">
                  <label className="label-text">Public Holiday 1</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="publicHoliday1Charge"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.publicHoliday1Charge}
                      error={
                        props.formik.touched.publicHoliday1Charge &&
                        Boolean(props.formik.errors.publicHoliday1Charge)
                      }
                      helperText={
                        props.formik.touched.publicHoliday1Charge &&
                        props.formik.errors.publicHoliday1Charge
                      }
                    />
                  </div>
                </div>

                <div className="weekly-row">
                  <label className="label-text">Public Holiday 2</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="publicHoliday2Charge"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.publicHoliday2Charge}
                      error={
                        props.formik.touched.publicHoliday2Charge &&
                        Boolean(props.formik.errors.publicHoliday2Charge)
                      }
                      helperText={
                        props.formik.touched.publicHoliday2Charge &&
                        props.formik.errors.publicHoliday2Charge
                      }
                    />
                  </div>
                </div>
              </div>
            </FormControl>
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              type="submit"
              disabled={props.buttonLoading}
            >
              {props.buttonLoading ? <CircularProgress color="inherit" /> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Popup;
