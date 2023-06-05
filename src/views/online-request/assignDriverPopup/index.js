import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { AssignDriverStyle } from "./style";

function AssignDriverPopup(props) {
  const classes = AssignDriverStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
  const [state, dispatch] = useStore();

  useEffect(() => {
    if (props.open) {
      dispatch({ type: FETCH_DRIVERS });
      API.get("drivers", {
        params: {
          orderBy: "driverName",
          order: "ASC",
          filter: {
            active: true,
            cityId: props.cityId,
          },
        },
      })
        .then((response) => {
          dispatch({
            type: FETCH_DRIVERS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_DRIVERS_FAILURE, payload: error });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

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
      <DialogTitle id="alert-dialog-title">Assign Driver</DialogTitle>
      <form noValidate autoComplete="off" className={classes.customForm}>
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
                  onChange={props.handleChange}
                  value={props.driverId}
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
            type="button"
            onClick={props.handleAssign}
          >
            {state.job.assigningDriver ? (
              <CircularProgress color="inherit" />
            ) : (
              "Assign"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignDriverPopup;
