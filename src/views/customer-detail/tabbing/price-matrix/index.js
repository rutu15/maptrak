import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";

import { useStore } from "@store/store";
import {
  FETCH_PRICE_MATRIX,
  FETCH_PRICE_MATRIX_SUCCESS,
  FETCH_PRICE_MATRIX_FAILURE,
  FETCH_CUSTOMER_ID,
  FETCH_CUSTOMER_ID_SUCCESS,
  FETCH_CUSTOMER_ID_FAILURE,
  GET_DAILY_MINIMUM_HOURS,
  GET_DAILY_MINIMUM_HOURS_SUCCESS,
  GET_DAILY_MINIMUM_HOURS_FAILURE,
  GET_DAILY_MINIMUM_HOURS_CONSIGNMENT,
  GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
  GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE,
  FETCH_PRICE_MATRIX_CONSIGNMENT,
  FETCH_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
  FETCH_PRICE_MATRIX_CONSIGNMENT_FAILURE,
  FETCH_PER_JOB,
  FETCH_PER_JOB_SUCCESS,
  FETCH_PER_JOB_FAILURE,
  FETCH_WAITING_TIME,
  FETCH_WAITING_TIME_SUCCESS,
  FETCH_WAITING_TIME_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import ULDListing from "./table-listing/uld";
import LooseListing from "./table-listing/loose";
import MinimumHours from "./table-listing/minimum-hours";
import FuelSurcharge from "./table-listing/fuel-surcharge";
import Validity from "./table-listing/validity";
import Consignment from "./table-listing/consignment";
import MinimumInvoice from "./table-listing/minimum-invoice-value";
import WaitingTime from "./table-listing/waiting-time";
import PerJob from "./table-listing/per-job";
import { PriceMatrixStyle } from "./style";

function PriceMatrix() {
  const classes = PriceMatrixStyle();
  const [value, setValue] = useState(0);
  const [, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get price matrix
  let getPriceMatrix = () => {
    dispatch({ type: FETCH_PRICE_MATRIX });
    API.get(`customers/${id}/priceMatrix`)
      .then((response) => {
        dispatch({
          type: FETCH_PRICE_MATRIX_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRICE_MATRIX_FAILURE, payload: error });
      });
  };

  // API calling to get consignment price matrix
  let getPriceMatrixConsignment = () => {
    dispatch({
      type: FETCH_PRICE_MATRIX_CONSIGNMENT,
    });
    API.get(`customers/${id}/consignmentPriceMatrix`)
      .then((response) => {
        console.log("consignment data ", response.data.data);
        dispatch({
          type: FETCH_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PRICE_MATRIX_CONSIGNMENT_FAILURE,
          payload: error,
        });
      });
  };

  // API calling to get customers id
  let apiCall = () => {
    dispatch({ type: FETCH_CUSTOMER_ID });
    API.get(`customers/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_ID_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_ID_FAILURE, payload: error });
      });
  };

  // API calling to get daily minimum hours
  const getDailyMinimumHours = () => {
    dispatch({
      type: GET_DAILY_MINIMUM_HOURS,
    });
    API.get(`customers/${id}/dailyMinimumHours`)
      .then((response) => {
        dispatch({
          type: GET_DAILY_MINIMUM_HOURS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_DAILY_MINIMUM_HOURS_FAILURE, payload: error });
      });
  };

  // API calling to get daily minimum hours for consignment
  const getDailyMinimumHoursConsignment = () => {
    dispatch({
      type: GET_DAILY_MINIMUM_HOURS_CONSIGNMENT,
    });
    API.get(`customers/${id}/dailyMinimumHoursConsignment`)
      .then((response) => {
        console.log("getting data => ", response.data);
        dispatch({
          type: GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE, payload: error });
      });
  }

  // API calling to get per job
  const getPerJob = () => {
    dispatch({
      type: FETCH_PER_JOB,
    });
    API.get(`customers/${id}/perJobPriceMatrix`)
      .then((response) => {
        dispatch({
          type: FETCH_PER_JOB_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_PER_JOB_FAILURE, payload: error });
      });
  };

  // API calling to get waiting time data
  const getWaitingTimeData = () => {
    dispatch({
      type: FETCH_WAITING_TIME,
    });
    API.get(`/customers/${id}/waitingTimePriceMatrix`)
    .then((response)=> {
      dispatch({
        type: FETCH_WAITING_TIME_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch((error)=> {
      dispatch({
        type: FETCH_WAITING_TIME_FAILURE,
        payload: error,
      });
    })
  }

  useEffect(() => {
    getPriceMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value === 6) getWaitingTimeData();
    if (value === 3) getPerJob();
    if (value === 4){
      getDailyMinimumHours();
      getDailyMinimumHoursConsignment();
    } 
    if (value === 2) getPriceMatrixConsignment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index } = props;
    return (
      value === index && <div className="tab-pannel-wrapper"> {children} </div>
    );
  }
  return (
    <>
      <div className={classes.TabbingWrapper}>
        <div className="white-card tabbing-wrapper">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="ULD" />
            <Tab label="Loose" />
            <Tab label="Consgt. Price Matrix" />
            <Tab label="Per Job" />
            <Tab label="Daily Min. Hours" />
            <Tab label="Min. Invoice Value" />
            <Tab label="Waiting Time" />
            <Tab label="Fuel Surcharge" />
            <Tab label="Validity" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ULDListing getPriceMatrix={getPriceMatrix} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LooseListing getPriceMatrix={getPriceMatrix} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Consignment
              getPriceMatrixConsignment={getPriceMatrixConsignment}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PerJob getPerJob={getPerJob} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <MinimumHours
              getDailyMinimumHours={getDailyMinimumHours}
              getDailyMinimumHoursConsignment={getDailyMinimumHoursConsignment}
              getCustomer={apiCall}
            />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <MinimumInvoice getCustomer={apiCall} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <WaitingTime getWaitingTimeData={getWaitingTimeData} getCustomer={apiCall} />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <FuelSurcharge getCustomer={apiCall} />
          </TabPanel>
          <TabPanel value={value} index={8}>
            <Validity getCustomer={apiCall} />
          </TabPanel>
        </div>
      </div>
    </>
  );
}
export default React.memo(PriceMatrix);
