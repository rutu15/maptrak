import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";

import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  const materilClasses = materialCommonStyles();

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
        scroll={scroll}
      >
        <form noValidate autoComplete="off" className={classes.customForm}>
          <div className="close-modal">
            <img src={closeIcon} alt="Close" onClick={props.handleClose} />
          </div>
          <DialogTitle id="alert-dialog-title">
            {props.isEdit ? "Edit" : "Add"} Toll
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Toll</label>
                  <Select
                    name="name"
                    id="typeId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    placeholder="Please Select Truck Type"
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    onChange={props.formik.handleChange("name")}
                    value={props.formik.values.name}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Toll
                    </MenuItem>
                    <MenuItem value="Toll 1">Toll 1</MenuItem>
                    <MenuItem value="Toll 2">Toll 2</MenuItem>
                    <MenuItem value="Toll 3">Toll 3</MenuItem>
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.name && props.formik.errors.name}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="name">
                    Charge
                  </label>

                  <TextField
                    id="charge"
                    name="charge"
                    placeholder="Charge"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.charge}
                    error={
                      props.formik.touched.charge &&
                      Boolean(props.formik.errors.charge)
                    }
                    helperText={
                      props.formik.touched.charge && props.formik.errors.charge
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
            >
              {props.isEdit ? "Edit Toll" : "Add Toll"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
