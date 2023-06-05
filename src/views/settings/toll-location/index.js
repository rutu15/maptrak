import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, TextField } from "@material-ui/core";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_TOLL_LOCATION,
  FETCH_TOLL_LOCATION_SUCCESS,
  FETCH_TOLL_LOCATION_FAILURE,
  ADD_TOLL_LOCATION,
  ADD_TOLL_LOCATION_SUCCESS,
  ADD_TOLL_LOCATION_FAILURE,
  EDIT_TOLL_LOCATION,
  EDIT_TOLL_LOCATION_SUCCESS,
  EDIT_TOLL_LOCATION_FAILURE,
  DELETE_TOLL_LOCATION,
  DELETE_TOLL_LOCATION_SUCCESS,
  DELETE_TOLL_LOCATION_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import { rowsPerPageVal } from "@utils/constant";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddToll from "./add-toll";
import { TollLocationStyle } from "./style";

function TollLocation() {
  const classes = TollLocationStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteToll, setDeleteToll] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditToll, setEditToll] = useState(schema.addTollSchema);
  const [getEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [search, setSearch] = useState("");
  const [state, dispatch] = useStore();
  const [err, setError] = useState("");

  // API calling to get list of toll locations
  let getTollLocationsData = () => {
    const params = {
      ...(!!search ? { search } : {}),
      page: page + 1,
      size: rowsPerPage,
    };
    dispatch({ type: FETCH_TOLL_LOCATION });
    API.get("tollLocations", { params })
      .then((response) => {
        dispatch({
          type: FETCH_TOLL_LOCATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_TOLL_LOCATION_FAILURE, payload: err });
      });
  };

  // API calling to add toll location
  let addTollLocation = (value) => {
    const data = {
      address: value.address,
      latitude: value.latitude,
      longitude: value.longitude,
      price: parseFloat(value.cost),
    };
    dispatch({ type: ADD_TOLL_LOCATION });
    API.post("tollLocations", data)
      .then((response) => {
        handleCloseAddPopup();
        getTollLocationsData();
        toast.success("Toll Added Successfully");
        dispatch({
          type: ADD_TOLL_LOCATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: ADD_TOLL_LOCATION_FAILURE, payload: error });
      });
  };

  // API calling to edit toll location
  let editTollLocation = (value) => {
    const data = {
      address: value.address,
      latitude: value.latitude,
      longitude: value.longitude,
      price: parseFloat(value.cost),
    };
    dispatch({ type: EDIT_TOLL_LOCATION });
    API.put(`tollLocations/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getTollLocationsData();
        toast.success("Toll Edited Successfully");
        dispatch({
          type: EDIT_TOLL_LOCATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: EDIT_TOLL_LOCATION_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getTollLocationsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useDebouncedEffect(() => getTollLocationsData(), 1000, [search]);

  const handleDeletePopup = (user) => {
    setDeleteToll(user);
    setDeletePopup(true);
    setError("");
  };

  const handleAddPopup = (user) => {
    if (user) {
      const data = {
        id: user.id,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
        cost: user.price,
      };
      setEdit(true);
      setEditToll(data);
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditToll(schema.addTollSchema);
    setError("");
    formik.handleReset();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditToll,
    validationSchema: validationSchema.addTollValidationSchema,
    onSubmit: (value) => {
      getEdit ? editTollLocation(value) : addTollLocation(value);
    },
  });

  // API calling to delete toll location
  const handleDelete = () => {
    dispatch({ type: DELETE_TOLL_LOCATION });
    API.delete(`tollLocations/${getDeleteToll.id}`)
      .then((response) => {
        setDeletePopup(false);
        getTollLocationsData();
        toast.success("Toll Deleted Successfully");
        dispatch({
          type: DELETE_TOLL_LOCATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        setError("You can't delete this record");
        dispatch({ type: DELETE_TOLL_LOCATION_FAILURE, payload: error });
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  return (
    <>
      <Header />
      <div className={classes.TollLocationWrapper}>
        <div className="setting-page wrapper">
          <div className="inner-page">
            <Typography variant="h1">Settings</Typography>
            <div className="setting-row-wrapper">
              <div className="left-sidebar">
                <ProfileSideBar />
              </div>
              <div className="right-content">
                <div className="white-card right-content-inner">
                  <div className="truck-page-outer">
                    <div className={classes.innerPageTopBlock}>
                      <div className="left-block">
                        <Typography variant="h1">Toll Locations</Typography>
                      </div>
                      <div className="right-block">
                        <div className="right-block-inner">
                          <div className="search-wrapper">
                            <div className="form-gourp">
                              <TextField
                                id="search-request"
                                placeholder="Search toll"
                                variant="outlined"
                                type="search"
                                InputProps={{
                                  endAdornment: (
                                    <img src={SearchIcon} alt="Search" />
                                  ),
                                }}
                                onChange={handleSearch}
                                value={search}
                              />
                            </div>
                          </div>
                          <div className="modal-wrapper">
                            <div className="btn-wrapper">
                              <AddToll
                                handleClickOpen={() => handleAddPopup()}
                                handleClose={handleCloseAddPopup}
                                open={openAddPopup}
                                formik={formik}
                                isEdit={getEdit}
                                error={err}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TableListing
                      page={page}
                      handleOpen={(toll) => handleDeletePopup(toll)}
                      handleEdit={(editToll) => handleAddPopup(editToll)}
                      rowsPerPage={rowsPerPage}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      handleChangePage={handleChangePage}
                    />
                    <DeletePopup
                      open={openDeletePopup}
                      handleClose={() => setDeletePopup(false)}
                      handleDelete={(deleteUser) => handleDelete(deleteUser)}
                      loading={state.tollLocation?.deletingTollLocation}
                      error={err}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TollLocation;
