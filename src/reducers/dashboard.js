import {
	MANAGEMENT_DASHBOARD_DATA,
	MANAGEMENT_DASHBOARD_DATA_SUCCESS,
	MANAGEMENT_DASHBOARD_DATA_FAILURE,
	DASHBOARD_JOB_DRIVER_MANAGE,
	DASHBOARD_JOB_DRIVER_MANAGE_SUCCESS,
	DASHBOARD_JOB_DRIVER_MANAGE_FAILURE,
	DASHBOARD_AVERAGE,
	DASHBOARD_AVERAGE_SUCCESS,
	DASHBOARD_AVERAGE_FAILURE,
	DASHBOARD_STATUS_TIMEOVER,
	DASHBOARD_STATUS_TIMEOVER_SUCCESS,
	DASHBOARD_STATUS_TIMEOVER_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
	revenueCostMarginData: null,
	loadingRevenueCostMargin: false,
	jobDriverData: null,
	loadingJobsDriver: false,
	dashboardAverageData: null,
	loadingDashboardAverage: false,
	dashboardTimeover: null,
	dashboardTimeoverLoading: false,
};

const dashboardReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case MANAGEMENT_DASHBOARD_DATA:
			return { ...state, loadingRevenueCostMargin: true };
		case MANAGEMENT_DASHBOARD_DATA_SUCCESS:
			return {
				...state,
				revenueCostMarginData: action.payload.data,
				loadingRevenueCostMargin: false,
			};
		case MANAGEMENT_DASHBOARD_DATA_FAILURE:
			return {
				...state,
				revenueCostMarginData: action.payload.data,
				loadingRevenueCostMargin: false,
			};

		case DASHBOARD_JOB_DRIVER_MANAGE:
			return { ...state, loadingJobsDriver: true };
		case DASHBOARD_JOB_DRIVER_MANAGE_SUCCESS:
			return {
				...state,
				jobDriverData: action.payload.data,
				loadingJobsDriver: false,
			};
		case DASHBOARD_JOB_DRIVER_MANAGE_FAILURE:
			return {
				...state,
				jobDriverData: action.payload.data,
				loadingJobsDriver: false,
			};

		case DASHBOARD_AVERAGE:
			return { ...state, loadingDashboardAverage: true };
		case DASHBOARD_AVERAGE_SUCCESS:
			return {
				...state,
				dashboardAverageData: action.payload.data,
				loadingDashboardAverage: false,
			};
		case DASHBOARD_AVERAGE_FAILURE:
			return {
				...state,
				dashboardAverageData: action.payload.data,
				loadingDashboardAverage: false,
			};

		case DASHBOARD_STATUS_TIMEOVER:
			return { ...state, dashboardTimeoverLoading: true };
		case DASHBOARD_STATUS_TIMEOVER_SUCCESS:
			return {
				...state,
				dashboardTimeover: action.payload.data,
				dashboardTimeoverLoading: false,
			};
		case DASHBOARD_STATUS_TIMEOVER_FAILURE:
			return {
				...state,
				dashboardTimeover: action.payload.data,
				dashboardTimeoverLoading: false,
			};
		default:
			return state;
	}
};
export default dashboardReducer;
