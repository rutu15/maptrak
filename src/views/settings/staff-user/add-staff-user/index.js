import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";
import { AddStaffStyle } from "./style";

function AddStaff(props) {
  const classes = AddStaffStyle();
  return (
    <div className={classes.AddStaffWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={props.handleClickOpen}
      >
        + Add User
      </Button>

      <Popup
        formik={props.formik}
        handleClose={props.handleClose}
        open={props.open}
        isEdit={props.isEdit}
        error={props.error}
      />
    </div>
  );
}

export default AddStaff;