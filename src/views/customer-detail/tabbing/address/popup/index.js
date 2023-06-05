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
  FormHelperText,
} from "@material-ui/core";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { allowSomeSpecialChar } from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";
import { Alert } from "@material-ui/lab";

function Popup(props) {
  const classes = AddPopupStyle();
  const [state] = useStore();
  const [scroll] = useState("body");

  return (
    <>
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
          <DialogTitle> {props.isEdit ? "Edit" : "Add"} address</DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Address</label>
                  <TextField
                    name="address"
                    id="address"
                    placeholder="Address"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowSomeSpecialChar}
                    onChange={props.formik.handleChange}
                    value={props.formik.values?.address}
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
              {/* <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Short Code</label>
                  <ChipInput
                    className="chip-input"
                    name="emails"
                    // value={item.emails}
                    // onAdd={(e) => handleChange(e, "emails", index, item)}
                    // onDelete={(e) => handleDeleteChip(e, index, item)}
                    placeholder="Enter short code here"
                  />
                </FormControl>
              </div> */}
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Latitude</label>
                  <TextField
                    name="latitude"
                    id="latitude"
                    placeholder="Latitude"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values?.latitude}
                    error={
                      props.formik.touched.latitude &&
                      Boolean(props.formik.errors.latitude)
                    }
                    helperText={
                      props.formik.touched.latitude &&
                      props.formik.errors.latitude
                    }
                  />
                  {props.formik.touched.latitude &&
                  props.formik.errors.latitude ? (
                    ""
                  ) : (
                    <FormHelperText>
                      {"Value must be upto 8 decimal points."}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Longitude</label>
                  <TextField
                    id="longitude"
                    name="longitude"
                    variant="outlined"
                    placeholder="Longitude"
                    autoComplete="off"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values?.longitude}
                    error={
                      props.formik.touched.longitude &&
                      Boolean(props.formik.errors.longitude)
                    }
                    helperText={
                      props.formik.touched.longitude &&
                      props.formik.errors.longitude
                    }
                  />
                  {props.formik.touched.longitude &&
                  props.formik.errors.longitude ? (
                    ""
                  ) : (
                    <FormHelperText>
                      {"Value must be upto 8 decimal points."}
                    </FormHelperText>
                  )}
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
              Cancel
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              type="submit"
              disabled={
                state.customer.editingCustomerAddress ||
                state.customer.addingCustomerAddress
              }
            >
              {state.customer.editingCustomerAddress ||
              state.customer.addingCustomerAddress ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit address"
              ) : (
                "Add address"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Popup;
