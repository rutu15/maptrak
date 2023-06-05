import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  GET_CARGO_TYPE,
  GET_CARGO_TYPE_SUCCESS,
  GET_CARGO_TYPE_FAILURE,
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  FETCH_CUSTOMER_ADDRESS,
  FETCH_CUSTOMER_ADDRESS_SUCCESS,
  FETCH_CUSTOMER_ADDRESS_FAILURE,
  GET_CTOS,
  GET_CTOS_SUCCESS,
  GET_CTOS_FAILURE,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
} from "@utils/actionTypes";
import { routes } from "@utils/constant";
import API from "@services/axios";
import Popup from "./popup";
import { CreateJobStyle } from "./style";

function CreateJob(props) {
  const classes = CreateJobStyle();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();
  const history = useHistory();

  // API calling to add job
  const formik = useFormik({
    initialValues: schema.createJobSchema,
    validationSchema: validationSchema.createJobValidationSchema,
    onSubmit: (value) => {
      let data = {
        customerId: value.customerId,
        jobTypeId: value.jobTypeId,
        cityId: value.cityId,
        pickUpLocation: value.pickUpLocation,
        pickUpLatitude: value.pickUpLatitude,
        pickUpLongitude: value.pickUpLongitude,
        dropOffLocation: value.dropOffLocation,
        dropOffLatitude: value.dropOffLatitude,
        dropOffLongitude: value.dropOffLongitude,
      };
      data = {
        ...data,
        ...(!!value.requesterName
          ? { requesterName: value.requesterName }
          : {}),
        ...(!!value.cargoTypeId ? { cargoTypeId: value.cargoTypeId } : {}),
        ...(!!value.radioType
          ? { ctoType: value.radioType === "pickUp" ? "1" : "2" }
          : {}),
        ...(!!value.description ? { description: value.description } : {}),
        ...(!!value.ctoId ? { ctoId: value.ctoId } : {}),
        ...(!!value.driverId ? { driverId: value.driverId } : {}),
        ...(!!value.pickUpCustomerAddressId
          ? { pickUpCustomerAddressId: value.pickUpCustomerAddressId }
          : {}),
        ...(!!value.dropOffCustomerAddressId
          ? { dropOffCustomerAddressId: value.dropOffCustomerAddressId }
          : {}),
        ...(!!value.quantity ? { quantity: value.quantity } : {}),
      };
      if (!data.pickUpLocation)
        data.pickUpLocation = formik.values.ctoData.location;
      if (!data.pickUpLatitude)
        data.pickUpLatitude = formik.values.ctoData.latitude;
      if (!data.pickUpLongitude)
        data.pickUpLongitude = formik.values.ctoData.longitude;
      if (!data.dropOffLocation)
        data.dropOffLocation = formik.values.ctoData.location;
      if (!data.dropOffLatitude)
        data.dropOffLatitude = formik.values.ctoData.latitude;
      if (!data.dropOffLongitude)
        data.dropOffLongitude = formik.values.ctoData.longitude;

      dispatch({ type: CREATE_JOB });
      API.post("jobs", data)
        .then((response) => {
          dispatch({
            type: CREATE_JOB_SUCCESS,
            payload: response.data.data,
          });
          history.push(`${routes.jobDetail}/${response?.data?.data?.id}`);

          handleClose();
          toast.success("Job Created SuccessFully");
        })
        .catch((error) => {
          dispatch({ type: CREATE_JOB_FAILURE, payload: error });
          setError(error.response.data.message);
        });
    },
  });

  // Render cargo type on basis of jobType
  useEffect(() => {
    formik.setFieldValue("ctoId", "");
    formik.setFieldValue("radioType", "");
    formik.setFieldValue("quantity", 0);
    if (
      ["Metro", "Airside", "Ad-Hoc", "Transfer", "Interstate"].includes(
        formik.values.jobTypeLabel
      )
    ) {
      formik.setFieldValue("cargoTypeId", "");
    }
    if (formik.values.jobTypeLabel === "Empty") {
      formik.setFieldValue(
        "cargoTypeId",
        state?.common?.cargoTypeData?.find((item) => item.name === "ULD").id
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.jobTypeLabel]);

  // API calling when create job popup opens
  useEffect(() => {
    if (open) {
      if (state?.common?.countriesData === null) {
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

      if (state?.common?.jobTypeData === null) {
        dispatch({ type: GET_JOBTYPES });
        API.get("master/jobTypes")
          .then((response) => {
            dispatch({
              type: GET_JOBTYPES_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_JOBTYPES_FAILURE, payload: error });
          });
      }

      if (state?.common?.cargoTypeData === null) {
        dispatch({ type: GET_CARGO_TYPE });
        API.get("master/cargoTypes")
          .then((response) => {
            dispatch({
              type: GET_CARGO_TYPE_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_CARGO_TYPE_FAILURE, payload: error });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // API calling to get customer addresses of selected address
  useEffect(() => {
    if (formik.values.customerId) {
      dispatch({ type: FETCH_CUSTOMER_ADDRESS });
      API.get(`customers/${formik.values.customerId}/addresses`)
        .then((response) => {
          dispatch({
            type: FETCH_CUSTOMER_ADDRESS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_CUSTOMER_ADDRESS_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.customerId]);

  // API calling to get list of cities
  useEffect(() => {
    if (formik.values.cityId) {
      formik.setFieldValue("driverId", "");
      formik.setFieldValue("customerId", "");
      const params = {
        cityId: formik.values.cityId,
      };
      dispatch({ type: GET_CTOS });
      API.get("master/ctos", { params })
        .then((response) => {
          dispatch({
            type: GET_CTOS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_CTOS_FAILURE, payload: error });
        });

      dispatch({ type: FETCH_DRIVERS });
      API.get("drivers", {
        params: {
          order: "ASC",
          orderBy: "driverName",
          filter: {
            parent: 0,
            active: true,
            cityId: formik.values.cityId,
          },
        },
      })
        .then((response) => {
          dispatch({
            type: FETCH_DRIVERS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_DRIVERS_FAILURE, payload: error });
        });

      dispatch({ type: FETCH_CUSTOMERS });
      API.get("customers", {
        params: {
          orderBy: "name",
          order: "asc",
          filter: { parent: 0, status: true, cityId: formik.values.cityId },
        },
      })
        .then((response) => {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.cityId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.handleReset();
    setError("");
  };

  const handleChange = (address, type) => {
    type === "pickUpLocation"
      ? formik.setFieldValue("pickUpLocation", address)
      : formik.setFieldValue("dropOffLocation", address);
  };

  // Handle lat/long and address of google place api
  const handleSelect = (address, type) => {
    type === "pickUpLocation"
      ? formik.setFieldValue("pickUpLocation", address)
      : formik.setFieldValue("dropOffLocation", address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        return type === "pickUpLocation"
          ? (formik.setFieldValue("pickUpLatitude", latLng.lat),
            formik.setFieldValue("pickUpLongitude", latLng.lng))
          : (formik.setFieldValue("dropOffLatitude", latLng.lat),
            formik.setFieldValue("dropOffLongitude", latLng.lng));
      })
      .catch((error) => console.error("Error", error));
  };

  // Clearing  location fields when jobType updates
  useEffect(() => {
    formik.setFieldValue("dropOffLocation", "");
    formik.setFieldValue("pickUpLocation", "");
    formik.setFieldValue("pickUpCustomerAddressId", "");
    formik.setFieldValue("dropOffCustomerAddressId", "");
    // eslint-disable-next-line
  }, [
    formik.values.jobTypeId,
    formik.values.radioType,
    formik.values.customerId,
  ]);

  return (
    <div className={classes.CreateJobWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        onClick={handleClickOpen}
      >
        + CREATE JOB
      </Button>
      <Popup
        open={open}
        handleClose={handleClose}
        formik={formik}
        handleChange={handleChange}
        handleSelect={handleSelect}
        error={error}
      />
    </div>
  );
}

export default CreateJob;
