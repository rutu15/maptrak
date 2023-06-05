import React from "react";
import { NavLink } from "react-router-dom";

import profile from "@assets/images/profile.svg";
import profileRed from "@assets/images/profile-red.svg";
import profileWhite from "@assets/images/profile-white.svg";
import notification from "@assets/images/notification.svg";
import notificationRed from "@assets/images/notification-red.svg";
import notificationWhite from "@assets/images/notification-white.svg";
import truckicon from "@assets/images/truck-icon.svg";
import truckiconRed from "@assets/images/truck-icon-red.svg";
import truckiconWhite from "@assets/images/truck-icon-white.svg";
import trailericonRed from "@assets/images/trailer-red.svg";
import trailericon from "@assets/images/trailer.svg";
import trailericonWhite from "@assets/images/trailer-white.svg";
import location from "@assets/images/location.svg";
import locationRed from "@assets/images/locationRed.svg";
import locationWhite from "@assets/images/locationWhite.svg";
import holidayWhite from "@assets/images/holidays-white.svg";
import holidayRed from "@assets/images/holidays-red.svg";
import holidayNormal from "@assets/images/holidays-nrml.svg";
import staffUserNormal from "@assets/images/staff-user.svg";
import staffUserRed from "@assets/images/staff-user-red.svg";
import staffUserWhite from "@assets/images/staff-user-white.svg";
import rolesNormal from "@assets/images/roles-permission.svg";
import rolesWhite from "@assets/images/roles-permission-white.svg";
import rolesRed from "@assets/images/roles-permission-red.svg";
import driverNoraml from "@assets/images/driver-icon.svg";
import driverWhite from "@assets/images/driver-icon-white.svg";
import driverRed from "@assets/images/driver-icon-red.svg";
import organisation from "@assets/images/organisation.svg";
import organisationRed from "@assets/images/organisation-red.svg";
import organisationWhite from "@assets/images/organisation-white.svg";
import cto from "@assets/images/cto-normal.svg";
import ctoRed from "@assets/images/cto-red.svg";
import ctoWhite from "@assets/images/cto-white.svg";
import { routes } from "@utils/constant";
import { getPermissions } from "@utils/commonFunctions";
import { ProfileSidebarStyle } from "./style";
import Logout from "../logout";

function ProfileSideBar() {
  const classes = ProfileSidebarStyle();
  return (
    <div className={classes.profilesidebar}>
      <aside className="white-card">
        <ul>
          <li>
            <NavLink to={routes.myProfile} activeClassName="active">
              <em>
                <img src={profile} alt="Profile" className="normal-img" />
                <img src={profileRed} alt="Profile" className="hover-img" />
                <img src={profileWhite} alt="Profile" className="active-img" />
              </em>
              Account
            </NavLink>
          </li>
          {getPermissions() && getPermissions().includes("notification") && (
            <li>
              <NavLink to={routes.notifications} activeClassName="active">
                <em>
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
                </em>
                Notifications
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("truck") && (
            <li>
              <NavLink to={routes.trucks} activeClassName="active">
                <em>
                  <img src={truckicon} alt="trucks" className="normal-img" />
                  <img src={truckiconRed} alt="trucks" className="hover-img" />
                  <img
                    src={truckiconWhite}
                    alt="trucks"
                    className="active-img"
                  />
                </em>
                Trucks
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("trailer") && (
            <li>
              <NavLink to={routes.trailer} activeClassName="active">
                <em>
                  <img src={trailericon} alt="trailer" className="normal-img" />
                  <img
                    src={trailericonRed}
                    alt="trailer"
                    className="hover-img"
                  />
                  <img
                    src={trailericonWhite}
                    alt="trailer"
                    className="active-img"
                  />
                </em>
                Trailers
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("driver") && (
            <li>
              <NavLink to={routes.driverListing} activeClassName="active">
                <em>
                  <img src={driverNoraml} alt="driver" className="normal-img" />
                  <img src={driverRed} alt="driver" className="hover-img" />
                  <img src={driverWhite} alt="driver" className="active-img" />
                </em>
                Drivers
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("tollLocation") && (
            <li>
              <NavLink to={routes.tollLocation} activeClassName="active">
                <em>
                  <img
                    src={location}
                    alt="tollLocation"
                    className="normal-img"
                  />
                  <img
                    src={locationRed}
                    alt="tollLocation"
                    className="hover-img"
                  />
                  <img
                    src={locationWhite}
                    alt="tollLocation"
                    className="active-img"
                  />
                </em>
                Toll Locations
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("holiday") && (
            <li>
              <NavLink to={routes.holidays} activeClassName="active">
                <em>
                  <img
                    src={holidayNormal}
                    alt="holidays"
                    className="normal-img"
                  />
                  <img
                    src={holidayRed}
                    alt="tollLocation"
                    className="hover-img"
                  />
                  <img
                    src={holidayWhite}
                    alt="tollLocation"
                    className="active-img"
                  />
                </em>
                Holidays
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("user") && (
            <li>
              <NavLink to={routes.staffUsers} activeClassName="active">
                <em>
                  <img
                    src={staffUserNormal}
                    alt="staff"
                    className="normal-img"
                  />
                  <img src={staffUserRed} alt="staff" className="hover-img" />
                  <img
                    src={staffUserWhite}
                    alt="staff"
                    className="active-img"
                  />
                </em>
                Staff Users
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("rolePermission") && (
            <li>
              <NavLink to={routes.rolesPermission} activeClassName="active">
                <em>
                  <img src={rolesNormal} alt="roles" className="normal-img" />
                  <img src={rolesRed} alt="roles" className="hover-img" />
                  <img src={rolesWhite} alt="roles" className="active-img" />
                </em>
                Roles Permissions
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("organisation") && (
            <li>
              <NavLink to={routes.organisation} activeClassName="active">
                <em>
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
                </em>
                Wymap Organisation
              </NavLink>
            </li>
          )}
          {getPermissions() && getPermissions().includes("cto") && (
            <li>
              <NavLink to={routes.ctos} activeClassName="active">
                <em>
                  <img src={cto} alt="cto" className="normal-img" />
                  <img src={ctoRed} alt="cto" className="hover-img" />
                  <img src={ctoWhite} alt="cto" className="active-img" />
                </em>
                CTO
              </NavLink>
            </li>
          )}

          <li className="logout-link">
            <Logout />
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default ProfileSideBar;
