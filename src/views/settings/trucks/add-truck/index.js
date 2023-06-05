import React from "react";
import { Button } from "@material-ui/core";

import { AddTruckStyle } from "./style";
import Popup from "../popup";

function AddTruck(props) {
  const classes = AddTruckStyle();
  return (
    <div className={classes.AddTruckWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={props.handleClickOpen}
      >
        + Add Truck
      </Button>

      <Popup
        open={props.open}
        handleClose={props.handleClose}
        formik={props.formik}
        isEdit={props.isEdit}
        error={props.error}
      />
    </div>
  );
}

export default AddTruck;
