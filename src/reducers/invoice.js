import {
	FETCH_DRAFT_LISTING,
	FETCH_DRAFT_LISTING_SUCCESS,
	FETCH_DRAFT_LISTING_FAILURE,
	UPDATE_DRAFT_INVOICE,
	UPDATE_DRAFT_INVOICE_SUCCESS,
	UPDATE_DRAFT_INVOICE_FAILURE,
	UPDATE_MANUAL_DRAFT_INVOICE,
	UPDATE_MANUAL_DRAFT_INVOICE_SUCCESS,
	UPDATE_MANUAL_DRAFT_INVOICE_FAILURE,
	APPROVE_INVOICE,
	APPROVE_INVOICE_SUCCESS,
	APPROVE_INVOICE_FAILURE,
	REJECT_INVOICE,
	REJECT_INVOICE_SUCCESS,
	REJECT_INVOICE_FAILURE,
	FETCH_MIV_INVOICES,
	FETCH_MIV_INVOICES_SUCCESS,
	FETCH_MIV_INVOICES_FAILURE,
	ASSIGN_MIV,
	ASSIGN_MIV_SUCCESS,
	ASSIGN_MIV_FAILURE,
	DONE_MIV,
	DONE_MIV_SUCCESS,
	DONE_MIV_FAILURE,
	FETCH_APPROVED_INVOICES,
	FETCH_APPROVED_INVOICES_SUCCESS,
	FETCH_APPROVED_INVOICES_FAILURE,
	FETCH_INVOICE_DETAIL,
	FETCH_INVOICE_DETAIL_SUCCESS,
	FETCH_INVOICE_DETAIL_FAILURE,
	FETCH_REJECTED_INVOICES,
	FETCH_REJECTED_INVOICES_SUCCESS,
	FETCH_REJECTED_INVOICES_FAILURE,
	GET_DRAFT_INVOICE_CHAT,
	GET_DRAFT_INVOICE_CHAT_SUCCESS,
	GET_DRAFT_INVOICE_CHAT_FAILURE,
	SAVE_DRAFT_CHAT,
	SAVE_DRAFT_CHAT_SUCCESS,
	SAVE_DRAFT_CHAT_FAILURE,
	RESOLVE_REJECTED_INVOICES,
	RESOLVE_REJECTED_INVOICES_SUCCESS,
	RESOLVE_REJECTED_INVOICES_FAILURE,
	DOWNLOAD_APPROVED_INVOICES,
	DOWNLOAD_APPROVED_INVOICES_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_FAILURE,
	DOWNLOAD_APPROVED_INVOICES_PDF,
	DOWNLOAD_APPROVED_INVOICES_PDF_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_PDF_FAILURE,
	DOWNLOAD_APPROVED_INVOICES_CSV,
	DOWNLOAD_APPROVED_INVOICES_CSV_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_CSV_FAILURE,
	SEND_EMAIL,
	SEND_EMAIL_SUCCESS,
	SEND_EMAIL_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
	loadingDraftInvoice: false,
	draftInvoiceData: null,
	approvingInvoice: false,
	rejectingInvoice: false,
	loadingMivInvoice: false,
	mivInvoiceData: null,
	loadingApprovedInvoice: false,
	approvedInvoiceData: null,
	updatingDraftInvoice: false,
	updateDraftInvoiceData: null,
	updatingManualDraftInvoice: false,
	updateManualDraftInvoiceData: null,
	assigningMiv: false,
	loadingDoneMiv: false,
	loadingInvoiceDetail: false,
	invoiceDetailData: null,
	loadingRejectedInvoice: false,
	rejectedInvoiceData: null,
	loadingDraftInvoiceChats: false,
	draftInvoiceChats: null,
	savingChat: false,
	resolvingInvoice: false,
	downloadingAprrovedCsv: false,
	downloadingCsv: false,
	downloadingPdf: false,
	sendingEmail: false,
};

const InvoiceReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case FETCH_DRAFT_LISTING:
			return { ...state, loadingDraftInvoice: true };
		case FETCH_DRAFT_LISTING_SUCCESS:
			return {
				...state,
				draftInvoiceData: action.payload,
				loadingDraftInvoice: false,
			};
		case FETCH_DRAFT_LISTING_FAILURE:
			return {
				...state,
				draftInvoiceData: action.payload,
				loadingDraftInvoice: false,
			};

		case UPDATE_DRAFT_INVOICE:
			return { ...state, updatingDraftInvoice: true };
		case UPDATE_DRAFT_INVOICE_SUCCESS:
			return {
				...state,
				updateDraftInvoiceData: action.payload,
				updatingDraftInvoice: false,
			};
		case UPDATE_DRAFT_INVOICE_FAILURE:
			return {
				...state,
				updateDraftInvoiceData: action.payload,
				updatingDraftInvoice: false,
			};

		case UPDATE_MANUAL_DRAFT_INVOICE:
			return { ...state, updatingManualDraftInvoice: true };
		case UPDATE_MANUAL_DRAFT_INVOICE_SUCCESS:
			return {
				...state,
				updateManualDraftInvoiceData: action.payload,
				updatingManualDraftInvoice: false,
			};
		case UPDATE_MANUAL_DRAFT_INVOICE_FAILURE:
			return {
				...state,
				updateManualDraftInvoiceData: action.payload,
				updatingManualDraftInvoice: false,
			};

		case APPROVE_INVOICE:
			return { ...state, approvingInvoice: true };
		case APPROVE_INVOICE_SUCCESS:
			return {
				...state,
				approvingInvoice: false,
			};
		case APPROVE_INVOICE_FAILURE:
			return {
				...state,
				approvingInvoice: false,
			};

		case REJECT_INVOICE:
			return { ...state, rejectingInvoice: true };
		case REJECT_INVOICE_SUCCESS:
			return {
				...state,
				rejectingInvoice: false,
			};
		case REJECT_INVOICE_FAILURE:
			return {
				...state,
				rejectingInvoice: false,
			};

		case FETCH_MIV_INVOICES:
			return { ...state, loadingMivInvoice: true };
		case FETCH_MIV_INVOICES_SUCCESS:
			return {
				...state,
				mivInvoiceData: action.payload,
				loadingMivInvoice: false,
			};
		case FETCH_MIV_INVOICES_FAILURE:
			return {
				...state,
				mivInvoiceData: action.payload,
				loadingMivInvoice: false,
			};

		case ASSIGN_MIV:
			return { ...state, assigningMiv: true };
		case ASSIGN_MIV_SUCCESS:
			return {
				...state,
				assigningMiv: false,
			};
		case ASSIGN_MIV_FAILURE:
			return {
				...state,
				assigningMiv: false,
			};

		case DONE_MIV:
			return { ...state, loadingDoneMiv: true };
		case DONE_MIV_SUCCESS:
			return {
				...state,
				loadingDoneMiv: false,
			};
		case DONE_MIV_FAILURE:
			return {
				...state,
				loadingDoneMiv: false,
			};

		case FETCH_APPROVED_INVOICES:
			return { ...state, loadingApprovedInvoice: true };
		case FETCH_APPROVED_INVOICES_SUCCESS:
			return {
				...state,
				approvedInvoiceData: action.payload,
				loadingApprovedInvoice: false,
			};
		case FETCH_APPROVED_INVOICES_FAILURE:
			return {
				...state,
				approvedInvoiceData: action.payload,
				loadingApprovedInvoice: false,
			};

		case FETCH_REJECTED_INVOICES:
			return { ...state, loadingRejectedInvoice: true };
		case FETCH_REJECTED_INVOICES_SUCCESS:
			return {
				...state,
				rejectedInvoiceData: action.payload,
				loadingRejectedInvoice: false,
			};
		case FETCH_REJECTED_INVOICES_FAILURE:
			return {
				...state,
				rejectedInvoiceData: action.payload,
				loadingRejectedInvoice: false,
			};

		case FETCH_INVOICE_DETAIL:
			return { ...state, loadingInvoiceDetail: true };
		case FETCH_INVOICE_DETAIL_SUCCESS:
			return {
				...state,
				invoiceDetailData: action.payload,
				loadingInvoiceDetail: false,
			};
		case FETCH_INVOICE_DETAIL_FAILURE:
			return {
				...state,
				invoiceDetailData: action.payload,
				loadingInvoiceDetail: false,
			};

		case GET_DRAFT_INVOICE_CHAT:
			return {
				...state,
				loadingDraftInvoiceChats: true,
			};
		case GET_DRAFT_INVOICE_CHAT_SUCCESS:
			return {
				...state,
				draftInvoiceChats: action.payload,
				loadingDraftInvoiceChats: false,
			};
		case GET_DRAFT_INVOICE_CHAT_FAILURE:
			return {
				...state,
				draftInvoiceChats: action.payload,
				loadingDraftInvoiceChats: false,
			};

		case SAVE_DRAFT_CHAT:
			return {
				...state,
				savingChat: true,
			};
		case SAVE_DRAFT_CHAT_SUCCESS:
			return {
				...state,
				savingChat: false,
			};
		case SAVE_DRAFT_CHAT_FAILURE:
			return {
				...state,
				savingChat: false,
			};

		case RESOLVE_REJECTED_INVOICES:
			return {
				...state,
				resolvingInvoice: true,
			};
		case RESOLVE_REJECTED_INVOICES_SUCCESS:
			return {
				...state,
				resolvingInvoice: false,
			};
		case RESOLVE_REJECTED_INVOICES_FAILURE:
			return {
				...state,
				resolvingInvoice: false,
			};

		case DOWNLOAD_APPROVED_INVOICES:
			return {
				...state,
				downloadingAprrovedCsv: true,
			};
		case DOWNLOAD_APPROVED_INVOICES_SUCCESS:
			return {
				...state,
				downloadingAprrovedCsv: false,
			};
		case DOWNLOAD_APPROVED_INVOICES_FAILURE:
			return {
				...state,
				downloadingAprrovedCsv: false,
			};

		case DOWNLOAD_APPROVED_INVOICES_CSV:
			return {
				...state,
				downloadingCsv: true,
			};
		case DOWNLOAD_APPROVED_INVOICES_CSV_SUCCESS:
			return {
				...state,
				downloadingCsv: false,
			};
		case DOWNLOAD_APPROVED_INVOICES_CSV_FAILURE:
			return {
				...state,
				downloadingCsv: false,
			};

		case SEND_EMAIL:
			return {
				...state,
				sendingEmail: true,
			};
		case SEND_EMAIL_SUCCESS:
			return {
				...state,
				sendingEmail: false,
			};
		case SEND_EMAIL_FAILURE:
			return {
				...state,
				sendingEmail: false,
			};

		case DOWNLOAD_APPROVED_INVOICES_PDF:
			return {
				...state,
				downloadingPdf: true,
			};
		case DOWNLOAD_APPROVED_INVOICES_PDF_SUCCESS:
			return {
				...state,
				downloadingPdf: false,
			};
		case DOWNLOAD_APPROVED_INVOICES_PDF_FAILURE:
			return {
				...state,
				downloadingPdf: false,
			};

		default:
			return state;
	}
};
export default InvoiceReducer;
