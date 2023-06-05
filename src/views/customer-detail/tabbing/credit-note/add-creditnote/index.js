import React from "react";
import { Button } from "@material-ui/core";

import { AddCreditNoteStyle } from "./style";
import Popup from "../popup";

function AddCreditnote(props) {
  const classes = AddCreditNoteStyle();

  return (
    <div className={classes.creditNoteWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={() => props.handleClickOpen()}
      >
        + Add Credit Note
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
export default AddCreditnote;
