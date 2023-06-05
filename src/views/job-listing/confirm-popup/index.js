import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import { ConfirmPopupStyle } from "./style";

function ConfirmPopup(props) {
  const classes = ConfirmPopupStyle();
  const [scroll] = useState("body");
  return (
    <div className={classes.ConfirmWrapper}>
      <Dialog
        open={props.open}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to create a completed job and this is mainly for
            billing purpose.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary"
            className="primary-btn gray-border-btn"
          >
            No
          </Button>
          <Button
            onClick={props.handleConfirm}
            color="primary"
            className="orange-btn primary-btn"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmPopup;
