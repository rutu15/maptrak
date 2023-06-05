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
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import UploadImage from "@assets/images/upload.svg";
import closeIcon from "@assets/images/close.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { materialCommonStylesOrg } from "@utils/materialCommonStyles-org";

import {
  allowAlphaNumeric,
  allowSomeSpecialChar,
  allowNumberWithSpaceValidation,
  // awbNumberValidation,
} from "@utils/commonFunctions";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const materilClasses = materialCommonStyles();
  const materialClasses = materialCommonStylesOrg();
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
            {props.isEdit ? "Edit" : "Add"} Organisation
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text " htmlFor="name">
                    Name
                  </label>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Organisation name"
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
                  <label className="label-text" htmlFor="parentOrganisationId">
                    Parent Organisation
                  </label>
                  <Select
                    id="parentOrganisationId"
                    name="parentOrganisationId"
                    displayEmpty
                    className={materialClasses.customSelect}
                    MenuProps={{
                      classes: {
                        paper: materialClasses.customSelect,
                      },
                    }}
                    IconComponent={() => <ExpandMore />}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.parentOrganisationId}
                    disabled={[1, 2, 3, 4, 5, 6].includes(
                      props.formik.values.id
                    )}
                  >
                    <MenuItem value={""}>Select Parent</MenuItem>

                    {state?.organisation?.loadingParentOrganisation ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.organisation?.parentOrganisationData?.rows?.map(
                        (item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item.id}
                              disabled={[1, 2, 3, 4, 5, 6].includes(item.id)}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        }
                      )
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.parentOrganisationId &&
                      props.formik.errors.parentOrganisationId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text " htmlFor="address1">
                    Address 1
                  </label>
                  <TextField
                    id="address1"
                    name="address1"
                    placeholder="Address 1"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.address1}
                    onKeyPress={allowSomeSpecialChar}
                    error={
                      props.formik.touched.address1 &&
                      Boolean(props.formik.errors.address1)
                    }
                    helperText={
                      props.formik.touched.address1 &&
                      props.formik.errors.address1
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Address 2</label>
                  <TextField
                    id="address2"
                    name="address2"
                    placeholder="Address 2"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.address2}
                    onKeyPress={allowSomeSpecialChar}
                    error={
                      props.formik.touched.address2 &&
                      Boolean(props.formik.errors.address2)
                    }
                    helperText={
                      props.formik.touched.address2 &&
                      props.formik.errors.address2
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text " htmlFor="suburb">
                    Suburb
                  </label>
                  <TextField
                    id="suburb"
                    name="suburb"
                    placeholder="Suburb"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.suburb}
                    onKeyPress={allowSomeSpecialChar}
                    error={
                      props.formik.touched.suburb &&
                      Boolean(props.formik.errors.suburb)
                    }
                    helperText={
                      props.formik.touched.suburb && props.formik.errors.suburb
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Postal code</label>
                  <TextField
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.postalCode}
                    onKeyPress={allowNumberWithSpaceValidation}
                    error={
                      props.formik.touched.postalCode &&
                      Boolean(props.formik.errors.postalCode)
                    }
                    helperText={
                      props.formik.touched.postalCode &&
                      props.formik.errors.postalCode
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text " htmlFor="countryId">
                    Country
                  </label>
                  <Select
                    id="countryId"
                    name="countryId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    IconComponent={() => <ExpandMore />}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.countryId}
                  >
                    <MenuItem value={""}>Select Country</MenuItem>
                    {state?.common?.loadingCountries ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.countriesData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.countryId &&
                      props.formik.errors.countryId}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="stateId">
                    State
                  </label>
                  <Select
                    id="stateId"
                    name="stateId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    IconComponent={() => <ExpandMore />}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.stateId}
                    disabled={!props.formik.values.countryId}
                  >
                    <MenuItem value={""}>Select State</MenuItem>
                    {state?.common?.loadingStates ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.statesData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                  <FormHelperText className="error-text">
                    {props.formik.touched.stateId &&
                      props.formik.errors.stateId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>

            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="ABN">
                    ABN / NZBN
                  </label>
                  <TextField
                    id="ABN"
                    name="ABN"
                    placeholder="ABN/NZBN"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.ABN}
                    onKeyPress={allowNumberWithSpaceValidation}
                    error={
                      props.formik.touched.ABN &&
                      Boolean(props.formik.errors.ABN)
                    }
                    helperText={
                      props.formik.touched.ABN && props.formik.errors.ABN
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Phone</label>
                  <TextField
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.phone}
                    onKeyPress={allowNumberWithSpaceValidation}
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
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="fax">
                    Fax
                  </label>
                  <TextField
                    id="fax"
                    name="fax"
                    placeholder="FAX"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.fax}
                    onKeyPress={allowAlphaNumeric}
                    error={
                      props.formik.touched.fax &&
                      Boolean(props.formik.errors.fax)
                    }
                    helperText={
                      props.formik.touched.fax && props.formik.errors.fax
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Email</label>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="Email"
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
                  <label className="label-text" htmlFor="BSB">
                    BSB
                  </label>
                  <TextField
                    id="BSB"
                    name="BSB"
                    placeholder="BSB"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.BSB}
                    onKeyPress={allowNumberWithSpaceValidation}
                    error={
                      props.formik.touched.BSB &&
                      Boolean(props.formik.errors.BSB)
                    }
                    helperText={
                      props.formik.touched.BSB && props.formik.errors.BSB
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Account No</label>
                  <TextField
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Account Number"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.accountNumber}
                    onKeyPress={allowNumberWithSpaceValidation}
                    error={
                      props.formik.touched.accountNumber &&
                      Boolean(props.formik.errors.accountNumber)
                    }
                    helperText={
                      props.formik.touched.accountNumber &&
                      props.formik.errors.accountNumber
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="bsb">
                    Bank
                  </label>
                  <TextField
                    id="bank"
                    name="bank"
                    placeholder="Bank"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.bank}
                    onKeyPress={allowAlphaNumeric}
                    error={
                      props.formik.touched.bank &&
                      Boolean(props.formik.errors.bank)
                    }
                    helperText={
                      props.formik.touched.bank && props.formik.errors.bank
                    }
                  />
                </FormControl>
              </div>
              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text">Account Name</label>
                  <TextField
                    id="accountName"
                    name="accountName"
                    placeholder="Account Name"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.accountName}
                    onKeyPress={allowAlphaNumeric}
                    error={
                      props.formik.touched.accountName &&
                      Boolean(props.formik.errors.accountName)
                    }
                    helperText={
                      props.formik.touched.accountName &&
                      props.formik.errors.accountName
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-row">
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
                        inputProps: {
                          accept: "image/x-png,image/jpeg",
                        },
                      }}
                      onChange={(e) =>
                        props.handleImage(e, "upload-file-name", "Upload photo")
                      }
                    />
                    <div className="label-block">
                      <img src={UploadImage} alt="Upload" />
                      <span className="file-name" id="upload-file-name">
                        {props.formik.values.photo
                          ? props.formik.values.photo.name
                          : "Upload Logo"}
                      </span>
                    </div>
                  </div>
                  <FormHelperText className="error-text">
                    {props.formik.touched.photo && props.formik.errors.photo}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="form-gourp">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="cityId">
                    City
                  </label>
                  <Select
                    id="cityId"
                    name="cityId"
                    displayEmpty
                    className={materilClasses.customSelect}
                    MenuProps={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    IconComponent={() => <ExpandMore />}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.cityId}
                  >
                    <MenuItem value={""}>Select City</MenuItem>
                    {state?.common?.loadingCities ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      state?.common?.citiesData?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
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
            </div>
            {props.isEdit && (
              <div className="form-row">
                <div className="form-gourp">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <label className="label-text" htmlFor="bill-number">
                      View Uploaded Photo
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
                state?.organisation?.editingChildOrganisation ||
                state?.organisation?.addingChildOrganisation ||
                state?.common?.imageUploading
              }
            >
              {state?.common?.imageUploading ||
              state?.organisation?.editingChildOrganisation ||
              state?.organisation?.addingChildOrganisation ? (
                <CircularProgress color="inherit" />
              ) : props.isEdit ? (
                "Edit Organisation"
              ) : (
                "Add Organisation"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Popup;
