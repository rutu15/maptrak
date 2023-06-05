import React from "react";
import { Typography } from "@material-ui/core";

import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import Tabbing from "./tabbing";
import { OrganisationStyle } from "./style";

function Organisation() {
  const classes = OrganisationStyle();

  return (
    <>
      <Header />
      <div className={classes.OrganisationWrapper}>
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
                      <div className="right-block">
                        <Tabbing />
                      </div>
                    </div>
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
export default Organisation;
