import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography, TextField, Button } from "@material-ui/core";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import {
  FETCH_DRAFT_LISTING,
  FETCH_DRAFT_LISTING_SUCCESS,
  FETCH_DRAFT_LISTING_FAILURE,
  UPDATE_DRAFT_INVOICE,
  UPDATE_DRAFT_INVOICE_SUCCESS,
  UPDATE_DRAFT_INVOICE_FAILURE,
  APPROVE_INVOICE,
  APPROVE_INVOICE_SUCCESS,
  APPROVE_INVOICE_FAILURE,
  REJECT_INVOICE,
  REJECT_INVOICE_SUCCESS,
  REJECT_INVOICE_FAILURE,
  GET_DRAFT_INVOICE_CHAT,
  GET_DRAFT_INVOICE_CHAT_SUCCESS,
  GET_DRAFT_INVOICE_CHAT_FAILURE,
  SAVE_DRAFT_CHAT,
  SAVE_DRAFT_CHAT_SUCCESS,
  SAVE_DRAFT_CHAT_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  FETCH_CHILD_ORGANISATION,
  FETCH_CHILD_ORGANISATION_SUCCESS,
  FETCH_CHILD_ORGANISATION_FAILURE,
} from "@utils/actionTypes";
import { draftInvoiceHeading, rowsPerPageVal } from "@utils/constant";
import { uploadImage } from "@utils/commonFunctions";
import API from "@services/axios";
import TableListing from "./tableListing";
import { invoiceStyle } from "./style";

function InvoiceView() {
  const classes = invoiceStyle();
  const [dataTable, setData] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [senderId, setSenderId] = useState("");
  const [newMessage, setMessage] = useState("");
  const [messagePage, setMessagePage] = useState(0);
  const [searchMessage, setSearchMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [image, setImage] = useState(null);
  const [chatType, setChatType] = useState("1");
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();

  // API calling to get draft invoice
  const getDraftInvoices = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!search ? { search } : {}),
      order: order !== "" ? order : "asc",
      orderBy: orderBy !== "" ? orderBy : "city",
    };
    dispatch({ type: FETCH_DRAFT_LISTING });
    API.get("invoices/draftInvoices", { params })
      .then((response) => {
        dispatch({
          type: FETCH_DRAFT_LISTING_SUCCESS,
          payload: response.data.data,
        });
        setData(response?.data?.data?.rows);
      })
      .catch((error) => {
        dispatch({ type: FETCH_DRAFT_LISTING_FAILURE, payload: error });
      });
  };

  // API calling to get list of child organisation
  let getChildOrganisation = () => {
    dispatch({ type: FETCH_CHILD_ORGANISATION });
    API.get("childOrganisations")
      .then((response) => {
        dispatch({
          type: FETCH_CHILD_ORGANISATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CHILD_ORGANISATION_FAILURE, payload: err });
      });
  };

  useEffect(() => {
    getDraftInvoices();
    getChildOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy]);

  useDebouncedEffect(() => getDraftInvoices(), 1000, [search]);

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
      if (res._rowChecked === true) {
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
      if (res._rowChecked === true) {
        newmainarray.push(res.id);
      }
      return true;
    });
    setSelectedArray(newmainarray);
  };

  const handleDateChange = (e, m_index, index, type, item) => {
    const newArray = [...dataTable];

    newArray[m_index].childInvoice[index] = {
      ...newArray[m_index].childInvoice[index],
      [type]:
        type === "invoiceDate"
          ? e
          : type === "childOrganisations"
          ? { id: e.target.value }
          : e.target.value,
      error:
        newArray[m_index].childInvoice[index].purchaseOrder?.length >= 225
          ? "Purchase order can't be greater than 225 characters"
          : "",
    };
    setData(newArray);
  };

  // API calling to approve selected invoice
  const handleApprove = () => {
    dispatch({ type: APPROVE_INVOICE });
    API.put("invoices/approves", {
      invoiceIds: selectedArray,
    })
      .then(() => {
        dispatch({
          type: APPROVE_INVOICE_SUCCESS,
        });
        toast.success("Invoice Approved Successfully");
        getDraftInvoices();
        setSelectedArray([]);
      })
      .catch((error) => {
        dispatch({ type: APPROVE_INVOICE_FAILURE });
        toast.error(error?.response?.data?.message);
      });
  };

  // API calling to reject selected invoice
  const handleReject = () => {
    dispatch({ type: REJECT_INVOICE });
    API.put("invoices/rejects", {
      invoiceIds: selectedArray,
    })
      .then(() => {
        dispatch({
          type: REJECT_INVOICE_SUCCESS,
        });
        toast.success("Invoice Rejected Successfully");
        getDraftInvoices();
        setSelectedArray([]);
      })
      .catch((error) => {
        dispatch({ type: REJECT_INVOICE_FAILURE });
        toast.error(error?.response?.data?.message);
      });
  };

  //Handle validation and API calling to update draft invoice
  const handleUpdate = (index, key) => {
    const newArray = [...dataTable];
    const data = newArray[index].childInvoice[key];
    newArray[index].childInvoice[key] = {
      ...newArray[index].childInvoice[key],
      error:
        newArray[index].childInvoice[key].purchaseOrder?.length >= 225
          ? "Purchase order can't be greater than 225 characters"
          : "",
    };
    setData(newArray);
    if (newArray[index].childInvoice[key].error === "") {
      dispatch({ type: UPDATE_DRAFT_INVOICE });
      API.put(`invoices/${data.id}/saveData`, {
        invoiceDate: moment(data.invoiceDate).format("YYYY-MM-DD"),
        purchaseOrder: data.purchaseOrder ? data.purchaseOrder : undefined,
        childOrganisationId: data?.childOrganisations?.id,
      })
        .then(() => {
          dispatch({
            type: UPDATE_DRAFT_INVOICE_SUCCESS,
          });
          toast.success("Invoice Updated Successfully");
          getDraftInvoices();
          setSelectedArray([]);
        })
        .catch((error) => {
          dispatch({ type: UPDATE_DRAFT_INVOICE_FAILURE });
          toast.error(error?.response?.data?.message);
        });
    }
  };

  const handleSearch = (event) => {
    setMainCheck(false);
    setSelectedArray([]);
    setSearch(event.target.value.trimStart());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedArray([]);
    setMainCheck(false);
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
        setChatType("1");
        setMessage("");
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

  return (
    <>
      <Header />
      <div className={classes.invoiceWrapper}>
        <Loader
          loading={
            state.invoice?.loadingDraftInvoice ||
            state.invoice?.approvingInvoice ||
            state.invoice?.rejectingInvoice ||
            state.invoice?.updatingDraftInvoice
          }
        />
        <div className="wrapper">
          <div className="request-form-section">
            <div className="filter-search-title-strip">
              <Typography variant="h1">Draft Invoices</Typography>
              <div className="filter-search-wrapper">
                {state?.invoice?.draftInvoiceData?.count !== 0 && (
                  <>
                    <div className="form-gourp">
                      <Button
                        className="orange-btn primary-btn"
                        color="inherit"
                        disableElevation
                        onClick={handleApprove}
                        style={{ marginRight: "10px" }}
                        disabled={selectedArray?.length === 0}
                      >
                        Approve
                      </Button>
                    </div>
                    <div className="form-gourp">
                      <Button
                        className="orange-btn primary-btn"
                        color="inherit"
                        disableElevation
                        style={{ marginRight: "10px" }}
                        onClick={handleReject}
                        disabled={selectedArray?.length === 0}
                      >
                        Reject
                      </Button>
                    </div>
                  </>
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
              </div>
            </div>
            <TableListing
              heading={draftInvoiceHeading}
              handleChange={handleChange}
              handleMainChange={handleMainChangeCheckBox}
              _maincheck={mainCheck}
              handleDateChange={handleDateChange}
              open={open}
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSorting={(e, property) => handleSorting(e, property)}
              orderBy={orderBy}
              order={order}
              handleUpdate={handleUpdate}
              data={dataTable && dataTable}
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
export default InvoiceView;
