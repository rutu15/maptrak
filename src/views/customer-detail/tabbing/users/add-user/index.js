import React from "react";
import { Button } from "@material-ui/core";

import { AddUserStyle } from "./style";
import Popup from "../popup";

function AddUser(props) {
  const classes = AddUserStyle();

  return (
    <div className={classes.addUserWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={() => props.handleClickOpen()}
      >
        + Add User
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
export default AddUser;
