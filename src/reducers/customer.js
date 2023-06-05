import {
	FETCH_CUSTOMERS,
	FETCH_CUSTOMERS_SUCCESS,
	FETCH_CUSTOMERS_FAILURE,
	FETCH_PARENT_CUSTOMERS,
	FETCH_PARENT_CUSTOMERS_SUCCESS,
	FETCH_PARENT_CUSTOMERS_FAILURE,
	ADD_CUSTOMER,
	ADD_CUSTOMER_SUCCESS,
	ADD_CUSTOMER_FAILURE,
	FETCH_CUSTOMER_ID,
	FETCH_CUSTOMER_ID_SUCCESS,
	FETCH_CUSTOMER_ID_FAILURE,
	EDIT_CUSTOMER,
	EDIT_CUSTOMER_SUCCESS,
	EDIT_CUSTOMER_FAILURE,
	FETCH_CHILD_CUSTOMER,
	FETCH_CHILD_CUSTOMER_SUCCESS,
	FETCH_CHILD_CUSTOMER_FAILURE,
	FETCH_CUSTOMER_JOBS,
	FETCH_CUSTOMER_JOBS_SUCCESS,
	FETCH_CUSTOMER_JOBS_FAILURE,
	FETCH_CUSTOMER_INVOICES,
	FETCH_CUSTOMER_INVOICES_SUCCESS,
	FETCH_CUSTOMER_INVOICES_FAILURE,
	FETCH_CUSTOMER_CURRENT_ACTIVITES,
	FETCH_CUSTOMER_CURRENT_ACTIVITES_SUCCESS,
	FETCH_CUSTOMER_CURRENT_ACTIVITES_FAILURE,
	FETCH_CUSTOMER_USERS,
	FETCH_CUSTOMER_USERS_SUCCESS,
	FETCH_CUSTOMER_USERS_FAILURE,
	ADD_CUSTOMER_USERS,
	ADD_CUSTOMER_USERS_SUCCESS,
	ADD_CUSTOMER_USERS_FAILURE,
	EDIT_CUSTOMER_USERS,
	EDIT_CUSTOMER_USERS_SUCCESS,
	EDIT_CUSTOMER_USERS_FAILURE,
	DELETE_CUSTOMER_USERS,
	DELETE_CUSTOMER_USERS_SUCCESS,
	DELETE_CUSTOMER_USERS_FAILURE,
	FETCH_CUSTOMER_ADDRESS,
	FETCH_CUSTOMER_ADDRESS_SUCCESS,
	FETCH_CUSTOMER_ADDRESS_FAILURE,
	ADD_CUSTOMER_ADDRESS,
	ADD_CUSTOMER_ADDRESS_SUCCESS,
	ADD_CUSTOMER_ADDRESS_FAILURE,
	EDIT_CUSTOMER_ADDRESS,
	EDIT_CUSTOMER_ADDRESS_SUCCESS,
	EDIT_CUSTOMER_ADDRESS_FAILURE,
	DELETE_CUSTOMER_ADDRESS,
	DELETE_CUSTOMER_ADDRESS_SUCCESS,
	DELETE_CUSTOMER_ADDRESS_FAILURE,
	FETCH_PRICE_MATRIX,
	FETCH_PRICE_MATRIX_SUCCESS,
	FETCH_PRICE_MATRIX_FAILURE,
	UPDATE_PRICE_MATRIX_SUCCESS,
	UPDATE_PRICE_MATRIX_FAILURE,
	UPDATE_FUEL_SURCHARGE,
	UPDATE_FUEL_SURCHARGE_SUCCESS,
	UPDATE_FUEL_SURCHARGE_FAILURE,
	UPDATE_VALIDITY,
	UPDATE_VALIDITY_SUCCESS,
	UPDATE_VALIDITY_FAILURE,
	UPDATE_DAILY_MINIMUM_HOURS,
	UPDATE_DAILY_MINIMUM_HOURS_SUCCESS,
	UPDATE_DAILY_MINIMUM_HOURS_FAILURE,
	UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT,
	UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
	UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE,
	FETCH_PRICE_MATRIX_CONSIGNMENT,
	FETCH_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
	FETCH_PRICE_MATRIX_CONSIGNMENT_FAILURE,
	UPDATE_PRICE_MATRIX_CONSIGNMENT,
	UPDATE_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
	UPDATE_PRICE_MATRIX_CONSIGNMENT_FAILURE,
	GENERATE_INVOICE,
	GENERATE_INVOICE_SUCCESS,
	GENERATE_INVOICE_FAILURE,
	UPDATE_MINIMUM_INVOICE_VALUE,
	UPDATE_MINIMUM_INVOICE_VALUE_SUCCESS,
	UPDATE_MINIMUM_INVOICE_VALUE_FAILURE,
	GET_DAILY_MINIMUM_HOURS,
	GET_DAILY_MINIMUM_HOURS_SUCCESS,
	GET_DAILY_MINIMUM_HOURS_FAILURE,
	GET_DAILY_MINIMUM_HOURS_CONSIGNMENT,
	GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
	GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE,
	SEND_INVOICE_FOR_APPROVAL,
	SEND_INVOICE_FOR_APPROVAL_SUCCESS,
	SEND_INVOICE_FOR_APPROVAL_FAILURE,
	PREVIEW_INVOICE,
	PREVIEW_INVOICE_SUCCESS,
	PREVIEW_INVOICE_FAILURE,
	FETCH_PER_JOB,
	FETCH_PER_JOB_SUCCESS,
	FETCH_PER_JOB_FAILURE,
	UPDATE_PER_JOB,
	UPDATE_PER_JOB_SUCCESS,
	UPDATE_PER_JOB_FAILURE,
	UPDATE_ULD_PER_JOB,
	UPDATE_ULD_PER_JOB_SUCCESS,
	UPDATE_ULD_PER_JOB_FAILURE,
	ISENABLE_PER_JOB,
	ISENABLE_PER_JOB_SUCCESS,
	ISENABLE_PER_JOB_FAILURE,
	ISENABLE_ULD_PER_JOB,
	ISENABLE_ULD_PER_JOB_SUCCESS,
	ISENABLE_ULD_PER_JOB_FAILURE,
	FETCH_CUSTOMER_CREDIT_NOTE,
	FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS,
	FETCH_CUSTOMER_CREDIT_NOTE_FAILURE,
	ADD_CUSTOMER_CREDIT_NOTE,
	ADD_CUSTOMER_CREDIT_NOTE_SUCCESS,
	ADD_CUSTOMER_CREDIT_NOTE_FAILURE,
	EDIT_CUSTOMER_CREDIT_NOTE,
	EDIT_CUSTOMER_CREDIT_NOTE_FAILURE,
	EDIT_CUSTOMER_CREDIT_NOTE_SUCCESS,
	DELETE_CUSTOMER_CREDIT_NOTE,
	DELETE_CUSTOMER_CREDIT_NOTE_SUCCESS,
	DELETE_CUSTOMER_CREDIT_NOTE_FAILURE,
	SEND_CREDIT_NOTE,
	SEND_CREDIT_NOTE_SUCCESS,
	SEND_CREDIT_NOTE_FAILURE,
	FETCH_NOTE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
	UPDATE_NOTE,
	UPDATE_NOTE_SUCCESS,
	UPDATE_NOTE_FAILURE,
	FETCH_DOCUMENT,
	FETCH_DOCUMENT_SUCCESS,
	FETCH_DOCUMENT_FAILURE,
	DELETE_DOCUMENT,
	DELETE_DOCUMENT_SUCCESS,
	DELETE_DOCUMENT_FAILURE,
	ADD_DOCUMENT,
	ADD_DOCUMENT_SUCCESS,
	ADD_DOCUMENT_FAILURE,
	FETCH_CUSTOMER_AWB,
	FETCH_CUSTOMER_AWB_SUCCESS,
	FETCH_CUSTOMER_AWB_FAILURE,
	DELETE_CUSTOMER_AWB,
	DELETE_CUSTOMER_AWB_SUCCESS,
	DELETE_CUSTOMER_AWB_FAILURE,
	IMPORT_CUSTOMER_CSV,
	IMPORT_CUSTOMER_CSV_SUCCESS,
	IMPORT_CUSTOMER_CSV_FAILURE,
	IMPORT_CUSTOMER_AWB,
	IMPORT_CUSTOMER_AWB_SUCCESS,
	IMPORT_CUSTOMER_AWB_FAILURE,
	FETCH_CUSTOMER_CONSIGNMENT,
	FETCH_CUSTOMER_CONSIGNMENT_SUCCESS,
	FETCH_CUSTOMER_CONSIGNMENT_FAILURE,
	DELETE_CUSTOMER_CONSIGNMENT,
	DELETE_CUSTOMER_CONSIGNMENT_SUCCESS,
	DELETE_CUSTOMER_CONSIGNMENT_FAILURE,
	IMPORT_CUSTOMER_CONSIGNMENT,
	IMPORT_CUSTOMER_CONSIGNMENT_SUCCESS,
	IMPORT_CUSTOMER_CONSIGNMENT_FAILURE,
	FETCH_CUSTOMER_MANUAL_INVOICES,
	FETCH_CUSTOMER_MANUAL_INVOICES_SUCCESS,
	FETCH_CUSTOMER_MANUAL_INVOICES_FAILURE,
	GENERATE_MANUAL_INVOICE,
	GENERATE_MANUAL_INVOICE_SUCCESS,
	GENERATE_MANUAL_INVOICE_FAILURE,
	REJECT_MANUAL_INVOICE,
	REJECT_MANUAL_INVOICE_SUCCESS,
	REJECT_MANUAL_INVOICE_FAILURE,
	APPROVE_MANUAL_INVOICE,
	APPROVE_MANUAL_INVOICE_SUCCESS,
	APPROVE_MANUAL_INVOICE_FAILURE,
	FETCH_MANUAL_DRAFT_LISTING,
	FETCH_MANUAL_DRAFT_LISTING_SUCCESS,
	FETCH_MANUAL_DRAFT_LISTING_FAILURE,
	GET_SFTP,
	GET_SFTP_SUCCESS,
	GET_SFTP_FAILURE,
	SET_SFTP,
	SET_SFTP_SUCCESS,
	SET_SFTP_FAILURE,
	FETCH_WAITING_TIME,
	FETCH_WAITING_TIME_SUCCESS,
	FETCH_WAITING_TIME_FAILURE,
	UPDATE_WAITING_TIME,
	UPDATE_WAITING_TIME_SUCCESS,
	UPDATE_WAITING_TIME_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
	loading: false,
	customers: null,
	loadingParent: false,
	parentCustomers: null,
	addingCustomer: false,
	customerData: null,
	loadingCustomerById: false,
	customerByIdData: null,
	rejectManualInvoice: false,
	approveManualInvoice: false,
	editingCustomer: false,
	editCustomerData: null,
	viewChildCustomerData: null,
	loadingChildCustomer: false,
	loadingCustomerJobs: false,
	customerJobs: null,
	loadingCustomerInvoices: false,
	customerInvoices: null,
	loadingCustomerCurrentActivites: false,
	customerCurrentActivites: null,
	loadingCustomerManualInvoices: false,
	customerManualInvoices: null,
	generatingManualInvoices: false,
	generateManualInvoicesData: null,
	loadingCustomerUser: false,
	customeruserData: null,
	addingCustomerUser: false,
	addCustomerUserData: null,
	editingCustomerUser: false,
	editCustomerUserData: null,
	deletingCustomerUser: false,
	deleteCustomerUserData: null,
	loadingCustomerAddress: false,
	customerAddressData: null,
	addingCustomerAddress: false,
	addCustomerAddressData: null,
	editingCustomerAddress: false,
	editCustomerAddressData: null,
	deletingCustomerAddress: false,
	deleteCustomerAddressData: null,
	loadingPriceMatrix: false,
	priceMatrixData: null,
	updatingPriceMatrix: false,
	updatePriceMatrixData: null,
	updatingFuelSurcharge: false,
	updateFuelSurchargeData: null,
	updatingValidity: false,
	updateValidityData: null,
	loadingMinimumHours: false,
	minimumHoursData: null,
	loadingMinimuHourConsignment: false,
	minimunHourConsignmentData: null,
	updatingMinimumHours: false,
	updateMinimumHoursData: null,
	updatingMinimumHourConsignment: false,
	updateMinimumHourConsignmentData: null,
	loadingPriceMatrixConsignment: false,
	getPriceMatrixConsignmentData: null,
	updatingPriceMatrixConsignment: false,
	updatePriceMatrixConsignmentData: null,
	generatingInvoice: false,
	generateInvoiceData: null,
	updatingWaitingTime: false,
	udatedWaitingData: null,
	loadingWaitingTime: false,
	waitingTimeData: null,
	updatingMinimumInvoiceValue: false,
	updateMinimumInvoiceData: null,
	sendingInvoiceForApproval: false,
	loadingPreview: false,
	previewData: null,
	loadingPerJob: false,
	perJobData: null,
	updatingPerJob: false,
	updatingUldPerJob: false,
	enablingPerJob: false,
	enablingUldPerJob: false,
	loadingCreditNote: false,
	creditNoteData: null,
	addingCreditNote: false,
	editingCreditNote: false,
	deletingCreditNote: false,
	sendingCreditNote: false,
	loadingCustomerAwb: false,
	customerAwbData: null,
	deletingCustomerAwb: false,
	importingCustomerAwb: false,
	importingCustomerCsv: false,
	loadingCustomerCosignment: false,
	customerConsignmentData: null,
	deletingCustomerConsignment: false,
	importingCustomerConsignment: false,
	loadingManualDraftInvoice: false,
	manualDraftInvoicesData: null,
	loadingSftp: false,
	noteData: null,
	loadingNote: false,
	updatedNoteData: null,
	updatingNoteData: false,
	loadingDocument: false,
	documentList: null,
	deletingDocument: false,
	addingDocument: false,
	sftpData: null,
	settingSftp: false,
};

const CustomerReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case FETCH_CUSTOMERS:
			return { ...state, loading: true };
		case FETCH_CUSTOMERS_SUCCESS:
			return { ...state, customers: action.payload, loading: false };
		case FETCH_CUSTOMERS_FAILURE:
			return { ...state, customers: action.payload, loading: false };

		case FETCH_PARENT_CUSTOMERS:
			return { ...state, loadingParent: true };
		case FETCH_PARENT_CUSTOMERS_SUCCESS:
			return {
				...state,
				parentCustomers: action.payload,
				loadingParent: false,
			};
		case FETCH_PARENT_CUSTOMERS_FAILURE:
			return {
				...state,
				parentCustomers: action.payload,
				loadingParent: false,
			};

		case ADD_CUSTOMER:
			return { ...state, addingCustomer: true };
		case ADD_CUSTOMER_SUCCESS:
			return { ...state, customerData: action.payload, addingCustomer: false };
		case ADD_CUSTOMER_FAILURE:
			return { ...state, customerData: action.payload, addingCustomer: false };

		case FETCH_CUSTOMER_ID:
			return { ...state, loadingCustomerById: true };
		case FETCH_CUSTOMER_ID_SUCCESS:
			return {
				...state,
				customerByIdData: action.payload,
				loadingCustomerById: false,
			};
		case FETCH_CUSTOMER_ID_FAILURE:
			return {
				...state,
				customerByIdData: action.payload,
				loadingCustomerById: false,
			};

		case FETCH_WAITING_TIME:
			return { ...state, loadingWaitingTime: true };
		case FETCH_WAITING_TIME_SUCCESS:
			return {
				...state,
				waitingTimeData: action.payload,
				loadingWaitingTime: false,
			};
		case FETCH_WAITING_TIME_FAILURE:
			return {
				...state,
				waitingTimeData: action.payload,
				loadingWaitingTime: false,
			};

		case UPDATE_WAITING_TIME:
			return { ...state, updatingWaitingTime: true };
		case UPDATE_WAITING_TIME_SUCCESS:
			return {
				...state,
				udatedWaitingData: action.payload,
				updatingWaitingTime: false,
			};
		case UPDATE_WAITING_TIME_FAILURE:
			return {
				...state,
				udatedWaitingData: action.payload,
				updatingWaitingTime: false,
			};

		case EDIT_CUSTOMER:
			return { ...state, editingCustomer: true };
		case EDIT_CUSTOMER_SUCCESS:
			return {
				...state,
				editCustomerData: action.payload,
				editingCustomer: false,
			};
		case EDIT_CUSTOMER_FAILURE:
			return {
				...state,
				editCustomerData: action.payload,
				editingCustomer: false,
			};

		case FETCH_CHILD_CUSTOMER:
			return { ...state, loadingChildCustomer: true };
		case FETCH_CHILD_CUSTOMER_SUCCESS:
			return {
				...state,
				viewChildCustomerData: action.payload,
				loadingChildCustomer: false,
			};
		case FETCH_CHILD_CUSTOMER_FAILURE:
			return {
				...state,
				viewChildCustomerData: action.payload,
				loadingChildCustomer: false,
			};

		case FETCH_CUSTOMER_JOBS:
			return { ...state, loadingCustomerJobs: true };
		case FETCH_CUSTOMER_JOBS_SUCCESS:
			return {
				...state,
				customerJobs: action.payload,
				loadingCustomerJobs: false,
			};
		case FETCH_CUSTOMER_JOBS_FAILURE:
			return {
				...state,
				customerJobs: action.payload,
				loadingCustomerJobs: false,
			};

		case FETCH_CUSTOMER_INVOICES:
			return { ...state, loadingCustomerInvoices: true };
		case FETCH_CUSTOMER_INVOICES_SUCCESS:
			return {
				...state,
				customerInvoices: action.payload,
				loadingCustomerInvoices: false,
			};
		case FETCH_CUSTOMER_INVOICES_FAILURE:
			return {
				...state,
				customerInvoices: action.payload,
				loadingCustomerInvoices: false,
			};

		case FETCH_CUSTOMER_CURRENT_ACTIVITES:
			return { ...state, loadingCustomerCurrentActivites: true };
		case FETCH_CUSTOMER_CURRENT_ACTIVITES_SUCCESS:
			return {
				...state,
				customerCurrentActivites: action.payload,
				loadingCustomerCurrentActivites: false,
			};
		case FETCH_CUSTOMER_CURRENT_ACTIVITES_FAILURE:
			return {
				...state,
				customerCurrentActivites: action.payload,
				loadingCustomerCurrentActivites: false,
			};

		case FETCH_CUSTOMER_MANUAL_INVOICES:
			return { ...state, loadingCustomerManualInvoices: true };
		case FETCH_CUSTOMER_MANUAL_INVOICES_SUCCESS:
			return {
				...state,
				customerManualInvoices: action.payload,
				loadingCustomerManualInvoices: false,
			};
		case FETCH_CUSTOMER_MANUAL_INVOICES_FAILURE:
			return {
				...state,
				customerManualInvoices: action.payload,
				loadingCustomerManualInvoices: false,
			};

		case FETCH_MANUAL_DRAFT_LISTING:
			return { ...state, loadingManualDraftInvoice: true };
		case FETCH_MANUAL_DRAFT_LISTING_SUCCESS:
			return {
				...state,
				manualDraftInvoicesData: action.payload,
				loadingManualDraftInvoice: false,
			};
		case FETCH_MANUAL_DRAFT_LISTING_FAILURE:
			return {
				...state,
				manualDraftInvoicesData: action.payload,
				loadingManualDraftInvoice: false,
			};

		case GENERATE_MANUAL_INVOICE:
			return { ...state, generatingManualInvoices: true };
		case GENERATE_MANUAL_INVOICE_SUCCESS:
			return {
				...state,
				generateManualInvoicesData: action.payload,
				generatingManualInvoices: false,
			};
		case GENERATE_MANUAL_INVOICE_FAILURE:
			return {
				...state,
				generateManualInvoicesData: action.payload,
				generatingManualInvoices: false,
			};

		case REJECT_MANUAL_INVOICE:
			return { ...state, rejectManualInvoice: true };
		case REJECT_MANUAL_INVOICE_SUCCESS:
			return {
				...state,
				rejectManualInvoice: false,
			};
		case REJECT_MANUAL_INVOICE_FAILURE:
			return {
				...state,
				rejectManualInvoice: false,
			};

		case APPROVE_MANUAL_INVOICE:
			return { ...state, approveManualInvoice: true };
		case APPROVE_MANUAL_INVOICE_SUCCESS:
			return {
				...state,
				approveManualInvoice: false,
			};
		case APPROVE_MANUAL_INVOICE_FAILURE:
			return {
				...state,
				approveManualInvoice: false,
			};

		case FETCH_CUSTOMER_USERS:
			return { ...state, loadingCustomerUser: true };
		case FETCH_CUSTOMER_USERS_SUCCESS:
			return {
				...state,
				customeruserData: action.payload,
				loadingCustomerUser: false,
			};
		case FETCH_CUSTOMER_USERS_FAILURE:
			return {
				...state,
				customeruserData: action.payload,
				loadingCustomerUser: false,
			};

		case ADD_CUSTOMER_USERS:
			return { ...state, addingCustomerUser: true };
		case ADD_CUSTOMER_USERS_SUCCESS:
			return {
				...state,
				addCustomerUserData: action.payload,
				addingCustomerUser: false,
			};
		case ADD_CUSTOMER_USERS_FAILURE:
			return {
				...state,
				addCustomerUserData: action.payload,
				addingCustomerUser: false,
			};

		case EDIT_CUSTOMER_USERS:
			return { ...state, editingCustomerUser: true };
		case EDIT_CUSTOMER_USERS_SUCCESS:
			return {
				...state,
				editCustomerUserData: action.payload,
				editingCustomerUser: false,
			};
		case EDIT_CUSTOMER_USERS_FAILURE:
			return {
				...state,
				editCustomerUserData: action.payload,
				editingCustomerUser: false,
			};

		case DELETE_CUSTOMER_USERS:
			return { ...state, deletingCustomerUser: true };
		case DELETE_CUSTOMER_USERS_SUCCESS:
			return {
				...state,
				deleteCustomerUserData: action.payload,
				deletingCustomerUser: false,
			};
		case DELETE_CUSTOMER_USERS_FAILURE:
			return {
				...state,
				deleteCustomerUserData: action.payload,
				deletingCustomerUser: false,
			};

		case FETCH_CUSTOMER_ADDRESS:
			return { ...state, loadingCustomerAddress: true };
		case FETCH_CUSTOMER_ADDRESS_SUCCESS:
			return {
				...state,
				customerAddressData: action.payload,
				loadingCustomerAddress: false,
			};
		case FETCH_CUSTOMER_ADDRESS_FAILURE:
			return {
				...state,
				customerAddressData: action.payload,
				loadingCustomerAddress: false,
			};

		case ADD_CUSTOMER_ADDRESS:
			return { ...state, addingCustomerAddress: true };
		case ADD_CUSTOMER_ADDRESS_SUCCESS:
			return {
				...state,
				addCustomerAddressData: action.payload,
				addingCustomerAddress: false,
			};
		case ADD_CUSTOMER_ADDRESS_FAILURE:
			return {
				...state,
				addCustomerAddressData: action.payload,
				addingCustomerAddress: false,
			};

		case EDIT_CUSTOMER_ADDRESS:
			return { ...state, editingCustomerAddress: true };
		case EDIT_CUSTOMER_ADDRESS_SUCCESS:
			return {
				...state,
				editCustomerAddressData: action.payload,
				editingCustomerAddress: false,
			};
		case EDIT_CUSTOMER_ADDRESS_FAILURE:
			return {
				...state,
				editCustomerAddressData: action.payload,
				editingCustomerAddress: false,
			};

		case DELETE_CUSTOMER_ADDRESS:
			return { ...state, deletingCustomerAddress: true };
		case DELETE_CUSTOMER_ADDRESS_SUCCESS:
			return {
				...state,
				deleteCustomerAddressData: action.payload,
				deletingCustomerAddress: false,
			};
		case DELETE_CUSTOMER_ADDRESS_FAILURE:
			return {
				...state,
				deleteCustomerAddressData: action.payload,
				deletingCustomerAddress: false,
			};

		case FETCH_PRICE_MATRIX:
			return { ...state, loadingPriceMatrix: true };
		case FETCH_PRICE_MATRIX_SUCCESS:
			return {
				...state,
				priceMatrixData: action.payload,
				loadingPriceMatrix: false,
			};
		case FETCH_PRICE_MATRIX_FAILURE:
			return {
				...state,
				priceMatrixData: action.payload,
				loadingPriceMatrix: false,
			};

		case UPDATE_PRICE_MATRIX_SUCCESS:
			return {
				...state,
				updatePriceMatrixData: action.payload,
				updatingPriceMatrix: false,
			};
		case UPDATE_PRICE_MATRIX_FAILURE:
			return {
				...state,
				updatePriceMatrixData: action.payload,
				updatingPriceMatrix: false,
			};

		case UPDATE_FUEL_SURCHARGE:
			return {
				...state,
				updatingFuelSurcharge: true,
			};
		case UPDATE_FUEL_SURCHARGE_SUCCESS:
			return {
				...state,
				updateFuelSurchargeData: action.payload,
				updatingFuelSurcharge: false,
			};
		case UPDATE_FUEL_SURCHARGE_FAILURE:
			return {
				...state,
				updateFuelSurchargeData: action.payload,
				updatingFuelSurcharge: false,
			};

		case UPDATE_VALIDITY:
			return {
				...state,
				updatingValidity: true,
			};
		case UPDATE_VALIDITY_SUCCESS:
			return {
				...state,
				updateValidityData: action.payload,
				updatingValidity: false,
			};
		case UPDATE_VALIDITY_FAILURE:
			return {
				...state,
				updateValidityData: action.payload,
				updatingValidity: false,
			};

		case GET_DAILY_MINIMUM_HOURS:
			return {
				...state,
				loadingMinimumHours: true,
			};
		case GET_DAILY_MINIMUM_HOURS_SUCCESS:
			return {
				...state,
				minimumHoursData: action.payload,
				loadingMinimumHours: false,
			};
		case GET_DAILY_MINIMUM_HOURS_FAILURE:
			return {
				...state,
				minimumHoursData: action.payload,
				loadingMinimumHours: false,
			};

		case GET_DAILY_MINIMUM_HOURS_CONSIGNMENT:
			return { ...state, loadingMinimuHourConsignment: true };
		case GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS:
			return {
				...state,
				minimunHourConsignmentData: action.payload,
				loadingMinimuHourConsignment: false,
			};
		case GET_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE:
			return {
				...state,
				minimunHourConsignmentData: action.payload,
				loadingMinimuHourConsignment: false,
			};

		case UPDATE_DAILY_MINIMUM_HOURS:
			return {
				...state,
				updatingMinimumHours: true,
			};
		case UPDATE_DAILY_MINIMUM_HOURS_SUCCESS:
			return {
				...state,
				updateMinimumHoursData: action.payload,
				updatingMinimumHours: false,
			};
		case UPDATE_DAILY_MINIMUM_HOURS_FAILURE:
			return {
				...state,
				updateMinimumHoursData: action.payload,
				updatingMinimumHours: false,
			};

		case UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT:
			return { ...state, updatingMinimumHourConsignment: true };
		case UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS:
			return {
				...state,
				updateMinimumHourConsignmentData: action.payload,
				updatingMinimumHourConsignment: false,
			};
		case UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE:
			return {
				...state,
				updateMinimumHourConsignmentData: action.payload,
				updatingMinimumHourConsignment: false,
			};

		case FETCH_PRICE_MATRIX_CONSIGNMENT:
			return {
				...state,
				loadingPriceMatrixConsignment: true,
			};
		case FETCH_PRICE_MATRIX_CONSIGNMENT_SUCCESS:
			return {
				...state,
				getPriceMatrixConsignmentData: action.payload,
				loadingPriceMatrixConsignment: false,
			};
		case FETCH_PRICE_MATRIX_CONSIGNMENT_FAILURE:
			return {
				...state,
				getPriceMatrixConsignmentData: action.payload,
				loadingPriceMatrixConsignment: false,
			};

		case UPDATE_PRICE_MATRIX_CONSIGNMENT:
			return {
				...state,
				updatingPriceMatrixConsignment: true,
			};
		case UPDATE_PRICE_MATRIX_CONSIGNMENT_SUCCESS:
			return {
				...state,
				updatePriceMatrixConsignmentData: action.payload,
				updatingPriceMatrixConsignment: false,
			};
		case UPDATE_PRICE_MATRIX_CONSIGNMENT_FAILURE:
			return {
				...state,
				updatePriceMatrixConsignmentData: action.payload,
				updatingPriceMatrixConsignment: false,
			};

		case GENERATE_INVOICE:
			return {
				...state,
				generatingInvoice: true,
			};
		case GENERATE_INVOICE_SUCCESS:
			return {
				...state,
				generateInvoiceData: action.payload,
				generatingInvoice: false,
			};
		case GENERATE_INVOICE_FAILURE:
			return {
				...state,
				generateInvoiceData: action.payload,
				generatingInvoice: false,
			};

		case UPDATE_MINIMUM_INVOICE_VALUE:
			return {
				...state,
				updatingMinimumInvoiceValue: true,
			};
		case UPDATE_MINIMUM_INVOICE_VALUE_SUCCESS:
			return {
				...state,
				updateMinimumInvoiceData: action.payload,
				updatingMinimumInvoiceValue: false,
			};
		case UPDATE_MINIMUM_INVOICE_VALUE_FAILURE:
			return {
				...state,
				updateMinimumInvoiceData: action.payload,
				updatingMinimumInvoiceValue: false,
			};

		case SEND_INVOICE_FOR_APPROVAL:
			return { ...state, sendingInvoiceForApproval: true };
		case SEND_INVOICE_FOR_APPROVAL_SUCCESS:
			return { ...state, sendingInvoiceForApproval: false };
		case SEND_INVOICE_FOR_APPROVAL_FAILURE:
			return { ...state, sendingInvoiceForApproval: false };

		case PREVIEW_INVOICE:
			return { ...state, loadingPreview: true };
		case PREVIEW_INVOICE_SUCCESS:
			return { ...state, previewData: action.payload, loadingPreview: false };
		case PREVIEW_INVOICE_FAILURE:
			return { ...state, previewData: action.payload, loadingPreview: false };

		case FETCH_PER_JOB:
			return { ...state, loadingPerJob: true };
		case FETCH_PER_JOB_SUCCESS:
			return { ...state, perJobData: action.payload, loadingPerJob: false };
		case FETCH_PER_JOB_FAILURE:
			return { ...state, perJobData: action.payload, loadingPerJob: false };

		case UPDATE_PER_JOB:
			return { ...state, updatingPerJob: true };
		case UPDATE_PER_JOB_SUCCESS:
			return { ...state, updatingPerJob: false };
		case UPDATE_PER_JOB_FAILURE:
			return { ...state, updatingPerJob: false };

		case UPDATE_ULD_PER_JOB:
			return { ...state, updatingUldPerJob: true };
		case UPDATE_ULD_PER_JOB_SUCCESS:
			return {
				...state,
				updatingUldPerJob: false,
			};
		case UPDATE_ULD_PER_JOB_FAILURE:
			return {
				...state,
				updatingUldPerJob: false,
			};

		case ISENABLE_PER_JOB:
			return { ...state, enablingPerJob: true };
		case ISENABLE_PER_JOB_SUCCESS:
			return { ...state, enablingPerJob: false };
		case ISENABLE_PER_JOB_FAILURE:
			return { ...state, enablingPerJob: false };

		case ISENABLE_ULD_PER_JOB:
			return { ...state, enablingUldPerJob: true };
		case ISENABLE_ULD_PER_JOB_SUCCESS:
			return { ...state, enablingUldPerJob: true };
		case ISENABLE_ULD_PER_JOB_FAILURE:
			return { ...state, enablingUldPerJob: true };

		case FETCH_CUSTOMER_CREDIT_NOTE:
			return { ...state, loadingCreditNote: true };
		case FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS:
			return {
				...state,
				creditNoteData: action.payload,
				loadingCreditNote: false,
			};
		case FETCH_CUSTOMER_CREDIT_NOTE_FAILURE:
			return {
				...state,
				creditNoteData: action.payload,
				loadingCreditNote: false,
			};

		case EDIT_CUSTOMER_CREDIT_NOTE:
			return { ...state, editingCreditNote: true };
		case EDIT_CUSTOMER_CREDIT_NOTE_SUCCESS:
			return { ...state, editingCreditNote: false };
		case EDIT_CUSTOMER_CREDIT_NOTE_FAILURE:
			return { ...state, editingCreditNote: false };

		case ADD_CUSTOMER_CREDIT_NOTE:
			return { ...state, addingCreditNote: true };
		case ADD_CUSTOMER_CREDIT_NOTE_SUCCESS:
			return { ...state, addingCreditNote: false };
		case ADD_CUSTOMER_CREDIT_NOTE_FAILURE:
			return { ...state, addingCreditNote: false };

		case DELETE_CUSTOMER_CREDIT_NOTE:
			return { ...state, deletingCreditNote: true };
		case DELETE_CUSTOMER_CREDIT_NOTE_SUCCESS:
			return { ...state, deletingCreditNote: false };
		case DELETE_CUSTOMER_CREDIT_NOTE_FAILURE:
			return { ...state, deletingCreditNote: false };

		case SEND_CREDIT_NOTE:
			return { ...state, sendingCreditNote: true };
		case SEND_CREDIT_NOTE_SUCCESS:
			return { ...state, sendingCreditNote: false };
		case SEND_CREDIT_NOTE_FAILURE:
			return { ...state, sendingCreditNote: false };

		case FETCH_NOTE:
			return { ...state, loadingNote: true };
		case FETCH_NOTE_SUCCESS:
			return {
				...state,
				noteData: action.payload,
				loadingNote: false,
			};
		case FETCH_NOTE_FAILURE:
			return {
				...state,
				noteData: action.payload,
				loadingNote: false,
			};

		case UPDATE_NOTE:
			return { ...state, updatingNoteData: true };
		case UPDATE_NOTE_SUCCESS:
			return {
				...state,
				updatedNoteData: action.payload,
				updatingNoteData: false,
			};
		case UPDATE_NOTE_FAILURE:
			return {
				...state,
				updatedNoteData: action.payload,
				updatingNoteData: false,
			};

		case FETCH_DOCUMENT:
			return { ...state, loadingDocument: true };
		case FETCH_DOCUMENT_SUCCESS:
			return {
				...state,
				documentList: action.payload,
				loadingDocument: false,
			};
		case FETCH_DOCUMENT_FAILURE:
			return {
				...state,
				documentList: action.payload,
				loadingDocument: false,
			};

		case DELETE_DOCUMENT:
			return { ...state, deletingDocument: true };
		case DELETE_DOCUMENT_SUCCESS:
			return { ...state, deletingDocument: false };
		case DELETE_DOCUMENT_FAILURE:
			return { ...state, deletingDocument: false };

		case ADD_DOCUMENT:
			return { ...state, addingDocument: true };
		case ADD_DOCUMENT_SUCCESS:
			return { ...state, addingDocument: false };
		case ADD_DOCUMENT_FAILURE:
			return { ...state, addingDocument: false };

		case FETCH_CUSTOMER_AWB:
			return { ...state, loadingCustomerAwb: true };
		case FETCH_CUSTOMER_AWB_SUCCESS:
			return {
				...state,
				customerAwbData: action.payload,
				loadingCustomerAwb: false,
			};
		case FETCH_CUSTOMER_AWB_FAILURE:
			return {
				...state,
				customerAwbData: action.payload,
				loadingCustomerAwb: false,
			};

		case DELETE_CUSTOMER_AWB:
			return { ...state, deletingCustomerAwb: true };
		case DELETE_CUSTOMER_AWB_SUCCESS:
			return { ...state, deletingCustomerAwb: false };
		case DELETE_CUSTOMER_AWB_FAILURE:
			return { ...state, deletingCustomerAwb: false };

		case IMPORT_CUSTOMER_CSV:
			return { ...state, importingCustomerCsv: true };
		case IMPORT_CUSTOMER_CSV_SUCCESS:
			return { ...state, importingCustomerCsv: false };
		case IMPORT_CUSTOMER_CSV_FAILURE:
			return { ...state, importingCustomerCsv: false };

		case IMPORT_CUSTOMER_AWB:
			return { ...state, importingCustomerAwb: true };
		case IMPORT_CUSTOMER_AWB_SUCCESS:
			return { ...state, importingCustomerAwb: false };
		case IMPORT_CUSTOMER_AWB_FAILURE:
			return { ...state, importingCustomerAwb: false };

		case FETCH_CUSTOMER_CONSIGNMENT:
			return { ...state, loadingCustomerCosignment: true };
		case FETCH_CUSTOMER_CONSIGNMENT_SUCCESS:
			return {
				...state,
				customerConsignmentData: action.payload,
				loadingCustomerCosignment: false,
			};
		case FETCH_CUSTOMER_CONSIGNMENT_FAILURE:
			return {
				...state,
				customerConsignmentData: action.payload,
				loadingCustomerCosignment: false,
			};

		case DELETE_CUSTOMER_CONSIGNMENT:
			return { ...state, deletingCustomerConsignment: true };
		case DELETE_CUSTOMER_CONSIGNMENT_SUCCESS:
			return { ...state, deletingCustomerConsignment: false };
		case DELETE_CUSTOMER_CONSIGNMENT_FAILURE:
			return { ...state, deletingCustomerConsignment: false };

		case IMPORT_CUSTOMER_CONSIGNMENT:
			return { ...state, importingCustomerConsignment: true };
		case IMPORT_CUSTOMER_CONSIGNMENT_SUCCESS:
			return { ...state, importingCustomerConsignment: false };
		case IMPORT_CUSTOMER_CONSIGNMENT_FAILURE:
			return { ...state, importingCustomerConsignment: false };

		case SET_SFTP:
			return { ...state, settingSftp: true };
		case SET_SFTP_SUCCESS:
			return { ...state, settingSftp: false };
		case SET_SFTP_FAILURE:
			return { ...state, settingSftp: false };

		case GET_SFTP:
			return { ...state, loadingSftp: true };
		case GET_SFTP_SUCCESS:
			return {
				...state,
				sftpData: action.payload,
				loadingSftp: false,
			};
		case GET_SFTP_FAILURE:
			return {
				...state,
				sftpData: action.payload,
				loadingSftp: false,
			};

		default:
			return state;
	}
};
export default CustomerReducer;
