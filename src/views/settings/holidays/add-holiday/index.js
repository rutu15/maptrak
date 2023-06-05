import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";
import { AddHolidayStyle } from "./style";

function AddHolidays(props) {
  const classes = AddHolidayStyle();

  return (
    <div className={classes.AddHolidayWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={props.handleClickOpen}
      >
        + Add Holiday
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

export default AddHolidays;
