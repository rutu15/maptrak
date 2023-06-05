import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  DialogContentText,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import HelpIcon from "@material-ui/icons/Help";
import closeIcon from "@assets/images/close.svg";
import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import UploadImage from "@assets/images/blue-upload.svg";
import {
  FETCH_CUSTOMER_AWB,
  FETCH_CUSTOMER_AWB_SUCCESS,
  FETCH_CUSTOMER_AWB_FAILURE,
  DELETE_CUSTOMER_AWB,
  DELETE_CUSTOMER_AWB_SUCCESS,
  DELETE_CUSTOMER_AWB_FAILURE,
  IMPORT_CUSTOMER_AWB,
  IMPORT_CUSTOMER_AWB_SUCCESS,
  IMPORT_CUSTOMER_AWB_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { UploadFile } from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import Detail from "./detail";
import DateFields from "./dateFields";
import TableListing from "./table-listing";
import { AWBStyle, AddAirWayBillStyle } from "./style";

function AWB(props) {
  const classes = AWBStyle();
  const classes1 = AddAirWayBillStyle();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [selectedArray, setSelectedArray] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [fileName, setFilename] = useState("");
  const [dataTable, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState();
  // const [period, setPeriod] = useState("");
  // const [open, setOpen] = useState(false);
  // const [show, setShow] = useState(false);
  // const [customDate, setCustomDate] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  // const [dateData, setDateData] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get list of customer's AWB
  let getCustomerAwb = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!search ? { search } : {}),
      ...(!!order ? { order } : {}),
      ...(!!orderBy ? { orderBy } : {}),
      // filter: {
      //   ...(!!dateData.startDate ? { startDate: dateData.startDate } : {}),
      //   ...(!!dateData.endDate ? { endDate: dateData.endDate } : {}),
      // },
    };
    dispatch({ type: FETCH_CUSTOMER_AWB });
    API.get(`customers/${id}/airWaybills`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_AWB_SUCCESS,
          payload: response.data.data,
        });
        setData(response?.data?.data?.rows);
        setTotalRecord(response.data.data.count);
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_AWB_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCustomerAwb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage]);

  useDebouncedEffect(() => getCustomerAwb(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.sortTitle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.sortTitle);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // To handle checkboxes of listing
  const handleChangeCheckbox = (item) => {
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
    dataTable.forEach((element) => {
      element._rowChecked = _val;
    });
    setData(dataTable);
    setMainCheck(_val);
    let newmainarray = [];
    dataTable.map((res) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.id);
      }
      return true;
    });
    setSelectedArray(newmainarray);
  };

  // const handleChange = (event, type) => {
  //   if (type === "startDate" || type === "endDate") {
  //     setCustomDate({
  //       ...customDate,
  //       [type]: moment(event).format("YYYY-MM-DD"),
  //     });
  //   } else {
  //     const { name, value } = event.target;
  //     setCustomDate({
  //       ...customDate,
  //       [name]: value,
  //     });
  //   }
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   setPeriod("");
  //   setCustomDate({
  //     startDate: null,
  //     endDate: null,
  //   });
  // };
  // const handleSubmit = () => {
  //   setOpen(false);
  //   setShow(true);
  //   setDateData(customDate);
  //   setPeriod(7);
  //   setCustomDate({
  //     startDate: null,
  //     endDate: null,
  //   });
  // };

  // const handlePeriodChange = (event, type) => {
  //   const { value } = event.target;
  //   setPeriod(value);
  //   setShow(false);
  //   if (value === "") {
  //     setDateData({
  //       startDate: null,
  //       endDate: null,
  //     });
  //   }
  //   if (value === 7 || type === true) {
  //     setOpen(true);
  //   } else {
  //     const newDate = new Date();
  //     if (value === 1) {
  //       setDateData({
  //         startDate: moment(newDate).format("YYYY-MM-DD"),
  //         endDate: moment(newDate).format("YYYY-MM-DD"),
  //       });
  //     } else if (value === 2) {
  //       setDateData({
  //         startDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
  //         endDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
  //       });
  //     } else if (value === 3) {
  //       setDateData({
  //         startDate: moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
  //         endDate: moment(newDate).format("YYYY-MM-DD"),
  //       });
  //     } else if (value === 4) {
  //       setDateData({
  //         startDate: moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
  //         endDate: moment(newDate).format("YYYY-MM-DD"),
  //       });
  //     } else if (value === 5) {
  //       setDateData({
  //         startDate: moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
  //         endDate: moment(newDate).format("YYYY-MM-DD"),
  //       });
  //     } else if (value === 6) {
  //       setDateData({
  //         startDate: moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
  //         endDate: moment(newDate).format("YYYY-MM-DD"),
  //       });
  //     }
  //   }
  // };
  //Uploading file for importing CSV of truck
  function uploadFile(event, fileName, defaultText) {
    setFilename(event.target?.files[0]?.name);
    if (event.target.files && event.target.files.length) {
      dispatch({ type: IMPORT_CUSTOMER_AWB });
    }
    UploadFile(event, fileName, defaultText, "text/csv", "customer-awb-csv")
      .then((res) => {
        API.post(`customers/${id}/importAirWaybills`, {
          file: res.data.fileName,
        })
          .then((response) => {
            getCustomerAwb();
            toast.success("CSV Imported Successfully");
            dispatch({
              type: IMPORT_CUSTOMER_AWB_SUCCESS,
              payload: response.data.data,
            });
            setMainCheck(false);
            setFilename("");
            event.target.value = "";
          })
          .catch((error) => {
            setFilename("");
            event.target.value = "";
            if (error.response?.data?.code === 400)
              toast.error("Please Upload Valid CSV");
            dispatch({ type: IMPORT_CUSTOMER_AWB_FAILURE, payload: error });
          });
      })
      .catch((error) => {
        setFilename("");
        event.target.value = "";
        dispatch({ type: IMPORT_CUSTOMER_AWB_FAILURE, payload: error });
        toast.error("Please Upload CSV File");
      });
  }

  const handleDelete = (ids) => {
    dispatch({ type: DELETE_CUSTOMER_AWB });
    API.put(`/customers/${id}/airWaybills`, {
      airWaybillIds: ids.length ? ids : [parseInt(ids)],
    })
      .then(() => {
        dispatch({
          type: DELETE_CUSTOMER_AWB_SUCCESS,
        });
        getCustomerAwb();
        toast.success("AWB Deleted Successfully");
        setMainCheck(false);
        setSelectedArray([]);
      })
      .catch((error) => {
        dispatch({ type: DELETE_CUSTOMER_AWB_FAILURE });
        toast.error(error?.response?.data?.message);
      });
  };

  const saveFile = () => {
    window.open(process.env.REACT_APP_AWB_SAMPLE, "_blank");
  };

  const addSubmitHandle = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className={classes.AWBWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search AWB"
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
        {/* <div className={classes.searchWrapper}>
          <div className="form-gourp">
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
                <MenuItem
                  value={7}
                  onClick={(e) => handlePeriodChange(e, true)}
                >
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
        </div> */}

        <div className="btn-wrapper">
          <div className={classes.fileInput}>
            <TextField
              id="truckCsv"
              variant="outlined"
              type="file"
              onChange={(e) => uploadFile(e, "file-name", "Import csv")}
              InputProps={{
                inputProps: { accept: ".csv" },
              }}
            />
            <div className="label-block">
              <img src={UploadImage} alt="Upload" />
              <span className="file-name" id="file-name">
                {fileName ? fileName : "Bulk Import"}
              </span>
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <div className={classes.deleteButton}>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              disabled={selectedArray?.length === 0}
              onClick={() => handleDelete(selectedArray)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.searchWrapper1}>
        {/* <div className="btn-wrapper">
          <div className="form-gourp">
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              onClick={() => setOpen(true)}
            >
              + ADD
            </Button>
          </div>
        </div> */}
        <div className="btn-wrapper">
          <div className="form-gourp">
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              onClick={() => saveFile()}
              startIcon={<GetAppIcon />}
              style={{ width: "190px" }}
            >
              Sample CSV
            </Button>
          </div>
        </div>
        <div className="btn-wrapper">
          <div className="form-gourp">
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              startIcon={<HelpIcon />}
              onClick={() => setHelpOpen(true)}
            >
              Help
            </Button>
          </div>
        </div>
      </div>
      <TableListing
        handleSorting={handleSorting}
        count={totalRecord}
        order={order}
        orderBy={orderBy}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        handleChange={handleChangeCheckbox}
        handleMainChange={handleMainChangeCheckBox}
        data={dataTable && dataTable}
        _maincheck={mainCheck}
        handleDelete={handleDelete}
      />
      <Dialog open={open} className={classes1.customModal}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={() => setOpen(false)} />
        </div>
        <form
          noValidate
          autoComplete="off"
          className={classes1.customForm}
          onSubmit={addSubmitHandle}
        >
          <DialogTitle>Add air waybill</DialogTitle>
          <DialogContent>
            <Detail />
            <DateFields formik={props.formik} />
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              className="orange-btn primary-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              type="submit"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={helpOpen} className={classes1.customModal}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={() => setHelpOpen(false)} />
        </div>
        <DialogTitle>Bulk Air Waybill Import Instruction</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Please download the sample bulk import csv file, fill out the
            details, save the file, then use the “BULK IMPORT” feature to
            upload.
          </DialogContentText>

          <DialogContentText className={classes.dialogContentText}>
            Note: If upload is failed, please check the required format for
            Document Number, Date and Time.
          </DialogContentText>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.cellHeader}>Number:</TableCell>
                <TableCell>
                  Air Waybill number (format: XXX-XXXXX or XXX-XXXXXXXX)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>Flight:</TableCell>
                <TableCell>Airline Code</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>Weight:</TableCell>
                <TableCell>Air Waybill total weight</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>Quantity:</TableCell>
                <TableCell>Air Waybill total quantity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>
                  Ready Date:
                </TableCell>
                <TableCell>
                  Shipment ready to be pick up date (format: YYYY-MM-DD)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>
                  Ready Time:
                </TableCell>
                <TableCell>
                  Shipment ready to be pick up time (format: HH:MM:SS)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellHeader}>
                  Cut Off Time:
                </TableCell>
                <TableCell>
                  Shipment pickup cut-off time (format: HH:MM:SS)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AWB;
