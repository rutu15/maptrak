import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import UploadImage from "@assets/images/blue-upload.svg";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { allowSomeSpecialChar } from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const materilClasses = materialCommonStyles();
  const [scroll] = useState("body");
  const [state] = useStore();

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
        scroll={scroll}
      >
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          <div className="close-modal">
            <img src={closeIcon} alt="Close" onClick={props.handleClose} />
          </div>
          {props.error && <Alert severity="error">{props.error}</Alert>}
          <DialogTitle id="alert-dialog-title">
            {props.isEdit ? "Edit" : "Add"} CTO
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Name</label>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.name || ""}
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
                  <label className="label-text" htmlFor="location">
                    Location
                  </label>
                  <TextField
                    id="location"
                    name="location"
                    placeholder="Location"
                    variant="outlined"
                    type="text"
                    onKeyPress={allowSomeSpecialChar}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.location || ""}
                    error={
                      props.formik.touched.location &&
                      Boolean(props.formik.errors.location)
                    }
                    helperText={
                      props.formik.touched.location &&
                      props.formik.errors.location
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Latitude</label>
                  <TextField
                    id="latitude"
                    name="latitude"
                    placeholder="Latitude"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.latitude || ""}
                    error={
                      props.formik.touched.latitude &&
                      Boolean(props.formik.errors.latitude)
                    }
                    helperText={
                      props.formik.touched.latitude &&
                      props.formik.errors.latitude
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="longitude">
                    Longitude
                  </label>

                  <TextField
                    id="longitude"
                    name="longitude"
                    placeholder="Longitude"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.longitude || ""}
                    error={
                      props.formik.touched.longitude &&
                      Boolean(props.formik.errors.longitude)
                    }
                    helperText={
                      props.formik.touched.longitude &&
                      props.formik.errors.longitude
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">City</label>
                  <Select
                    id="cityId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    placeholder="Please Select City"
                    MenuProps={{
                      classes: { paper: materilClasses.customSelect },
                    }}
                    onChange={props.formik.handleChange("cityId")}
                    value={props.formik.values.cityId}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select City
                    </MenuItem>
                    {state?.common?.loadingCities ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.citiesData?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item.id}
                            onClick={() =>
                              props.formik.setFieldValue(
                                "cityTimezone",
                                item.timezone
                              )
                            }
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.cityId && props.formik.errors.cityId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="damagePhoto">
                    Upload Logo
                  </label>
                  <div className={classes.fileInput}>
                    <TextField
                      id="logo"
                      variant="outlined"
                      type="file"
                      InputProps={{
                        inputProps: { accept: "image/x-png,image/jpeg" },
                      }}
                      onChange={(e) =>
                        props.handleImage(e, "upload-file-name", "Upload photo")
                      }
                    />

                    <div className="label-block">
                      <img src={UploadImage} alt="Upload" />
                      <span className="file-name" id="upload-file-name">
                        {props.formik.values.logo
                          ? props.formik.values.logo.name
                          : "Upload Logo"}
                      </span>
                    </div>
                  </div>
                  <FormHelperText className="error-text">
                    {props.formik.touched.logo && props.formik.errors.logo}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            {props.isEdit && (
              <div className="form-row">
                <div className="form-gourp">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <label className="label-text" htmlFor="bill-number">
                      View Uploaded Logo
                    </label>
                    <Button
                      className="primary-btn gray-border-btn"
                      color="inherit"
                      disableElevation
                      underlinenone="true"
                      onClick={() => window.open(props.formik.values.viewPhoto)}
                    >
                      View
                    </Button>
                  </FormControl>
                </div>
              </div>
            )}
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
              disabled={
                state?.cto?.editingCto ||
                state?.cto?.addingCto ||
                state?.common?.imageUploading
              }
            >
              {state?.cto?.editingCto ||
              state?.cto?.addingCto ||
              state?.common?.imageUploading ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit CTO"
              ) : (
                "Add CTO"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
