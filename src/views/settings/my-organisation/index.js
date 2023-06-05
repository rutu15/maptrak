import React from "react";
import { Typography, Button } from "@material-ui/core";

import Header from "@components/header";

import ProfileSideBar from "@components/profile-sidebar";
import Logo from "@assets/images/logo-wymap-1.png";
import EditIcon from "@assets/images/edit-icon.svg";
import { AccountPageStyle } from "./style";

function Account() {
  const classes = AccountPageStyle();

  return (
    <>
      <Header />
      <div className={classes.AccountPageWrapper}>
        <div className="setting-page wrapper">
          <div className="inner-page">
            <Typography variant="h1">Settings</Typography>
            <div className="setting-row-wrapper">
              <div className="left-sidebar">
                <ProfileSideBar />
              </div>
              <div className="right-content">
                <div className="white-card right-content-inner">
                  <form noValidate autoComplete="off" className="custom-form">
                    <div className="form-outer">
                      <Typography variant="h2">Admin Portal</Typography>
                      <div className="form-row">
                        <div className="form-group two-column">
                          <div className="label-wrapper"></div>
                          <div className="upload-img-wrapper">
                            <div className="img-block">
                              <img src={Logo} alt="edit-icon"></img>
                            </div>
                            <div className="form-gourp">
                              <input
                                type="file"
                                id="profileImage"
                                accept="image/x-png,image/jpeg"
                                label="avatar"
                                // onChange={handleChange}
                              />
                              <img src={EditIcon} alt="edit-icon"></img>
                            </div>
                          </div>
                        </div>

                        <div className="form-group two-column"></div>
                      </div>
                    </div>
                    <div className="form-outer">
                      <Typography variant="h2">Customer Portal</Typography>
                      <div className="form-row">
                        <div className="form-group two-column">
                          <div className="label-wrapper"></div>
                          <div className="upload-img-wrapper">
                            <div className="img-block">
                              <img src={Logo} alt="edit-icon"></img>
                            </div>
                            <div className="form-gourp">
                              <input
                                type="file"
                                id="profileImage"
                                accept="image/x-png,image/jpeg"
                                label="avatar"
                                // onChange={handleChange}
                              />
                              <img src={EditIcon} alt="edit-icon"></img>
                            </div>
                          </div>
                        </div>

                        <div className="form-group two-column"></div>
                      </div>
                    </div>
                    <div className="form-btn-wrapper">
                      <Button
                        className="orange-btn lg primary-btn"
                        color="inherit"
                        disableElevation
                        type="submit"
                      >
                        Save Changes
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
