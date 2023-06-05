import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { allowOnlyNumbers, allowAlphaNumeric } from "@utils/commonFunctions";
import { CreateJobStyle } from "../style";

function Detail(props) {
  const classes = CreateJobStyle();
  const materilClasses = materialCommonStyles();
  const [state] = useStore();

  return (
    <>
      <div className="form-row">
        <div className="form-gourp two-column">
          <FormControl variant="outlined">
            <label className="label-text">City</label>
            <Select
              id="cityId"
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              name="cityId"
              onChange={props.formik.handleChange}
              value={props.formik.values.cityId}
              IconComponent={() => <ExpandMore />}
            >
              <MenuItem value={""} disabled>
                All
              </MenuItem>
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

        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Job Type</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("jobTypeId")}
              value={props.formik.values.jobTypeId}
              IconComponent={() => <ExpandMore />}
            >
              <MenuItem value={""} disabled>
                Select job type
              </MenuItem>
              {state?.common?.loadingJobType ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.common?.jobTypeData?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() =>
                        props.formik.setFieldValue("jobTypeLabel", item.name)
                      }
                    >
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.jobTypeId && props.formik.errors.jobTypeId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-gourp two-column">
          <FormControl variant="outlined">
            <label className="label-text">Requester Name</label>
            <TextField
              id="requesterName"
              placeholder="Requester name"
              variant="outlined"
              type="text"
              name="requesterName"
              onKeyPress={allowAlphaNumeric}
              onChange={props.formik.handleChange}
              value={props.formik.values.requesterName}
              error={
                props.formik.touched.requesterName &&
                Boolean(props.formik.errors.requesterName)
              }
              helperText={
                props.formik.touched.requesterName &&
                props.formik.errors.requesterName
              }
            />
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Customer</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("customerId")}
              value={props.formik.values.customerId}
              IconComponent={() => <ExpandMore />}
              disabled={!props.formik.values.cityId}
            >
              <MenuItem value={""} disabled>
                Select customer
              </MenuItem>
              {state?.customer?.loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state.customer?.customers?.rows?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.customerId &&
                props.formik.errors.customerId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Cargo Type</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("cargoTypeId")}
              value={props.formik.values.cargoTypeId}
              IconComponent={() => <ExpandMore />}
              disabled={[
                "Transfer",
                "Interstate",
                "Ad-Hoc",
                "Airside",
                "Metro",
                "Empty",
              ].includes(props.formik.values.jobTypeLabel)}
            >
              <MenuItem value={""} disabled>
                Select Cargo Type
              </MenuItem>
              {state?.common?.loadingCargoType ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                state?.common?.cargoTypeData?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText className="error-text">
              {props.formik.touched.cargoTypeId &&
                props.formik.errors.cargoTypeId}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-gourp">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Assign Driver</label>
            <Select
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              onChange={props.formik.handleChange("driverId")}
              value={props.formik.values.driverId}
              IconComponent={() => <ExpandMore />}
              disabled={props.isEdit}
              // disabled={
              //   ["Assigned", "Not Assigned", "Rejected"].includes(
              //     props.jobsData?.jobStatuses?.name
              //   ) || !props.formik.values.cityId
              // }
            >
              <MenuItem value={""}>Select Driver</MenuItem>
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
              {props.formik.touched.driverId && props.formik.errors.driverId}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        {props.isEdit && (
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="weight">
                Total weight (kg)
              </label>
              <TextField
                id="weight"
                placeholder="1000"
                variant="outlined"
                type="text"
                onKeyPress={allowOnlyNumbers}
                onChange={props.formik.handleChange("weight")}
                value={props.formik.values.weight}
                disabled
              />
            </FormControl>
          </div>
        )}
        {([0, "Empty"].includes(props.formik.values.jobTypeLabel) ||
          props.isEdit) && (
          <div className="form-gourp">
            <FormControl variant="outlined" className={classes.formControl}>
              <label className="label-text" htmlFor="quantity">
                Quantity
              </label>
              <TextField
                id="quantity"
                placeholder="Quantity"
                variant="outlined"
                type="text"
                onKeyPress={allowOnlyNumbers}
                onChange={props.formik.handleChange("quantity")}
                value={props.formik.values.quantity}
                disabled={
                  ![0, "Empty"].includes(props.formik.values.jobTypeLabel)
                }
                error={
                  props.formik.touched.quantity &&
                  Boolean(props.formik.errors.quantity)
                }
                helperText={
                  props.formik.touched.quantity && props.formik.errors.quantity
                }
              />
            </FormControl>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;
