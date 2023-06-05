import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";

import Header from "@components/header";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import EditCreditNote from "@views/customer-detail/tabbing/credit-note/popup";
import TableListing from "./table-listing";
import Filter from "./filter";
import { JobListingStyle } from "./style";
const creditData = [
  {
    jobId: "1",
    childCustomer: "Demo child 1",
    parentAccount: "Demo parent 1",
    date: "23/07/2021",
    amt: "23.45",
    desc: "Dummy text dummy  text dummy text dummy text",
  },
  {
    jobId: "2",
    childCustomer: "Demo child 2",
    parentAccount: "Demo parent 1",
    date: "07/30/2021",
    amt: "45.45",
    desc: "Dummy text dummy  text dummy text dummy text",
  },
  {
    jobId: "3",
    childCustomer: "Demo child 3",
    parentAccount: "Demo parent 1",
    date: "12/08/2021",
    amt: "100.45",
    desc: "Dummy text dummy  text dummy text dummy text",
  },
  {
    jobId: "4",
    childCustomer: "Demo child first",
    parentAccount: "Demo parent 2",
    date: "10/08/2021",
    amt: "123.34",
    desc: "Dummy text dummy  text dummy text dummy text",
  },
];
function JobListing() {
  const classes = JobListingStyle();
  const [dataTable, setData] = useState(creditData);
  const [mainCheck, setMainCheck] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getCreditNote, setCreditNote] = useState(schema.addCreditNoteSchema);
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [getState, setState] = useState({ right: false });
  const [, setUpdateFilter] = useState({});
  const [filterData, setFilterData] = useState({
    customer: [],
    startDate: "",
    endDate: "",
  });
  const [customDate, setCustomDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [, setSelectedArray] = useState([]);

  const handleChange = (item, e) => {
    let _id = item.jobId;
    let index = dataTable.findIndex((x) => x.jobId === _id);
    let data = dataTable;
    if (index > -1) {
      let newState = !item._rowChecked;
      data[index]._rowChecked = newState;
      setData(data);
    }
    if (
      data.filter((res, index) => res._rowChecked === true).length ===
      data.length
    ) {
      setMainCheck(true);
    } else {
      setMainCheck(false);
    }
    let newarray = [];
    dataTable.map((res, index) => {
      if (res._rowChecked === true) {
        newarray.push(res.jobId);
      }
      return true;
    });
    setSelectedArray(newarray);
  };

  const handleMainChangeCheckBox = (e) => {
    let _val = e.target.checked;
    dataTable.forEach((element) => {
      element._rowChecked = _val;
    });
    setData(dataTable);
    setMainCheck(_val);

    let newmainarray = [];
    dataTable.map((res, index) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.jobId);
      }
      return true;
    });
    setSelectedArray(newmainarray);
  };
  const handleAddPopup = (data) => {
    if (data) {
      setEdit(true);
      // setCreditNote(data);
    }
    setOpenAddPopup(true);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getCreditNote,
    validationSchema: validationSchema.addCreditNoteValidationSchema,
    onSubmit: (value) => {},
  });
  const handleClose = () => {
    setEdit(false);
    setOpenAddPopup(false);
    setCreditNote(schema.addCreditNoteSchema);
    setError("");
    formik.handleReset();
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
  };
  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };
  const handleCustomDateSubmit = () => {
    setOpen(false);
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
    setShow(false);
    setPeriod("");
    setFilterData({
      customer: [],
      startDate: null,
      endDate: null,
    });
    setState({ ...getState, [item]: false });
    setUpdateFilter({
      customer: [],
      startDate: null,
      endDate: null,
    });
  };
  const handlePeriodChange = (event, type) => {
    const { value } = event.target;
    setPeriod(value);
    if (value === 7 || type === true) {
      setOpen(true);
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

  const handleCloseFilter = () => {
    setPeriod("");
    setOpen(false);
    setCustomDate({
      startDate: null,
      endDate: null,
    });
  };
  const handleSubmit = (item) => {
    setUpdateFilter(filterData);
    setState({ ...getState, [item]: false });
  };
  return (
    <>
      <Header />
      <div className={classes.JobListingWrapper}>
        <div className="wrapper">
          <div className="request-form-section">
            <div className="filter-search-title-strip">
              <Typography variant="h1">Credit Note</Typography>
              <div className="filter-search-wrapper">
                <div className="form-gourp">
                  <Button
                    className="orange-btn primary-btn"
                    color="inherit"
                    disableElevation
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                </div>
                <div className="inner-col">
                  <div className="form-gourp">
                    <TextField
                      id="search-request"
                      placeholder="Search Credit Note"
                      variant="outlined"
                      type="search"
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
                    open={open}
                    period={period}
                    show={show}
                    customDate={customDate}
                    handleReset={handleReset}
                    handleClose={handleCloseFilter}
                  />
                </div>
              </div>
            </div>
            <TableListing
              data={dataTable}
              handleChange={handleChange}
              handleMainChange={handleMainChangeCheckBox}
              _maincheck={mainCheck}
              handleAddPopup={handleAddPopup}
            />
            <EditCreditNote
              open={openAddPopup}
              formik={formik}
              handleClose={handleClose}
              isEdit={getEdit}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobListing;
