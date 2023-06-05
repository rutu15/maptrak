import React from "react";
import { FormControl, TextField } from "@material-ui/core";

import {
  allowOnlyNumbers,
  allowSomeSpecialChar,
  awbNumberValidation,
  allowOnlyFloat,
} from "@utils/commonFunctions";
import { AddAirWayBillStyle } from "../style";

function Detail(props) {
  const classes = AddAirWayBillStyle();
  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="bill-number">
              Air waybill number
            </label>
            <TextField
              id="number"
              placeholder="Air waybill number"
              variant="outlined"
              type="text"
              onKeyPress={awbNumberValidation}
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
            <label className="label-text" htmlFor="airline">
              Airline
            </label>
            <TextField
              id="flight"
              placeholder="Airline"
              variant="outlined"
              type="text"
              onChange={props.formik.handleChange}
              value={props.formik.values.flight}
              onKeyPress={allowSomeSpecialChar}
              error={
                props.formik.touched.flight &&
                Boolean(props.formik.errors.flight)
              }
              helperText={
                props.formik.touched.flight && props.formik.errors.flight
              }
            />
          </FormControl>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text" htmlFor="weight">
              Total weight (kg)
            </label>
            <TextField
              id="weight"
              placeholder="Weight"
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
            <label className="label-text" htmlFor="Quantity">
              Total Quantity
            </label>
            <TextField
              id="quantity"
              placeholder="Quantity"
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
    </>
  );
}

export default Detail;
