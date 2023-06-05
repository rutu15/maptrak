import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";

import UploadImage from "@assets/images/upload.svg";
import {
  allowOnlyFloat,
  allowAlphaNumeric,
  allowOnlyNumbers,
} from "@utils/commonFunctions";
import { AddConsignmentStyle } from "../style";

function DetailsFields(props) {
  const classes = AddConsignmentStyle();

  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="totalWeight">
              Total Weight
            </label>
            <TextField
              id="weight"
              placeholder="Total weight"
              variant="outlined"
              type="text"
              onKeyPress={allowOnlyFloat}
              onChange={props.formik.handleChange}
              value={props.formik.values.weight}
              error={
                props.formik.touched.weight &&
                Boolean(props.formik.errors.weight)
              }
              helperText={
                props.formik.touched.weight && props.formik.errors.weight
              }
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="totalQuantity">
              Total Quantity
            </label>
            <TextField
              id="quantity"
              placeholder="Total quantity"
              variant="outlined"
              type="text"
              onKeyPress={allowOnlyNumbers}
              onChange={props.formik.handleChange}
              value={props.formik.values.quantity}
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
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="consignment-no">
              Consignment No
            </label>
            <TextField
              id="number"
              placeholder="Consignment number"
              variant="outlined"
              type="text"
              onKeyPress={allowAlphaNumeric}
              onChange={props.formik.handleChange}
              value={props.formik.values.number}
              error={
                props.formik.touched.number &&
                Boolean(props.formik.errors.number)
              }
              helperText={
                props.formik.touched.number && props.formik.errors.number
              }
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="photo">
              Photo
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
            <FormHelperText className="error-text">
              {props.formik.touched.photo && props.formik.errors.photo}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default DetailsFields;
