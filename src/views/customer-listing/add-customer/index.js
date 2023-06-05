import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  FETCH_PARENT_CUSTOMERS,
  FETCH_PARENT_CUSTOMERS_SUCCESS,
  FETCH_PARENT_CUSTOMERS_FAILURE,
  GET_INVOICING_PERIOD,
  GET_INVOICING_PERIOD_SUCCESS,
  GET_INVOICING_PERIOD_FAILURE,
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  GET_CUSTOMER_CATEGORIES,
  GET_CUSTOMER_CATEGORIES_SUCCESS,
  GET_CUSTOMER_CATEGORIES_FAILURE,
} from "@utils/actionTypes";
import { uploadImage } from "@utils/commonFunctions";
import API from "@services/axios";
import Popup from "./popup";
import { AddCustomerStyle } from "./style";

function AddCustomer(props) {
  const classes = AddCustomerStyle();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();

  // API calling to add customer
  const addCustomer = (data) => {
    dispatch({ type: ADD_CUSTOMER });
    API.post("customers", data)
      .then((response) => {
        dispatch({
          type: ADD_CUSTOMER_SUCCESS,
          payload: response.data.data,
        });
        handleClose();
        props.getCustomer();
        toast.success("Customer added successfully");
        setImage(null);
      })
      .catch((err) => {
        dispatch({ type: ADD_CUSTOMER_FAILURE, payload: err });
        setError(err.response.data.message);
        setImage(null);
      });
  };

  const formik = useFormik({
    initialValues: schema.addCustomerSchema,
    validationSchema: validationSchema.addCustomerValidationSchema,
    onSubmit: (value) => {
      let data = {
        name: value.name,
        address: value.address,
        email: value.email,
        phone: value.phone,
        status: value.status,
        invoicingPeriodId: value.invoicingPeriodId,
        cityId: value.city,
        customerCategoryId: value.customerCategoryId,
        ABN: value.ABN,
      };

      data = {
        ...data,
        ...(!!value.paymentTerms
          ? { paymentTermDays: value.paymentTerms }
          : {}),
        ...(!!value.parentId ? { parentId: value.parentId } : {}),
        ...(!!value.latitude ? { latitude: value.latitude } : {}),
        ...(!!value.longitude ? { longitude: value.longitude } : {}),
        ...(!!value.jobTypeId ? { jobTypeId: value.jobTypeId } : {}),
        ...(!!value.postalCode ? { postalCode: value.postalCode } : {}),
        ...(!!value.oldCustomerNumber
          ? { oldCustomerNumber: value.oldCustomerNumber }
          : {}),
      };
      if (image) {
        dispatch({
          type: IMAGE_UPLOAD,
        });
        uploadImage(image, image.target.files[0]?.type, "customer-logo")
          .then((res) => {
            data = {
              ...data,
              ...(!!res.data.fileName ? { logo: res.data.fileName } : {}),
            };
            addCustomer(data);
            dispatch({
              type: IMAGE_UPLOAD_SUCCESS,
            });
          })
          .catch((err) => {
            dispatch({
              type: IMAGE_UPLOAD_FAILURE,
            });
            toast.error("Image Uploading Failed");
          });
      } else {
        addCustomer(data);
      }
    },
  });
  useEffect(() => {
    if (formik.values.isParent) {
      formik.setFieldValue("parentId", "");
      formik.setFieldValue("email", "");
    } else {
      formik.setFieldValue("address", "");
      formik.setFieldValue("latitude", "");
      formik.setFieldValue("longitude", "");
      formik.setFieldValue("email", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.isParent]);

  useEffect(() => {
    formik.setFieldValue("parentId", "");
    if (open && formik.values.city && !formik.values.isParent) {
      dispatch({ type: FETCH_PARENT_CUSTOMERS });
      API.get("customers", {
        params: {
          order: "asc",
          orderBy: "name",
          filter: { parent: 0, status: true, cityId: formik?.values?.city },
        },
      })
        .then((response) => {
          dispatch({
            type: FETCH_PARENT_CUSTOMERS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_PARENT_CUSTOMERS_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.city, open]);

  useEffect(() => {
    if (open) {
      if (state?.common?.invoicingPeriodData === null) {
        dispatch({ type: GET_INVOICING_PERIOD });
        API.get("master/invoicingPeriods")
          .then((response) => {
            dispatch({
              type: GET_INVOICING_PERIOD_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_INVOICING_PERIOD_FAILURE, payload: error });
          });
      }

      if (state?.common?.customerCategoriesData === null) {
        dispatch({ type: GET_CUSTOMER_CATEGORIES });
        API.get("master/customerCategories")
          .then((response) => {
            dispatch({
              type: GET_CUSTOMER_CATEGORIES_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_CUSTOMER_CATEGORIES_FAILURE, payload: error });
          });
      }
    }
    if (!formik.values.isParent) {
      formik.setFieldValue("email", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (formik.values.parentId) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.parentId]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setError("");
    setOpen(false);
    formik.handleReset();
  };

  // To handle address
  const handleChange = (address) => {
    formik.setFieldValue("address", address);
  };

  // To get latitude and longitude while selecting address
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        formik.setFieldValue("address", address);
        formik.setFieldValue("latitude", latLng.lat);
        formik.setFieldValue("longitude", latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  // Handle Image
  const handleImage = (event, fileName, defaultText) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      document.getElementById(fileName).innerHTML = file.name;
      setImage(event);
      formik.setFieldValue("logo", file);
    } else {
      document.getElementById(fileName).innerHTML = defaultText;
    }
  };

  return (
    <div className={classes.AddCustomerWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={handleClickOpen}
      >
        + Add Customer
      </Button>

      <Popup
        formik={formik}
        handleClose={handleClose}
        open={open}
        handleImage={handleImage}
        handleChange={handleChange}
        handleSelect={handleSelect}
        state={state}
        error={error}
      />
    </div>
  );
}

export default AddCustomer;
