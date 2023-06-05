import React from "react";
import { Button } from "@material-ui/core";

import Popup from "../popup";
import { AddNewLooseStyle } from "./style";

function AddNewLoose(props) {
  const classes = AddNewLooseStyle();

  return (
    <div className={classes.AddNewItemWrapper}>
      {props.jobsData?.invoiceGenerated === false && (
        <Button
          className="orange-btn primary-btn"
          color="inherit"
          disableElevation
          underlinenone="true"
          onClick={props.handleClickOpen}
        >
          + Add new Loose
        </Button>
      )}
      <Popup
        formik={props.formik}
        open={props.open}
        handleClose={props.handleClose}
        isEdit={props.isEdit}
        error={props.error}
        jobsData={props.jobsData}
      />
    </div>
  );
}
export default AddNewLoose;
