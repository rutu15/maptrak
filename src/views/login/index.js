import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import moment from "moment-timezone";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Header from "@components/header";
import Footer from "@components/footer";
import Loader from "@components/loader";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { routes } from "@utils/constant";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "@utils/actionTypes";
import { getPermissions } from "@utils/commonFunctions";
import API from "@services/axios";
import { loginStyle } from "./style";

function LoginView() {
  const history = useHistory();
  const [err, setErr] = useState("");
  const classes = loginStyle();

  const [state, dispatch] = useStore();

  const formik = useFormik({
    initialValues: schema.loginSchema,
    validationSchema: validationSchema.loginValidationSchema,
    onSubmit: (values) => {
      dispatch({ type: LOGIN });
      API.post("auth/login", {
        ...values,
        timezone: moment.tz.guess(),
      })
        .then((response) => {
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
          getPermissions() && getPermissions().includes("dashboard")
            ? history.push(routes.dashboard)
            : history.push(routes.myProfile);
        })
        .catch((error) => {
          dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
          if (error.response.status === 400) {
            setErr(error.response?.data?.message);
          }
        });
    },
  });

  return (
    <>
      <Header />
      <div className={classes.commonBannerWrapper}>
        <Loader loading={state.login.loading} />
        <div className="commonBanner">
          <div className="white-box-wrapper">
            <div className="white-box">
              <div className="alert">
                {err && <Alert severity="error">{err}</Alert>}
              </div>
              <div className="title-wrapper">
                <Typography variant="h1">Admin Login</Typography>
              </div>
              <form
                noValidate
                autoComplete="off"
                className="custom-form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-row">
                  <div className="form-gourp">
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="Email address"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-gourp">
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      autoComplete="on"
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </div>
                </div>
                <div className="form-row btn-wrapper">
                  <Button
                    type="submit"
                    className="orange-btn primary-btn"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={state.login.loading}
                  >
                    Login
                  </Button>
                  <Link to={routes.forgotPassword} className="label-text">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default LoginView;
