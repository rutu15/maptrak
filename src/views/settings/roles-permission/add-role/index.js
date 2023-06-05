import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";
import { AddRoleStyle } from "./style";

function AddRole(props) {
  const classes = AddRoleStyle();
  return (
    <div className={classes.AddRoleWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={props.handleClickOpen}
      >
        + Add Role
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

export default AddRole;
