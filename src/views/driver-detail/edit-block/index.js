import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import editIcon from "@assets/images/edit.svg";
import validationSchema from "@utils/validationSchemas";
import {
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_DRIVER_TYPE,
  GET_DRIVER_TYPE_SUCCESS,
  GET_DRIVER_TYPE_FAILURE,
  GET_ASIC_TYPE,
  GET_ASIC_TYPE_SUCCESS,
  GET_ASIC_TYPE_FAILURE,
  GET_DRIVER_LICENSE_TYPE,
  GET_DRIVER_LICENSE_TYPE_SUCCESS,
  GET_DRIVER_LICENSE_TYPE_FAILURE,
  EDIT_DRIVER,
  EDIT_DRIVER_SUCCESS,
  EDIT_DRIVER_FAILURE,
} from "@utils/actionTypes";
import { convertMinutesToHours } from "@utils/commonFunctions";
import { routes } from "@utils/constant";
import Popup from "@views/driver-listing/add-driver/popup";
import API from "@services/axios";
import { EditBlockStyle } from "./style";

function EditBlock(props) {
  const classes = EditBlockStyle();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [state, dispatch] = useStore();
  const [error, setError] = useState("");
  const { id } = useParams();

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

    if (state?.common?.driverTypeData === null) {
      dispatch({ type: GET_DRIVER_TYPE });
      API.get("master/driverTypes")
        .then((response) => {
          dispatch({
            type: GET_DRIVER_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_DRIVER_TYPE_FAILURE, payload: error });
        });
    }

    if (state?.common?.asicTypeData === null) {
      dispatch({ type: GET_ASIC_TYPE });
      API.get("master/asicTypes")
        .then((response) => {
          dispatch({
            type: GET_ASIC_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_ASIC_TYPE_FAILURE, payload: error });
        });
    }

    if (state?.common?.driverLicenseTypeData === null) {
      dispatch({ type: GET_DRIVER_LICENSE_TYPE });
      API.get("master/licenseTypes")
        .then((response) => {
          dispatch({
            type: GET_DRIVER_LICENSE_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_DRIVER_LICENSE_TYPE_FAILURE, payload: error });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: validationSchema.editDriverValidationSchema,
    onSubmit: (value) => {
      let data = {
        name: value.name,
        phone: value.phone,
        email: value.email,
        cityId: value.cityId,
        driverTypeId: value.driverTypeId,
        licenseTypeId: value.licenseTypeId,
        asicTypeId: value.asicTypeId,
        weekdayWage: value.weekdayWage,
        saturdayWage: value.saturdayWage,
        sundayWage: value.sundayWage,
        publicHoliday1Wage: value.publicHoliday1Wage,
        publicHoliday2Wage: value.publicHoliday2Wage,
        employeeNumber: value.employeeNumber,
        active: value.active,
      };
      data = {
        ...data,
        ...(!!value.password ? { password: value.password } : {}),
      };
      dispatch({ type: EDIT_DRIVER });
      API.put(`drivers/${id}`, data)
        .then((response) => {
          dispatch({
            type: EDIT_DRIVER_SUCCESS,
            payload: response.data.data,
          });
          handleClose();
          props.getDriver();
          toast.success("Driver Updated Successfully");
        })
        .catch((err) => {
          dispatch({ type: EDIT_DRIVER_FAILURE, payload: err });
          setError(err?.response?.data?.message);
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
    setError("");
    formik.handleReset();
  };

  useEffect(() => {
    setData({
      name: state.driver?.getDriverById?.name,
      phone: state.driver?.getDriverById?.phone,
      password: "",
      confirmPassword: "",
      email: state.driver?.getDriverById?.email,
      cityId: state.driver?.getDriverById?.cities?.id,
      driverTypeId: state.driver?.getDriverById?.driverTypes?.id,
      licenseTypeId: state.driver?.getDriverById?.licenseTypes?.id,
      asicTypeId: state.driver?.getDriverById?.asicTypes?.id,
      weekdayWage: state.driver?.getDriverById?.weekdayWage,
      saturdayWage: state.driver?.getDriverById?.saturdayWage,
      sundayWage: state.driver?.getDriverById?.sundayWage,
      publicHoliday1Wage: state.driver?.getDriverById?.publicHoliday1Wage,
      publicHoliday2Wage: state.driver?.getDriverById?.publicHoliday2Wage,
      employeeNumber: state.driver?.getDriverById?.employeeNumber,
      active: state.driver?.getDriverById?.active === true ? 1 : 0,
    });
  }, [state.driver?.getDriverById]);
  return (
    <div className={classes.EditBlockWrapper}>
      <Loader
        loading={
          !open && (state.driver.gettingDriverById || state.driver.loadingJobs)
        }
      />
      <div className="white-card edit-block">
        <div className="edit-block-header">
          <div className="inner-heading">
            <p>Driver</p>
            <span>{state.driver?.getDriverById?.name}</span>
          </div>
          <div className="link-block">
            <span title="Edit" onClick={handleClickOpen}>
              <em>
                <img src={editIcon} alt="Edit" />
              </em>
              Edit driver
            </span>
          </div>
        </div>
        <div className="edit-block-list">
          <ul>
            <li>
              <Typography variant="h6">Employee No</Typography>
              <div className="value-block">
                <p>
                  {state.driver?.getDriverById?.employeeNumber
                    ? state.driver?.getDriverById?.employeeNumber
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Contact</Typography>
              <div className="value-block">
                <p>
                  {state.driver?.getDriverById?.phone
                    ? state.driver?.getDriverById?.phone
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Working time today</Typography>
              <div className="value-block">
                <p>
                  {state.driver?.getDriverById?.todayWorkTime
                    ? convertMinutesToHours(
                        state.driver?.getDriverById?.todayWorkTime
                      )
                    : 0}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Email</Typography>
              <div className="value-block">
                <p>
                  {state.driver?.getDriverById?.email
                    ? state.driver?.getDriverById?.email
                    : "-"}
                </p>
              </div>
            </li>
            <li>
              <Typography variant="h6">Driver Status</Typography>
              <div className="value-block">
                {state.driver?.getDriverById?.jobs?.length ? (
                  <p className="active">
                    On Job{" "}
                    {state.driver?.getDriverById?.jobs?.map((item, index) => {
                      return (
                        <Link to={`${routes.jobDetail}/${item.id}`} key={index}>
                          {`${item.id} `}
                        </Link>
                      );
                    })}
                  </p>
                ) : (
                  "-"
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Popup
        formik={formik}
        handleClose={handleClose}
        open={open}
        isEdit={true}
        error={error}
      />
    </div>
  );
}
export default EditBlock;
