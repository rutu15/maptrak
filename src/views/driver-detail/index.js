import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { useStore } from "@store/store";
import Header from "@components/header";
import { routes } from "@utils/constant";
import {
  FETCH_DRIVERS_ID,
  FETCH_DRIVERS_ID_SUCCESS,
  FETCH_DRIVERS_ID_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import EditBlock from "./edit-block";
import Tabbing from "./tabbing";
import { DriverDetailStyle } from "./style";

function DriverDetail() {
  const classes = DriverDetailStyle();
  const { id } = useParams();
  const history = useHistory();
  const [, dispatch] = useStore();

  // API calling to get driver by id
  let getDriverById = () => {
    dispatch({ type: FETCH_DRIVERS_ID });
    API.get(`drivers/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_DRIVERS_ID_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_DRIVERS_ID_FAILURE, payload: error });
        if (error?.response?.status === 404) {
          history.push(routes.pageNotFound);
        }
      });
  };

  useEffect(() => {
    getDriverById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className={classes.DriverDetailWrapper}>
        <div className="wrapper job-detail-page">
          <div className="inner-page">
            <div className={classes.backLinkWrapper}>
              <Link to={routes.driverListing} className={classes.backToPage}>
                <ArrowBackIosIcon /> Back to drivers
              </Link>
            </div>
            <div className="detail-col-layout">
              <div className="left-block">
                <EditBlock getDriver={getDriverById} />
              </div>
              <div className="right-block">
                <Tabbing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DriverDetail;
