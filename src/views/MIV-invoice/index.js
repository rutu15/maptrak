import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, TextField } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import {
  FETCH_MIV_INVOICES,
  FETCH_MIV_INVOICES_SUCCESS,
  FETCH_MIV_INVOICES_FAILURE,
  ASSIGN_MIV,
  ASSIGN_MIV_SUCCESS,
  ASSIGN_MIV_FAILURE,
  DONE_MIV,
  DONE_MIV_SUCCESS,
  DONE_MIV_FAILURE,
} from "@utils/actionTypes";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import TableListing from "./tableListing";
import { invoiceStyle } from "./style";

function InvoiceView() {
  const classes = invoiceStyle();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [, setAssign] = useState([]);
  const [state, dispatch] = useStore();

  // API calling to get MIV invoices
  const getMivInvoice = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!search ? { search } : {}),
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
    };
    dispatch({ type: FETCH_MIV_INVOICES });
    API.get("invoices/mivInvoices", { params })
      .then((response) => {
        dispatch({
          type: FETCH_MIV_INVOICES_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_MIV_INVOICES_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getMivInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy]);

  useDebouncedEffect(() => getMivInvoice(), 1000, [search]);

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

  // API calling to assign MIV difference to particular child
  const handleAssign = (index, item) => {
    const arr = state?.invoice?.mivInvoiceData?.rows;
    const temp = arr[index].childInvoice;
    temp.map((i) => {
      if (i.id === item.id) {
        i.flag = true;
      } else {
        i.flag = false;
      }
      return true;
    });
    setAssign([(oldArray) => [...oldArray, index]]);
    dispatch({ type: ASSIGN_MIV });
    API.put(`invoices/${item.id}/assignMIV`)
      .then((response) => {
        dispatch({
          type: ASSIGN_MIV_SUCCESS,
          payload: response.data.data,
        });
        getMivInvoice();
        toast.success("MIV Amount Updated Successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        dispatch({ type: ASSIGN_MIV_FAILURE, payload: error });
      });
  };

  // API calling to confirm assgning the difference amount to child
  const handleDone = (id) => {
    dispatch({ type: DONE_MIV });
    API.put(`invoices/${id}/doneMIV`)
      .then((response) => {
        dispatch({
          type: DONE_MIV_SUCCESS,
          payload: response.data.data,
        });
        getMivInvoice();
        toast.success("MIV Amount Confirmed Successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        dispatch({ type: DONE_MIV_FAILURE, payload: error });
      });
  };

  return (
    <>
      <Header />
      <div className={classes.invoiceWrapper}>
        <Loader
          loading={
            state.invoice?.loadingMivInvoice ||
            state.invoice?.loadingDoneMiv ||
            state.invoice?.assigningMiv
          }
        />
        <div className="wrapper">
          <div className="request-form-section">
            <div className="filter-search-title-strip">
              <Typography variant="h1">MIV Invoices</Typography>
              <div className="filter-search-wrapper">
                <div className="inner-col">
                  <div className="form-gourp">
                    <TextField
                      id="search-request"
                      placeholder="Search Invoice Number"
                      variant="outlined"
                      type="search"
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <TableListing
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSorting={(e, property) => handleSorting(e, property)}
              orderBy={orderBy}
              order={order}
              search={search}
              handleAssign={handleAssign}
              handleDone={handleDone}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceView;
