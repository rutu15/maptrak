import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { DeltePopupStyle } from "./style";

function DeletePopup(props) {
  const classes = DeltePopupStyle();
  const [scroll] = useState("body");
  return (
    <div className={classes.DeleteWrapper}>
      <Dialog
        open={props.open}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
      >
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete {props.deleteUser}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary"
            className="primary-btn gray-border-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleDelete}
            color="primary"
            className="orange-btn primary-btn"
          >
            {props.loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "YES, DELETE"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeletePopup;
