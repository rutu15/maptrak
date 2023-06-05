import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_DRIVERS_RUNSHEET,
  FETCH_DRIVERS_RUNSHEET_SUCCESS,
  FETCH_DRIVERS_RUNSHEET_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import TableListing from "./table-listing";
import { TimeReportStyle } from "./style";

function TimeReport() {
  const classes = TimeReportStyle();
  const [, dispatch] = useStore();
  const [search, setSearch] = useState("");
  const { id } = useParams();

  // API calling to get job runsheet of driver
  const getRunsheet = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_DRIVERS_RUNSHEET });
    API.get(`drivers/${id}/dailyJobRunsheets`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_DRIVERS_RUNSHEET_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_DRIVERS_RUNSHEET_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getRunsheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getRunsheet(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };
  return (
    <div className={classes.TimeReportWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search Job ID"
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
export default TimeReport;
