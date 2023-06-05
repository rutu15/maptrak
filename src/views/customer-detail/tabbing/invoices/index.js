import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, FormControl, Select, MenuItem } from "@material-ui/core";
import moment from "moment";
import { ExpandMore } from "@material-ui/icons";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_CUSTOMER_INVOICES,
  FETCH_CUSTOMER_INVOICES_SUCCESS,
  FETCH_CUSTOMER_INVOICES_FAILURE,
} from "@utils/actionTypes";
import { getCustomFormToDate } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import API from "@services/axios";
import DatePopup from "./date-popup";
import TableListing from "./table-listing";
import { InvoiceStyle } from "./style";

function Invoice() {
  const classes = InvoiceStyle();
  const materilClasses = materialCommonStyles();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [period, setPeriod] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [customDate, setCustomDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [dateData, setDateData] = useState({
    startDate: null,
    endDate: null,
  });
  const [, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get list of invoices
  let getCustomerInvoicies = () => {
    const params = {
      ...(!!search ? { search } : {}),
      ...(!!order ? { order } : {}),
      ...(!!orderBy ? { orderBy } : {}),
      filter: {
        ...(!!dateData.startDate ? { startDate: dateData.startDate } : {}),
        ...(!!dateData.endDate ? { endDate: dateData.endDate } : {}),
      },
    };
    dispatch({ type: FETCH_CUSTOMER_INVOICES });
    API.get(`customers/${id}/invoices`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_INVOICES_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_INVOICES_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCustomerInvoicies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, dateData]);

  useDebouncedEffect(() => getCustomerInvoicies(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };

  const handleChange = (event, type) => {
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
  const handleClose = () => {
    setOpen(false);
    setPeriod("");
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };
  const handleSubmit = () => {
    setOpen(false);
    setShow(true);
    setDateData(customDate);
    setPeriod(7);
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };

  const handlePeriodChange = (event, type) => {
    const { value } = event.target;
    setPeriod(value);
    setShow(false);
    if (value === "") {
      setDateData({
        startDate: null,
        endDate: null,
      });
    }
    if (value === 7 || type === true) {
      setOpen(true);
    } else {
      const newDate = new Date();
      if (value === 1) {
        setDateData({
          startDate: moment(newDate).format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 2) {
        setDateData({
          startDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
        });
      } else if (value === 3) {
        setDateData({
          startDate: moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 4) {
        setDateData({
          startDate: moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 5) {
        setDateData({
          startDate: moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      } else if (value === 6) {
        setDateData({
          startDate: moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
          endDate: moment(newDate).format("YYYY-MM-DD"),
        });
      }
    }
  };

  return (
    <div className={classes.InvoiceWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search invoices"
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
        <div className="jobtype-wrapper">
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={period}
              onChange={handlePeriodChange}
              displayEmpty
              className={materilClasses.customSelect}
              MenuProps={{
                classes: { paper: materilClasses.customSelect },
              }}
              IconComponent={() => <ExpandMore />}
            >
              <MenuItem value={""}>Select Period</MenuItem>
              <MenuItem value={1}>Today</MenuItem>
              <MenuItem value={2}>Yesterday</MenuItem>
              <MenuItem value={3}>Last 3 days</MenuItem>
              <MenuItem value={4}>Last 7 days</MenuItem>
              <MenuItem value={5}>Last fortnight</MenuItem>
              <MenuItem value={6}>Last 30 days</MenuItem>
              <MenuItem value={7} onClick={(e) => handlePeriodChange(e, true)}>
                {show
                  ? getCustomFormToDate(dateData.startDate, dateData.endDate)
                  : "Custom Range"}
              </MenuItem>
            </Select>
            <DatePopup
              open={open}
              handleSubmit={handleSubmit}
              handleClose={handleClose}
              data={customDate}
              handleChange={(e, type) => handleChange(e, type)}
            />
          </FormControl>
        </div>
      </div>
      <TableListing
        handleSorting={(e, property) => handleSorting(e, property)}
        orderBy={orderBy}
        order={order}
      />
    </div>
  );
}
export default Invoice;
