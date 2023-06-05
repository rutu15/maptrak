import {
  FETCH_DRIVERS,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  IMPORT_DRIVERS_CSV,
  IMPORT_DRIVERS_CSV_SUCCESS,
  IMPORT_DRIVERS_CSV_FAILURE,
  ADD_DRIVER,
  ADD_DRIVER_SUCCESS,
  ADD_DRIVER_FAILURE,
  FETCH_DRIVERS_ID,
  FETCH_DRIVERS_ID_SUCCESS,
  FETCH_DRIVERS_ID_FAILURE,
  EDIT_DRIVER,
  EDIT_DRIVER_SUCCESS,
  EDIT_DRIVER_FAILURE,
  FETCH_DRIVERS_JOBS,
  FETCH_DRIVERS_JOBS_SUCCESS,
  FETCH_DRIVERS_JOBS_FAILURE,
  FETCH_DRIVERS_RUNSHEET,
  FETCH_DRIVERS_RUNSHEET_SUCCESS,
  FETCH_DRIVERS_RUNSHEET_FAILURE,
  FETCH_DRIVER_TIMESHEET,
  FETCH_DRIVER_TIMESHEET_SUCCESS,
  FETCH_DRIVER_TIMESHEET_FAILURE,
  FETCH_NOT_APPROVED_DRIVER_TIMESHEET,
  FETCH_NOT_APPROVED_DRIVER_TIMESHEET_SUCCESS,
  FETCH_NOT_APPROVED_DRIVER_TIMESHEET_FAILURE,
  APPROVE_DRIVER_TIMESHEET,
  APPROVE_DRIVER_TIMESHEET_SUCCESS,
  APPROVE_DRIVER_TIMESHEET_FAILURE,
  DOWNLOAD_DRIVER_TIMESHEET,
  DOWNLOAD_DRIVER_TIMESHEET_SUCCESS,
  DOWNLOAD_DRIVER_TIMESHEET_FAILURE,
  FETCH_TIMESHEET_LIST,
  FETCH_TIMESHEET_LIST_SUCCESS,
  FETCH_TIMESHEET_LIST_FAILURE,
  UPDATE_DRIVER_TIMESHEET,
  UPDATE_DRIVER_TIMESHEET_SUCCESS,
  UPDATE_DRIVER_TIMESHEET_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  gettingDrivers: false,
  getDriversData: null,
  importingDriverCSV: false,
  importDriverCSVDate: null,
  addingDriver: false,
  addDriversData: null,
  gettingDriverById: false,
  getDriverById: null,
  editingDriver: false,
  editDriverData: null,
  loadingJobs: false,
  driverJobsData: null,
  loadingDriverRunsheet: false,
  driverRunsheetData: null,
  loadingDriverTimesheet: false,
  driverTimeSheetData: null,
  loadingNotApprovedTimesheet: false,
  notApprovedTimesheetData: null,
  approvingTimeSheet: false,
  downloadingTimeSheet: false,
  loadingTimeSheetList: false,
  timesheetListData: null,
  updatingTimeSheet: false,
};

const DriverReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return { ...state, gettingDrivers: true };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        getDriversData: action.payload,
        gettingDrivers: false,
      };
    case FETCH_DRIVERS_FAILURE:
      return {
        ...state,
        getDriversData: action.payload,
        gettingDrivers: false,
      };

    case IMPORT_DRIVERS_CSV:
      return { ...state, importingDriverCSV: true };
    case IMPORT_DRIVERS_CSV_SUCCESS:
      return {
        ...state,
        importDriverCSVDate: action.payload,
        importingDriverCSV: false,
      };
    case IMPORT_DRIVERS_CSV_FAILURE:
      return {
        ...state,
        importDriverCSVDate: action.payload,
        importingDriverCSV: false,
      };

    case ADD_DRIVER:
      return { ...state, addingDriver: true };
    case ADD_DRIVER_SUCCESS:
      return {
        ...state,
        addingDriver: false,
        addDriversData: action.payload,
      };
    case ADD_DRIVER_FAILURE:
      return {
        ...state,
        addingDriver: false,
        addDriversData: action.payload,
      };

    case FETCH_DRIVERS_ID:
      return { ...state, gettingDriverById: true };
    case FETCH_DRIVERS_ID_SUCCESS:
      return {
        ...state,
        gettingDriverById: false,
        getDriverById: action.payload,
      };
    case FETCH_DRIVERS_ID_FAILURE:
      return {
        ...state,
        gettingDriverById: false,
        getDriverById: action.payload,
      };

    case EDIT_DRIVER:
      return { ...state, editingDriver: true };
    case EDIT_DRIVER_SUCCESS:
      return {
        ...state,
        editingDriver: false,
        editDriverData: action.payload,
      };
    case EDIT_DRIVER_FAILURE:
      return {
        ...state,
        editingDriver: false,
        editDriverData: action.payload,
      };

    case FETCH_DRIVERS_JOBS:
      return { ...state, loadingJobs: true };
    case FETCH_DRIVERS_JOBS_SUCCESS:
      return {
        ...state,
        loadingJobs: false,
        driverJobsData: action.payload,
      };
    case FETCH_DRIVERS_JOBS_FAILURE:
      return {
        ...state,
        loadingJobs: false,
        driverJobsData: action.payload,
      };

    case FETCH_DRIVERS_RUNSHEET:
      return { ...state, loadingDriverRunsheet: true };
    case FETCH_DRIVERS_RUNSHEET_SUCCESS:
      return {
        ...state,
        loadingDriverRunsheet: false,
        driverRunsheetData: action.payload,
      };
    case FETCH_DRIVERS_RUNSHEET_FAILURE:
      return {
        ...state,
        loadingDriverRunsheet: false,
        driverRunsheetData: action.payload,
      };

    case FETCH_DRIVER_TIMESHEET:
      return { ...state, loadingDriverTimesheet: true };
    case FETCH_DRIVER_TIMESHEET_SUCCESS:
      return {
        ...state,
        loadingDriverTimesheet: false,
        driverTimeSheetData: action.payload,
      };
    case FETCH_DRIVER_TIMESHEET_FAILURE:
      return {
        ...state,
        loadingDriverTimesheet: false,
        driverTimeSheetData: action.payload,
      };

    case FETCH_NOT_APPROVED_DRIVER_TIMESHEET:
      return { ...state, loadingNotApprovedTimesheet: true };
    case FETCH_NOT_APPROVED_DRIVER_TIMESHEET_SUCCESS:
      return {
        ...state,
        loadingNotApprovedTimesheet: false,
        notApprovedTimesheetData: action.payload,
      };
    case FETCH_NOT_APPROVED_DRIVER_TIMESHEET_FAILURE:
      return {
        ...state,
        loadingNotApprovedTimesheet: false,
        notApprovedTimesheetData: action.payload,
      };

    case APPROVE_DRIVER_TIMESHEET:
      return { ...state, approvingTimeSheet: true };
    case APPROVE_DRIVER_TIMESHEET_SUCCESS:
      return {
        ...state,
        approvingTimeSheet: false,
      };
    case APPROVE_DRIVER_TIMESHEET_FAILURE:
      return {
        ...state,
        approvingTimeSheet: false,
      };

    case DOWNLOAD_DRIVER_TIMESHEET:
      return { ...state, downloadingTimeSheet: true };
    case DOWNLOAD_DRIVER_TIMESHEET_SUCCESS:
      return {
        ...state,
        downloadingTimeSheet: false,
      };
    case DOWNLOAD_DRIVER_TIMESHEET_FAILURE:
      return {
        ...state,
        downloadingTimeSheet: false,
      };

    case FETCH_TIMESHEET_LIST:
      return { ...state, loadingTimeSheetList: true };
    case FETCH_TIMESHEET_LIST_SUCCESS:
      return {
        ...state,
        loadingTimeSheetList: false,
        timesheetListData: action.payload,
      };
    case FETCH_TIMESHEET_LIST_FAILURE:
      return {
        ...state,
        loadingTimeSheetList: false,
        timesheetListData: action.payload,
      };

    case UPDATE_DRIVER_TIMESHEET:
      return { ...state, updatingTimeSheet: true };
    case UPDATE_DRIVER_TIMESHEET_SUCCESS:
      return {
        ...state,
        updatingTimeSheet: false,
      };
    case UPDATE_DRIVER_TIMESHEET_FAILURE:
      return {
        ...state,
        updatingTimeSheet: false,
      };
    default:
      return state;
  }
};
export default DriverReducer;
