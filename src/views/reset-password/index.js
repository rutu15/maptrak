import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import Footer from "@components/footer";
import { bannerStyle } from "@utils/commonStyles";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { routes } from "@utils/constant";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";

function ResetPassword() {
  const [state, dispatch] = useStore();
  const history = useHistory();
  const classes = bannerStyle();
  const [token] = useState(history.location.search.split("=")[1]);
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: schema.resetPasswordSchema,
    validationSchema: validationSchema.resetPasswordValidationSchema,
    onSubmit: (values) => {
      dispatch({ type: RESET_PASSWORD });
      API.post("auth/resetPassword", {
        password: values.password,
        token: token,
      })
        .then((response) => {
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
          history.push(routes.login);
        })
        .catch((err) => {
          setErr("Reset password link can be  used only once.");
          dispatch({ type: RESET_PASSWORD_FAILURE, payload: err.response });
        });
    },
  });
  return (
    <>
      <Header />
      <div className={classes.commonBannerWrapper}>
        <div className="commonBanner">
          <div className="white-box-wrapper">
            <div className="white-box">
              {" "}
              <div className="alert">
                {err && <Alert severity="error">{err}</Alert>}
              </div>
              <div className="title-wrapper">
                <Typography variant="h1">Reset Password</Typography>
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
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="off"
                      placeholder="********"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.password}
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
                <div className="form-row">
                  <div className="form-gourp">
                    <TextField
                      id="confirm-password"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      autoComplete="off"
                      placeholder="********"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
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
                  >
                    {state?.resetPassword?.loading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
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

export default ResetPassword;
