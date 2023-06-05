import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { useStore } from "@store/store";
import Header from "@components/header";
import { routes } from "@utils/constant";
import {
  FETCH_CUSTOMER_ID,
  FETCH_CUSTOMER_ID_SUCCESS,
  FETCH_CUSTOMER_ID_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import EditBlock from "./edit-block";
import Tabbing from "./tabbing";
import { CustomerDetailStyle } from "./style";

function CustomerDetail() {
  const classes = CustomerDetailStyle();
  const { id } = useParams();
  const history = useHistory();
  const [, dispatch] = useStore();

  let apiCall = () => {
    dispatch({ type: FETCH_CUSTOMER_ID });
    API.get(`customers/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_ID_SUCCESS,
          payload: response.data.data,
        });
        // Prevent accessing child customer from url
        if (response.data.data?.parentCustomer !== null) {
          history.push(routes.pageNotFound);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_ID_FAILURE, payload: error });
        if (error?.response?.status === 404) {
          history.push(routes.pageNotFound);
        }
      });
  };

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <div className={classes.CustomerDetailWrapper}>
        <div className="wrapper job-detail-page">
          <div className="inner-page">
            <div className={classes.backLinkWrapper}>
              <Link to={routes.customerListing} className={classes.backToPage}>
                <ArrowBackIosIcon /> Back to customers
              </Link>
            </div>
            <div className="detail-col-layout">
              <div className="left-block">
                <EditBlock getCustomer={apiCall} />
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
export default CustomerDetail;
