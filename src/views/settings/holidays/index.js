import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";

import { useStore } from "@store/store";
import Header from "@components/header";
import DeletePopup from "@components/deletePopup";
import ProfileSideBar from "@components/profile-sidebar";
import {
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_SUCCESS,
  FETCH_HOLIDAYS_FAILURE,
  ADD_HOLIDAYS,
  ADD_HOLIDAYS_SUCCESS,
  ADD_HOLIDAYS_FAILURE,
  EDIT_HOLIDAYS,
  EDIT_HOLIDAYS_SUCCESS,
  EDIT_HOLIDAYS_FAILURE,
  DELETE_HOLIDAYS,
  DELETE_HOLIDAYS_SUCCESS,
  DELETE_HOLIDAYS_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddHoliday from "./add-holiday";
import { HolidayStyle } from "./style";

function Holidays() {
  const classes = HolidayStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteHoliday, setDeleteHoliday] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditHoliday, setEditHoliday] = useState(schema.addHolidaysSchema);
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();

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

  // API calling to get a list of holidays
  let getHolidaysData = () => {
    const params = {
      page: 1,
      size: 1000,
    };
    dispatch({ type: FETCH_HOLIDAYS });
    API.get("publicHolidays", { params })
      .then((response) => {
        dispatch({
          type: FETCH_HOLIDAYS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_HOLIDAYS_FAILURE, payload: err });
      });
  };

  // API calling to add holiday
  let addHolidays = (value) => {
    const data = {
      date: moment(value.date).format("YYYY-MM-DD"),
      name: value.name,
      type: parseInt(value.type),
      cityId: parseInt(value.city),
    };
    dispatch({ type: ADD_HOLIDAYS });
    API.post("publicHolidays", data)
      .then((response) => {
        handleCloseAddPopup();
        getHolidaysData();
        dispatch({
          type: ADD_HOLIDAYS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Holiday Added Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_HOLIDAYS_FAILURE, payload: error });
      });
  };

  // API calling to edit holiday
  let editHoliday = (value) => {
    const data = {
      date: moment(value.date).format("YYYY-MM-DD"),
      name: value.name,
      type: parseInt(value.type),
      cityId: parseInt(value.city),
    };
    dispatch({ type: EDIT_HOLIDAYS });
    API.put(`publicHolidays/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getHolidaysData();
        dispatch({
          type: EDIT_HOLIDAYS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Holiday Updated Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_HOLIDAYS_FAILURE, payload: error });
      });
  };

  const handleDeletePopup = (user) => {
    setDeleteHoliday(user);
    setDeletePopup(true);
  };

  const handleAddPopup = (user) => {
    if (user) {
      setEdit(true);
      const data = {
        id: user.id,
        name: user.name,
        date: user.date,
        type: user.type,
        city: user.cities.id,
      };
      setEditHoliday(data);
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditHoliday(schema.addHolidaysSchema);
    setError("");
    formik.handleReset();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditHoliday,
    validationSchema: validationSchema.addHolidaysValidationSchema,
    onSubmit: (value) => {
      getEdit ? editHoliday(value) : addHolidays(value);
    },
  });

  useEffect(() => {
    if (openAddPopup) {
      getCities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddPopup]);

  // API calling to delete holiday
  const handleDelete = () => {
    dispatch({ type: DELETE_HOLIDAYS });
    API.delete(`publicHolidays/${getDeleteHoliday.id}`)
      .then((response) => {
        setDeletePopup(false);
        getHolidaysData();
        dispatch({
          type: DELETE_HOLIDAYS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Holiday Deleted Successfully");
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
        }
        dispatch({ type: DELETE_HOLIDAYS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getHolidaysData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className={classes.HolidayWrapper}>
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
                        <Typography variant="h1">Holidays</Typography>
                      </div>
                      <div className="right-block">
                        <div className="right-block-inner">
                          <div className="modal-wrapper">
                            <div className="btn-wrapper">
                              <AddHoliday
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
                    <TableListing
                      handleOpen={(holiday) => handleDeletePopup(holiday)}
                      handleEdit={(editHoliday) => handleAddPopup(editHoliday)}
                    />
                    <DeletePopup
                      open={openDeletePopup}
                      handleClose={() => setDeletePopup(false)}
                      handleDelete={(deleteHolidays) =>
                        handleDelete(deleteHolidays)
                      }
                      deleteUser={getDeleteHoliday.name}
                      loading={state.holidays?.deletingHolidays}
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

export default Holidays;
