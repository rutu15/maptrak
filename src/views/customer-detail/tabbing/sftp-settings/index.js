import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  GET_SFTP,
  GET_SFTP_SUCCESS,
  GET_SFTP_FAILURE,
  SET_SFTP,
  SET_SFTP_SUCCESS,
  SET_SFTP_FAILURE,
} from "@utils/actionTypes";
import {
  allowAlphaNumeric,
  allowNumberWithSpaceValidation,
  pathValidation,
} from "@utils/commonFunctions";
import API from "@services/axios";
import { FuelSurchargeStyle } from "./style";

function SFTP() {
  const classes = FuelSurchargeStyle();
  const [state, dispatch] = useStore();
  const [data, setData] = useState(schema.sftpSchema);
  const { id } = useParams();

  // API calling to get list of customer's users
  let getSftp = () => {
    dispatch({ type: GET_SFTP });
    API.get(`customers/${id}/sftp`)
      .then((response) => {
        dispatch({
          type: GET_SFTP_SUCCESS,
          payload: response.data.data,
        });
        setData(response.data.data);
      })
      .catch((error) => {
        dispatch({ type: GET_SFTP_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getSftp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: validationSchema.sftpValidationSchema,
    onSubmit: (value) => {
      dispatch({ type: SET_SFTP });
      API.put(`customers/${id}/sftp/${value.id}`, {
        host: value.host,
        port: value.port,
        userName: value.userName,
        password: value.password,
        isReadEnable: value.isReadEnable ? 1 : 0,
        readPath: value.readPath,
        isUploadEnable: value.isUploadEnable ? 1 : 0,
        finishLoadingPath: value.finishLoadingPath,
        finishUnloadingPath: value.finishUnloadingPath,
        runsheetPath: value.runsheetPath,
      })
        .then((response) => {
          getSftp();
          dispatch({
            type: SET_SFTP_SUCCESS,
            payload: response.data.data,
          });
          toast.success("SFTP updated Successfully");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          dispatch({ type: SET_SFTP_FAILURE, payload: error });
        });
    },
  });

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={classes.FuelSurchargeWrapper}>
          <Loader
            loading={state?.customer.settingSftp || state?.customer.loadingSftp}
          />
          <div className="weekly-row-wrapper">
            <div className="weekly-row">
              <label className="label-text">Host </label>
              <div className="textfield-wrapper1">
                <TextField
                  id="host"
                  name="host"
                  className="host"
                  variant="outlined"
                  type="text"
                  placeholder="Host"
                  onKeyPress={allowAlphaNumeric}
                  onChange={formik.handleChange}
                  value={formik.values.host}
                  error={formik.touched.host && Boolean(formik.errors.host)}
                  helperText={formik.touched.host && formik.errors.host}
                />
              </div>
            </div>
            <div className="weekly-row">
              <label className="label-text">Port </label>
              <div className="textfield-wrapper1">
                <TextField
                  id="port"
                  name="port"
                  className="port"
                  variant="outlined"
                  type="text"
                  placeholder="Port"
                  onKeyPress={allowNumberWithSpaceValidation}
                  onChange={formik.handleChange}
                  value={formik.values.port}
                  error={formik.touched.port && Boolean(formik.errors.port)}
                  helperText={formik.touched.port && formik.errors.port}
                />
              </div>
            </div>
            <div className="weekly-row">
              <label className="label-text">Username </label>
              <div className="textfield-wrapper1">
                <TextField
                  id="userName"
                  name="userName"
                  className="username"
                  variant="outlined"
                  type="text"
                  placeholder="Username"
                  onKeyPress={allowAlphaNumeric}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </div>
            </div>
            <div className="weekly-row">
              <label className="label-text">Password </label>
              <div className="textfield-wrapper1">
                <TextField
                  id="password"
                  name="password"
                  className="password"
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  onKeyPress={allowAlphaNumeric}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
            </div>
            <div className="weekly-row">
              <label className="label-text">Read </label>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    name="isReadEnable"
                    icon={<img src={uncheckedIcon} alt="CheckBox" />}
                    checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
                    onChange={formik.handleChange}
                    value={formik.values.isReadEnable}
                    checked={formik.values.isReadEnable}
                  />
                }
                labelPlacement="end"
              />

              <div className="textfield-wrapper1">
                <TextField
                  id="readPath"
                  name="readPath"
                  className="password"
                  variant="outlined"
                  type="text"
                  placeholder="Enter URL here"
                  onKeyPress={pathValidation}
                  onChange={formik.handleChange}
                  value={formik.values.readPath}
                  error={
                    formik.touched.readPath && Boolean(formik.errors.readPath)
                  }
                  helperText={formik.touched.readPath && formik.errors.readPath}
                />
              </div>
            </div>
            <div className="weekly-row">
              <label className="label-text">Upload </label>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    name="isUploadEnable"
                    icon={<img src={uncheckedIcon} alt="CheckBox" />}
                    checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
                    onChange={formik.handleChange}
                    value={formik.values.isUploadEnable}
                    checked={formik.values.isUploadEnable}
                  />
                }
                labelPlacement="end"
              />

              <div className="textfield-wrapper1">
                <label>Finished Loading </label>
                <TextField
                  id="finishLoadingPath"
                  name="finishLoadingPath"
                  className="password"
                  variant="outlined"
                  type="text"
                  placeholder="Enter directory path here"
                  onKeyPress={pathValidation}
                  onChange={formik.handleChange}
                  value={formik.values.finishLoadingPath}
                  error={
                    formik.touched.finishLoadingPath &&
                    Boolean(formik.errors.finishLoadingPath)
                  }
                  helperText={
                    formik.touched.finishLoadingPath &&
                    formik.errors.finishLoadingPath
                  }
                />
              </div>
              <div className="textfield-wrapper1">
                <label>Finished Unloading </label>
                <TextField
                  id="finishUnloadingPath"
                  name="finishUnloadingPath"
                  className="password"
                  variant="outlined"
                  type="text"
                  placeholder="Enter directory path here"
                  onKeyPress={pathValidation}
                  onChange={formik.handleChange}
                  value={formik.values.finishUnloadingPath}
                  error={
                    formik.touched.finishUnloadingPath &&
                    Boolean(formik.errors.finishUnloadingPath)
                  }
                  helperText={
                    formik.touched.finishUnloadingPath &&
                    formik.errors.finishUnloadingPath
                  }
                />
              </div>
              <div className="textfield-wrapper1">
                <label> Run Sheet </label>
                <TextField
                  id="runsheetPath"
                  name="runsheetPath"
                  className="password"
                  variant="outlined"
                  type="text"
                  placeholder="Enter directory path here"
                  onKeyPress={pathValidation}
                  onChange={formik.handleChange}
                  value={formik.values.runsheetPath}
                  error={
                    formik.touched.runsheetPath &&
                    Boolean(formik.errors.runsheetPath)
                  }
                  helperText={
                    formik.touched.runsheetPath && formik.errors.runsheetPath
                  }
                />
              </div>
            </div>
          </div>

          <Button
            className="blue-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
export default SFTP;
