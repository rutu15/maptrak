import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, TextField } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import {
  FETCH_ONLINE_REQUEST,
  FETCH_ONLINE_REQUEST_SUCCESS,
  FETCH_ONLINE_REQUEST_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  GET_ONLINE_REQUEST_CHAT,
  GET_ONLINE_REQUEST_CHAT_SUCCESS,
  GET_ONLINE_REQUEST_CHAT_FAILURE,
  SAVE_ONLINE_REQUEST_CHAT,
  SAVE_ONLINE_REQUEST_CHAT_SUCCESS,
  SAVE_ONLINE_REQUEST_CHAT_FAILURE,
} from "@utils/actionTypes";
import {
  uploadImage,
  getFilter,
  setFilter,
  removeFilter,
} from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import OnlineRequestFilter from "./filter";
import TableListing from "./tableListing";
import { RequestFormStyle } from "./style";

function OnlineRequestView() {
  const classes = RequestFormStyle();
  const persistFilter = getFilter("onlineRequestFilter", true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [updateFilter, setUpdateFilter] = useState({});
  const [getState, setState] = useState({
    right: false,
  });
  const [filterData, setFilterData] = useState({
    jobType: persistFilter?.jobType || "",
    cargoType: persistFilter?.cargoType || "",
    requestStatus: persistFilter?.requestStatus || "",
    jobStatus: persistFilter?.jobStatus || "",
    cto: persistFilter?.cto || "",
    city: persistFilter?.city || "",
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
  const [, dispatch] = useStore();

  // API calling to get list of online request
  let getOnlineRequest = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!search ? { search } : {}),
      ...(!!order ? { order } : {}),
      ...(!!orderBy ? { orderBy } : {}),

      filter: {
        ...(!!filterData.city ? { cityId: filterData.city } : {}),
        ...(!!filterData.jobStatus
          ? { jobStatusId: filterData.jobStatus }
          : {}),
        ...(!!filterData.jobType ? { jobTypeId: filterData.jobType } : {}),
        ...(!!filterData.cargoType
          ? { cargoTypeId: filterData.cargoType }
          : {}),
        ...(!!filterData.requestStatus
          ? { onlineRequestStatusId: filterData.requestStatus }
          : {}),
        ...(!!filterData.cto ? { ctoId: filterData.cto } : {}),
      },
    };
    dispatch({ type: FETCH_ONLINE_REQUEST });
    API.get("onlineRequests", { params })
      .then((response) => {
        dispatch({
          type: FETCH_ONLINE_REQUEST_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ONLINE_REQUEST_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getOnlineRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy, updateFilter]);

  useDebouncedEffect(() => getOnlineRequest(), 1000, [search]);

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

  // To handle fields value of drawer
  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleSubmit = (anchor) => {
    setUpdateFilter(filterData);
    setState({ ...getState, [anchor]: false });
    setFilter("onlineRequestFilter", { ...filterData }, true);
  };

  const handleReset = (anchor) => {
    removeFilter("onlineRequestFilter");
    setFilterData({
      jobType: "",
      cargoType: "",
      requestStatus: "",
      jobStatus: "",
      cto: "",
      city: "",
    });
    setUpdateFilter({
      jobType: "",
      cargoType: "",
      requestStatus: "",
      jobStatus: "",
      cto: "",
      city: "",
    });
    setState({ ...getState, [anchor]: false });
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
      type: GET_ONLINE_REQUEST_CHAT,
    });
    API.get(`onlineRequests/${senderId}/chats`, { params })
      .then((response) => {
        dispatch({
          type: GET_ONLINE_REQUEST_CHAT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ONLINE_REQUEST_CHAT_FAILURE,
          payload: error,
        });
      });
  };

  const saveChat = (path) => {
    dispatch({
      type: SAVE_ONLINE_REQUEST_CHAT,
    });
    API.post(`onlineRequests/${senderId}/chat`, {
      chat: path ? image?.target?.files[0]?.name : newMessage,
      chatType: chatType,
      ...(!!path ? { filePath: path } : {}),
    })
      .then((response) => {
        setMessageSent(true);
        setChatType("1");
        setMessage("");
        setImage(null);
        getChat();
        setMessagePage(0);
        dispatch({
          type: SAVE_ONLINE_REQUEST_CHAT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: SAVE_ONLINE_REQUEST_CHAT_FAILURE,
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

  return (
    <>
      <Header />
      <div className={classes.OnlineRequestWrapper}>
        <div className="wrapper">
          <div className="request-form-section">
            <div className="filter-search-title-strip">
              <Typography variant="h1">Online Request</Typography>
              <div className="filter-search-wrapper">
                <div className="inner-col search-col">
                  <div className="form-gourp">
                    <TextField
                      id="search-request"
                      placeholder="Search by Customer Name"
                      variant="outlined"
                      type="search"
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="inner-col">
                  <OnlineRequestFilter
                    handleFilter={handleFilter}
                    filterData={filterData}
                    toggleDrawer={toggleDrawer}
                    getState={getState}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                  />
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
              getOnlineRequest={getOnlineRequest}
              sendMessage={sendMessage}
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
export default OnlineRequestView;
