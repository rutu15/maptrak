import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typography, TextField } from "@material-ui/core";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import DeletePopup from "@components/deletePopup";
import {
  FETCH_CTO,
  FETCH_CTO_SUCCESS,
  FETCH_CTO_FAILURE,
  ADD_CTO,
  ADD_CTO_SUCCESS,
  ADD_CTO_FAILURE,
  EDIT_CTO,
  EDIT_CTO_SUCCESS,
  EDIT_CTO_FAILURE,
  DELETE_CTO,
  DELETE_CTO_SUCCESS,
  DELETE_CTO_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
} from "@utils/actionTypes";
import SearchIcon from "@assets/images/search.svg";
import { rowsPerPageVal } from "@utils/constant";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { uploadImage } from "@utils/commonFunctions";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddCto from "./add-cto";
import { CtoStyle } from "./style";

function TollLocation() {
  const classes = CtoStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteCto, setDeleteCto] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditCto, setEditCto] = useState(schema.addCTOSchema);
  const [getEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [search, setSearch] = useState("");
  const [err, setError] = useState("");
  const [state, dispatch] = useStore();
  const [image, setImage] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("city");

  // API calling to get list of cities
  let getCto = () => {
    const params = {
      ...(!!search ? { search } : {}),
      page: page + 1,
      size: rowsPerPage,
      ...(!!order ? { order } : {}),
      ...(!!orderBy ? { orderBy } : {}),
    };
    dispatch({ type: FETCH_CTO });
    API.get("/ctos", { params })
      .then((response) => {
        dispatch({
          type: FETCH_CTO_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CTO_FAILURE, payload: error });
      });
  };

  // API calling to add toll location
  let addCto = (value) => {
    dispatch({ type: ADD_CTO });
    API.post("ctos", value)
      .then((response) => {
        handleCloseAddPopup();
        getCto();
        setImage(null);
        toast.success("CTO Added Successfully");
        dispatch({
          type: ADD_CTO_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: ADD_CTO_FAILURE, payload: error });
      });
  };

  // API calling to edit cto
  let editCto = (value) => {
    dispatch({ type: EDIT_CTO });
    API.put(`ctos/${value.id}`, value)
      .then((response) => {
        handleCloseAddPopup();
        getCto();
        setImage(null);
        toast.success("CTO Edited Successfully");
        dispatch({
          type: EDIT_CTO_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: EDIT_CTO_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy]);

  useDebouncedEffect(() => getCto(), 1000, [search]);

  const handleDeletePopup = (user) => {
    setDeleteCto(user);
    setDeletePopup(true);
    setError("");
  };

  const handleAddPopup = (user) => {
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

    if (user) {
      setEdit(true);
      API.get(`ctos/${user.id}`)
        .then((response) => {
          setEditCto({
            id: response?.data?.data?.id,
            name: response?.data?.data?.name,
            cityId: response?.data?.data?.cities?.id,
            location: response?.data?.data?.location,
            latitude: response?.data?.data?.latitude,
            longitude: response?.data?.data?.longitude,
            logo: "",
            viewPhoto: response?.data?.data?.logo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditCto(schema.addCTOSchema);
    setError("");
    formik.handleReset();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditCto,
    validationSchema: getEdit
      ? validationSchema.editCtoValidationSchema
      : validationSchema.addCtoValidationSchema,
    onSubmit: (value) => {
      let data = {
        id: value.id,
        name: value.name,
        cityId: parseInt(value.cityId),
        location: value.location,
        latitude: value.latitude,
        longitude: value.longitude,
      };
      if (image) {
        dispatch({
          type: IMAGE_UPLOAD,
        });
        uploadImage(image, image.target.files[0]?.type, "cto-images")
          .then((res) => {
            data = {
              ...data,
              ...(!!res.data.fileName ? { logo: res.data.fileName } : {}),
            };
            getEdit ? editCto(data) : addCto(data);
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
        editCto(data);
      }
    },
  });

  // API calling to delete toll location
  const handleDelete = () => {
    dispatch({ type: DELETE_CTO });
    API.delete(`ctos/${getDeleteCto.id}`)
      .then((response) => {
        setDeletePopup(false);
        getCto();
        dispatch({
          type: DELETE_CTO_SUCCESS,
        });
        toast.success("CTO Deleted Successfully");
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
        }
        dispatch({ type: DELETE_CTO_FAILURE, payload: error });
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };

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
    <>
      <Header />
      <div className={classes.CtoLocationWrapper}>
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
                        <Typography variant="h1">CTO Management</Typography>
                      </div>
                      <div className="right-block">
                        <div className="right-block-inner">
                          <div className="search-wrapper">
                            <div className="form-gourp">
                              <TextField
                                id="search-request"
                                placeholder="Search CTO"
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
                              <AddCto
                                handleClickOpen={() => handleAddPopup()}
                                handleClose={handleCloseAddPopup}
                                open={openAddPopup}
                                formik={formik}
                                isEdit={getEdit}
                                error={err}
                                handleImage={handleImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TableListing
                      page={page}
                      handleOpen={(cto) => handleDeletePopup(cto)}
                      handleEdit={(editCto) => handleAddPopup(editCto)}
                      rowsPerPage={rowsPerPage}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      handleChangePage={handleChangePage}
                      handleSorting={(e, property) =>
                        handleSorting(e, property)
                      }
                      orderBy={orderBy}
                      order={order}
                    />
                    <DeletePopup
                      open={openDeletePopup}
                      handleClose={() => setDeletePopup(false)}
                      handleDelete={(deleteUser) => handleDelete(deleteUser)}
                      loading={state.cto?.deletingCto}
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
