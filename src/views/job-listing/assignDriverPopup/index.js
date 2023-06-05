import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { AssignDriverStyle } from "./style";

function AssignDriverPopup(props) {
  const classes = AssignDriverStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
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
      {props.error && <Alert severity="error">{props.error}</Alert>}
      <DialogTitle id="alert-dialog-title">
        {" "}
        {props.type === "Assign" ? "Assign" : "Re-Assign"} Driver
      </DialogTitle>
      <form
        noValidate
        autoComplete="off"
        className={classes.customForm}
        onSubmit={props.formik.handleSubmit}
      >
        <DialogContent>
          <div className="form-row">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text"></label>
                <Select
                  id="assignDriver"
                  displayEmpty
                  className={materilClasses.customSelect}
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  onChange={props.formik.handleChange("assignDriver")}
                  value={props.formik.values.assignDriver}
                  IconComponent={() => <ExpandMore />}
                >
                  <MenuItem value={""} disabled>
                    Select Driver
                  </MenuItem>
                  {state?.driver?.gettingDrivers ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    state?.driver?.getDriversData?.rows
                      ?.filter((item) => {
                        return item.active === 1;
                      })
                      .map((itm, indx) => {
                        return (
                          <MenuItem key={indx} value={itm.id}>
                            {itm.name}
                          </MenuItem>
                        );
                      })
                  )}
                </Select>
                <FormHelperText className="error-text">
                  {props.formik.touched.assignDriver &&
                    props.formik.errors.assignDriver}
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
            onClick={props.handleClose}
          >
            CANCEL
          </Button>
          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            type="submit"
          >
            {state.job?.assigningDriver ||
              state.job?.reAssigningDriver ||
              state.job?.reAssigningDriverChange ? (
              <CircularProgress color="inherit" />
            ) : props.type === "Assign" ? (
              "Assign"
            ) : (
              "Re-Assign"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignDriverPopup;
