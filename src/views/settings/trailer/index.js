import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typography, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_TRAILER,
  FETCH_TRAILER_SUCCESS,
  FETCH_TRAILER_FAILURE,
  ADD_TRAILER,
  ADD_TRAILER_SUCCESS,
  ADD_TRAILER_FAILURE,
  EDIT_TRAILER,
  EDIT_TRAILER_SUCCESS,
  EDIT_TRAILER_FAILURE,
  DELETE_TRAILER,
  DELETE_TRAILER_SUCCESS,
  DELETE_TRAILER_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  IMPORT_TRAILER_CSV,
  IMPORT_TRAILER_CSV_SUCCESS,
  IMPORT_TRAILER_CSV_FAILURE,
} from "@utils/actionTypes";
import UploadImage from "@assets/images/blue-upload.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { UploadFile } from "@utils/commonFunctions";
import API from "@services/axios";
import TrailerTable from "./table-listing";
import AddTrailer from "./add-trailer";
import { TrailerStyle } from "./style";

function Trailer() {
  const classes = TrailerStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteTrailer, setDeleteTrailer] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditTrailer, setEditTrailer] = useState(schema.addTrailerSchema);
  const [getEdit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFilename] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [state, dispatch] = useStore();

  // API calling to get list of trailers
  let getTrailerData = () => {
    const params = {
      ...(!!search ? { search } : {}),
      // https://wymap.atlassian.net/browse/MAPTRAK-918 Added sorting on every fields
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
    };
    dispatch({ type: FETCH_TRAILER });
    API.get("trailers", { params })
      .then((response) => {
        dispatch({
          type: FETCH_TRAILER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_TRAILER_FAILURE, payload: err });
      });
  };

  // API calling to get list of cities
  let getCities = () => {
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
  };

  const handleCloseDeletePopup = () => {
    setError();
    setDeletePopup(false);
  };

  const handleDeletePopup = (user) => {
    setDeleteTrailer(user);
    setDeletePopup(true);
  };

  // API calling to add trailer
  let addTrailer = (value) => {
    const data = {
      name: value.name,
      rego: value.rego,
      registrationDueDate: moment(value.registrationDate).format("YYYY-MM-DD"),
      serviceDueDate: moment(value.serviceDate).format("YYYY-MM-DD"),
      fleet: value.fleet,
      cityId: value.cityId,
    };
    dispatch({ type: ADD_TRAILER });
    API.post("trailers", data)
      .then((response) => {
        handleCloseAddPopup();
        getTrailerData();
        dispatch({
          type: ADD_TRAILER_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Trailer Added Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_TRAILER_FAILURE, payload: error });
      });
  };

  // API calling to edit trailer
  let editTrailer = (value) => {
    const data = {
      name: value.name,
      rego: value.rego,
      registrationDueDate: moment(value.registrationDate).format("YYYY-MM-DD"),
      serviceDueDate: moment(value.serviceDate).format("YYYY-MM-DD"),
      fleet: value.fleet,
      cityId: value.cityId,
    };
    dispatch({ type: EDIT_TRAILER });
    API.put(`trailers/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getTrailerData();
        dispatch({
          type: EDIT_TRAILER_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Trailer Updated Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_TRAILER_FAILURE, payload: error });
      });
  };

  const handleAddPopup = (user) => {
    if (user) {
      setEdit(true);
      const data = {
        id: user.id,
        name: user.name,
        rego: user.rego,
        registrationDate: user.registrationDueDate,
        serviceDate: user.serviceDueDate,
        fleet: user.fleet,
        cityId: user.trailerCities && user.trailerCities.id,
      };
      setEditTrailer(data);
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditTrailer(schema.addTrailerSchema);
    setError("");
    formik.handleReset();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditTrailer,
    validationSchema: validationSchema.addTrailerValidationSchema,
    onSubmit: (value) => {
      getEdit ? editTrailer(value) : addTrailer(value);
    },
  });

  //Uploding file for importing CSV of trailer
  function uploadFile(event, fileName, defaultText) {
    setFilename(event.target?.files[0]?.name);
    if (event.target.files && event.target.files.length) {
      dispatch({ type: IMPORT_TRAILER_CSV });
    }
    UploadFile(event, fileName, defaultText, "text/csv", "trailer-csv")
      .then((res) => {
        API.post("trailers/import", { file: res.data.fileName })
          .then((response) => {
            setFilename("");
            event.target.value = "";
            getTrailerData();
            toast.success("CSV Imported Successfully");
            dispatch({
              type: IMPORT_TRAILER_CSV_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            setFilename("");
            event.target.value = "";
            if (error.response?.data?.code === 400)
              toast.error("Please Upload Valid CSV");
            dispatch({ type: IMPORT_TRAILER_CSV_FAILURE, payload: error });
          });
      })
      .catch((error) => {
        setFilename("");
        event.target.value = "";
        dispatch({ type: IMPORT_TRAILER_CSV_FAILURE, payload: error });
        toast.error("Please Upload CSV File");
      });
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };

  // API calling to delete trailer
  const handleDelete = () => {
    dispatch({ type: DELETE_TRAILER });
    API.delete(`trailers/${getDeleteTrailer.id}`)
      .then((response) => {
        setDeletePopup(false);
        getTrailerData();
        dispatch({
          type: DELETE_TRAILER_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Trailer Deleted Successfully");
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
          toast.error(error.response?.data?.message);
        }
        dispatch({ type: DELETE_TRAILER_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getTrailerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  useEffect(() => {
    if (openAddPopup) {
      getCities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddPopup]);
  useDebouncedEffect(() => getTrailerData(), 1000, [search]);

  return (
    <>
      <Header />
      <div className={classes.TrailerWrapper}>
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
                        <Typography variant="h1">Trailers</Typography>
                      </div>
                      <div className="right-block">
                        <div className="right-block-inner">
                          <div className="search-wrapper">
                            <div className="form-gourp">
                              <TextField
                                id="search-request"
                                placeholder="Search trailer"
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
                              <div className={classes.fileInput}>
                                <TextField
                                  id="photo"
                                  variant="outlined"
                                  type="file"
                                  multiple
                                  onChange={(e) =>
                                    uploadFile(e, "file-name", "Import csv")
                                  }
                                  InputProps={{
                                    inputProps: { accept: ".csv" },
                                  }}
                                />
                                <div className="label-block">
                                  <img src={UploadImage} alt="Upload" />
                                  <span className="file-name" id="file-name">
                                    {fileName ? fileName : "Import CSV"}
                                  </span>
                                </div>
                              </div>
                              <AddTrailer
                                handleClickOpen={() => handleAddPopup()}
                                handleClose={handleCloseAddPopup}
                                open={openAddPopup}
                                formik={formik}
                                isEdit={getEdit}
                                error={error}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TrailerTable
                      handleOpen={(trailer) => handleDeletePopup(trailer)}
                      handleEdit={(editTrailer) => handleAddPopup(editTrailer)}
                      orderBy={orderBy}
                      order={order}
                      handleSorting={(e, property) =>
                        handleSorting(e, property)
                      }
                    />
                    <DeletePopup
                      open={openDeletePopup}
                      handleClose={handleCloseDeletePopup}
                      handleDelete={(deleteTrailer) =>
                        handleDelete(deleteTrailer)
                      }
                      deleteUser={getDeleteTrailer.name}
                      loading={state.trailer?.deletingTrailer}
                      error={error}
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
export default Trailer;
