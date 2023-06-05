import React from "react";
import { FormControl } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { enAU } from "date-fns/locale";
import calendarIcon from "@assets/images/calendar-new.svg";
import clockIcon from "@assets/images/clock.svg";
import { AddAirWayBillStyle } from "../style";

function DateFields(props) {
  const classes = AddAirWayBillStyle();
  return (
    <>
      <div className="form-row date-time-wrapper">
        <div className="form-group three-column">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="bill-number">
              Ready Date
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                placeholder="DD/MM/YYYY"
                name="readyDate"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                value={props.formik.values.readyDate}
                onChange={(value) =>
                  props.formik.setFieldValue("readyDate", value)
                }
                error={
                  props.formik.touched.readyDate &&
                  Boolean(props.formik.errors.readyDate)
                }
                helperText={
                  props.formik.touched.readyDate &&
                  props.formik.errors.readyDate
                }
                keyboardIcon={<img src={calendarIcon} alt="calendar" />}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div className="form-group three-column">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="flight">
              Ready Time ETA
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                DialogProps={{ className: "time-picker" }}
                margin="normal"
                id="ready-time"
                name="readyTime"
                placeholder="HH:MM"
                ampm={false}
                keyboardIcon={<img src={clockIcon} alt="clock" />}
                value={props.formik.values.readyTime}
                onChange={(value) =>
                  props.formik.setFieldValue("readyTime", value)
                }
                error={
                  props.formik.touched.readyTime &&
                  Boolean(props.formik.errors.readyTime)
                }
                helperText={
                  props.formik.touched.readyTime &&
                  props.formik.errors.readyTime
                }
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div className="form-group three-column">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="carrier">
              Cut-Off Time
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                DialogProps={{ className: "time-picker" }}
                margin="normal"
                id="cutOffTime"
                name="cutOffTime"
                placeholder="HH:MM"
                ampm={false}
                keyboardIcon={<img src={clockIcon} alt="clock" />}
                value={props.formik.values.cutOffTime}
                onChange={(value) =>
                  props.formik.setFieldValue("cutOffTime", value)
                }
                error={
                  props.formik.touched.cutOffTime &&
                  Boolean(props.formik.errors.cutOffTime)
                }
                helperText={
                  props.formik.touched.cutOffTime &&
                  props.formik.errors.cutOffTime
                }
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default DateFields;
