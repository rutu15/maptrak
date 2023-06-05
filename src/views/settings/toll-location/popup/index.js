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
import { allowOnlyFloat, allowSomeSpecialChar } from "@utils/commonFunctions";
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
            {props.isEdit ? "Edit" : "Add"} Toll
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Latitude</label>
                  <TextField
                    id="latitude"
                    name="latitude"
                    placeholder="Latitude"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.latitude || ""}
                    error={
                      props.formik.touched.latitude &&
                      Boolean(props.formik.errors.latitude)
                    }
                    helperText={
                      props.formik.touched.latitude &&
                      props.formik.errors.latitude
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="longitude">
                    Longitude
                  </label>

                  <TextField
                    id="longitude"
                    name="longitude"
                    placeholder="Longitude"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.longitude || ""}
                    error={
                      props.formik.touched.longitude &&
                      Boolean(props.formik.errors.longitude)
                    }
                    helperText={
                      props.formik.touched.longitude &&
                      props.formik.errors.longitude
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="address">
                    Address
                  </label>
                  <TextField
                    id="address"
                    name="address"
                    placeholder="Address"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowSomeSpecialChar}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.address || ""}
                    error={
                      props.formik.touched.address &&
                      Boolean(props.formik.errors.address)
                    }
                    helperText={
                      props.formik.touched.address &&
                      props.formik.errors.address
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Cost</label>
                  <TextField
                    id="cost"
                    name="cost"
                    placeholder="Cost"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowOnlyFloat}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.cost || ""}
                    error={
                      props.formik.touched.cost &&
                      Boolean(props.formik.errors.cost)
                    }
                    helperText={
                      props.formik.touched.cost && props.formik.errors.cost
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
                state.tollLocation?.addingTollLocation ||
                state.tollLocation?.editingTollLocation
              }
            >
              {state.tollLocation?.addingTollLocation ||
              state.tollLocation?.editingTollLocation ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Toll"
              ) : (
                "Add Toll"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
