import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField } from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import {
  UPDATE_MINIMUM_INVOICE_VALUE,
  UPDATE_MINIMUM_INVOICE_VALUE_SUCCESS,
  UPDATE_MINIMUM_INVOICE_VALUE_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { allowOnlyFloatFour } from "@utils/commonFunctions";
import { MinimumInvoiceStyle } from "./style";

function MinimumInvoiceValue(props) {
  const classes = MinimumInvoiceStyle();
  const [state, dispatch] = useStore();
  const [data, setData] = useState(
    state.customer?.customerByIdData?.minimumInvoiceValue
  );
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") setError("Invoice value is required");
    else if (e.target.value > 1000000)
      setError("Invoice value must not be more than 1000000");
    else setError("");
  };

  const handleSubmit = () => {
    if (data === "") setError("Invoice value is required");
    else if (data > 1000000)
      setError("Invoice value must not be more than 1000000");
    else {
      setError("");
      dispatch({
        type: UPDATE_MINIMUM_INVOICE_VALUE,
      });
      API.patch(`customers/${id}/saveData`, {
        minimumInvoiceValue: data === null ? 0 : data,
      })
        .then((response) => {
          dispatch({
            type: UPDATE_MINIMUM_INVOICE_VALUE_SUCCESS,
            payload: response.data.data,
          });
          toast.success("Invoice Value Updated Successfully");
          props.getCustomer();
        })
        .catch((error) => {
          dispatch({
            type: UPDATE_MINIMUM_INVOICE_VALUE_FAILURE,
            payload: error,
          });
          toast.error(error?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div className={classes.MinimumInvoiceWrapper}>
        <label className="label-text">
          Weekly Minimum Invoice
          <span className="normal-text">
            {"  "}(Note: Amount will only be charge if greater than 0)
          </span>
        </label>

        <div className="weekly-row-wrapper">
          <Loader loading={state?.customer?.updatingMinimumInvoiceValue} />
          <div className="weekly-row">
            <label className="label-text">Amount</label>
            <div className="textfield-wrapper1">
              <TextField
                id="invoiceValue"
                name="invoiceValue"
                variant="outlined"
                type="text"
                className="invoiceValue"
                placeholder="Amount"
                onKeyPress={allowOnlyFloatFour}
                value={data === null ? 0 : data}
                onChange={handleChange}
                error={true}
                helperText={error}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        <Button
          className="blue-btn primary-btn"
          color="inherit"
          disableElevation
          underlinenone="true"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}
export default MinimumInvoiceValue;
