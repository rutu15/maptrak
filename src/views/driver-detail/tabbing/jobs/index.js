import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_DRIVERS_JOBS,
  FETCH_DRIVERS_JOBS_SUCCESS,
  FETCH_DRIVERS_JOBS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import TableListing from "./table-listing";
import AssignJob from "./assign-job";
import Filter from "./filter";
import { JobsStyle } from "./style";

function Jobs() {
  const classes = JobsStyle();
  const [, dispatch] = useStore();
  const { id } = useParams();
  const [getState, setState] = useState({ right: false });
  const [period, setPeriod] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [updateFilter, setUpdateFilter] = useState({});
  const [filterData, setFilterData] = useState({
    jobType: "",
    truckRego: "",
    jobStatus: "",
    cargoLocation: "",
    startDate: null,
    endDate: null,
  });
  const [customDate, setCustomDate] = useState({
    startDate: null,
    endDate: null,
  });

  // To open drawer of filter
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...getState, [anchor]: open });
  };

  const handleSubmit = (item) => {
    setUpdateFilter(filterData);
    setState({ ...getState, [item]: false });
  };

  // To handle values of filter drawer
  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  // To handle custome date popup
  const handleCustomDateSubmit = () => {
    setOpen(false);
    setShow(true);
    setFilterData({
      ...filterData,
      startDate: customDate.startDate,
      endDate: customDate.endDate,
    });
    setPeriod(7);
    if (!getState) setUpdateFilter(filterData);
  };

  const handleReset = (item) => {
    setShow(false);
    setPeriod("");
    setFilterData({
      jobType: "",
      truckRego: "",
      jobStatus: "",
      cargoLocation: "",
      startDate: null,
      endDate: null,
    });
    setState({ ...getState, [item]: false });
    setUpdateFilter({
      jobType: "",
      truckRego: "",
      jobStatus: "",
      cargoLocation: "",
      startDate: null,
      endDate: null,
    });
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };

  // To close date popup
  const handleClose = () => {
    setPeriod("");
    setOpen(false);
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };

  // Handle period change dropdown of filter
  const handlePeriodChange = (event, type) => {
    const { value } = event.target;
    setPeriod(value);
    if (value === 7 || type === true) {
      setOpen(true);
    } else {
      const newDate = new Date();
      if (value === "") {
        setFilterData({
          ...filterData,
          startDate: null,
          endDate: null,
        });
        setCustomDate({
          startDate: null,
          endDate: null,
        });
      } else if (value === 1) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 2) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
        });
      } else if (value === 3) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 4) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 5) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 6) {
        setFilterData({
          ...filterData,
          startDate: moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      }
    }
  };

  // To handle custom date of date popup
  const handleCustomChange = (event, type) => {
    if (type === "startDate" || type === "endDate") {
      setCustomDate({
        ...customDate,
        [type]: moment(event).format("YYYY-MM-DD"),
      });
    } else {
      const { name, value } = event.target;
      setCustomDate({
        ...customDate,
        [name]: value,
      });
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // API calling to get jobs of particular driver
  const getJobs = () => {
    const params = {
      ...(!!search ? { search } : {}),
      filter: {
        ...(!!filterData.jobStatus
          ? { jobStatusId: filterData.jobStatus }
          : {}),
        ...(!!filterData.cargoLocation
          ? { ctoId: filterData.cargoLocation }
          : {}),
        ...(!!filterData.truckRego ? { truckId: filterData.truckRego } : {}),
        ...(!!filterData.jobType ? { jobTypeId: filterData.jobType } : {}),
        ...(!!filterData.startDate
          ? { startDate: filterData.startDate }
          : !!customDate.startDate
          ? { startDate: filterData.startDate }
          : {}),
        ...(!!filterData.endDate
          ? { endDate: filterData.endDate }
          : !!customDate.endDate
          ? { endDate: filterData.endDate }
          : {}),
      },
    };
    dispatch({ type: FETCH_DRIVERS_JOBS });
    API.get(`drivers/${id}/jobs`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_DRIVERS_JOBS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_DRIVERS_JOBS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFilter]);

  useDebouncedEffect(() => getJobs(), 1000, [search]);
  return (
    <div className={classes.JobsWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search jobs"
              variant="outlined"
              type="search"
              value={search}
              onChange={handleSearch}
              InputProps={{
                endAdornment: <img src={SearchIcon} alt="Search" />,
              }}
            />
          </div>
        </div>
        <div className="button-assign-filter">
          <Filter
            toggleDrawer={toggleDrawer}
            handleFilter={handleFilter}
            getState={getState}
            handleSubmit={handleSubmit}
            handlePeriodChange={handlePeriodChange}
            handleCustomChange={handleCustomChange}
            handleCustomDateSubmit={handleCustomDateSubmit}
            filterData={filterData}
            open={open}
            period={period}
            show={show}
            customDate={customDate}
            handleReset={handleReset}
            handleClose={handleClose}
          />
          <AssignJob getJobs={getJobs} />
        </div>
      </div>
      <TableListing />
    </div>
  );
}

export default Jobs;
