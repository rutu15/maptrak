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
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { allowOnlyNumbers } from "@utils/commonFunctions";
import { AssignDriverStyle } from "./style";

function AssignDriverPopup(props) {
  const classes = AssignDriverStyle();

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
      <DialogTitle id="alert-dialog-title">
        {" "}
        Update Job Duration and Start Time
      </DialogTitle>
      <form noValidate autoComplete="off" className={classes.customForm}>
        <DialogContent>
          <div className="form-row date-time-wrapper">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Start Time</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                  <KeyboardDateTimePicker
                    variant="outlined"
                    ampm={false}
                    format="dd/MM/yyyy HH:mm:ss"
                    className="custom-datepicker"
                    keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                    name="time"
                    autoOk
                    value={props.started}
                    onChange={props.handleDate}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </div>
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Job Duration</label>
                <TextField
                  id="jobDuration"
                  placeholder="Please enter minutes"
                  variant="outlined"
                  type="text"
                  name="jobDuration"
                  onKeyPress={allowOnlyNumbers}
                  value={props.duration}
                  onChange={props.handleDuration}
                  error={true}
                  helperText={props.error}
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
            type="button"
            onClick={props.handleUpdate}
            disabled={state?.job?.updatingJobDuration}
          >
            {state?.job?.updatingJobDuration ? (
              <CircularProgress color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignDriverPopup;
