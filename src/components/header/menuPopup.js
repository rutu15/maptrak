import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuItem, Menu, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import cx from "classnames";

import profile from "@assets/images/profile.svg";
import profileRed from "@assets/images/profile-red.svg";
import profileWhite from "@assets/images/profile-white.svg";
import notification from "@assets/images/notification.svg";
import notificationRed from "@assets/images/notification-red.svg";
import notificationWhite from "@assets/images/notification-white.svg";
import trailericonRed from "@assets/images/trailer-red.svg";
import trailericon from "@assets/images/trailer.svg";
import trailericonWhite from "@assets/images/trailer-white.svg";
import truckicon from "@assets/images/truck-icon.svg";
import truckiconRed from "@assets/images/truck-icon-red.svg";
import truckiconWhite from "@assets/images/truck-icon-white.svg";
import locationnrml from "@assets/images/location.svg";
import locationRed from "@assets/images/locationRed.svg";
import locationWhite from "@assets/images/locationWhite.svg";
import User from "@assets/images/user.png";
import holidayWhite from "@assets/images/holidays-white.svg";
import holidayRed from "@assets/images/holidays-red.svg";
import holidayNormal from "@assets/images/holidays-nrml.svg";
import staffUserNormal from "@assets/images/staff-user.svg";
import staffUserRed from "@assets/images/staff-user-red.svg";
import staffUserWhite from "@assets/images/staff-user-white.svg";
import rolesNormal from "@assets/images/roles-permission.svg";
import rolesWhite from "@assets/images/roles-permission-white.svg";
import rolesRed from "@assets/images/roles-permission-red.svg";
import driverNormal from "@assets/images/driver-icon.svg";
import driverWhite from "@assets/images/driver-icon-white.svg";
import driverRed from "@assets/images/driver-icon-red.svg";
import organisation from "@assets/images/organisation.svg";
import organisationRed from "@assets/images/organisation-red.svg";
import organisationWhite from "@assets/images/organisation-white.svg";
import cto from "@assets/images/cto-normal.svg";
import ctoRed from "@assets/images/cto-red.svg";
import ctoWhite from "@assets/images/cto-white.svg";

import { routes } from "@utils/constant";
import { getPermissions, getUserData } from "@utils/commonFunctions";
import Logout from "../logout";

function MenuPopup(props) {
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState("/");

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);
  return (
    <>
      <ul className="profile-menu">
        <li>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={props.handleClick}
            className="light-blue-btn primary-btn"
            endIcon={<ExpandMore />}
          >
            <img src={User} alt="Wymap" />
            {getUserData()}
          </Button>
          <Menu
            id="simple-menu"
            className={props.classes.customMenu}
            Menuprops={{ classes: { paper: props.classes.customMenu } }}
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
            onEnter={props.handleEnter}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              className={cx({ active: activeRoute === routes.myProfile })}
              onClick={() => props.handleClose(routes.myProfile)}
            >
              <img src={profile} alt="Profile" className="normal-img" />
              <img src={profileRed} alt="Profile" className="hover-img" />
              <img src={profileWhite} alt="Profile" className="active-img" />
              Account
            </MenuItem>
            {getPermissions() && getPermissions().includes("notification") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.notifications })}
                onClick={() => props.handleClose(routes.notifications)}
              >
                <img
                  src={notification}
                  alt="Notifications "
                  className="normal-img"
                />
                <img
                  src={notificationRed}
                  alt="Notifications"
                  className="hover-img"
                />
                <img
                  src={notificationWhite}
                  alt="Notifications"
                  className="active-img"
                />
                Notifications
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("truck") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.trucks })}
                onClick={() => props.handleClose(routes.trucks)}
              >
                <img
                  src={truckicon}
                  alt="Notifications "
                  className="normal-img"
                />
                <img
                  src={truckiconRed}
                  alt="Notifications"
                  className="hover-img"
                />
                <img
                  src={truckiconWhite}
                  alt="Notifications"
                  className="active-img"
                />
                Trucks
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("trailer") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.trailer })}
                onClick={() => props.handleClose(routes.trailer)}
              >
                <img src={trailericon} alt="trailer" className="normal-img" />
                <img src={trailericonRed} alt="trailer" className="hover-img" />
                <img
                  src={trailericonWhite}
                  alt="trailer"
                  className="active-img"
                />
                Trailers
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("driver") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.driverListing })}
                onClick={() => props.handleClose(routes.driverListing)}
              >
                <img src={driverNormal} alt="driver" className="normal-img" />
                <img src={driverRed} alt="driver" className="hover-img" />
                <img src={driverWhite} alt="driver" className="active-img" />
                Drivers
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("tollLocation") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.tollLocation })}
                onClick={() => props.handleClose(routes.tollLocation)}
              >
                <img
                  src={locationnrml}
                  alt="Toll Location"
                  className="normal-img"
                />
                <img
                  src={locationRed}
                  alt="Toll Location"
                  className="hover-img"
                />
                <img
                  src={locationWhite}
                  alt="Toll Location"
                  className="active-img"
                />
                Toll Locations
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("holiday") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.holidays })}
                onClick={() => props.handleClose(routes.holidays)}
              >
                <img
                  src={holidayNormal}
                  alt="holidays"
                  className="normal-img"
                />
                <img src={holidayRed} alt="holidays" className="hover-img" />
                <img src={holidayWhite} alt="holidays" className="active-img" />
                Holidays
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("user") && (
              <MenuItem
                className={cx({ active: activeRoute === routes.staffUsers })}
                onClick={() => props.handleClose(routes.staffUsers)}
              >
                <img
                  src={staffUserNormal}
                  alt="Staff User"
                  className="normal-img"
                />
                <img
                  src={staffUserRed}
                  alt="Staff User"
                  className="hover-img"
                />
                <img
                  src={staffUserWhite}
                  alt="Staff User"
                  className="active-img"
                />
                Staff Users
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("rolePermission") && (
              <MenuItem
                className={cx({
                  active: activeRoute === routes.rolesPermission,
                })}
                onClick={() => props.handleClose(routes.rolesPermission)}
              >
                <img
                  src={rolesNormal}
                  alt="permission"
                  className="normal-img"
                />
                <img src={rolesRed} alt="permission" className="hover-img" />
                <img src={rolesWhite} alt="permission" className="active-img" />
                Roles Permissions
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("organisation") && (
              <MenuItem
                className={cx({
                  active: activeRoute === routes.organisation,
                })}
                onClick={() => props.handleClose(routes.organisation)}
              >
                <img
                  src={organisation}
                  alt="organisation"
                  className="normal-img"
                />
                <img
                  src={organisationRed}
                  alt="organisation"
                  className="hover-img"
                />
                <img
                  src={organisationWhite}
                  alt="organisation"
                  className="active-img"
                />
                Wymap Organisation
              </MenuItem>
            )}
            {getPermissions() && getPermissions().includes("cto") && (
              <MenuItem
                className={cx({
                  active: activeRoute === routes.ctos,
                })}
                onClick={() => props.handleClose(routes.ctos)}
              >
                <img src={cto} alt="cto" className="normal-img" />
                <img src={ctoRed} alt="cto" className="hover-img" />
                <img src={ctoWhite} alt="cto" className="active-img" />
                CTO
              </MenuItem>
            )}

            <MenuItem className="logout-link">
              <Logout />
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </>
  );
}

export default MenuPopup;
