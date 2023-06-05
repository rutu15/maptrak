import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_CUSTOMER_JOBS,
  FETCH_CUSTOMER_JOBS_SUCCESS,
  FETCH_CUSTOMER_JOBS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import TableListing from "./table-listing";
import { JobsStyle } from "./style";

function Jobs() {
  const classes = JobsStyle();
  const [search, setSearch] = useState("");
  const [, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get list of customer's jobs
  let getCustomerJobs = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_CUSTOMER_JOBS });
    API.get(`customers/${id}/jobs`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_JOBS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_JOBS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCustomerJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getCustomerJobs(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  return (
    <div className={classes.JobsWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search jobs"
              variant="outlined"
              type="search"
              InputProps={{
                endAdornment: <img src={SearchIcon} alt="Search" />,
              }}
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <TableListing />
    </div>
  );
}

export default Jobs;
