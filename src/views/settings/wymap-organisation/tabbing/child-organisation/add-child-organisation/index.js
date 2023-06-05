import React from "react";
import { Button } from "@material-ui/core";

import { AddChildCustomerStyle } from "./style";
import Popup from "../popup";

function AddChildOrganisation(props) {
  const classes = AddChildCustomerStyle();

  return (
    <div className={classes.AddChildWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={() => props.handleClickOpen()}
      >
        + Add Organisation
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
export default AddChildOrganisation;
