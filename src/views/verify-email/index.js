import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

import { useStore } from "@store/store";
import Footer from "@components/footer";
import { bannerStyle } from "@utils/commonStyles";
import {
  PROFILE_VERIFY_EMAIL,
  PROFILE_VERIFY_EMAIL_SUCCESS,
  PROFILE_VERIFY_EMAIL_FAILURE,
} from "@utils/actionTypes";
import { routes } from "@utils/constant";
import API from "@services/axios";

function ForgotPassword() {
  const [, dispatch] = useStore();
  const history = useHistory();
  const [token] = useState(history.location.search.split("=")[1]);
  const classes = bannerStyle();

  // API calling to verify email after updating email in profile
  const handleSubmit = () => {
    dispatch({ type: PROFILE_VERIFY_EMAIL });
    API.get("users/verifyEmail", {
      params: {
        token: token,
      },
    })
      .then((response) => {
        dispatch({
          type: PROFILE_VERIFY_EMAIL_SUCCESS,
          payload: response.data,
        });
        toast.success("Email Verified Successfully");
        history.push(routes.myProfile);
      })
      .catch((err) => {
        dispatch({ type: PROFILE_VERIFY_EMAIL_FAILURE, payload: err.response });
        toast.error("Email Already Verified or Verification Link is Expired");
      });
  };

  return (
    <>
      <div className={classes.commonBannerWrapper}>
        <div className="commonBanner">
          <div className="white-box-wrapper">
            <div className="white-box">
              <form noValidate autoComplete="off" className="custom-form">
                <div className="form-row btn-wrapper">
                  <Button
                    type="button"
                    className="orange-btn primary-btn"
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleSubmit}
                  >
                    Verify Email
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

export default ForgotPassword;
