import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useFormik } from "formik";

import {
  FETCH_CUSTOMER_ADDRESS,
  FETCH_CUSTOMER_ADDRESS_SUCCESS,
  FETCH_CUSTOMER_ADDRESS_FAILURE,
  ADD_CUSTOMER_ADDRESS,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  ADD_CUSTOMER_ADDRESS_FAILURE,
  EDIT_CUSTOMER_ADDRESS,
  EDIT_CUSTOMER_ADDRESS_SUCCESS,
  EDIT_CUSTOMER_ADDRESS_FAILURE,
  DELETE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS_SUCCESS,
  DELETE_CUSTOMER_ADDRESS_FAILURE,
} from "@utils/actionTypes";

import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";

import { AddressStyle } from "./style";
import SearchIcon from "@assets/images/search.svg";
import TableListing from "./table-listing";
import AddAddress from "../address/add-address";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";

function Address() {
  const classes = AddressStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteAddress, setDeleteAddress] = useState({});
  const [search, setSearch] = useState("");
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditAddress, setEditAddress] = useState(
    schema.addCustomerAddressSchema
  );
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get list of customer's addresses
  let getAddress = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_CUSTOMER_ADDRESS });
    API.get(`customers/${id}/addresses`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_ADDRESS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_ADDRESS_FAILURE, payload: error });
      });
  };

  // API calling to add customer's address
  let addAddress = (value) => {
    const data = {
      address: value.address,
      latitude: parseFloat(value.latitude),
      longitude: parseFloat(value.longitude),
    };
    dispatch({ type: ADD_CUSTOMER_ADDRESS });
    API.post(`customers/${id}/addresses`, data)
      .then((response) => {
        handleCloseAddPopup();
        getAddress();
        dispatch({
          type: ADD_CUSTOMER_ADDRESS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Address Added Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_CUSTOMER_ADDRESS_FAILURE, payload: error });
      });
  };

  // API calling to edit customer's address
  let editAddress = (value) => {
    const data = {
      address: value.address,
      latitude: parseFloat(value.latitude),
      longitude: parseFloat(value.longitude),
    };
    dispatch({ type: EDIT_CUSTOMER_ADDRESS });
    API.put(`customers/${id}/addresses/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getAddress();
        dispatch({
          type: EDIT_CUSTOMER_ADDRESS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Address Updated Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_CUSTOMER_ADDRESS_FAILURE, payload: error });
      });
  };

  const handleDeletePopup = (address) => {
    setDeleteAddress(address);
    setDeletePopup(true);
  };

  const handleAddPopup = (address) => {
    if (address) {
      setEdit(true);
      setEditAddress(address);
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setEdit(false);
    setOpenAddPopup(false);
    setEditAddress(schema.addCustomerAddressSchema);
    setError("");
    formik.handleReset();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditAddress,
    validationSchema: validationSchema.addCustomerAddressValidationSchema,
    onSubmit: (value) => {
      getEdit ? editAddress(value) : addAddress(value);
    },
  });

  // API calling to delete customer's address
  const handleDelete = () => {
    dispatch({ type: DELETE_CUSTOMER_ADDRESS });
    API.delete(`customers/${id}/addresses/${getDeleteAddress.id}`)
      .then((response) => {
        setDeletePopup(false);
        getAddress();
        dispatch({
          type: DELETE_CUSTOMER_ADDRESS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Address Deleted Successfully");
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
        }
        dispatch({ type: DELETE_CUSTOMER_ADDRESS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getAddress(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  return (
    <div className={classes.addressWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.modalWrapper}>
          <AddAddress
            handleClickOpen={() => handleAddPopup()}
            handleClose={handleCloseAddPopup}
            open={openAddPopup}
            formik={formik}
            isEdit={getEdit}
            error={error}
          />
        </div>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search address"
              variant="outlined"
              type="search"
              InputProps={{
                endAdornment: <img src={SearchIcon} alt="Search" />,
              }}
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <TableListing
        handleOpen={(user) => handleDeletePopup(user)}
        handleEdit={(editAddress) => handleAddPopup(editAddress)}
      />
      <DeletePopup
        open={openDeletePopup}
        handleClose={() => setDeletePopup(false)}
        handleDelete={(deleteAddress) => handleDelete(deleteAddress)}
        deleteUser={getDeleteAddress.address}
        loading={state.customer?.deletingCustomerAddress}
        error={error}
      />
    </div>
  );
}

export default Address;
