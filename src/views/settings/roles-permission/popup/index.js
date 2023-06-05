import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { AddPopup } from "./style";

function Popup(props) {
  const classes = AddPopup();
  const [scroll] = useState("body");
  const materilClasses = materialCommonStyles();
  const [state] = useStore();
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.customModal}
      scroll={scroll}
    >
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
        <DialogTitle id="alert-dialog-title">
          {props.isEdit ? "Edit" : "Add"} Role
        </DialogTitle>
        <DialogContent>
          <div className="form-row">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="email">
                  Role
                </label>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  onChange={props.formik.handleChange("name")}
                  value={props.formik.values.name}
                  placeholder="Role name"
                  error={
                    props.formik.touched.name &&
                    Boolean(props.formik.errors.name)
                  }
                  onKeyPress={allowAlphaNumeric}
                  helperText={
                    props.formik.touched.name && props.formik.errors.name
                  }
                />
              </FormControl>
            </div>
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="email">
                  Status
                </label>
                <Select
                  id="status"
                  displayEmpty
                  className={materilClasses.customSelect}
                  placeholder="Active"
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  onChange={props.formik.handleChange("status")}
                  value={props.formik.values.status}
                  IconComponent={() => <ExpandMore />}
                >
                  <MenuItem value={""} disabled>
                    Select Status
                  </MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Select>
                <FormHelperText className="error-text">
                  {props.formik.touched.status && props.formik.errors.status}
                </FormHelperText>
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
            type="reset"
          >
            CANCEL
          </Button>
          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            type="submit"
            disabled={
              state.rolesPermission.addingRole ||
              state.rolesPermission.editingRole
            }
          >
            {state.rolesPermission.addingRole ||
            state.rolesPermission.editingRole ? (
              <CircularProgress color="inherit" />
            ) : props.isEdit ? (
              "Edit Role"
            ) : (
              "Add Role"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Popup;
