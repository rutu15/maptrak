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
import UploadImage from "@assets/images/blue-upload.svg";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_TRUCKS,
  FETCH_TRUCKS_SUCCESS,
  FETCH_TRUCKS_FAILURE,
  ADD_TRUCK,
  ADD_TRUCK_SUCCESS,
  ADD_TRUCK_FAILURE,
  EDIT_TRUCK,
  EDIT_TRUCK_SUCCESS,
  EDIT_TRUCK_FAILURE,
  DELETE_TRUCK,
  DELETE_TRUCK_SUCCESS,
  DELETE_TRUCK_FAILURE,
  GET_TRUCK_TYPE,
  GET_TRUCK_TYPE_SUCCESS,
  GET_TRUCK_TYPE_FAILURE,
  IMPORT_TRUCK_CSV,
  IMPORT_TRUCK_CSV_SUCCESS,
  IMPORT_TRUCK_CSV_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { UploadFile } from "@utils/commonFunctions";
import API from "@services/axios";
import TruckTable from "./table-listing";
import AddTruck from "./add-truck";
import { TruckStyle } from "./style";

function Truck() {
  const classes = TruckStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteTruck, setDeleteTruck] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditTruck, setEditTruck] = useState(schema.addTruckSchema);
  const [getEdit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFilename] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [state, dispatch] = useStore();

  // API calling to get list of trucks
  let getTrucks = () => {
    const params = {
      ...(!!search ? { search } : {}),
      // https://wymap.atlassian.net/browse/MAPTRAK-918 Added sorting on every fields
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
    };
    dispatch({ type: FETCH_TRUCKS });
    API.get("trucks", { params })
      .then((response) => {
        dispatch({
          type: FETCH_TRUCKS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_TRUCKS_FAILURE, payload: err });
      });
  };

  // API calling to get list of truck types
  let getTruckType = () => {
    if (state.common.truckTypeData === null) {
      dispatch({ type: GET_TRUCK_TYPE });
      API.get("master/truckTypes")
        .then((response) => {
          dispatch({
            type: GET_TRUCK_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((err) => {
          dispatch({ type: GET_TRUCK_TYPE_FAILURE, payload: err });
        });
    }
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

  // API calling to add truck
  let addTruck = (value) => {
    const data = {
      truckName: value.truckName,
      rego: value.rego,
      vehicleNumber: value.vehicleNumber,
      typeId: value.typeId,
      registrationDueDate: moment(value.registrationDueDate).format(
        "YYYY-MM-DD"
      ),
      serviceDueDate: moment(value.serviceDueDate).format("YYYY-MM-DD"),
      fleet: value.fleet,
      cityId: value.cityId,
    };
    dispatch({ type: ADD_TRUCK });
    API.post("trucks", data)
      .then((response) => {
        handleCloseAddPopup();
        getTrucks();
        toast.success("Truck Added Successfully");
        dispatch({
          type: ADD_TRUCK_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_TRUCK_FAILURE, payload: error });
      });
  };

  // API calling to edit truck
  let editTruck = (value) => {
    const data = {
      truckName: value.truckName,
      rego: value.rego,
      vehicleNumber: value.vehicleNumber,
      typeId: value.typeId,
      registrationDueDate: moment(value.registrationDueDate).format(
        "YYYY-MM-DD"
      ),
      serviceDueDate: moment(value.serviceDueDate).format("YYYY-MM-DD"),
      fleet: value.fleet,
      cityId: value.cityId,
    };
    dispatch({ type: EDIT_TRUCK });
    API.put(`trucks/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getTrucks();
        toast.success("Truck Updated Successfully");
        dispatch({
          type: EDIT_TRUCK_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_TRUCK_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    getTrucks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  useEffect(() => {
    getTruckType();
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getTrucks(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };
  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };

  // API calling to delete truck
  const handleDelete = () => {
    dispatch({ type: DELETE_TRUCK });
    API.delete(`trucks/${getDeleteTruck.id}`)
      .then((response) => {
        setDeletePopup(false);
        getTrucks();
        toast.success("Truck Deleted Successfully");
        dispatch({
          type: DELETE_TRUCK_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
          toast.error(error.response?.data?.message);
        }
        dispatch({ type: DELETE_TRUCK_FAILURE, payload: error });
      });
  };

  const handleCloseDeletePopup = () => {
    setError();
    setDeletePopup(false);
  };
  const handleDeletePopup = (user) => {
    setDeleteTruck(user);
    setDeletePopup(true);
    setError("");
  };

  const handleAddPopup = (user) => {
    if (user) {
      setEdit(true);
      const data = {
        id: user.id,
        truckName: user.truckName,
        vehicleNumber: user?.vehicleNumber,
        rego: user.rego,
        typeId: user.truckType?.id,
        registrationDueDate: user.registrationDueDate,
        serviceDueDate: user.serviceDueDate,
        fleet: user.fleet,
        cityId: user.truckCities && user.truckCities.id,
      };
      setEditTruck(data);
    }
    setOpenAddPopup(true);
  };
  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditTruck(schema.addTruckSchema);
    setError("");
    formik.handleReset();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditTruck,
    validationSchema: validationSchema.addTruckValidationSchema,
    onSubmit: (value) => {
      getEdit ? editTruck(value) : addTruck(value);
    },
  });

  //Uploading file for importing CSV of truck
  function uploadFile(event, fileName, defaultText) {
    setFilename(event.target?.files[0]?.name);
    if (event.target.files && event.target.files.length) {
      dispatch({ type: IMPORT_TRUCK_CSV });
    }
    UploadFile(event, fileName, defaultText, "text/csv", "truck-csv")
      .then((res) => {
        API.post("trucks/import", { file: res.data.fileName })
          .then((response) => {
            getTrucks();
            toast.success("CSV Imported Successfully");
            dispatch({
              type: IMPORT_TRUCK_CSV_SUCCESS,
              payload: response.data.data,
            });
            setFilename("");
            event.target.value = "";
          })
          .catch((error) => {
            setFilename("");
            event.target.value = "";
            if (error.response?.data?.code === 400)
              toast.error("Please Upload Valid CSV");
            dispatch({ type: IMPORT_TRUCK_CSV_FAILURE, payload: error });
          });
      })
      .catch((error) => {
        setFilename("");
        event.target.value = "";
        dispatch({ type: IMPORT_TRUCK_CSV_FAILURE, payload: error });
        toast.error("Please Upload CSV File");
      });
  }

  return (
    <>
      <Header />
      <div className={classes.TruckWrapper}>
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
                        <Typography variant="h1">Trucks</Typography>
                      </div>
                      <div className="right-block">
                        <div className="right-block-inner">
                          <div className="search-wrapper">
                            <div className="form-gourp">
                              <TextField
                                id="search-request"
                                placeholder="Search trucks"
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
                                  id="truckCsv"
                                  variant="outlined"
                                  type="file"
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
                              <AddTruck
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
                    {/* https://wymap.atlassian.net/browse/MAPTRAK-929  added sorting*/}
                    <TruckTable
                      handleOpen={(truck) => handleDeletePopup(truck)}
                      handleEdit={(editTruck) => handleAddPopup(editTruck)}
                      orderBy={orderBy}
                      order={order}
                      handleSorting={(e, property) =>
                        handleSorting(e, property)
                      }
                    />
                    <DeletePopup
                      open={openDeletePopup}
                      handleClose={handleCloseDeletePopup}
                      handleDelete={(deleteTruck) => handleDelete(deleteTruck)}
                      deleteUser={getDeleteTruck.truckName}
                      loading={state.trucks?.deletingTruck}
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

export default Truck;
