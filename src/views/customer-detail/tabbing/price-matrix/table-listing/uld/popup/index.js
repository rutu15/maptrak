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
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { allowOnlyFloatFour } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import closeIcon from "@assets/images/close.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const materilClasses = materialCommonStyles();
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
          <DialogTitle>Edit Pricing</DialogTitle>
          <DialogContent>
            <label className="label-text">
              {props.formik.values?.jobTypes?.name} -{" "}
              {props.formik.values?.uldTypes?.name}{" "}
            </label>
            <FormControl>
              <div className="weekly-row-wrapper">
                <div className="weekly-row">
                  <label className="label-text">Week Days</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="weekDaysWage"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.weekDaysWage}
                      error={
                        props.formik.touched.weekDaysWage &&
                        Boolean(props.formik.errors.weekDaysWage)
                      }
                      helperText={
                        props.formik.touched.weekDaysWage &&
                        props.formik.errors.weekDaysWage
                      }
                    />
                    <FormControl variant="outlined">
                      <Select
                        name="weekDaysChargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                        onChange={props.formik.handleChange}
                        value={props.formik.values.weekDaysChargeType}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="QTY">Per Quantity</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="weekly-row">
                  <label className="label-text">Saturday</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="saturdayWage"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.saturdayWage}
                      error={
                        props.formik.touched.saturdayWage &&
                        Boolean(props.formik.errors.saturdayWage)
                      }
                      helperText={
                        props.formik.touched.saturdayWage &&
                        props.formik.errors.saturdayWage
                      }
                    />
                    <FormControl variant="outlined">
                      <Select
                        name="saturdayChargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                        onChange={props.formik.handleChange}
                        value={props.formik.values.saturdayChargeType}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="QTY">Per Quantity</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="weekly-row">
                  <label className="label-text">Sunday</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="sundayWage"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.sundayWage}
                      error={
                        props.formik.touched.sundayWage &&
                        Boolean(props.formik.errors.sundayWage)
                      }
                      helperText={
                        props.formik.touched.sundayWage &&
                        props.formik.errors.sundayWage
                      }
                    />
                    <FormControl variant="outlined">
                      <Select
                        name="sundayChargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                        onChange={props.formik.handleChange}
                        value={props.formik.values.sundayChargeType}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="QTY">Per Quantity</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="weekly-row">
                  <label className="label-text">Public Holiday 1</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="publicHoliday1Wage"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.publicHoliday1Wage}
                      error={
                        props.formik.touched.publicHoliday1Wage &&
                        Boolean(props.formik.errors.publicHoliday1Wage)
                      }
                      helperText={
                        props.formik.touched.publicHoliday1Wage &&
                        props.formik.errors.publicHoliday1Wage
                      }
                    />
                    <FormControl variant="outlined">
                      <Select
                        name="publicHoliday1ChargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                        onChange={props.formik.handleChange}
                        value={props.formik.values.publicHoliday1ChargeType}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="QTY">Per Quantity</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="weekly-row">
                  <label className="label-text">Public Holiday 2</label>
                  <div className="textfield-wrapper">
                    <TextField
                      name="publicHoliday2Wage"
                      variant="outlined"
                      type="text"
                      placeholder="Wage"
                      onKeyPress={allowOnlyFloatFour}
                      onChange={props.formik.handleChange}
                      value={props.formik.values.publicHoliday2Wage}
                      error={
                        props.formik.touched.publicHoliday2Wage &&
                        Boolean(props.formik.errors.publicHoliday2Wage)
                      }
                      helperText={
                        props.formik.touched.publicHoliday2Wage &&
                        props.formik.errors.publicHoliday2Wage
                      }
                    />
                    <FormControl variant="outlined">
                      <Select
                        name="publicHoliday2ChargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                        onChange={props.formik.handleChange}
                        value={props.formik.values.publicHoliday2ChargeType}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="QTY">Per Quantity</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </FormControl>
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
              disabled={props.loading}
            >
              {props.loading ? <CircularProgress color="inherit" /> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Popup;
