import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import ProfileSideBar from "@components/profile-sidebar";
import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_PROFILE,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import API from "@services/axios";
import { AccountPageStyle } from "./style";

function Account() {
  const classes = AccountPageStyle();
  const [err, setErr] = useState("");
  const [data, setData] = useState(schema.updateProfileSchema);
  const [state, dispatch] = useStore();
  const [email, setEmail] = useState("");

  // API calling to get user profile data
  const getUser = () => {
    dispatch({ type: GET_PROFILE });
    API.get("users/me")
      .then((response) => {
        setData({
          name: response.data.data?.name,
          email: response.data.data?.email,
          currentPassword: "",
          newPassword: "",
        });
        dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data });
        setEmail(response.data?.data?.email);
      })
      .catch((error) => {
        dispatch({ type: GET_PROFILE_FAILURE, payload: error.response.data });
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: validationSchema.updateProfileValidationSchema,
    onSubmit: (values) => {
      let data = {
        name: values.name,
        email: values.email,
      };
      data = {
        ...data,
        ...(!!values.currentPassword
          ? { currentPassword: values.currentPassword }
          : {}),
        ...(!!values.newPassword ? { newPassword: values.newPassword } : {}),
      };
      dispatch({ type: SET_PROFILE });
      API.put("users/me", data)
        .then((response) => {
          if (email !== values.email) {
            toast.success("Email Verification Link Has Been Sent");
          } else {
            toast.success("Profile Updated Successfully");
          }
          dispatch({ type: SET_PROFILE_SUCCESS, payload: response.data });
          setErr("");
          values.email = email;
        })
        .catch((error) => {
          dispatch({ type: SET_PROFILE_FAILURE, payload: error.response.data });
          setErr(error.response.data.message);
        });
    },
  });

  return (
    <>
      <Header />
      <div className={classes.AccountPageWrapper}>
        <Loader loading={state.profile.gettingProfile} />
        <div className="setting-page wrapper">
          <div className="inner-page">
            <Typography variant="h1">Settings</Typography>
            <div className="setting-row-wrapper">
              <div className="left-sidebar">
                <ProfileSideBar />
              </div>
              <div className="right-content">
                <div className="white-card right-content-inner">
                  <div className="alert">
                    {err && <Alert severity="error">{err}</Alert>}
                  </div>
                  <form
                    noValidate
                    autoComplete="off"
                    className="custom-form"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form-outer">
                      <Typography variant="h2">Account</Typography>
                      <div className="form-row">
                        <div className="form-group two-column">
                          <div className="label-wrapper">
                            <label className="label-text">Name</label>
                          </div>
                          <TextField
                            id="name"
                            name="name"
                            placeholder="Name"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onKeyPress={allowAlphaNumeric}
                            error={
                              formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                          />
                        </div>
                        <div className="form-group two-column">
                          <div className="label-wrapper">
                            <label className="label-text">Email</label>
                          </div>
                          <TextField
                            id="email"
                            name="email"
                            placeholder="Email address"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-outer">
                      <Typography variant="h2">Change password</Typography>
                      <div className="form-row">
                        <div className="form-group two-column">
                          <div className="label-wrapper">
                            <label className="label-text">
                              Current password
                            </label>
                          </div>
                          <TextField
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current password"
                            variant="outlined"
                            type="password"
                            autoComplete="on"
                            onChange={formik.handleChange}
                            value={formik.values.currentPassword}
                            error={
                              formik.touched.currentPassword &&
                              Boolean(formik.errors.currentPassword)
                            }
                            helperText={
                              formik.touched.currentPassword &&
                              formik.errors.currentPassword
                            }
                          />
                        </div>
                        <div className="form-group two-column">
                          <div className="label-wrapper">
                            <label className="label-text">New password</label>
                          </div>
                          <TextField
                            id="newPassword"
                            name="newPassword"
                            placeholder="New password"
                            variant="outlined"
                            type="password"
                            autoComplete="on"
                            onChange={formik.handleChange}
                            value={formik.values.newPassword}
                            error={
                              formik.touched.newPassword &&
                              Boolean(formik.errors.newPassword)
                            }
                            helperText={
                              formik.touched.newPassword &&
                              formik.errors.newPassword
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-btn-wrapper">
                      <Button
                        className="orange-btn lg primary-btn"
                        color="inherit"
                        disableElevation
                        type="submit"
                      >
                        {state.profile.settingProfile ? (
                          <CircularProgress color="inherit" />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Account;
