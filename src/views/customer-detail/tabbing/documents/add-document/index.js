import React from "react";
import { Button } from "@material-ui/core";

import { AddDocumentStyle } from "./style";
import Popup from "../popup";

function AddDocument(props) {
  const classes = AddDocumentStyle();

  return (
    <div className={classes.documentWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={() => props.handleClickOpen()}
      >
        + Add Document
      </Button>
      <Popup
        open={props.open}
        handleClose={props.handleClose}
        formik={props.formik}
        error={props.error}
        uploadFile={props.uploadFile}
        fileName={props.fileName}
        uploadError={props.uploadError}
        uploadErrorMsg={props.uploadErrorMsg}
        showMsg={props.showMsg}
        buttonLoader={props.buttonLoader}
      />
    </div>
  );
}
export default AddDocument;
