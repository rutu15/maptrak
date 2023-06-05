import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  const [state] = useStore();

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
        scroll={scroll}
      >
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          <div className="close-modal">
            <img src={closeIcon} alt="Close" onClick={props.handleClose} />
          </div>
          {props.error && <Alert severity="error">{props.error}</Alert>}
          <DialogTitle id="alert-dialog-title">
            {props.isEdit ? "Edit" : "Add"} Organisation
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp full-width">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text " htmlFor="name">
                    Name
                  </label>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Organisation name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.name}
                    onKeyPress={allowAlphaNumeric}
                    error={
                      props.formik.touched.name &&
                      Boolean(props.formik.errors.name)
                    }
                    helperText={
                      props.formik.touched.name && props.formik.errors.name
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
              onClick={props.handleClose}
            >
              CANCEL
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              type="submit"
              disabled={
                state?.organisation?.editingParentOrganisation ||
                state?.organisation?.addingParentOrganisation
              }
            >
              {state?.organisation?.editingParentOrganisation ||
              state?.organisation?.addingParentOrganisation ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Organisation"
              ) : (
                "Add Organisation"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
