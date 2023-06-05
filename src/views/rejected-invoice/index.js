import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, TextField, Button } from "@material-ui/core";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import {
  FETCH_REJECTED_INVOICES,
  FETCH_REJECTED_INVOICES_SUCCESS,
  FETCH_REJECTED_INVOICES_FAILURE,
  GET_DRAFT_INVOICE_CHAT,
  GET_DRAFT_INVOICE_CHAT_SUCCESS,
  GET_DRAFT_INVOICE_CHAT_FAILURE,
  SAVE_DRAFT_CHAT,
  SAVE_DRAFT_CHAT_SUCCESS,
  SAVE_DRAFT_CHAT_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  RESOLVE_REJECTED_INVOICES,
  RESOLVE_REJECTED_INVOICES_SUCCESS,
  RESOLVE_REJECTED_INVOICES_FAILURE,
} from "@utils/actionTypes";
import {
  getFilter,
  setFilter,
  removeFilter,
  uploadImage,
} from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import Filter from "./filter";
import TableListing from "./tableListing";
import { invoiceStyle } from "./style";
function InvoiceView() {
  const classes = invoiceStyle();
  const filter = getFilter("rejectedInvoiceFilter", true);
  const dashboardFilter = getFilter("jobDashboardFilter", true);
  const [state, dispatch] = useStore();
  const [dataTable, setData] = useState([]);
  const [getState, setState] = useState({ right: false });
  const [selectedArray, setSelectedArray] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [period, setPeriod] = useState(
    filter ? filter.period : dashboardFilter ? dashboardFilter?.period : ""
  );
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [updateFilter, setUpdateFilter] = useState({});
  const [dateopen, setDateOpen] = useState(false);
  // https://wymap.atlassian.net/browse/MAPTRAK-850 Default rejected filter
  const [filterData, setFilterData] = useState({
    cityId: filter
      ? filter?.cityId
      : dashboardFilter
      ? dashboardFilter?.city
      : "",
    status: filter?.status || 1,
    customer: filter
      ? filter?.customer
      : dashboardFilter?.customer?.length
      ? [dashboardFilter?.customer]
      : [],
    startDate: filter
      ? filter?.startDate
      : dashboardFilter
      ? dashboardFilter?.startDate
      : "",
    endDate: filter
      ? filter?.endDate
      : dashboardFilter
      ? dashboardFilter?.endDate
      : "",
  });
  const [customDate, setCustomDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [senderId, setSenderId] = useState("");
  const [newMessage, setMessage] = useState("");
  const [messagePage, setMessagePage] = useState(0);
  const [searchMessage, setSearchMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [image, setImage] = useState(null);
  const [chatType, setChatType] = useState("1");
  const [error, setError] = useState("");

  // API calling to get list of rejected invoices
  const getRejectedInvoices = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!search ? { search } : {}),
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
      filter: {
        ...(!!filterData.cityId ? { cityId: filterData.cityId } : {}),
        ...(!!filterData.status ? { status: filterData.status } : {}),
        ...(!!filterData.customer.length
          ? { customerId: filterData.customer }
          : {}),
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
    dispatch({ type: FETCH_REJECTED_INVOICES });
    API.get("invoices/rejectedInvoices", { params })
      .then((response) => {
        dispatch({
          type: FETCH_REJECTED_INVOICES_SUCCESS,
          payload: response.data.data,
        });
        setData(response?.data?.data?.rows);
      })
      .catch((error) => {
        dispatch({ type: FETCH_REJECTED_INVOICES_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    getRejectedInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy, updateFilter]);

  useEffect(() => {
    return () => {
      removeFilter("rejectedInvoiceFilter");
      removeFilter("jobDashboardFilter");
    };
  }, []);

  useDebouncedEffect(() => getRejectedInvoices(), 1000, [search]);

  // To handle checkboxes of listing
  const handleChange = (item) => {
    if (!open) setOpen(true);
    let _id = item.id;
    let index = dataTable.findIndex((x) => x.id === _id);
    let data = dataTable;
    if (index > -1) {
      let newState = !item._rowChecked;
      data[index]._rowChecked = newState;
      setData(data);
    }
    if (data.filter((res) => res._rowChecked === true).length === data.length) {
      setMainCheck(true);
    } else {
      setMainCheck(false);
    }
    let newarray = [];
    dataTable.map((res) => {
      if (res._rowChecked === true && res.isResolved !== true) {
        newarray.push(res.id);
      }
      return true;
    });
    setSelectedArray(newarray);
  };

  // To handle main checkbox
  const handleMainChangeCheckBox = (e) => {
    let _val = e.target.checked;
    if (e.target.checked === true) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    dataTable.forEach((element) => {
      element._rowChecked = _val;
    });
    setData(dataTable);
    setMainCheck(_val);
    let newmainarray = [];
    dataTable.map((res, index) => {
      if (res._rowChecked === true && res.isResolved !== true) {
        newmainarray.push(res.id);
      }
      return true;
    });
    setSelectedArray(newmainarray);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...getState, [anchor]: open });
    setMainCheck(false);
    setSelectedArray([]);
  };

  const handleSubmit = (item) => {
    setUpdateFilter(filterData);
    setState({ ...getState, [item]: false });
    setFilter("rejectedInvoiceFilter", { ...filterData, period }, true);
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };
  const handleCustomDateSubmit = () => {
    setDateOpen(false);
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
    removeFilter("rejectedInvoiceFilter");
    removeFilter("jobDashboardFilter");
    setShow(false);
    setPeriod("");
    setFilterData({
      cityId: "",
      status: 1,
      customer: [],
      startDate: null,
      endDate: null,
    });
    setState({ ...getState, [item]: false });
    setUpdateFilter({
      cityId: "",
      status: 1,
      customer: [],
      startDate: null,
      endDate: null,
    });
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };
  const handlePeriodChange = (event, type) => {
    const { value } = event.target;
    setPeriod(value);
    setFilter(
      "rejectedInvoiceFilter",
      {
        ...filterData,
        period: value,
      },
      true
    );
    if (value === 7 || type === true) {
      setDateOpen(true);
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

  const handleClose = () => {
    setPeriod("");
    setDateOpen(false);
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
    setSelectedArray([]);
  };

  const handleChangePage = (event, newPage) => {
    setSelectedArray([]);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSelectedArray([]);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSorting = (event, property) => {
    setSelectedArray([]);
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };
  useEffect(() => {
    if (openChat === true) {
      if (senderId) {
        getChat();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, messagePage, openChat]);

  useDebouncedEffect(() => getChat(), 1000, [searchMessage]);

  const getChat = () => {
    const params = {
      page: searchMessage !== "" ? 1 : parseInt(messagePage) + 1,
      size: 30,
      ...(!!searchMessage ? { search: searchMessage } : {}),
    };
    dispatch({
      type: GET_DRAFT_INVOICE_CHAT,
    });
    API.get(`invoices/${senderId}/chats`, { params })
      .then((response) => {
        dispatch({
          type: GET_DRAFT_INVOICE_CHAT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DRAFT_INVOICE_CHAT_FAILURE,
          payload: error,
        });
      });
  };

  const saveChat = (path) => {
    dispatch({
      type: SAVE_DRAFT_CHAT,
    });
    API.post(`invoices/${senderId}/chat`, {
      chat: path ? image?.target?.files[0]?.name : newMessage,
      chatType: chatType,
      ...(!!path ? { filePath: path } : {}),
    })
      .then((response) => {
        setMessageSent(true);
        setMessage("");
        setChatType("1");
        setImage(null);
        getChat();
        setMessagePage(0);
        dispatch({
          type: SAVE_DRAFT_CHAT_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SAVE_DRAFT_CHAT_FAILURE,
        });
      });
  };
  const sendMessage = () => {
    if (image) {
      dispatch({
        type: IMAGE_UPLOAD,
      });
      uploadImage(image, image.target.files[0]?.type, "invoice-chat")
        .then((res) => {
          saveChat(res?.data?.fileName);
          dispatch({
            type: IMAGE_UPLOAD_SUCCESS,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: IMAGE_UPLOAD_FAILURE,
          });
          toast.error(" Uploading Failed");
        });
    } else {
      saveChat();
    }
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSearchedMessage = (e) => {
    setSearchMessage(e.target.value);
  };

  const uploadFile = (event) => {
    if (event?.target?.files && event?.target?.files?.length) {
      setImage(event);
      const type = event.target?.files[0]?.type.split("/")[0]?.trim();
      if (type === "video") {
        if (event?.target?.files[0].size > 52428800) {
          setError("You can't upload video more than 50 mb");
          toast.error("You can't upload video more than 50 mb");
        } else setError("");
        setChatType("3");
      } else if (type === "application") {
        setChatType("4");
      } else if (type === "image") {
        if (event?.target?.files[0].size > 10485760) {
          setError("You can't upload image more than 10 mb");
          toast.error("You can't upload image more than 10 mb");
        } else setError("");
        setChatType("2");
      } else {
        setChatType("1");
        setError("");
      }
    }
  };
  // Worked on https://wymap.atlassian.net/browse/MAPTRAK-850
  // API calling to approve selected invoice
  const handleResolve = () => {
    dispatch({ type: RESOLVE_REJECTED_INVOICES });
    API.put("invoices/resolves", {
      invoiceIds: selectedArray,
    })
      .then(() => {
        dispatch({
          type: RESOLVE_REJECTED_INVOICES_SUCCESS,
        });
        toast.success("Invoice Resolved Successfully");
        getRejectedInvoices();
        setSelectedArray([]);
      })
      .catch((error) => {
        dispatch({ type: RESOLVE_REJECTED_INVOICES_FAILURE });
        toast.error(error?.response?.data?.message);
      });
  };

  // API

  return (
    <>
      <Header />
      <div className={classes.invoiceWrapper}>
        <Loader
          loading={
            state.invoice?.loadingRejectedInvoice ||
            state?.invoice?.resolvingInvoice
          }
        />
        <div className="wrapper">
          <div className="request-form-section">
            <div className="filter-search-title-strip">
              <Typography variant="h1">Rejected Invoices</Typography>
              <div className="filter-search-wrapper">
                {updateFilter.status !== 2 && (
                  <div className="inner-col">
                    <div className="form-gourp">
                      <Button
                        className="orange-btn primary-btn"
                        color="inherit"
                        disableElevation
                        onClick={handleResolve}
                        disabled={selectedArray?.length === 0}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                )}

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
                <div className="inner-col">
                  <Filter
                    toggleDrawer={toggleDrawer}
                    handleFilter={handleFilter}
                    getState={getState}
                    handleSubmit={handleSubmit}
                    handlePeriodChange={handlePeriodChange}
                    handleCustomChange={handleCustomChange}
                    handleCustomDateSubmit={handleCustomDateSubmit}
                    filterData={filterData}
                    open={dateopen}
                    period={period}
                    show={show}
                    customDate={customDate}
                    handleReset={handleReset}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
            <TableListing
              page={page}
              handleChange={handleChange}
              handleMainChange={handleMainChangeCheckBox}
              _maincheck={mainCheck}
              open={open}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSorting={(e, property) => handleSorting(e, property)}
              orderBy={orderBy}
              order={order}
              search={search}
              filterData={updateFilter}
              sendMessage={sendMessage}
              data={dataTable && dataTable}
              setOpenChat={setOpenChat}
              setSenderId={setSenderId}
              handleMessage={handleMessage}
              newMessage={newMessage}
              setMessagePage={setMessagePage}
              messagePage={messagePage}
              handleSearchedMessage={handleSearchedMessage}
              searchMessage={searchMessage}
              setSearchMessage={setSearchMessage}
              messageSent={messageSent}
              setMessageSent={setMessageSent}
              openChat={openChat}
              uploadFile={uploadFile}
              image={image}
              setImage={setImage}
              chatType={chatType}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceView;
