import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import ProfileSideBar from "@components/profile-sidebar";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILURE,
  SET_NOTIFICATION,
  SET_NOTIFICATION_SUCCESS,
  SET_NOTIFICATION_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { NotificationStyle } from "./style";

// Regex for email
const re = /([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;

function NotificationPage() {
  const classes = NotificationStyle();
  const [data, setData] = useState([]);
  const [state, dispatch] = useStore();

  // API calling to get notification
  const getNotification = () => {
    dispatch({ type: GET_NOTIFICATION });
    API.get("notifications")
      .then((response) => {
        dispatch({
          type: GET_NOTIFICATION_SUCCESS,
          payload: response.data.data,
        });
        const temp = response.data.data.map((item) => {
          return {
            emails: item.emails !== "" ? item.emails.split(",") : [],
            id: item.id,
            isEnable: item.isEnable === "0" ? false : true,
            notification: item.notification,
            reportType: item.reportType,
          };
        });
        setData(temp);
      })
      .catch((err) => {
        dispatch({ type: GET_NOTIFICATION_FAILURE, payload: err });
      });
  };

  useEffect(() => {
    getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic, Validation and API calling for updating notification
  const handleClick = () => {
    const temp = data.map((item, index) => {
      if (item.isEnable === true && item.emails.length === 0) {
        item.flagCheck = true;
        item.emailErr = "Email is required";
      } else {
        item.flagCheck = false;
      }
      return {
        ...item,
        emails: Array.isArray(item.emails)
          ? item.emails
          : item.emails.length && item.emails.split(","),
        isEnable: item.isEnable ? "1" : "0",
      };
    });
    const temp2 = data.map((item, index) => {
      if (item.isEnable === true && item.emails.length === 0) {
        item.flagCheck = true;
        item.emailErr = "Email is required";
      } else {
        item.flagCheck = false;
      }
      return {
        ...item,
      };
    });

    setData(temp2);
    let flag = data.find((x) => x.flag === true);
    let flagCheck = data.find((x) => x.flagCheck === true);
    if (flag?.flag !== true && flagCheck?.flagCheck !== true) {
      dispatch({ type: SET_NOTIFICATION });
      API.put("notifications", { data: temp })
        .then((response) => {
          dispatch({
            type: SET_NOTIFICATION_SUCCESS,
            payload: response.data.data,
          });
          getNotification();
          toast.success("Notification Updated Successfully");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          dispatch({ type: SET_NOTIFICATION_FAILURE, payload: err });
        });
    }
  };

  const handleChange = (e, type, id, item) => {
    if (type === "emails") item.emails.push(e);
    const newArray = [...data];
    newArray[id] = {
      ...newArray[id],
      [type]: type === "emails" ? item.emails : e.target.checked,
    };
    if (type === "emails") {
      if (e === "") {
        newArray[id].flag = true;
        newArray[id].emailErr = "Email is required";
      } else {
        if (re.test(e)) {
          const filll = newArray[id].emails.map((item) => {
            return re.test(item);
          });
          if (filll.includes(false)) {
            newArray[id].flag = true;
            newArray[id].emailErr = "Email is invalid";
          } else {
            newArray[id].flag = false;
            newArray[id].flagCheck = false;
          }
        } else {
          newArray[id].flag = true;
          newArray[id].emailErr = "Email is invalid";
        }
      }
    }
    setData(newArray);
  };

  const handleDeleteChip = (e, id, item) => {
    const temp = item.emails.indexOf(e);
    item.emails.splice(temp, 1);
    const newArray = [...data];
    newArray[id] = {
      ...newArray[id],
      emails: item.emails,
    };
    const filterData = newArray[id].emails.map((item) => {
      return re.test(item);
    });
    if (filterData.includes(false)) {
      newArray[id].flag = true;
      newArray[id].emailErr = "Email is invalid";
    } else {
      newArray[id].flag = false;
    }

    setData(newArray);
  };
  return (
    <>
      <Header />
      <div className={classes.NotificationPageWrapper}>
        <Loader
          loading={
            state.notification.loadingNotification ||
            state.notification.settingNotification
          }
        />
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
                      <Typography variant="h2">Notifications</Typography>
                      {data?.map((item, index) => {
                        return (
                          <div className="form-row" key={index}>
                            <div className="form-group two-column">
                              <FormControl component="fieldset">
                                <FormGroup
                                  aria-label="position"
                                  className="custom-checkbox"
                                >
                                  <FormControlLabel
                                    value="end"
                                    control={
                                      <Checkbox
                                        name="isEnable"
                                        checked={item.isEnable}
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            "isEnable",
                                            index,
                                            item
                                          )
                                        }
                                        icon={
                                          <img
                                            src={uncheckedIcon}
                                            alt="CheckBox"
                                          />
                                        }
                                        checkedIcon={
                                          <img
                                            src={checkedIcon}
                                            alt="CheckBox"
                                          />
                                        }
                                      />
                                    }
                                    label={item.notification}
                                    labelPlacement="end"
                                  />
                                </FormGroup>
                              </FormControl>
                            </div>
                            <div className="form-group two-column">
                              <ChipInput
                                className="chip-input"
                                name="emails"
                                value={item.emails}
                                onAdd={(e) =>
                                  handleChange(e, "emails", index, item)
                                }
                                onDelete={(e) =>
                                  handleDeleteChip(e, index, item)
                                }
                                placeholder="Email address"
                              />

                              <FormHelperText className="error-text">
                                {(item.flagCheck === true ||
                                  item.flag === true) &&
                                  item.emailErr !== "" &&
                                  item.emailErr}
                              </FormHelperText>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="form-btn-wrapper">
                      <Button
                        className="orange-btn lg primary-btn"
                        color="inherit"
                        disableElevation
                        onClick={handleClick}
                        disabled={
                          state.notification.loadingNotification ||
                          state.notification.settingNotification
                        }
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
export default NotificationPage;
