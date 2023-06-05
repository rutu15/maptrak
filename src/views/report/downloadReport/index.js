import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import calendarIcon from "@assets/images/calendar-icon.svg";

import DownloadReportImage from "@assets/images/download-report.svg";
import { DownloadReportStyle } from "./style";

function DownloadReport(props) {
  const classes = DownloadReportStyle();
  const minimumDate = new Date(props.data?.startDate);
  const mini = moment(minimumDate).add(30, "day").format("YYYY-MM-DD");
  const diff_time =
    new Date(props.data?.endDate).getTime() -
    new Date(props.data?.startDate).getTime();
  var diff_days = diff_time / (1000 * 3600 * 24);
  return (
    <div className={classes.DownloadReportWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={props.handleClickOpen}
      >
        Download Report
      </Button>

      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
      >
        <form noValidate autoComplete="off" className={classes.customForm}>
          <div className="form-row">
            <div className="form-group">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Start date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd MMM yyyy"
                    className="custom-datepicker"
                    keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                    name="to"
                    placeholder="DD/MM/YYYY"
                    value={props.data.startDate}
                    onChange={(e) => props.handleChange(e, "startDate")}
                    maxDate={new Date()}
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">End date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd MMM yyyy"
                    className="custom-datepicker"
                    keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                    placeholder="DD/MM/YYYY"
                    value={props.data.endDate}
                    onChange={(e) => props.handleChange(e, "endDate")}
                    disabled={!props.data.startDate}
                    maxDate={mini}
                    minDate={minimumDate}
                    disableFuture={true}
                    autoOk
                    helperText={
                      diff_days > 30 &&
                      "Reports can be downloaded for a month only"
                    }
                    // error={diff_days &&   diff_days > 30}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </div>
          </div>

          <DialogTitle id="alert-dialog-title">
            <img src={DownloadReportImage} alt="Warning" />
            Download Report
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to download the{" "}
              {props.getTab === 0
                ? "AWB"
                : props.getTab === 1
                ? "ULD"
                : "Loose"}{" "}
              report?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              className="primary-btn gray-border-btn"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="blue-btn primary-btn"
              disabled={
                !props.data.endDate ||
                props.data.endDate < props.data.startDate ||
                props.data.endDate > mini
              }
              onClick={props.downloadReport}
            >
              Download
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default DownloadReport;
