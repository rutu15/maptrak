import {
	FETCH_JOBS,
	FETCH_JOBS_SUCCESS,
	FETCH_JOBS_FAILURE,
	CREATE_JOB,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_FAILURE,
	DELETE_JOB,
	DELETE_JOB_SUCCESS,
	DELETE_JOB_FAILURE,
	FETCH_JOBS_ID,
	FETCH_JOBS_ID_SUCCESS,
	FETCH_JOBS_ID_FAILURE,
	EDIT_JOB,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_FAILURE,
	FETCH_JOB_CONSIGNMENT,
	FETCH_JOB_CONSIGNMENT_SUCCESS,
	FETCH_JOB_CONSIGNMENT_FAILURE,
	ADD_JOB_CONSIGNMENT,
	ADD_JOB_CONSIGNMENT_SUCCESS,
	ADD_JOB_CONSIGNMENT_FAILURE,
	UPLOAD_IMAGE_ADD_CONSIGNMENT,
	UPLOAD_IMAGE_ADD_CONSIGNMENT_SUCCESS,
	UPLOAD_IMAGE_ADD_CONSIGNMENT_FAILURE,
	EDIT_JOB_CONSIGNMENT,
	EDIT_JOB_CONSIGNMENT_SUCCESS,
	EDIT_JOB_CONSIGNMENT_FAILURE,
	DELETE_JOB_CONSIGNMENT,
	DELETE_JOB_CONSIGNMENT_SUCCESS,
	DELETE_JOB_CONSIGNMENT_FAILURE,
	FETCH_AIR_WAY_BILLS,
	FETCH_AIR_WAY_BILLS_SUCCESS,
	FETCH_AIR_WAY_BILLS_FAILURE,
	FETCH_REMINDER,
	FETCH_REMINDER_SUCCESS,
	FETCH_REMINDER_FAILURE,
	ADD_AWB,
	ADD_AWB_SUCCESS,
	ADD_AWB_FAILURE,
	EDIT_AWB,
	EDIT_AWB_SUCCESS,
	EDIT_AWB_FAILURE,
	DELETE_AWB,
	DELETE_AWB_SUCCESS,
	DELETE_AWB_FAILURE,
	FETCH_CONSIGNMENT_ITEM,
	FETCH_CONSIGNMENT_ITEM_SUCCESS,
	FETCH_CONSIGNMENT_ITEM_FAILURE,
	ADD_CONSIGNMENT_ITEM,
	ADD_CONSIGNMENT_ITEM_SUCCESS,
	ADD_CONSIGNMENT_ITEM_FAILURE,
	EDIT_CONSIGNMENT_ITEM,
	EDIT_CONSIGNMENT_ITEM_SUCCESS,
	EDIT_CONSIGNMENT_ITEM_FAILURE,
	DELETE_CONSIGNMENT_ITEM,
	DELETE_CONSIGNMENT_ITEM_SUCCESS,
	DELETE_CONSIGNMENT_ITEM_FAILURE,
	IMAGE_UPLOAD_CONSIGNMENT_ITEM,
	IMAGE_UPLOAD_CONSIGNMENT_ITEM_SUCCESS,
	IMAGE_UPLOAD_CONSIGNMENT_ITEM_FAILURE,
	FETCH_AWB_LOOSE,
	FETCH_AWB_LOOSE_SUCCESS,
	FETCH_AWB_LOOSE_FAILURE,
	ADD_AWB_LOOSE,
	ADD_AWB_LOOSE_SUCCESS,
	ADD_AWB_LOOSE_FAILURE,
	EDIT_AWB_LOOSE,
	EDIT_AWB_LOOSE_SUCCESS,
	EDIT_AWB_LOOSE_FAILURE,
	DELETE_AWB_LOOSE,
	DELETE_AWB_LOOSE_SUCCESS,
	DELETE_AWB_LOOSE_FAILURE,
	FETCH_AWB_ULD,
	FETCH_AWB_ULD_SUCCESS,
	FETCH_AWB_ULD_FAILURE,
	ADD_AWB_ULD,
	ADD_AWB_ULD_SUCCESS,
	ADD_AWB_ULD_FAILURE,
	EDIT_AWB_ULD,
	EDIT_AWB_ULD_SUCCESS,
	EDIT_AWB_ULD_FAILURE,
	DELETE_AWB_ULD,
	DELETE_AWB_ULD_SUCCESS,
	DELETE_AWB_ULD_FAILURE,
	ASSIGN_DRIVER,
	ASSIGN_DRIVER_SUCCESS,
	ASSIGN_DRIVER_FAILURE,
	RE_ASSIGN_DRIVER,
	RE_ASSIGN_DRIVER_SUCCESS,
	RE_ASSIGN_DRIVER_FAILURE,
	REVIEW_JOBS,
	REVIEW_JOBS_SUCCESS,
	REVIEW_JOBS_FAILURE,
	GET_JOB_RUNSHEET,
	GET_JOB_RUNSHEET_SUCCESS,
	GET_JOB_RUNSHEET_FAILURE,
	UPDATE_JOB_RUNSHEET,
	UPDATE_JOB_RUNSHEET_SUCCESS,
	UPDATE_JOB_RUNSHEET_FAILURE,
	DOWNLOAD_PDF_JOB_RUNSHEET,
	DOWNLOAD_PDF_JOB_RUNSHEET_SUCCESS,
	DOWNLOAD_PDF_JOB_RUNSHEET_FAILURE,
	DOWNLOAD_CSV_JOB_RUNSHEET,
	DOWNLOAD_CSV_JOB_RUNSHEET_SUCCESS,
	DOWNLOAD_CSV_JOB_RUNSHEET_FAILURE,
	FETCH_JOB_PRICE_MATRIX,
	FETCH_JOB_PRICE_MATRIX_SUCCESS,
	FETCH_JOB_PRICE_MATRIX_FAILURE,
	UPDATE_JOB_PRICE_MATRIX,
	UPDATE_JOB_PRICE_MATRIX_SUCCESS,
	UPDATE_JOB_PRICE_MATRIX_FAILURE,
	FETCH_ADDITIONAL_CHARGES,
	FETCH_ADDITIONAL_CHARGES_SUCCESS,
	FETCH_ADDITIONAL_CHARGES_FAILURE,
	UPDATE_ADDITIONAL_CHARGES,
	UPDATE_ADDITIONAL_CHARGES_SUCCESS,
	UPDATE_ADDITIONAL_CHARGES_FAILURE,
	RE_ASSIGN_CHANGE_DRIVER,
	RE_ASSIGN_CHANGE_DRIVER_SUCCESS,
	RE_ASSIGN_CHANGE_DRIVER_FAILURE,
	CHANGE_DRIVER,
	CHANGE_DRIVER_SUCCESS,
	CHANGE_DRIVER_FAILURE,
	FETCH_JOB_TOLL_CHARGE,
	FETCH_JOB_TOLL_CHARGE_SUCCESS,
	FETCH_JOB_TOLL_CHARGE_FAILURE,
	DELETE_JOB_TOLL_CHARGE,
	DELETE_JOB_TOLL_CHARGE_SUCCESS,
	DELETE_JOB_TOLL_CHARGE_FAILURE,
	CREATE_COMPLETED_JOB,
	CREATE_COMPLETED_JOB_SUCCESS,
	CREATE_COMPLETED_JOB_FAILURE,
	UPDATE_JOB_DETAILS,
	UPDATE_JOB_DETAILS_SUCCESS,
	UPDATE_JOB_DETAILS_FAILURE,
	UPDATE_JOB_DURATION,
	UPDATE_JOB_DURATION_SUCCESS,
	UPDATE_JOB_DURATION_FAILURE,
	FETCH_OFFLINE_JOBS,
	FETCH_OFFLINE_JOBS_SUCCESS,
	FETCH_OFFLINE_JOBS_FAILURE,
	DELETE_OFFLINE_JOBS,
	DELETE_OFFLINE_JOBS_SUCCESS,
	DELETE_OFFLINE_JOBS_FAILURE,
	CREATE_COMPLETED_OFFLINE_JOB,
	CREATE_COMPLETED_OFFLINE_JOB_SUCCESS,
	CREATE_COMPLETED_OFFLINE_JOB_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
	loadingJobs: false,
	jobsData: null,
	loadingAirWayBillData: null,
	airWayBillData: null,
	loadingReminders: false,
	reminderData: null,
	addAirWayBill: null,
	addAirWayBillLoad: false,
	loadingAirWayBill: false,
	creatingJob: false,
	createdJobData: null,
	loadingJobsById: false,
	jobByIdData: null,
	editingJob: false,
	editJobData: null,
	loadingJobConsignment: false,
	jobConsignmentData: null,
	addingJobConsignment: false,
	addJobConsignmentData: null,
	uploadingImage: false,
	editingJobConsignment: false,
	editJobConsignmentData: null,
	deletingJobConsignment: false,
	deleteConsignmentData: null,
	editingAWB: false,
	editAirwayBillData: null,
	deletetingAWB: false,
	deleteAWBData: null,
	loadingConsignmentItems: false,
	consignmentItems: null,
	addingConsignmentItem: false,
	addConsignmentItem: null,
	editingConsignmentItem: false,
	editConsignmentItem: null,
	deletingConsignmentItem: false,
	deleteConsignmentItem: null,
	uploadingItemImage: false,
	loadingAwbLoose: false,
	awbLooseData: null,
	addingAwbLoose: false,
	addAwbLooseData: null,
	editingAwbLoose: false,
	editAwbLooseData: null,
	deletingAwbLoose: false,
	deleteAwbLooseData: null,
	loadingAwbUld: false,
	awbUldData: null,
	addingAwbUld: false,
	addAwbUldData: null,
	editingAwbUld: false,
	editAwbUldData: null,
	deletingAwbUld: false,
	deleteAwbUldData: null,
	assigningDriver: false,
	assignedDriverData: null,
	reAssigningDriver: false,
	reAssignedDriverData: null,
	reviewingJobs: false,
	reviewedJobsData: null,
	gettingJobRunsheet: false,
	jobRunSheetData: null,
	updatingJobRunsheet: false,
	updateJobRunsheetData: null,
	downloadingPdfJobRunsheet: false,
	downloadPdfJobRunsheetData: null,
	downloadingCsvJobRunsheet: false,
	downloadCsvJobRunsheetData: null,
	loadingJobPriceMatrix: false,
	jobPriceMatrixData: null,
	updatingJobPriceMatrix: false,
	updateJobPriceMatrixData: null,
	loadingAdditionalCharge: false,
	additionalChargesData: null,
	updatingAdditionalCharges: false,
	updateAdditionalChargesData: null,
	deletingJob: false,
	reAssigningDriverChange: false,
	changingDriver: false,
	loadingJobTollCharge: false,
	jobTollChargeData: null,
	deletingJobTollCharge: false,
	creatingCompletedJob: false,
	updatingJobDetails: false,
	updatingJobDuration: false,
	loadingOfflineJobs: false,
	offlineJobsData: null,
	deletingOfflineJob: false,
	creatingCompletedOfflineJob: false,
};

const JobsReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case FETCH_JOBS:
			return { ...state, loadingJobs: true };
		case FETCH_JOBS_SUCCESS:
			return {
				...state,
				jobsData: action.payload,
				loadingJobs: false,
			};
		case FETCH_JOBS_FAILURE:
			return {
				...state,
				jobsData: action.payload,
				loadingJobs: false,
			};

		case CREATE_JOB:
			return { ...state, creatingJob: true };
		case CREATE_JOB_SUCCESS:
			return {
				...state,
				createdJobData: action.payload,
				creatingJob: false,
			};
		case CREATE_JOB_FAILURE:
			return {
				...state,
				createdJobData: action.payload,
				creatingJob: false,
			};

		case FETCH_JOBS_ID:
			return { ...state, loadingJobsById: true };
		case FETCH_JOBS_ID_SUCCESS:
			return {
				...state,
				jobByIdData: action.payload,
				loadingJobsById: false,
			};
		case FETCH_JOBS_ID_FAILURE:
			return {
				...state,
				jobByIdData: action.payload,
				loadingJobsById: false,
			};

		case EDIT_JOB:
			return { ...state, editingJob: true };
		case EDIT_JOB_SUCCESS:
			return {
				...state,
				editJobData: action.payload,
				editingJob: false,
			};
		case EDIT_JOB_FAILURE:
			return {
				...state,
				editJobData: action.payload,
				editingJob: false,
			};

		case FETCH_JOB_CONSIGNMENT:
			return { ...state, loadingJobConsignment: true };
		case FETCH_JOB_CONSIGNMENT_SUCCESS:
			return {
				...state,
				jobConsignmentData: action.payload,
				loadingJobConsignment: false,
			};
		case FETCH_JOB_CONSIGNMENT_FAILURE:
			return {
				...state,
				jobConsignmentData: action.payload,
				loadingJobConsignment: false,
			};

		case ADD_JOB_CONSIGNMENT:
			return { ...state, addingJobConsignment: true };
		case ADD_JOB_CONSIGNMENT_SUCCESS:
			return {
				...state,
				addJobConsignmentData: action.payload,
				addingJobConsignment: false,
			};
		case ADD_JOB_CONSIGNMENT_FAILURE:
			return {
				...state,
				addJobConsignmentData: action.payload,
				addingJobConsignment: false,
			};

		case EDIT_JOB_CONSIGNMENT:
			return { ...state, editingJobConsignment: true };
		case EDIT_JOB_CONSIGNMENT_SUCCESS:
			return {
				...state,
				editJobConsignmentData: action.payload,
				editingJobConsignment: false,
			};
		case EDIT_JOB_CONSIGNMENT_FAILURE:
			return {
				...state,
				editJobConsignmentData: action.payload,
				editingJobConsignment: false,
			};

		case DELETE_JOB_CONSIGNMENT:
			return { ...state, deletingJobConsignment: true };
		case DELETE_JOB_CONSIGNMENT_SUCCESS:
			return {
				...state,
				deleteConsignmentData: action.payload,
				deletingJobConsignment: false,
			};
		case DELETE_JOB_CONSIGNMENT_FAILURE:
			return {
				...state,
				deleteConsignmentData: action.payload,
				deletingJobConsignment: false,
			};

		case UPLOAD_IMAGE_ADD_CONSIGNMENT:
			return { ...state, uploadingImage: true };
		case UPLOAD_IMAGE_ADD_CONSIGNMENT_SUCCESS:
			return {
				...state,
				uploadingImage: false,
			};
		case UPLOAD_IMAGE_ADD_CONSIGNMENT_FAILURE:
			return {
				...state,
				uploadingImage: false,
			};

		case FETCH_AIR_WAY_BILLS:
			return { ...state, loadingAirWayBill: true };
		case FETCH_AIR_WAY_BILLS_SUCCESS:
			return {
				...state,
				airWayBillData: action.payload,
				loadingAirWayBill: false,
			};
		case FETCH_AIR_WAY_BILLS_FAILURE:
			return {
				...state,
				airWayBillData: action.payload,
				loadingAirWayBill: false,
			};

		case FETCH_REMINDER:
			return { ...state, loadingReminders: true };
		case FETCH_REMINDER_SUCCESS:
			return {
				...state,
				reminderData: action.payload,
				loadingReminders: false,
			};
		case FETCH_REMINDER_FAILURE:
			return {
				...state,
				reminderData: action.payload,
				loadingReminders: false,
			};

		case ADD_AWB:
			return { ...state, addAirWayBillLoad: true };
		case ADD_AWB_SUCCESS:
			return {
				...state,
				addAirWayBill: action.payload,
				addAirWayBillLoad: false,
			};
		case ADD_AWB_FAILURE:
			return {
				...state,
				addAirWayBill: action.payload,
				addAirWayBillLoad: false,
			};

		case EDIT_AWB:
			return { ...state, editingAWB: true };
		case EDIT_AWB_SUCCESS:
			return {
				...state,
				editAirwayBillData: action.payload,
				editingAWB: false,
			};
		case EDIT_AWB_FAILURE:
			return {
				...state,
				editAirwayBillData: action.payload,
				editingAWB: false,
			};

		case DELETE_AWB:
			return { ...state, deletetingAWB: true };
		case DELETE_AWB_SUCCESS:
			return {
				...state,
				deleteAWBData: action.payload,
				deletetingAWB: false,
			};
		case DELETE_AWB_FAILURE:
			return {
				...state,
				deleteAWBData: action.payload,
				deletetingAWB: false,
			};

		case FETCH_CONSIGNMENT_ITEM:
			return { ...state, loadingConsignmentItems: true };
		case FETCH_CONSIGNMENT_ITEM_SUCCESS:
			return {
				...state,
				consignmentItems: action.payload,
				loadingConsignmentItems: false,
			};
		case FETCH_CONSIGNMENT_ITEM_FAILURE:
			return {
				...state,
				consignmentItems: action.payload,
				loadingConsignmentItems: false,
			};

		case ADD_CONSIGNMENT_ITEM:
			return { ...state, addingConsignmentItem: true };
		case ADD_CONSIGNMENT_ITEM_SUCCESS:
			return {
				...state,
				addConsignmentItem: action.payload,
				addingConsignmentItem: false,
			};
		case ADD_CONSIGNMENT_ITEM_FAILURE:
			return {
				...state,
				addConsignmentItem: action.payload,
				addingConsignmentItem: false,
			};

		case EDIT_CONSIGNMENT_ITEM:
			return { ...state, editingConsignmentItem: true };
		case EDIT_CONSIGNMENT_ITEM_SUCCESS:
			return {
				...state,
				editConsignmentItem: action.payload,
				editingConsignmentItem: false,
			};
		case EDIT_CONSIGNMENT_ITEM_FAILURE:
			return {
				...state,
				editConsignmentItem: action.payload,
				editingConsignmentItem: false,
			};

		case DELETE_CONSIGNMENT_ITEM:
			return { ...state, deletingConsignmentItem: true };
		case DELETE_CONSIGNMENT_ITEM_SUCCESS:
			return {
				...state,
				deleteConsignmentItem: action.payload,
				deletingConsignmentItem: false,
			};
		case DELETE_CONSIGNMENT_ITEM_FAILURE:
			return {
				...state,
				deleteConsignmentItem: action.payload,
				deletingConsignmentItem: false,
			};

		case IMAGE_UPLOAD_CONSIGNMENT_ITEM:
			return { ...state, uploadingItemImage: true };
		case IMAGE_UPLOAD_CONSIGNMENT_ITEM_SUCCESS:
			return {
				...state,
				uploadingItemImage: false,
			};
		case IMAGE_UPLOAD_CONSIGNMENT_ITEM_FAILURE:
			return {
				...state,
				uploadingItemImage: false,
			};

		case FETCH_AWB_LOOSE:
			return { ...state, loadingAwbLoose: true };
		case FETCH_AWB_LOOSE_SUCCESS:
			return {
				...state,
				awbLooseData: action.payload,
				loadingAwbLoose: false,
			};
		case FETCH_AWB_LOOSE_FAILURE:
			return {
				...state,
				awbLooseData: action.payload,
				loadingAwbLoose: false,
			};

		case ADD_AWB_LOOSE:
			return { ...state, addingAwbLoose: true };
		case ADD_AWB_LOOSE_SUCCESS:
			return {
				...state,
				addAwbLooseData: action.payload,
				addingAwbLoose: false,
			};
		case ADD_AWB_LOOSE_FAILURE:
			return {
				...state,
				addAwbLooseData: action.payload,
				addingAwbLoose: false,
			};

		case EDIT_AWB_LOOSE:
			return { ...state, editingAwbLoose: true };
		case EDIT_AWB_LOOSE_SUCCESS:
			return {
				...state,
				editAwbLooseData: action.payload,
				editingAwbLoose: false,
			};
		case EDIT_AWB_LOOSE_FAILURE:
			return {
				...state,
				editAwbLooseData: action.payload,
				editingAwbLoose: false,
			};

		case DELETE_AWB_LOOSE:
			return { ...state, deletingAwbLoose: true };
		case DELETE_AWB_LOOSE_SUCCESS:
			return {
				...state,
				deleteAwbLooseData: action.payload,
				deletingAwbLoose: false,
			};
		case DELETE_AWB_LOOSE_FAILURE:
			return {
				...state,
				deleteAwbLooseData: action.payload,
				deletingAwbLoose: false,
			};

		case FETCH_AWB_ULD:
			return { ...state, loadingAwbUld: true };
		case FETCH_AWB_ULD_SUCCESS:
			return {
				...state,
				awbUldData: action.payload,
				loadingAwbUld: false,
			};
		case FETCH_AWB_ULD_FAILURE:
			return {
				...state,
				awbUldData: action.payload,
				loadingAwbUld: false,
			};

		case ADD_AWB_ULD:
			return { ...state, addingAwbUld: true };
		case ADD_AWB_ULD_SUCCESS:
			return {
				...state,
				addAwbUldData: action.payload,
				addingAwbUld: false,
			};
		case ADD_AWB_ULD_FAILURE:
			return {
				...state,
				addAwbUldData: action.payload,
				addingAwbUld: false,
			};

		case EDIT_AWB_ULD:
			return { ...state, editingAwbUld: true };
		case EDIT_AWB_ULD_SUCCESS:
			return {
				...state,
				editAwbUldData: action.payload,
				editingAwbUld: false,
			};
		case EDIT_AWB_ULD_FAILURE:
			return {
				...state,
				editAwbUldData: action.payload,
				editingAwbUld: false,
			};

		case DELETE_AWB_ULD:
			return { ...state, deletingAwbUld: true };
		case DELETE_AWB_ULD_SUCCESS:
			return {
				...state,
				deleteAwbUldData: action.payload,
				deletingAwbUld: false,
			};
		case DELETE_AWB_ULD_FAILURE:
			return {
				...state,
				deleteAwbUldData: action.payload,
				deletingAwbUld: false,
			};

		case ASSIGN_DRIVER:
			return { ...state, assigningDriver: true };
		case ASSIGN_DRIVER_SUCCESS:
			return {
				...state,
				assignedDriverData: action.payload,
				assigningDriver: false,
			};
		case ASSIGN_DRIVER_FAILURE:
			return {
				...state,
				assignedDriverData: action.payload,
				assigningDriver: false,
			};

		case RE_ASSIGN_DRIVER:
			return { ...state, reAssigningDriver: true };
		case RE_ASSIGN_DRIVER_SUCCESS:
			return {
				...state,
				reAssignedDriverData: action.payload,
				reAssigningDriver: false,
			};
		case RE_ASSIGN_DRIVER_FAILURE:
			return {
				...state,
				reAssignedDriverData: action.payload,
				reAssigningDriver: false,
			};

		case REVIEW_JOBS:
			return { ...state, reviewingJobs: true };
		case REVIEW_JOBS_SUCCESS:
			return {
				...state,
				reviewedJobsData: action.payload,
				reviewingJobs: false,
			};
		case REVIEW_JOBS_FAILURE:
			return {
				...state,
				reviewedJobsData: action.payload,
				reviewingJobs: false,
			};

		case GET_JOB_RUNSHEET:
			return { ...state, gettingJobRunsheet: true };
		case GET_JOB_RUNSHEET_SUCCESS:
			return {
				...state,
				jobRunSheetData: action.payload,
				gettingJobRunsheet: false,
			};
		case GET_JOB_RUNSHEET_FAILURE:
			return {
				...state,
				jobRunSheetData: action.payload,
				gettingJobRunsheet: false,
			};

		case UPDATE_JOB_RUNSHEET:
			return { ...state, updatingJobRunsheet: true };
		case UPDATE_JOB_RUNSHEET_SUCCESS:
			return {
				...state,
				updateJobRunsheetData: action.payload,
				updatingJobRunsheet: false,
			};
		case UPDATE_JOB_RUNSHEET_FAILURE:
			return {
				...state,
				updateJobRunsheetData: action.payload,
				updatingJobRunsheet: false,
			};

		case DOWNLOAD_CSV_JOB_RUNSHEET:
			return { ...state, downloadingCsvJobRunsheet: true };
		case DOWNLOAD_CSV_JOB_RUNSHEET_SUCCESS:
			return {
				...state,
				downloadCsvJobRunsheetData: action.payload,
				downloadingCsvJobRunsheet: false,
			};
		case DOWNLOAD_CSV_JOB_RUNSHEET_FAILURE:
			return {
				...state,
				downloadCsvJobRunsheetData: action.payload,
				downloadingCsvJobRunsheet: false,
			};

		case DOWNLOAD_PDF_JOB_RUNSHEET:
			return { ...state, downloadingPdfJobRunsheet: true };
		case DOWNLOAD_PDF_JOB_RUNSHEET_SUCCESS:
			return {
				...state,
				downloadPdfJobRunsheetData: action.payload,
				downloadingPdfJobRunsheet: false,
			};
		case DOWNLOAD_PDF_JOB_RUNSHEET_FAILURE:
			return {
				...state,
				downloadPdfJobRunsheetData: action.payload,
				downloadingPdfJobRunsheet: false,
			};

		case FETCH_JOB_PRICE_MATRIX:
			return { ...state, loadingJobPriceMatrix: true };
		case FETCH_JOB_PRICE_MATRIX_SUCCESS:
			return {
				...state,
				jobPriceMatrixData: action.payload,
				loadingJobPriceMatrix: false,
			};
		case FETCH_JOB_PRICE_MATRIX_FAILURE:
			return {
				...state,
				jobPriceMatrixData: action.payload,
				loadingJobPriceMatrix: false,
			};

		case UPDATE_JOB_PRICE_MATRIX:
			return { ...state, updatingJobPriceMatrix: true };
		case UPDATE_JOB_PRICE_MATRIX_SUCCESS:
			return {
				...state,
				updateJobPriceMatrixData: action.payload,
				updatingJobPriceMatrix: false,
			};
		case UPDATE_JOB_PRICE_MATRIX_FAILURE:
			return {
				...state,
				updateJobPriceMatrixData: action.payload,
				updatingJobPriceMatrix: false,
			};

		case FETCH_ADDITIONAL_CHARGES:
			return { ...state, loadingAdditionalCharge: true };
		case FETCH_ADDITIONAL_CHARGES_SUCCESS:
			return {
				...state,
				additionalChargesData: action.payload,
				loadingAdditionalCharge: false,
			};
		case FETCH_ADDITIONAL_CHARGES_FAILURE:
			return {
				...state,
				additionalChargesData: action.payload,
				loadingAdditionalCharge: false,
			};

		case UPDATE_ADDITIONAL_CHARGES:
			return { ...state, updatingAdditionalCharges: true };
		case UPDATE_ADDITIONAL_CHARGES_SUCCESS:
			return {
				...state,
				updateAdditionalChargesData: action.payload,
				updatingAdditionalCharges: false,
			};
		case UPDATE_ADDITIONAL_CHARGES_FAILURE:
			return {
				...state,
				updateAdditionalChargesData: action.payload,
				updatingAdditionalCharges: false,
			};

		case DELETE_JOB:
			return { ...state, deletingJob: true };
		case DELETE_JOB_SUCCESS:
			return {
				...state,
				deletingJob: false,
			};
		case DELETE_JOB_FAILURE:
			return {
				...state,
				deletingJob: false,
			};

		case RE_ASSIGN_CHANGE_DRIVER:
			return { ...state, reAssigningDriverChange: true };
		case RE_ASSIGN_CHANGE_DRIVER_SUCCESS:
			return {
				...state,
				reAssigningDriverChange: false,
			};
		case RE_ASSIGN_CHANGE_DRIVER_FAILURE:
			return {
				...state,
				reAssigningDriverChange: false,
			};

		case CHANGE_DRIVER:
			return { ...state, changingDriver: true };
		case CHANGE_DRIVER_SUCCESS:
			return {
				...state,
				changingDriver: false,
			};
		case CHANGE_DRIVER_FAILURE:
			return {
				...state,
				changingDriver: false,
			};

		case DELETE_JOB_TOLL_CHARGE:
			return { ...state, deletingJobTollCharge: true };
		case DELETE_JOB_TOLL_CHARGE_SUCCESS:
			return {
				...state,
				deletingJobTollCharge: false,
			};
		case DELETE_JOB_TOLL_CHARGE_FAILURE:
			return {
				...state,
				deletingJobTollCharge: false,
			};

		case FETCH_JOB_TOLL_CHARGE:
			return { ...state, loadingJobTollCharge: true };
		case FETCH_JOB_TOLL_CHARGE_SUCCESS:
			return {
				...state,
				jobTollChargeData: action.payload,
				loadingJobTollCharge: false,
			};
		case FETCH_JOB_TOLL_CHARGE_FAILURE:
			return {
				...state,
				jobTollChargeData: action.payload,
				loadingJobTollCharge: false,
			};

		case CREATE_COMPLETED_JOB:
			return { ...state, creatingCompletedJob: true };
		case CREATE_COMPLETED_JOB_SUCCESS:
			return {
				...state,
				creatingCompletedJob: false,
			};
		case CREATE_COMPLETED_JOB_FAILURE:
			return {
				...state,
				creatingCompletedJob: false,
			};

		case UPDATE_JOB_DETAILS:
			return { ...state, updatingJobDetails: true };
		case UPDATE_JOB_DETAILS_SUCCESS:
			return {
				...state,
				updatingJobDetails: false,
			};
		case UPDATE_JOB_DETAILS_FAILURE:
			return {
				...state,
				updatingJobDetails: false,
			};

		case UPDATE_JOB_DURATION:
			return { ...state, updatingJobDuration: true };
		case UPDATE_JOB_DURATION_SUCCESS:
			return {
				...state,
				updatingJobDuration: false,
			};
		case UPDATE_JOB_DURATION_FAILURE:
			return {
				...state,
				updatingJobDuration: false,
			};

		case FETCH_OFFLINE_JOBS:
			return { ...state, loadingOfflineJobs: true };
		case FETCH_OFFLINE_JOBS_SUCCESS:
			return {
				...state,
				offlineJobsData: action.payload,
				loadingOfflineJobs: false,
			};
		case FETCH_OFFLINE_JOBS_FAILURE:
			return {
				...state,
				offlineJobsData: action.payload,
				loadingOfflineJobs: false,
			};

		case DELETE_OFFLINE_JOBS:
			return { ...state, deletingOfflineJob: true };
		case DELETE_OFFLINE_JOBS_SUCCESS:
			return {
				...state,
				deletingOfflineJob: false,
			};
		case DELETE_OFFLINE_JOBS_FAILURE:
			return {
				...state,
				deletingOfflineJob: false,
			};

		case CREATE_COMPLETED_OFFLINE_JOB:
			return {
				...state,
				creatingCompletedOfflineJob: true,
			};
		case CREATE_COMPLETED_OFFLINE_JOB_SUCCESS:
			return {
				...state,
				creatingCompletedOfflineJob: false,
			};
		case CREATE_COMPLETED_OFFLINE_JOB_FAILURE:
			return {
				...state,
				creatingCompletedOfflineJob: false,
			};

		default:
			return state;
	}
};
export default JobsReducer;
