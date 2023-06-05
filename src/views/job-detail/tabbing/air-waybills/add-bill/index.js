import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useStore } from "@store/store";

import closeIcon from "@assets/images/close.svg";
import Detail from "./detail";
import DateFields from "./dateFields";
import WeightFields from "./weightFields";
import { AddAirWayBillStyle } from "./style";

function AddAirWayBill(props) {
  const classes = AddAirWayBillStyle();
  const [scroll] = useState("body");
  const [state] = useStore();
  return (
    <div className={classes.AddAirWayBillWrapper}>
      {props.jobsData?.invoiceGenerated === false && (
        <Button
          className="orange-btn primary-btn"
          color="inherit"
          disableElevation
          underlinenone="true"
          onClick={props.handleClickOpen}
        >
          + Add air waybill
        </Button>
      )}

      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          {props.error && <Alert severity="error">{props.error}</Alert>}
          <DialogTitle>
            {props.isEdit
              ? props.jobsData?.invoiceGenerated === false
                ? "Edit"
                : "View"
              : "Add"}{" "}
            air waybill
          </DialogTitle>
          <DialogContent>
            <Detail formik={props.formik} />
            <DateFields formik={props.formik} />
            {props.isEdit && (
              <WeightFields
                formik={props.formik}
                getRemainderTags={props.getRemainderTags}
              />
            )}
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              onClick={props.handleClose}
            >
              CANCEL
            </Button>
            {props.jobsData?.invoiceGenerated === false && (
              <Button
                className="orange-btn primary-btn"
                color="inherit"
                disableElevation
                underlinenone="true"
                type="submit"
                disabled={state?.job?.addAirWayBillLoad || state.job.editingAWB}
              >
                {state?.job?.addAirWayBillLoad || state.job.editingAWB ? (
                  <CircularProgress color="inherit" />
                ) : props.isEdit ? (
                  "Edit to the job"
                ) : (
                  "Add to the job"
                )}{" "}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddAirWayBill;
