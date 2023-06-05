import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import editIcon from "@assets/images/edit.svg";
import {
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  FETCH_PARENT_CUSTOMERS,
  FETCH_PARENT_CUSTOMERS_SUCCESS,
  FETCH_PARENT_CUSTOMERS_FAILURE,
  GET_INVOICING_PERIOD,
  GET_INVOICING_PERIOD_SUCCESS,
  GET_INVOICING_PERIOD_FAILURE,
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  FETCH_CHILD_CUSTOMER,
  FETCH_CHILD_CUSTOMER_SUCCESS,
  FETCH_CHILD_CUSTOMER_FAILURE,
  GET_CUSTOMER_CATEGORIES,
  GET_CUSTOMER_CATEGORIES_SUCCESS,
  GET_CUSTOMER_CATEGORIES_FAILURE,
} from "@utils/actionTypes";
import { uploadImage } from "@utils/commonFunctions";
import validationSchema from "@utils/validationSchemas";
import Popup from "@views/customer-listing/add-customer/popup";
import API from "@services/axios";
import { EditBlockStyle } from "./style";

function EditBlock(props) {
  const classes = EditBlockStyle();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const { id } = useParams();
  const [getId, setId] = useState(id);
  const [state, dispatch] = useStore();

  // Menu data to get list of jobTypes in jobTypes dropdown
  const menuData = [];
  state.customer.viewChildCustomerData?.jobTypes?.map((item) => {
    menuData.push(item.typeId);
    return true;
  });

  // API calling to edit customer
  const editCustomer = (data) => {
    dispatch({ type: EDIT_CUSTOMER });
    API.put(`customers/${getId}`, data)
      .then((response) => {
        dispatch({
          type: EDIT_CUSTOMER_SUCCESS,
          payload: response.data.data,
        });
        handleClose();
        props.getCustomer();
        toast.success("Customer Updated Successfully");
        setImage(null);
      })
      .catch((err) => {
        dispatch({ type: EDIT_CUSTOMER_FAILURE, payload: err });
        setError(err?.response?.data?.message);
        setImage(null);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
    props.getCustomer();
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
    formik.handleReset();
    setId(id);
  };

  // Handle to open child's account popup
  const handleChildOpen = (id) => {
    setId(id);
    setOpen(true);
    dispatch({ type: FETCH_CHILD_CUSTOMER });
    API.get(`customers/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_CHILD_CUSTOMER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CHILD_CUSTOMER_FAILURE, payload: error });
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
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
        ...(!!value.latitude ? { latitude: value.latitude } : {}),
        ...(!!value.longitude ? { longitude: value.longitude } : {}),
        ...(!!value.parentId ? { parentId: value.parentId } : {}),
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
            editCustomer(data);
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
        editCustomer(data);
      }
    },
  });

  // To get prefill data in popup for customer by ID (Parent customer)
  useEffect(() => {
    setData({
      name: state.customer.customerByIdData?.name,
      parentId: state.customer.customerByIdData?.parentCustomer?.id
        ? state.customer.customerByIdData?.parentCustomer?.id
        : "",
      address: state.customer.customerByIdData?.address,
      email: state.customer.customerByIdData?.email,
      phone: state.customer.customerByIdData?.phone,
      status: state.customer.customerByIdData?.status === true ? 1 : 0,
      invoicingPeriodId: state.customer.customerByIdData?.invoicingPeriods?.id,
      logo: "",
      city: state.customer.customerByIdData?.cities?.id,
      latitude: state.customer.customerByIdData?.latitude,
      longitude: state.customer.customerByIdData?.longitude,
      oldCustomerNumber: state.customer.customerByIdData?.oldCustomerNumber
        ? state.customer.customerByIdData?.oldCustomerNumber
        : "",
      customerCategoryId:
        state.customer.customerByIdData?.customerCategories?.id,
      paymentTerms: state.customer.customerByIdData?.paymentTermDays,
      ABN: state.customer.customerByIdData?.ABN,
      postalCode: state.customer.customerByIdData?.postalCode,
    });
  }, [state.customer.customerByIdData]);

  // To get prefill data in popup for child customer
  useEffect(() => {
    setData({
      name: state.customer.viewChildCustomerData?.name,
      parentId: state.customer.viewChildCustomerData?.parentCustomer?.id
        ? state.customer.viewChildCustomerData?.parentCustomer?.id
        : "",
      address: state.customer.viewChildCustomerData?.address,
      email: state.customer.viewChildCustomerData?.email.split(","),
      phone: state.customer.viewChildCustomerData?.phone,
      status: state.customer.viewChildCustomerData?.status === true ? 1 : 0,
      invoicingPeriodId:
        state.customer.viewChildCustomerData?.invoicingPeriods?.id,
      logo: "",
      city: state.customer.viewChildCustomerData?.cities?.id,
      jobTypeId: menuData,
      latitude: state.customer.viewChildCustomerData?.latitude,
      longitude: state.customer.viewChildCustomerData?.longitude,
      oldCustomerNumber: state.customer.viewChildCustomerData?.oldCustomerNumber
        ? state.customer.viewChildCustomerData?.oldCustomerNumber
        : "",
      customerCategoryId:
        state.customer.viewChildCustomerData?.customerCategories?.id,
      paymentTerms:
        state.customer.viewChildCustomerData?.customerCategories
          ?.paymentTermDays,
      ABN: state.customer.viewChildCustomerData?.ABN,
      postalCode: state.customer.viewChildCustomerData?.postalCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.customer.viewChildCustomerData]);

  // To update parent customer on basis of city
  useEffect(() => {
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

  // API calling to get parent customers by passing parent:0 for dropdown
  useEffect(() => {
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

    if (state.common.citiesData === null) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle image
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

  // To handle address
  const handleChange = (address) => {
    formik.setFieldValue("address", address);
    formik.setFieldValue("latitude", "");
    formik.setFieldValue("longitude", "");
  };

  // To handle latitude and longitude after selecting address
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

  return (
    <div className={classes.EditBlockWrapper}>
      <Loader
        loading={
          !open &&
          (state.customer.loadingCustomerById ||
            state.customer.loadingCustomerAwb ||
            state.customer.importingCustomerAwb ||
            state.customer?.updatingNoteData ||
            state.customer?.loadingNote)
        }
      />
      <div className="white-card edit-block">
        <div className="edit-block-header">
          <div className="inner-heading">
            {state.customer.customerByIdData?.logo && (
              <img src={state.customer.customerByIdData?.logo} alt="Logo" />
            )}
            <p>Customer</p>
            <span>{state.customer.customerByIdData?.name}</span>
          </div>
          <div className="link-block">
            <span title="Edit" onClick={handleClickOpen}>
              <em>
                <img src={editIcon} alt="Edit" />
              </em>
              Edit
            </span>
          </div>
        </div>
        <div className="edit-block-list">
          <ul>
            <li>
              <Typography variant="h6">City</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.cities
                    ? state.customer.customerByIdData?.cities?.name
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Address</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.address
                    ? state.customer.customerByIdData?.address
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Status</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.status === true
                    ? "Active"
                    : "Inactive"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Phone</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.phone
                    ? state.customer.customerByIdData?.phone
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Email</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.email
                    ? state.customer.customerByIdData?.email
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Invoicing period</Typography>
              <div className="value-block">
                <p>
                  {state.customer.customerByIdData?.invoicingPeriods?.name
                    ? state.customer.customerByIdData?.invoicingPeriods?.name
                    : "-"}
                </p>
              </div>
            </li>
          </ul>
        </div>

        {state.customer.customerByIdData?.childCustomer?.length !== 0 && (
          <div className="edit-block-content">
            <Typography variant="h6">Child accounts:</Typography>
            {state.customer.customerByIdData?.childCustomer?.map(
              (item, index) => {
                return (
                  <div className="span-wrapper">
                    <span
                      className={item.status === true ? "active" : "inactive"}
                      key={index}
                      onClick={() => handleChildOpen(item.id)}
                    >
                      {item.name}
                    </span>
                    <p>({item.status === true ? "Active" : "Inactive"})</p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
      <Popup
        formik={formik}
        handleClose={handleClose}
        open={open}
        handleImage={handleImage}
        handleChange={handleChange}
        handleSelect={handleSelect}
        state={state}
        error={error}
        isEdit={true}
      />
    </div>
  );
}

export default EditBlock;
