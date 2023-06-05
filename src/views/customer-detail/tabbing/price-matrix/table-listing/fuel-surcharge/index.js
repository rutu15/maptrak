import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField } from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import {
  UPDATE_FUEL_SURCHARGE,
  UPDATE_FUEL_SURCHARGE_SUCCESS,
  UPDATE_FUEL_SURCHARGE_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { allowOnlyFloat } from "@utils/commonFunctions";
import { FuelSurchargeStyle } from "./style";

function PriceMatrix(props) {
  const classes = FuelSurchargeStyle();
  const [state, dispatch] = useStore();
  // Note: Get fuel surcharge should be taken from customerByID data
  const [data, setData] = useState(
    state.customer?.customerByIdData?.fuelSurcharge
  );
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") setError("Fuel surcharge is required");
    else if (e.target.value > 1000000)
      setError("Fuel surcharge must not be more than 1000000");
    else setError("");
  };

  // Update fuel surcharge and validation for fuel surcharge
  const handleSubmit = () => {
    if (data === "") setError("Fuel surcharge is required");
    else if (data > 1000000)
      setError("Fuel surcharge must not be more than 1000000");
    else {
      setError("");
      dispatch({
        type: UPDATE_FUEL_SURCHARGE,
      });
      API.patch(`customers/${id}/saveData`, {
        fuelSurcharge: data === null ? 0 : data,
      })
        .then((response) => {
          dispatch({
            type: UPDATE_FUEL_SURCHARGE_SUCCESS,
            payload: response.data.data,
          });
          toast.success("Fuel Surcharge Updated Successfully");
          props.getCustomer();
        })
        .catch((error) => {
          dispatch({ type: UPDATE_FUEL_SURCHARGE_FAILURE, payload: error });
          toast.error(error?.response?.data?.message);
        });
    }
  };
  return (
    <>
      <div className={classes.FuelSurchargeWrapper}>
        <div className="weekly-row-wrapper">
          <Loader loading={state?.customer?.updatingFuelSurcharge} />
          <div className="weekly-row">
            <label className="label-text">Fuel Surcharge (%) </label>
            <div className="textfield-wrapper1">
              <TextField
                id="fuel"
                name="fuel"
                className="fuel"
                variant="outlined"
                type="text"
                placeholder="Charge"
                onKeyPress={allowOnlyFloat}
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
export default PriceMatrix;
