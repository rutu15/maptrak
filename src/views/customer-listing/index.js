import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useDebouncedEffect } from "@hooks/debounceEffect";

import { useStore } from "@store/store";
import Header from "@components/header";
import SearchIcon from "@assets/images/search.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
} from "@utils/actionTypes";
import { getFilter, setFilter } from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import AddCustomer from "./add-customer";
import TableListing from "./table-listing";
import { CustomerListingStyle } from "./style";
import FuelSurchargeUpdate from "./fuelSurchargeUpdate";

function CustomerListing() {
  const classes = CustomerListingStyle();
  const materilClasses = materialCommonStyles();
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [state, dispatch] = useStore();
  const [city, setCity] = useState(
    getFilter("customerCity") ? getFilter("customerCity") : ""
  );
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  // API calling to get list of customers
  let getCustomers = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
      ...(!!search ? { search } : {}),
      filter: {
        parent: 0,
        ...(status !== "" ? { status } : {}),
        ...(!!city ? { cityId: city } : {}),
      },
    };
    dispatch({ type: FETCH_CUSTOMERS });
    API.get("customers", { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMERS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };

  // API calling to get list of cities
  let getCities = () => {
    if (state.common.citiesData === null) {
      dispatch({ type: GET_CITIES });
      API.get("master/cities")
        .then((response) => {
          dispatch({
            type: GET_CITIES_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_CITIES_FAILURE, payload: error });
        });
    }
  };

  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page, rowsPerPage, city, order, orderBy]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setFilter("customerCity", event.target.value);
  };

  useDebouncedEffect(() => getCustomers(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };
  return (
    <>
      <Header />
      <div className={classes.CustomerListingWrapper}>
        <div className="dashboard-page wrapper">
          <div className="inner-page">
            <div className={classes.innerPageTopBlock}>
              <div className="left-block">
                <Typography variant="h1">Customers</Typography>
              </div>
              <div className="right-block">
                <div className="right-block-inner">
                  <div className="search-wrapper">
                    <div className="form-gourp">
                      <TextField
                        id="search-request"
                        placeholder="Search by Customer Name and Number"
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
                  <div className="dropdown_wrapper">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        value={status}
                        onChange={handleStatusChange}
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                      >
                        <MenuItem value={""}>Status</MenuItem>
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="dropdown_wrapper">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        value={city}
                        onChange={handleCityChange}
                        displayEmpty
                        className={materilClasses.customSelect}
                        MenuProps={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        IconComponent={() => <ExpandMore />}
                      >
                        <MenuItem value={""}>Select City</MenuItem>
                        {state.common.citiesData?.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="modal-wrapper">
                    <AddCustomer getCustomer={() => getCustomers()} />
                  </div>
                  <div className="modal-wrapper">
                    <FuelSurchargeUpdate />
                  </div>
                </div>
              </div>
            </div>
            <TableListing
              count={state?.customer?.customers?.count}
              data={state?.customer}
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSorting={(e, property) => handleSorting(e, property)}
              orderBy={orderBy}
              order={order}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerListing;
