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
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import closeIcon from "@assets/images/close.svg";
import {
  allowAlphaNumeric,
  allowNumberWithSpaceValidation,
} from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

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
          <DialogTitle> {props.isEdit ? "Edit" : "Add"} user</DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Name</label>
                  <TextField
                    name="name"
                    id="name"
                    placeholder="Name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    onKeyPress={allowAlphaNumeric}
                    value={props.formik.values.name}
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
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Email</label>
                  <TextField
                    placeholder="Email address"
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.email}
                    error={
                      props.formik.touched.email &&
                      Boolean(props.formik.errors.email)
                    }
                    helperText={
                      props.formik.touched.email && props.formik.errors.email
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Password</label>
                  <TextField
                    id="password"
                    name="password"
                    placeholder="Password"
                    variant="outlined"
                    autoComplete="off"
                    type="password"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.password}
                    error={
                      props.formik.touched.password &&
                      Boolean(props.formik.errors.password)
                    }
                    helperText={
                      props.formik.touched.password &&
                      props.formik.errors.password
                    }
                  />
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Confirm Password</label>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    variant="outlined"
                    autoComplete="off"
                    type="password"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.confirmPassword}
                    error={
                      props.formik.touched.password &&
                      Boolean(props.formik.errors.confirmPassword)
                    }
                    helperText={
                      props.formik.touched.confirmPassword &&
                      props.formik.errors.confirmPassword
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Phone</label>
                  <TextField
                    placeholder="Phone Number"
                    variant="outlined"
                    type="text"
                    name="phone"
                    id="phone"
                    onKeyPress={allowNumberWithSpaceValidation}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.phone}
                    error={
                      props.formik.touched.phone &&
                      Boolean(props.formik.errors.phone)
                    }
                    helperText={
                      props.formik.touched.phone && props.formik.errors.phone
                    }
                  />
                  {props.formik.touched.phone && props.formik.errors.phone ? (
                    ""
                  ) : (
                    <FormHelperText>
                      {
                        "0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX"
                      }
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="form-group checkbox-wrapper">
                <label className="label-text">Auto Refresh Mapcockpit</label>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" className="custom-checkbox">
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          name="isMapCockpitAutoRefresh"
                          icon={<img src={uncheckedIcon} alt="CheckBox" />}
                          checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
                          onChange={props.formik.handleChange(
                            "isMapCockpitAutoRefresh"
                          )}
                          checked={props.formik.values.isMapCockpitAutoRefresh}
                          value={props.formik.values.isMapCockpitAutoRefresh}
                        />
                      }
                      label="Wanted to auto refresh customer portal mapcockpit?"
                      labelPlacement="end"
                    />
                  </FormGroup>
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
                state.customer.addingCustomerUser ||
                state.customer.editingCustomerUser
              }
            >
              {state.customer.addingCustomerUser ||
              state.customer.editingCustomerUser ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit user"
              ) : (
                "Add user"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Popup;
