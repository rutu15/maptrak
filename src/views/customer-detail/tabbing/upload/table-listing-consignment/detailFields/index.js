import React, { useState } from "react";
import { FormControl, TextField } from "@material-ui/core";
import {
  allowOnlyFloat,
  allowAlphaNumeric,
  allowOnlyNumbers,
} from "@utils/commonFunctions";
import { AddConsignmentStyle } from "../style";

function DetailsFields(props) {
  const classes = AddConsignmentStyle();

  const [number, setNumber] = useState();
  const [weight, setWeight] = useState();
  const [quantity, setQuantity] = useState();

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
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              // error={
              //   props.formik.touched.weight &&
              //   Boolean(props.formik.errors.weight)
              // }
              // helperText={
              //   props.formik.touched.weight && props.formik.errors.weight
              // }
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
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              // error={
              //   props.formik.touched.quantity &&
              //   Boolean(props.formik.errors.quantity)
              // }
              // helperText={
              //   props.formik.touched.quantity && props.formik.errors.quantity
              // }
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
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              // error={
              //   props.formik.touched.number &&
              //   Boolean(props.formik.errors.number)
              // }
              // helperText={
              //   props.formik.touched.number && props.formik.errors.number
              // }
            />
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default DetailsFields;
