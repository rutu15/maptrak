import React, { useState } from "react";
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

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { AssignDriverStyle } from "./style";

function AssignDriverPopup(props) {
  const classes = AssignDriverStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
  const [truckType, setTruckType] = useState(
    props.jobsData?.trucks?.truckType?.name
  );
  const [state] = useStore();

  const handleClick = (itm) => {
    setTruckType(itm?.truckType?.name);
    if (itm.truckType?.name === "Rigid") {
      props.setTrailer("");
    } else {
      props.setTrailer(
        props.jobsData?.trailers ? props.jobsData?.trailers?.id : ""
      );
    }
  };
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
      <DialogTitle id="alert-dialog-title">
        {" "}
        Update Truck,Trailer and Driver
      </DialogTitle>
      <form noValidate autoComplete="off" className={classes.customForm}>
        <DialogContent>
          <div className="form-row">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Driver</label>
                <Select
                  id="assignDriver"
                  displayEmpty
                  className={materilClasses.customSelect}
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  IconComponent={() => <ExpandMore />}
                  value={props.driver}
                  onChange={props.handleChangeDriver}
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
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Truck</label>
                <Select
                  id="assignDriver"
                  displayEmpty
                  className={materilClasses.customSelect}
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  IconComponent={() => <ExpandMore />}
                  value={props.truck}
                  onChange={props.handleChangeTruck}
                >
                  <MenuItem value={""} disabled>
                    Select Truck Rego
                  </MenuItem>
                  {state?.truck?.loadingTrucks ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    state?.trucks?.trucksData?.rows?.map((itm, indx) => {
                      return (
                        <MenuItem
                          key={indx}
                          value={itm.id}
                          onClick={() => handleClick(itm)}
                        >
                          {itm.rego}
                        </MenuItem>
                      );
                    })
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-row">
            <div className="form-gourp">
              <FormControl variant="outlined" className={classes.formControl}>
                <label className="label-text">Trailer</label>
                <Select
                  id="assignDriver"
                  displayEmpty
                  className={materilClasses.customSelect}
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  IconComponent={() => <ExpandMore />}
                  value={props.trailer}
                  onChange={props.handleChangeTrailer}
                  disabled={truckType === "Rigid"}
                >
                  <MenuItem value={""} disabled>
                    Select Trailer
                  </MenuItem>
                  {state?.truck?.loadingTrailer ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    state?.trailer?.trailersData?.rows?.map((itm, indx) => {
                      return (
                        <MenuItem key={indx} value={itm.id}>
                          {itm.rego}
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
            onClick={props.handleSubmit}
            disabled={state.job.updatingJobDetails}
          >
            {state.job?.updatingJobDetails ? (
              <CircularProgress color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AssignDriverPopup;
