import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { AddPopup } from "./style";

function Popup(props) {
  const classes = AddPopup();
  const [scroll] = useState("body");
  const [state] = useStore();
  const materilClasses = materialCommonStyles();
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
          {props.isEdit ? "Edit" : "Add"} Staff User
        </DialogTitle>
        <DialogContent>
          <div className="form-row">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="name">
                  Name
                </label>
                <TextField
                  id="name"
                  placeholder="Name"
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
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="email">
                  Email
                </label>
                <TextField
                  id="email"
                  placeholder="Email address"
                  variant="outlined"
                  type="text"
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
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="password">
                  Password
                </label>
                <TextField
                  id="password"
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  autoComplete="off"
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
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <TextField
                  id="confirmPassword"
                  placeholder="Confirm password"
                  variant="outlined"
                  type="password"
                  autoComplete="off"
                  onChange={props.formik.handleChange}
                  value={props.formik.values.confirmPassword}
                  error={
                    props.formik.touched.confirmPassword &&
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
                  <MenuItem value={0}>Inactive</MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                </Select>
                <FormHelperText className="error-text">
                  {props.formik.touched.status && props.formik.errors.status}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text" htmlFor="email">
                  Role
                </label>
                <Select
                  id="roleId"
                  displayEmpty
                  className={materilClasses.customSelect}
                  placeholder="Active"
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  onChange={props.formik.handleChange("roleId")}
                  value={props.formik.values.roleId}
                  IconComponent={() => <ExpandMore />}
                >
                  <MenuItem value={""} disabled>
                    Select Role
                  </MenuItem>
                  {state.rolesPermission.loadingRoles ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    state.rolesPermission.rolesData?.rows?.map(
                      (item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      }
                    )
                  )}
                </Select>
                <FormHelperText className="error-text">
                  {props.formik.touched.roleId && props.formik.errors.roleId}
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
            disabled={state.staffUser.addingUser || state.staffUser.editingUser}
          >
            {state.staffUser.addingUser || state.staffUser.editingUser ? (
              <CircularProgress color="inherit" />
            ) : props.isEdit ? (
              "Edit User"
            ) : (
              "Add User"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Popup;
