import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import DeletePopup from "@components/deletePopup";
import validationSchema from "@utils/validationSchemas";
import { routes } from "@utils/constant";
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
  EDIT_JOB,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_FAILURE,
  REVIEW_JOBS,
  REVIEW_JOBS_SUCCESS,
  REVIEW_JOBS_FAILURE,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
} from "@utils/actionTypes";
import Popup from "@views/job-listing/create-job/popup";
import API from "@services/axios";
import EditView from "./form";
import { EditBlockStyle } from "./style";

function EditBlock(props) {
  const classes = EditBlockStyle();
  const [open, setOpen] = useState(false);
  const [isClick, setClick] = useState(false);
  const [error, setError] = useState("");
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [state, dispatch] = useStore();
  const { id } = useParams();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    formik.handleReset();
  };
  const handleClose = () => {
    setOpen(false);
    formik.handleReset();
    setError("");
  };

  // To handle location fields
  const handleChange = (address, type) => {
    type === "pickUpLocation"
      ? formik.setFieldValue("pickUpLocation", address)
      : formik.setFieldValue("dropOffLocation", address);
  };

  // To handle lat/long and address while selecting address from google place API.
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

  const handleDelete = () => {
    setDeletePopup(false);
    dispatch({ type: DELETE_JOB });
    API.delete(`/jobs/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_JOB_SUCCESS,
        });
        history.push(routes.jobListing);
        toast.success("Job Deleted Successfully");
      })
      .catch((error) => {
        dispatch({ type: DELETE_JOB_FAILURE });
        toast.error(error?.response?.data?.message);
      });
  };

  const handleDeletePopup = () => {
    setDeletePopup(true);
  };
  // Initilizing value of popup on basis of different conditions
  // API calling to update job
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      requesterName: props.jobsData?.requesterName
        ? props.jobsData?.requesterName
        : "",
      cityId: props.jobsData?.cities ? props.jobsData?.cities.id : "",
      customerId: props.jobsData?.customers ? props.jobsData?.customers.id : "",
      jobTypeId: props.jobsData?.jobTypes ? props.jobsData?.jobTypes.id : "",
      jobTypeLabel: props.jobsData?.jobTypes
        ? props.jobsData?.jobTypes.name
        : "",
      cargoTypeId: props.jobsData?.cargoTypes
        ? props.jobsData?.cargoTypes.id
        : "",
      driverId: props.jobsData?.drivers ? props.jobsData?.drivers.id : "",
      pickUpLocation:
        props.jobsData?.jobTypes?.name === "Import" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "1")
          ? ""
          : props.jobsData?.pickUpLocation,
      pickUpLatitude:
        props.jobsData?.jobTypes?.name === "Import" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "1")
          ? ""
          : props.jobsData?.pickUpLatitude,
      pickUpLongitude:
        props.jobsData?.jobTypes?.name === "Import" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "1")
          ? ""
          : props.jobsData?.pickUpLongitude,
      pickUpCustomerAddressId: props.jobsData?.pickUpCustomerAddressId
        ? props.jobsData?.pickUpCustomerAddressId
        : "",
      dropOffLocation:
        props.jobsData?.jobTypes?.name === "Export" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "2")
          ? ""
          : props.jobsData?.dropOffLocation,
      dropOffLatitude:
        props.jobsData?.jobTypes?.name === "Export" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "2")
          ? ""
          : props.jobsData?.dropOffLatitude,
      dropOffLongitude:
        props.jobsData?.jobTypes?.name === "Export" ||
        (props.jobsData?.jobTypes?.name === "Empty" &&
          props.jobsData?.ctoType === "2")
          ? ""
          : props.jobsData?.dropOffLongitude,
      dropOffCustomerAddressId: props.jobsData?.dropOffCustomerAddressId
        ? props.jobsData?.dropOffCustomerAddressId
        : "",
      description: props.jobsData?.description
        ? props.jobsData?.description
        : "",
      ctoId: props.jobsData?.ctos ? props.jobsData?.ctos.id : "",
      weight: props.jobsData?.weight ? props.jobsData?.weight : 0,
      quantity: props.jobsData?.quantity ? props.jobsData?.quantity : 0,
      radioType: props.jobsData?.ctoType === "1" ? "pickUp" : "dropOff",
    },
    validationSchema: validationSchema.createJobValidationSchema,
    onSubmit: (value) => {
      let data = {
        customerId: value.customerId,
        jobTypeId: value.jobTypeId,
        cityId: value.cityId,
        pickUpLocation: value.pickUpLocation
          ? value.pickUpLocation
          : (value.ctoId &&
              value.jobTypeLabel === "Empty" &&
              value.radioType === "pickUp") ||
            value.jobTypeLabel === "Import"
          ? value.ctoData?.location
            ? value.ctoData?.location
            : props.jobsData?.pickUpLocation
          : "",
        pickUpLatitude: value.pickUpLatitude
          ? value.pickUpLatitude
          : value.ctoId
          ? value.ctoData?.latitude
            ? value.ctoData?.latitude
            : props.jobsData?.pickUpLatitude
          : "",
        pickUpLongitude: value.pickUpLongitude
          ? value.pickUpLongitude
          : value.ctoId
          ? value.ctoData?.longitude
            ? value.ctoData?.longitude
            : props.jobsData?.pickUpLongitude
          : "",
        dropOffLocation: value.dropOffLocation
          ? value.dropOffLocation
          : (value.ctoId &&
              value.jobTypeLabel === "Empty" &&
              value.radioType === "dropOff") ||
            value.jobTypeLabel === "Export"
          ? value.ctoData?.location
            ? value.ctoData?.location
            : props.jobsData?.dropOffLocation
          : "",
        dropOffLatitude: value.dropOffLatitude
          ? value.dropOffLatitude
          : value.ctoId
          ? value.ctoData?.latitude
            ? value.ctoData?.latitude
            : props.jobsData?.dropOffLatitude
          : "",
        dropOffLongitude: value.dropOffLongitude
          ? value.dropOffLongitude
          : value.ctoId
          ? value.ctoData?.longitude
            ? value.ctoData?.longitude
            : props.jobsData?.dropOffLongitude
          : "",
      };
      data = {
        ...data,
        ...(!!value.requesterName
          ? { requesterName: value.requesterName }
          : {}),
        ...(!!value.radioType
          ? { ctoType: value.radioType === "pickUp" ? "1" : "2" }
          : {}),
        ...(!!value.cargoTypeId ? { cargoTypeId: value.cargoTypeId } : {}),
        ...(!!value.description ? { description: value.description } : {}),
        ...(!!value.ctoId ? { ctoId: value.ctoId } : {}),
        ...(!!value.driverId ? { driverId: value.driverId } : {}),
        ...(!!value.pickUpCustomerAddressId
          ? { pickUpCustomerAddressId: value.pickUpCustomerAddressId }
          : {}),
        ...(!!value.dropOffCustomerAddressId
          ? { dropOffCustomerAddressId: value.dropOffCustomerAddressId }
          : {}),
        ...(!!value.quantity && value.jobTypeLabel === "Empty"
          ? { quantity: value.quantity }
          : {}),
      };
      if (!data.pickUpLocation) data.pickUpLocation = value.ctoData?.location;
      if (!data.pickUpLatitude) data.pickUpLatitude = value.ctoData?.latitude;
      if (!data.pickUpLongitude)
        data.pickUpLongitude = value.ctoData?.longitude;
      if (!data.dropOffLocation) data.dropOffLocation = value.ctoData?.location;
      if (!data.dropOffLatitude) data.dropOffLatitude = value.ctoData?.latitude;
      if (!data.dropOffLongitude)
        data.dropOffLongitude = value.ctoData?.longitude;
      dispatch({ type: EDIT_JOB });
      API.put(`jobs/${id}`, data)
        .then((response) => {
          dispatch({
            type: EDIT_JOB_SUCCESS,
            payload: response.data.data,
          });
          // props.setJobName(value.jobTypeLabel);
          handleClose();
          props.getJobs();
          toast.success("Job Updated Successfully");
        })
        .catch((err) => {
          dispatch({ type: EDIT_JOB_FAILURE, payload: err });
          setError(err?.response?.data?.message);
        });
    },
  });

  useEffect(() => {
    if (formik.values.customerId !== props.jobsData?.customers?.id) {
      formik.setFieldValue("dropOffLocation", "");
      formik.setFieldValue("pickUpLocation", "");
      formik.setFieldValue("pickUpCustomerAddressId", "");
      formik.setFieldValue("dropOffCustomerAddressId", "");
    }
    // eslint-disable-next-line
  }, [formik.values.customerId]);

  useEffect(() => {
    if (formik.values.jobTypeLabel === "Empty") {
      if (formik.values.radioType === "pickUp") {
        formik.setFieldValue("pickUpLocation", "");
        formik.setFieldValue("pickUpLongitude", "");
        formik.setFieldValue("pickUpLatitude", "");
        formik.setFieldValue("pickUpCustomerAddressId", "");
      }
      if (formik.values.radioType === "dropOff") {
        formik.setFieldValue("dropOffLocation", "");
        formik.setFieldValue("dropOffLongitude", "");
        formik.setFieldValue("dropOffLatitude", "");
        formik.setFieldValue("dropOffCustomerAddressId", "");
      }
    }

    // eslint-disable-next-line
  }, [formik.values.radioType]);

  useEffect(() => {
    formik.setFieldValue("radioType", "");
    formik.setFieldValue("quantity", 0);
    if (
      ["Metro", "Airside", "Ad-Hoc", "Transfer", "Interstate"].includes(
        formik.values.jobTypeLabel
      )
    ) {
      formik.setFieldValue("cargoTypeId", "");
    } else {
      formik.setFieldValue(
        "cargoTypeId",
        props.jobsData?.cargoTypes?.id ? props.jobsData?.cargoTypes?.id : ""
      );
    }
    if (formik.values.jobTypeLabel === "Empty") {
      formik.setFieldValue(
        "cargoTypeId",
        state?.common?.cargoTypeData?.find((item) => item.name === "ULD").id
      );
    }

    formik.setFieldValue("ctoId", "");
    if (
      ["Export", "Metro", "Ad-Hoc", "Empty"].includes(
        formik.values.jobTypeLabel
      ) ||
      (["Export", "Metro", "Ad-Hoc"].includes(props.jobsData?.jobTypes?.name) &&
        !props.jobsData?.ctos?.id)
    ) {
      formik.setFieldValue("dropOffCustomerAddressId", "");
      formik.setFieldValue("dropOffLocation", "");
      formik.setFieldValue("dropOffLongitude", "");
      formik.setFieldValue("dropOffLatitude", "");
    }
    if (
      ["Import", "Metro", "Ad-Hoc", "Empty"].includes(
        formik.values.jobTypeLabel
      ) ||
      (["Import", "Metro", "Ad-Hoc"].includes(props.jobsData?.jobTypes?.name) &&
        !props.jobsData?.ctos?.id)
    ) {
      formik.setFieldValue("pickUpCustomerAddressId", "");
      formik.setFieldValue("pickUpLocation", "");
      formik.setFieldValue("pickUpLongitude", "");
      formik.setFieldValue("pickUpLatitude", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.jobTypeLabel]);

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formik.values.customerId && open) {
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
  }, [formik.values.customerId, open]);

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
          filter: { parent: 0, active: true, cityId: formik.values.cityId },
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
  const handleReview = () => {
    dispatch({ type: REVIEW_JOBS });
    API.put("jobs/reviewCompleted", { jobIds: [id] })
      .then((response) => {
        dispatch({
          type: REVIEW_JOBS_SUCCESS,
          payload: response.data.data,
        });
        setClick(true);
      })
      .catch((error) => {
        dispatch({ type: REVIEW_JOBS_FAILURE, payload: error });
      });
  };
  return (
    <div className={classes.EditBlockWrapper}>
      <Loader
        loading={
          props.loadingJobs ||
          state.job?.loadingJobConsignment ||
          state.job?.loadingAirWayBill ||
          state.job?.reviewingJobs ||
          state.job?.deletingJob
        }
      />
      <EditView
        handleDeletePopup={handleDeletePopup}
        handleClickOpen={handleClickOpen}
        handleReview={handleReview}
        isClick={isClick}
        jobsData={props.jobsData}
        getJobs={props.getJobs}
      />
      <DeletePopup
        open={openDeletePopup}
        handleClose={() => setDeletePopup(false)}
        handleDelete={() => handleDelete(id)}
        deleteUser={`Job Id ${id}`}
      />
      <Popup
        open={open}
        handleClose={handleClose}
        formik={formik}
        isEdit={true}
        handleChange={handleChange}
        handleSelect={handleSelect}
        error={error}
      />
    </div>
  );
}
export default EditBlock;
