const colors = {
	primary: "#00548e",
	white: "#FFFFFF",
	black: "#212121",
	graybg: "#5b646b",
	orange: "#f79239",
	red: "#ff4848",
	skyblue: "#00aeef",
	grayborder: "#e3e3e3",
	lightBlack: "#464646",
	lightGray: "#f8f8f8",
	borderGray: "#e7e4f1",
	darkRed: "#e40000",
	darkRed1: "#eb5757",
	darkBlue: "#1e3669",
	lightBlue: "#0088ce",
	yellow: "#f5c32e",
	green: "#27ae60",
	gray1: "#3b3f49",
	gray2: "#787878",
	light_black: "#686868",
	black1: "#3b3f49",
	black2: "#161c2c",
	gray3: "#84868b",
	gray4: "#9c9ea2",
	gray5: "#f9f9f9",
	darkGreen: "#26da8b",
	green1: "#006c15",
	lightGreen: "#c9dc38",
	yellow1: "#f5c32e",
	lightRed1: "#fd5c24",
	darkRed2: "#ee1614",
	red2: "#e43232",
	grayMap: "#f4f4f4",
	grayMap2: "#727272",
	lightblue1: "#e5f8ff",
	lightbg: "#f8f8f8",
	gray6: "#fafafa",
	gray7: "#F0F1F3",
	gray8: "#686868",
	red3: "#f05527",
};

const routes = {
	pageNotFound: "/page-not-found",
	login: "/login",
	jobDetail: "/job-detail",
	dashboard: "/dashboard",
	jobListing: "/job-listing",
	driverListing: "/driver-listing",
	driverDetail: "/driver-detail",
	customerDetail: "/customer-detail",
	forgotPassword: "/forgot-password",
	resetPassword: "/authentication/reset",
	customerListing: "/customer-listing",
	notifications: "/notifications",
	myProfile: "/my-profile",
	trucks: "/trucks",
	tollLocation: "/toll-location",
	trailer: "/trailer",
	mapCockpit: "/map-cockpit",
	onlineRequest: "/online-request",
	onlineRequestDetail: "/online-request-detail",
	holidays: "/holidays",
	staffUsers: "/staff-users",
	rolesPermission: "/roles-permission",
	invoice: "/draft-invoices",
	approvedInvoice: "/approved-invoices",
	invoiceDetail: "/invoices-detail",
	verifyEmail: "/verifyEmail",
	mivInvoice: "/MIV-invoices",
	credit: "/draft-credit-note",
	approvedCredit: "/approved-credit-note",
	report: "/report",
	organisation: "/wymap-organisation",
	rejectedInvoice: "/rejected-invoices",
	managementDashboard: "/management-dashboard",
	ctos: "/ctos",
	myOrganisation: "/my-organisation",
	AWBSearch: "/awb-search",
	offlineJobListing: "/offline-job-listing",
	offlineJobDetail: "/offline-job-detail",
};

const dashboardListingHeader = [
	{ title: "Job ID", className: "jobId", sort: true, sortTitle: "id" },
	{ title: "City", className: "city", sort: true, sortTitle: "city" },
	{ title: "Driver", className: "driver", sort: true, sortTitle: "driverName" },
	{
		title: "Truck Rego",
		className: "truck-rego",
		sort: true,
		sortTitle: "truckRego",
	},
	{ title: "Status", className: "status", sort: true, sortTitle: "jobStatus" },
	{
		title: "Customer Name",
		className: "customerName",
		sort: true,
		sortTitle: "customerName",
	},
	{ title: "CTO", className: "cto", sort: true, sortTitle: "cto" },
	{
		title: "Type of job",
		className: "jobType",
		sort: true,
		sortTitle: "jobType",
	},
	{
		title: "Cargo Type",
		className: "cargoType",
		sort: true,
		sortTitle: "cargoType",
	},
	{ title: "Date", className: "date", sort: true, sortTitle: "date" },
	{
		title: "Completion Date",
		className: "completion-date",
		sort: true,
		sortTitle: "completedAt",
	},
];

const creditHeader = [
	{ title: "Child Account", className: "childAccount", sort: true },
	{ title: "Parent Account", className: "parentAccount", sort: true },
	{ title: "Date", className: "date", sort: true },
	{ title: "Amount", className: "amount", sort: true },
	{ title: "Description", className: "description", sort: true },
];

const draftCreditNoteHeader = [
	{ title: "Child Account", className: "childAccount", sort: true },
	{ title: "Parent Account", className: "parentAccount", sort: true },
	{ title: "Date", className: "date", sort: true },
	{ title: "Amount", className: "amount", sort: true },
	{ title: "Description", className: "description", sort: true },
	{ title: "Action", className: "action", sort: false },
];

const requestHeading = [
	{ title: "Chat", className: "chat" },
	{
		title: "Request Id",
		sort: true,
		sortTitle: "id",
		className: "id",
	},
	{
		title: "Reference No",
		sort: true,
		sortTitle: "referenceNo",
		className: "referenceNo",
	},
	{
		title: "Customer Name",
		sort: true,
		sortTitle: "customerName",
		className: "customerName",
	},
	{
		title: "Type of Job",
		sort: true,
		sortTitle: "jobType",
		className: "jobType",
	},
	{
		title: "Cargo Type",
		sort: true,
		sortTitle: "cargoType",
		className: "cargoType",
	},
	{ title: "CTO", sort: true, sortTitle: "cto", className: "cto" },
	{
		title: "Online Request Status",
		sort: true,
		sortTitle: "onlineRequest",
		className: "request-status",
	},
	{
		title: "Job Status",
		sort: true,
		sortTitle: "jobStatuses",
		className: "jobStatus",
	},
	{ title: "City", sort: true, sortTitle: "city", className: "city" },
	{
		title: "Action",
		sort: false,
		className: "action",
	},
];

const awbByAwbNumberHeading = [
	{ title: "AWB Number", className: "awb-number" },
	{ title: "Job Number", className: "jobId-cell" },
	{ title: "Job Type", className: "jobType" },
	{ title: "Cargo Type", className: "reportType" },
	{
		title: "Job Started Date",
		className: "job-started-date",
	},
	{
		title: "Job Completed Date",
		className: "job-completed-date",
	},
	{ title: "Total Qty", className: "total-qty" },
	{ title: "Total Weight", className: "total-weight" },
	{ title: "Loaded Qty", className: "loaded-qty" },
	{ title: "Loaded Weight", className: "loaded-weight" },
	{ title: "Remainder Reason", className: "remainder-reason" },
	{ title: "CTO", className: "cto" },
	{ title: "Job Status", className: "jobStatus" },
	{ title: "Run Sheet", className: "run-sheet" },
];

const reportsHeading = [
	{ title: "Job ID", className: "jobId-cell" },
	{ title: "Type of Job", className: "jobType" },
	{ title: "Type", className: "reportType" },
	{ title: "Air Way Bill", className: "airBill" },
	{ title: "Parent Customer", className: "customer" },
	{ title: "Child Customer", className: "customer" },
	{ title: "Qty", className: "pieces" },
	{ title: "Weight(kg)", className: "weight" },
	{ title: "CTO", className: "cto" },
	{ title: "Online Request Status", className: "request-status" },
	{ title: "Job Status", className: "jobStatus" },
	{ title: "Reference No", className: "refNo" },
	{ title: "Total Job Duration", className: "jobDuration" },
	{ title: "Truck Rego", className: "truckRego" },
	{ title: "City", className: "city" },
];

const reportsHeadingULDLoose = [
	{ title: "Job ID", className: "jobId-cell" },
	{ title: "Type of Job", className: "jobType" },
	{ title: "Air Way Bill", className: "airBill" },
	{ title: "Parent Customer", className: "customer" },
	{ title: "Child Customer", className: "customer" },
	{ title: "Qty", className: "pieces" },
	{ title: "Weight(kg)", className: "weight" },
	{ title: "CTO", className: "cto" },
	{ title: "Online Request Status", className: "request-status" },
	{ title: "Job Status", className: "jobStatus" },
	{ title: "Reference No", className: "refNo" },
	{ title: "Total Job Duration", className: "jobDuration" },
	{ title: "Truck Rego", className: "truckRego" },
	{ title: "City", className: "city" },
];
const customerListingHeader = [
	{ title: "Customer", className: "customer", sortTitle: "name", sort: true },
	{ title: "City", className: "city", sortTitle: "city", sort: true },
	{
		title: "Old Customer Number",
		className: "oldCustomerNumber",
		sortTitle: "oldCustomerNumber",
		sort: true,
	},
	{
		title: "New Customer Number",
		className: "newCustomerNumber",
		sortTitle: "newCustomerNumber",
		sort: true,
	},
	{
		title: "Customer Category",
		className: "customerCategory",
		sortTitle: "customerCategory",
		sort: true,
	},
	{ title: "Email", className: "email", sortTitle: "email", sort: true },
	{ title: "Phone", className: "phone", sortTitle: "phone", sort: true },
];

const customerDetailJobsHeader = [
	{ title: "Job ID", className: "jobId" },
	{ title: "Date", className: "date" },
	{ title: "Truck Rego", className: "truck-rego" },
	{ title: "Driver", className: "driver" },
	{ title: "Job Type", className: "jobType" },
	{ title: "Total Weight", className: "totalWeight" },
	{ title: "Total Quantity", className: "totalQuantity" },
	{ title: "Duration", className: "duration" },
	{ title: "Status", className: "status" },
];

const customerDetailAWBHeader = [
	{ title: "AWB", className: "awb", sort: "true", sortTitle: "awb" },
	{
		title: "Airline",
		className: "airline",
		sort: "true",
		sortTitle: "airline",
	},
	{
		title: "Total Weight",
		className: "weight",
		sort: "true",
		sortTitle: "weight",
	},
	{
		title: "Total Quantity",
		className: "quantity",
		sort: "true",
		sortTitle: "quantity",
	},
	{
		title: "Ready Date",
		className: "readyDate",
		sort: "true",
		sortTitle: "readyDate",
	},
	{
		title: "Ready Time",
		className: "readyTime",
		sort: "true",
		sortTitle: "readyTate",
	},
	{
		title: "Cut-Off Time",
		className: "cutoffTime",
		sort: "true",
		sortTitle: "cutOffTime",
	},
	{
		title: "Action",
		className: "action",
		sort: "false",
	},
];

const customerDetailConsignmentHeader = [
	{
		title: "Consignment",
		className: "consignment",
		sort: "true",
		sortTitle: "number",
	},
	{
		title: "Total Weight",
		className: "weight",
		sort: "true",
		sortTitle: "weight",
	},
	{
		title: "Total Quantity",
		className: "quantity",
		sort: "true",
		sortTitle: "quantity",
	},
	{
		title: "Action",
		className: "action",
		sort: "false",
	},
];

const customerDetailInvoiceHeader = [
	{ title: "Invoice Id", className: "invoice", sort: false },
	{ title: "Date", className: "date", sort: true, sortTitle: "createdAt" },
	{ title: "Total Weight", className: "total-weight", sort: false },
	{ title: "Total Quantity", className: "total-quantity", sort: false },
	{ title: "Net", className: "nett", sort: false },
	{ title: "Tax", className: "tax", sort: false },
	{ title: "Gross", className: "gross", sort: false },
];

const driverListingHeader = [
	{
		title: "Driver Name",
		className: "driverName",
		sortTitle: "driverName",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "City",
		className: "city",
		sortTitle: "city",
		sort: true,
		orderByField: "asc",
	},
	{
		title: "Employee Number",
		className: "employeeNumber",
		sortTitle: "employeeNumber",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "Contact",
		className: "contact",
		sortTitle: "contact",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "Type of driver",
		className: "driverType",
		sortTitle: "driverType",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "Driver Licence Type",
		className: "licenseType",
		sortTitle: "licenseType",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "ASIC Type",
		className: "asicType",
		sortTitle: "asicType",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "Hours Worked",
		className: "hoursWorked",
		sortTitle: "hoursWorked",
		sort: true,
		orderByField: "desc",
	},
	{
		title: "Continuous Working Time",
		className: "continiousWorkingTimeHeader",
		sortTitle: "continuousWorkingTime",
		sort: true,
		orderByField: "desc",
	},
];

const approvedInvoiceHeading = [
	{
		title: "Invoice Number",
		className: "number",
		sort: true,
		sortTitle: "invoiceNumber",
	},
	{
		title: "Customer",
		className: "customer",
		sort: true,
		sortTitle: "customerName",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Date",
		className: "date",
		sort: true,
		sortTitle: "invoiceDate",
	},
	{
		title: "Gross Amount",
		className: "gross",
		sort: true,
		sortTitle: "grossAmount",
	},
	{ title: "Email Sent", className: "email-sent", sort: false },
	{ title: "Download", className: "invoice", sort: false },
	{ title: "Download", className: "invoice", sort: false },
	{ title: "Send Email", className: "invoice", sort: false },
];

const rejectedInvoiceHeading = [
	{
		title: "Invoice Number",
		className: "number",
		sort: true,
		sortTitle: "invoiceNumber",
	},
	{
		title: "Customer",
		className: "customer",
		sort: true,
		sortTitle: "customerName",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Date",
		className: "date",
		sort: true,
		sortTitle: "invoiceDate",
	},
	{
		title: "Gross Amount",
		className: "gross",
		sort: true,
		sortTitle: "grossAmount",
	},
	{
		title: "Status",
		className: "status",
		sort: false,
	},
	{
		title: "",
		className: "chat-column",
		sort: false,
	},
];

const draftInvoiceHeading = [
	{
		title: "Invoice Number",
		className: "number",
		sort: true,
		sortTitle: "invoiceNumber",
	},
	{
		title: "Customer",
		className: "customer",
		sort: true,
		sortTitle: "customerName",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Date",
		className: "date",
		sort: true,
		sortTitle: "invoiceDate",
	},
	{ title: "Organisation", className: "organisation", sort: false },
	{ title: "Purchase Order", className: "purchase-order", sort: false },
	{
		title: "Gross Amount",
		className: "gross",
		sort: true,
		sortTitle: "grossAmount",
	},
	{ title: "Chat", className: "chat-column", sort: false },
	{ title: "Action", className: "update-btn", sort: false },
];

const mivInvoiceHeading = [
	{
		title: "Invoice Number",
		className: "invoice-number",
		sort: true,
		sortTitle: "invoiceNumber",
	},
	{
		title: "Customer",
		className: "childCustomer",
		sort: true,
		sortTitle: "customerName",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Date",
		className: "issue-date",
		sort: true,
		sortTitle: "invoiceDate",
	},
	{
		title: "Invoice Amount",
		className: "gross-amount",
		sort: true,
		sortTitle: "invoiceAmount",
	},
	{
		title: "MIV Amount",
		className: "MIV-amount",
		sort: true,
		sortTitle: "mivAmount",
	},
	{ title: "Assign Child", className: "assign-child", sort: false },
];

const truckHeading = [
	{
		title: "",
		className: "edit-link",
		sort: false,
	},
	{
		title: "Make and Model",
		className: "truck",
		sort: true,
		sortTitle: "truckName",
	},
	{
		title: "Vehical Number",
		className: "vehical-number",
		sort: true,
		sortTitle: "vehicleNumber",
	},
	{
		title: "Rego Number",
		className: "rego-number",
		sort: true,
		sortTitle: "rego",
	},
	{
		title: "Fleet",
		className: "fleet",
		sort: true,
		sortTitle: "fleet",
	},
	{
		title: "Truck Type",
		className: "truck-type",
		sort: true,
		sortTitle: "truckType",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Rego Due Date",
		className: "rego-date",
		sort: true,
		sortTitle: "registrationDueDate",
	},
	{
		title: "Service Due Date",
		className: "service-date",
		sort: true,
		sortTitle: "serviceDueDate",
	},
	{
		title: "",
		className: "delete-link",
		sort: false,
	},
];

const trailerHeading = [
	{
		title: "",
		className: "edit-link",
		sort: false,
	},
	{
		title: "Make and Model",
		className: "trailer",
		sort: true,
		sortTitle: "name",
	},
	{
		title: "Rego Number",
		className: "rego-number",
		sort: true,
		sortTitle: "rego",
	},
	{
		title: "Fleet",
		className: "fleet",
		sort: true,
		sortTitle: "fleet",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Rego Due Date",
		className: "rego-date",
		sort: true,
		sortTitle: "registrationDueDate",
	},
	{
		title: "Service Due Date",
		className: "service-date",
		sort: true,
		sortTitle: "serviceDueDate",
	},
	{
		title: "",
		className: "delete-link",
		sort: false,
	},
];

const ctoHeading = [
	{
		title: "Name",
		className: "name",
		sort: true,
		sortTitle: "name",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "Address",
		className: "address",
		sort: false,
	},
	{
		title: "Latitude",
		className: "latitude",
		sort: false,
	},
	{
		title: "Longitude",
		className: "longitude",
		sort: false,
	},
	{
		title: "",
		className: "edit-link",
		sort: false,
	},
	{
		title: "",
		className: "delete-link",
		sort: false,
	},
];

const offlineJobsHeading = [
	{
		title: "Driver Name",
		className: "driverName",
		sort: true,
		sortTitle: "driverName",
	},
	{
		title: "City",
		className: "city",
		sort: true,
		sortTitle: "city",
	},
	{
		title: "",
		className: "view-link",
		sort: false,
	},
	{
		title: "",
		className: "completed-job-link",
		sort: false,
	},
	{
		title: "",
		className: "delete-link",
		sort: false,
	},
];

const browsers = {
	safari: "Safari",
	chrome: "Chrome",
	firefox: "Firefox",
};

const rowsPerPageVal = 100;
export {
	colors,
	routes,
	creditHeader,
	draftCreditNoteHeader,
	dashboardListingHeader,
	customerListingHeader,
	customerDetailJobsHeader,
	customerDetailInvoiceHeader,
	driverListingHeader,
	requestHeading,
	mivInvoiceHeading,
	awbByAwbNumberHeading,
	reportsHeading,
	reportsHeadingULDLoose,
	draftInvoiceHeading,
	approvedInvoiceHeading,
	rejectedInvoiceHeading,
	truckHeading,
	trailerHeading,
	customerDetailAWBHeader,
	customerDetailConsignmentHeader,
	offlineJobsHeading,
	rowsPerPageVal,
	ctoHeading,
	browsers,
};
