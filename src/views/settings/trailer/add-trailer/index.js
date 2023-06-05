import React from "react";
import { Button } from "@material-ui/core";

import { AddTrailerStyle } from "./style";
import Popup from "../popup";

function AddTrailer(props) {
  const classes = AddTrailerStyle();

  return (
    <div className={classes.AddTrailerWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={props.handleClickOpen}
      >
        + Add Trailer
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

export default AddTrailer;
