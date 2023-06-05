import React from "react";
import { Button } from "@material-ui/core";

import { AddAddressStyle } from "./style";
import Popup from "../popup";

function AddUser(props) {
  const classes = AddAddressStyle();

  return (
    <div className={classes.AddressWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={() => props.handleClickOpen()}
      >
        + Add Address
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
