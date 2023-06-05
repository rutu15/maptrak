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
  Select,
  MenuItem,
  FormHelperText,
  TextareaAutosize,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import calendarIcon from "@assets/images/calendar-icon.svg";
import UploadImage from "@assets/images/upload.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
  allowSomeSpecialChar,
  allowNegativeOnlyFloat,
} from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const materilClasses = materialCommonStyles();
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
          <DialogTitle>
            {" "}
            {props.isEdit ? "Edit" : "Add"} credit note
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Date</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="dd/MM/yyyy"
                      className="custom-datepicker"
                      keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                      name="date"
                      placeholder="DD/MM/YYYY"
                      autoOk
                      maxDate={
                        new Date(
                          new Date().getTime() + 60 * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                      minDate={
                        new Date(
                          new Date().getTime() - 60 * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                      value={props.formik.values.date}
                      onChange={(value) =>
                        props.formik.setFieldValue("date", value)
                      }
                      error={
                        props.formik.touched.date &&
                        Boolean(props.formik.errors.date)
                      }
                      helperText={
                        props.formik.touched.date && props.formik.errors.date
                      }
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Child Accounts</label>
                  <Select
                    id="childCustomer"
                    name="childCustomer"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    IconComponent={() => <ExpandMore />}
                    value={props.formik.values.childCustomer}
                    onChange={props.formik.handleChange}
                  >
                    <MenuItem value={""}>Select Customer</MenuItem>
                    {state?.customer?.customers?.rows?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.childCustomer &&
                      props.formik.errors.childCustomer}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="label-text">Organisation</label>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    id="organisation"
                    name="organisation"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    value={props.formik.values.organisation}
                    onChange={props.formik.handleChange}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""}>Select Organisation</MenuItem>
                    {state?.organisation?.childOrganisationData?.rows?.map(
                      (item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {`${item.parentOrganisations?.name} - ${
                              item.name
                            }  ${item.cities ? "- " + item.cities?.name : ""}`}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.organisation &&
                      props.formik.errors.organisation}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Amount</label>
                  <TextField
                    id="amt"
                    name="amt"
                    variant="outlined"
                    placeholder="Amount"
                    autoComplete="off"
                    type="text"
                    // https://wymap.atlassian.net/browse/MAPTRAK-943 Allow only negative values
                    onKeyPress={allowNegativeOnlyFloat}
                    value={props.formik.values.amt}
                    onChange={props.formik.handleChange}
                    error={
                      props.formik.touched.amt &&
                      Boolean(props.formik.errors.amt)
                    }
                    helperText={
                      props.formik.touched.amt && props.formik.errors.amt
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="upload-item-photo">
                    Approval Document
                  </label>
                  <div className={classes.fileInput}>
                    <TextField
                      id="photo"
                      variant="outlined"
                      type="file"
                      multiple
                      onChange={(e) =>
                        props.handleImage(e, "file-name", "Upload Photo")
                      }
                      InputProps={{
                        inputProps: { accept: "image/x-png,image/jpeg" },
                      }}
                    />
                    <div className="label-block">
                      <img src={UploadImage} alt="  Upload" />
                      <span className="file-name" id="file-name">
                        {props.formik.values.photo
                          ? props.formik.values.photo?.name
                          : "Upload Photo"}
                      </span>
                    </div>
                  </div>
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="description">
                    Description
                  </label>
                  <TextareaAutosize
                    rowsMax={3}
                    id="desc"
                    name="desc"
                    aria-label="description"
                    placeholder="Description"
                    variant="outlined"
                    value={props.formik.values.desc}
                    onChange={props.formik.handleChange}
                    onKeyPress={allowSomeSpecialChar}
                  />
                </FormControl>
                <FormHelperText className="error-text">
                  {props.formik.touched.desc && props.formik.errors.desc}
                </FormHelperText>
              </div>
            </div>
            <div className="form-row">
              {props.isEdit && props.formik.values?.viewPhoto && (
                <div className="form-group">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <label className="label-text">View Approval Document</label>
                    <Button
                      className="primary-btn gray-border-btn"
                      color="inherit"
                      disableElevation
                      underlinenone="true"
                      onClick={() =>
                        window.open(props.formik?.values?.viewPhoto)
                      }
                    >
                      View
                    </Button>
                  </FormControl>
                </div>
              )}
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
                state.customer.addingCreditNote ||
                state.customer.editingCreditNote ||
                state?.common?.imageUploading
              }
            >
              {state?.common?.imageUploading ||
              state.customer.addingCreditNote ||
              state.customer.editingCreditNote ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit credit note"
              ) : (
                "Add credit note"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Popup;
