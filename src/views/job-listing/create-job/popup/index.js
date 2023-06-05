import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import Detail from "../detail";
import Location from "../location";
import { CreateJobStyle } from "../style";

function PopUp(props) {
  const classes = CreateJobStyle();
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
      {props.error && <Alert severity="error">{props.error}</Alert>}
      <DialogTitle id="alert-dialog-title">
        {" "}
        {props.isEdit ? "Edit a" : "Create a"} Job
      </DialogTitle>
      <form
        noValidate
        autoComplete="off"
        className={classes.customForm}
        onSubmit={props.formik.handleSubmit}
      >
        <DialogContent>
          <Detail formik={props.formik} isEdit={props.isEdit} />
          <Location
            formik={props.formik}
            handleChange={props.handleChange}
            handleSelect={props.handleSelect}
          />
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
            disabled={state.job?.creatingJob || state.job?.editingJob}
          >
            {state.job?.creatingJob || state.job?.editingJob ? (
              <CircularProgress color="inherit" />
            ) : props.isEdit ? (
              "Edit Job"
            ) : (
              "Create Job"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PopUp;
