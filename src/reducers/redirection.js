import {
  CARGO_VOLUME,
  JOBS_GRAPH_FILTER,
  DRIVERS_GRAPH_FILTER,
  RESET_REDIRECTION,
  DASHBOARD_FILTER_REDIRECTION,
  FATIGUE_FILTER,
  JOBS_STATUS_REDIRECTION,
  INVOICE_GRAPH_FILTER,
} from "@utils/actionTypes";

const INIT_STATE = {
  cargoVolume: "",
  jobsGraphFilter: "",
  filterRedirection: null,
  driverGraphFilter: null,
  fatigueFilter: "",
  jobStatusRedirection: "",
  invoiceGraphFilter: null,
};
const redirectionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARGO_VOLUME:
      return { ...state, cargoVolume: action.payload };

    case JOBS_GRAPH_FILTER:
      return { ...state, jobsGraphFilter: action.payload };

    case DASHBOARD_FILTER_REDIRECTION:
      return { ...state, filterRedirection: action.payload };

    case DRIVERS_GRAPH_FILTER:
      return { ...state, driverGraphFilter: action.payload };

    case FATIGUE_FILTER:
      return { ...state, fatigueFilter: action.payload };

    case JOBS_STATUS_REDIRECTION:
      return { ...state, jobStatusRedirection: action.payload };

    case INVOICE_GRAPH_FILTER:
      return { ...state, invoiceGraphFilter: action.payload };

    case RESET_REDIRECTION:
      return INIT_STATE;

    default:
      return state;
  }
};
export default redirectionReducer;
