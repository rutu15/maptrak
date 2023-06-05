import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { allowOnlyNumbers } from "@utils/commonFunctions";
import { AddNewItemStyle } from "./style";

function Popup(props) {
  const [scroll] = useState("body");
  const classes = AddNewItemStyle();
  const [state] = useStore();

  return (
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
          Loose
        </DialogTitle>
        <DialogContent>
          <div className="form-row">
            <div className="form-group">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="Quantity">
                  Quantity
                </label>
                <TextField
                  id="quantity"
                  placeholder="Quantity"
                  variant="outlined"
                  type="text"
                  name="quantity"
                  onKeyPress={allowOnlyNumbers}
                  onChange={props.formik.handleChange}
                  value={props.formik.values.quantity}
                  error={
                    props.formik.touched.quantity &&
                    Boolean(props.formik.errors.quantity)
                  }
                  helperText={
                    props.formik.touched.quantity &&
                    props.formik.errors.quantity
                  }
                />
              </FormControl>
            </div>
          </div>
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
              disabled={
                state?.job?.addingAwbLoose || state?.job?.editingAwbLoose
              }
            >
              {state?.job?.addingAwbLoose || state?.job?.editingAwbLoose ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Loose"
              ) : (
                "Add Loose"
              )}{" "}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default Popup;
