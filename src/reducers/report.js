import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  DOWNLOAD_REPORTS,
  DOWNLOAD_REPORTS_SUCCESS,
  DOWNLOAD_REPORTS_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingReports: false,
  reportData: null,
  downloadingReport: false,
};

const ReportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_REPORTS:
      return { ...state, loadingReports: true };
    case FETCH_REPORTS_SUCCESS:
      return {
        ...state,
        reportData: action.payload,
        loadingReports: false,
      };
    case FETCH_REPORTS_FAILURE:
      return {
        ...state,
        reportData: action.payload,
        loadingReports: false,
      };

    case DOWNLOAD_REPORTS:
      return { ...state, downloadingReport: true };
    case DOWNLOAD_REPORTS_SUCCESS:
      return {
        ...state,
        downloadingReport: false,
      };
    case DOWNLOAD_REPORTS_FAILURE:
      return {
        ...state,
        downloadingReport: false,
      };

    default:
      return state;
  }
};
export default ReportReducer;
