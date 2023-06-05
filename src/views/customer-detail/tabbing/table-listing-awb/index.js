import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button,FormControl, Select, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import SearchIcon from "@assets/images/search.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
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
import { getCustomFormToDate } from "@utils/commonFunctions";
import TableListing from "./table-listing";
import DatePopup from './date-popup';
import { AWBStyle } from "./style";
import moment from "moment";

function AWB() {
  const classes = AWBStyle();
  const materilClasses = materialCommonStyles();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [selectedArray, setSelectedArray] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [fileName, setFilename] = useState("");
  const [dataTable, setData] = useState([]);
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
  
  //Uploading file for importing CSV of truck
  async function uploadFile(event, fileName, defaultText) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        let check = true;
        data.map((newData) => {
        if(newData.readyDate === undefined | newData.quantity === undefined | newData.number === undefined | newData.flight === undefined 
          | newData.readyTime === undefined | newData.cutOffTime === undefined){
            toast.error("Please Upload Valid CSV");
             check = false;
             return check;
          }
        })
        if(data.length > 0){
          if(check){
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
          }
          else {
            toast.error("This file is empty Please Upload valid File");
          }
      }
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
        <div className={classes.searchWrapper}>
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
        </div>

        <div className={classes.searchWrapper1}>
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
                  {fileName ? fileName : "Import CSV"}
                </span>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <div className="form-gourp">
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
      </div>
      <TableListing
        handleSorting={handleSorting}
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
    </div>
  );
}

export default AWB;
