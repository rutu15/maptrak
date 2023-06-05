import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  TextareaAutosize,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import PlaceTextField from "@components/placeField";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { CreateJobStyle } from "../style";

function Detail(props) {
  const classes = CreateJobStyle();
  const materilClasses = materialCommonStyles();
  const [state] = useStore();
  const handlePickLocation = (item) => {
    props.formik.setFieldValue("pickUpLocation", item.address);
    props.formik.setFieldValue("pickUpLatitude", item.latitude);
    props.formik.setFieldValue("pickUpLongitude", item.longitude);
  };

  const handleDropLocation = (item) => {
    props.formik.setFieldValue("dropOffLocation", item.address);
    props.formik.setFieldValue("dropOffLatitude", item.latitude);
    props.formik.setFieldValue("dropOffLongitude", item.longitude);
  };

  const setPickDropLocation = (item) => {
    props.formik.setFieldValue("ctoData", item);
  };

  const handleCtoType = () => {
    props.formik.setFieldValue("ctoId", "");
  };
  return (
    <>
      <div className="form-row">
        <div className="form-gourp full-width">
          <FormControl variant="outlined" className={classes.formControl}>
            {props.formik.values.jobTypeLabel === "Empty" && (
              <div className="div-wrapper">
                <div>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                    onChange={props.formik.handleChange("radioType")}
                    value={props.formik.values.radioType}
                  >
                    <FormControlLabel
                      value="pickUp"
                      control={<Radio color="primary" />}
                      label="Pick Up"
                      labelPlacement="end"
                      onClick={handleCtoType}
                    />
                    <FormControlLabel
                      value="dropOff"
                      control={<Radio color="primary" />}
                      label="Drop Off"
                      labelPlacement="end"
                      onClick={handleCtoType}
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
            <span className="label-text">CTO</span>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("ctoId")}
              value={props.formik.values.ctoId}
              IconComponent={() => <ExpandMore />}
              disabled={
                !["Import", "Export", "Empty"].includes(
                  props.formik.values.jobTypeLabel
                ) || !props.formik.values.cityId
              }
            >
              <MenuItem value={""} disabled>
                Select CTO
              </MenuItem>
              {state?.common?.loadingCtos ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.common?.ctosData?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() => setPickDropLocation(item)}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.ctoId && props.formik.errors.ctoId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      {["Metro", "Ad-Hoc"].includes(props.formik.values.jobTypeLabel) ||
      state.customer?.customerAddressData?.count === 0 ? (
        <div className="form-row">
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="pick-up-location">
                Pick up location
              </label>
              <PlaceTextField
                handleChange={(address) =>
                  props.handleChange(address, "pickUpLocation")
                }
                handleSelect={(address) =>
                  props.handleSelect(address, "pickUpLocation")
                }
                value={props.formik.values.pickUpLocation}
                disabled={
                  props.formik.values.jobTypeLabel === "Import" ||
                  (props.formik.values.jobTypeLabel === "Empty" &&
                    ["pickUp", ""].includes(props.formik.values.radioType))
                }
              />
              <FormHelperText className="error-text">
                {(props.formik.touched.pickUpLocation ||
                  props.formik.touched.pickUpLongitude) &&
                  (props.formik.errors.pickUpLocation ||
                    props.formik.errors.pickUpLongitude)}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="drop-location">
                Drop off location
              </label>
              <PlaceTextField
                handleChange={(address) =>
                  props.handleChange(address, "dropOffLocation")
                }
                handleSelect={(address) =>
                  props.handleSelect(address, "dropOffLocation")
                }
                value={props.formik.values.dropOffLocation}
                disabled={
                  props.formik.values.jobTypeLabel === "Export" ||
                  (props.formik.values.jobTypeLabel === "Empty" &&
                    ["dropOff", ""].includes(props.formik.values.radioType))
                }
              />
              <FormHelperText className="error-text">
                {(props.formik.touched.dropOffLocation ||
                  props.formik.touched.dropOffLongitude) &&
                  (props.formik.errors.dropOffLocation ||
                    props.formik.errors.dropOffLongitude)}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
      ) : (
        <div className="form-row">
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="pick-up-location">
                Pick up location
              </label>
              <Select
                displayEmpty
                className={materilClasses.customSelect}
                MenuProps={{
                  classes: { paper: materilClasses.customSelect },
                }}
                onChange={props.formik.handleChange("pickUpCustomerAddressId")}
                value={props.formik.values.pickUpCustomerAddressId}
                IconComponent={() => <ExpandMore />}
                disabled={
                  props.formik.values.jobTypeLabel === "Import" ||
                  (props.formik.values.jobTypeLabel === "Empty" &&
                    ["pickUp", ""].includes(props.formik.values.radioType))
                }
              >
                <MenuItem value={""} disabled>
                  Select pickup location
                </MenuItem>
                {state?.customer?.loadingCustomerAddress ? (
                  <MenuItem>Loading...</MenuItem>
                ) : (
                  state.customer?.customerAddressData?.rows?.map(
                    (item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          onClick={() => handlePickLocation(item)}
                        >
                          {item.address}
                        </MenuItem>
                      );
                    }
                  )
                )}
              </Select>
              <FormHelperText className="error-text">
                {!props.formik.values.pickUpLocation &&
                  props.formik.touched.pickUpLocation &&
                  props.formik.errors.pickUpLocation}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="drop-location">
                Drop off location
              </label>
              <Select
                displayEmpty
                className={materilClasses.customSelect}
                MenuProps={{
                  classes: { paper: materilClasses.customSelect },
                }}
                onChange={props.formik.handleChange("dropOffCustomerAddressId")}
                value={props.formik.values.dropOffCustomerAddressId}
                IconComponent={() => <ExpandMore />}
                disabled={
                  props.formik.values.jobTypeLabel === "Export" ||
                  (props.formik.values.jobTypeLabel === "Empty" &&
                    ["dropOff", ""].includes(props.formik.values.radioType))
                }
              >
                <MenuItem value={""} disabled>
                  Select dropoff location
                </MenuItem>
                {state?.customer?.loadingCustomerAddress ? (
                  <MenuItem>Loading...</MenuItem>
                ) : (
                  state.customer?.customerAddressData?.rows?.map(
                    (item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          onClick={() => handleDropLocation(item)}
                        >
                          {item.address}
                        </MenuItem>
                      );
                    }
                  )
                )}
              </Select>
              <FormHelperText className="error-text">
                {!props.formik.values.dropOffLocation &&
                  props.formik.touched.dropOffLocation &&
                  props.formik.errors.dropOffLocation}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="form-gourp full-width">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="description">
              Job description
            </label>
            <TextareaAutosize
              rowsMax={3}
              id="description"
              aria-label="description"
              placeholder="Description"
              onChange={props.formik.handleChange("description")}
              value={props.formik.values.description}
            />
            <FormHelperText className="error-text">
              {props.formik.touched.description &&
                props.formik.errors.description}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Detail;
