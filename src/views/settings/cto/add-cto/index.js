import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";
import { AddTollStyle } from "./style";

function AddToll(props) {
  const classes = AddTollStyle();

  return (
    <div className={classes.AddTollWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={props.handleClickOpen}
      >
        + Add CTO
      </Button>

      <Popup
        open={props.open}
        handleClose={props.handleClose}
        formik={props.formik}
        isEdit={props.isEdit}
        error={props.error}
        handleImage={props.handleImage}
      />
    </div>
  );
}

export default AddToll;
