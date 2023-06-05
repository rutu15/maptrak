import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";

function AddParentOrganisation(props) {
  return (
    <div>
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
      />
    </div>
  );
}
export default AddParentOrganisation;
