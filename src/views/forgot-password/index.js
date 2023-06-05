import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Header from "@components/header";
import Footer from "@components/footer";
import Loader from "@components/loader";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { routes } from "@utils/constant";
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { forgotPasswordStyle } from "./style";

function ForgotPassword() {
  const [state, dispatch] = useStore();
  const [err, setError] = useState("");
  const [data, setData] = useState("");
  const classes = forgotPasswordStyle();

  const formik = useFormik({
    initialValues: schema.forgotPasswordSchema,
    validationSchema: validationSchema.forgotPasswordValidationSchema,
    onSubmit: (values) => {
      dispatch({ type: FORGOT_PASSWORD });
      API.post("auth/forgotPassword", values)
        .then((response) => {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
          setData("Reset Password link has been sent to your email.");
          setError("");
        })
        .catch((err) => {
          setData("");
          if (err.response.data.code === 401)
            setError("Account is not active yet");
          else if (err.response.data.code === 404)
            setError("Email is not registered yet");
          else setError("Something went wrong, Please try again later");
          dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: err.response });
        });
    },
  });
  return (
    <>
      <Header />
      <div className={classes.commonBannerWrapper}>
        <Loader loading={state.forgotPassword.loading} />
        <div className="commonBanner">
          <div className="white-box-wrapper">
            <div className="white-box">
              <div className="alert">
                {err && <Alert severity="error">{err}</Alert>}
                {data && <Alert severity="success">{data}</Alert>}
              </div>
              <div className="title-wrapper">
                <Typography variant="h1">Forgot Password</Typography>
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
                <div className="form-row btn-wrapper">
                  <Button
                    type="submit"
                    className="orange-btn primary-btn"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={state.forgotPassword.loading}
                  >
                    Submit
                  </Button>
                  <Link to={routes.login} className="label-text">
                    Back to Login
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

export default ForgotPassword;
