import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  ADD_DRIVER,
  ADD_DRIVER_SUCCESS,
  ADD_DRIVER_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_DRIVER_TYPE,
  GET_DRIVER_TYPE_SUCCESS,
  GET_DRIVER_TYPE_FAILURE,
  GET_ASIC_TYPE,
  GET_ASIC_TYPE_SUCCESS,
  GET_ASIC_TYPE_FAILURE,
  GET_DRIVER_LICENSE_TYPE,
  GET_DRIVER_LICENSE_TYPE_SUCCESS,
  GET_DRIVER_LICENSE_TYPE_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Popup from "./popup";
import { AddDriverStyle } from "./style";

function AddDriver(props) {
  const classes = AddDriverStyle();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();

  useEffect(() => {
    if (open) {
      if (state?.common?.citiesData === null) {
        dispatch({ type: GET_CITIES });
        API.get("master/cities")
          .then((response) => {
            dispatch({
              type: GET_CITIES_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_CITIES_FAILURE, payload: error });
          });
      }

      if (state?.common?.driverTypeData === null) {
        dispatch({ type: GET_DRIVER_TYPE });
        API.get("master/driverTypes")
          .then((response) => {
            dispatch({
              type: GET_DRIVER_TYPE_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_DRIVER_TYPE_FAILURE, payload: error });
          });
      }

      if (state?.common?.asicTypeData === null) {
        dispatch({ type: GET_ASIC_TYPE });
        API.get("master/asicTypes")
          .then((response) => {
            dispatch({
              type: GET_ASIC_TYPE_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_ASIC_TYPE_FAILURE, payload: error });
          });
      }

      if (state?.common?.driverLicenseTypeData === null) {
        dispatch({ type: GET_DRIVER_LICENSE_TYPE });
        API.get("master/licenseTypes")
          .then((response) => {
            dispatch({
              type: GET_DRIVER_LICENSE_TYPE_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_DRIVER_LICENSE_TYPE_FAILURE, payload: error });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setError("");
    setOpen(false);
    formik.handleReset();
  };

  const formik = useFormik({
    initialValues: schema.addDriverSchema,
    validationSchema: validationSchema.addDriverValidationSchema,
    onSubmit: (value) => {
      dispatch({ type: ADD_DRIVER });
      API.post("drivers", value)
        .then((response) => {
          dispatch({
            type: ADD_DRIVER_SUCCESS,
            payload: response.data.data,
          });
          handleClose();
          toast.success("Driver Added Successfully");
          props.getDrivers();
        })
        .catch((err) => {
          dispatch({ type: ADD_DRIVER_FAILURE, payload: err });
          setError(err.response.data.message);
        });
    },
  });

  return (
    <div className={classes.AddDriverWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={handleClickOpen}
      >
        + Add Driver
      </Button>

      <Popup
        formik={formik}
        handleClose={handleClose}
        open={open}
        error={error}
      />
    </div>
  );
}

export default AddDriver;
