import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { Typography, TextField, Button } from "@material-ui/core";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import {
	FETCH_APPROVED_INVOICES,
	FETCH_APPROVED_INVOICES_SUCCESS,
	FETCH_APPROVED_INVOICES_FAILURE,
	DOWNLOAD_APPROVED_INVOICES,
	DOWNLOAD_APPROVED_INVOICES_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_FAILURE,
	SEND_EMAIL,
	SEND_EMAIL_SUCCESS,
	SEND_EMAIL_FAILURE,
} from "@utils/actionTypes";
import { getFilter, setFilter, removeFilter } from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import Filter from "./filter";
import TableListing from "./tableListing";
import { invoiceStyle } from "./style";

function InvoiceView() {
	const classes = invoiceStyle();
	const filter = getFilter("approvedInvoiceFilter", true);
	const [getState, setState] = useState({ right: false });
	const [period, setPeriod] = useState(filter?.period || "");
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
	const [order, setOrder] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [state, dispatch] = useStore();
	const [updateFilter, setUpdateFilter] = useState({});
	const [filterData, setFilterData] = useState({
		customer: filter?.customer || [],
		cityId: filter?.cityId || "",
		startDate: filter?.startDate || "",
		endDate: filter?.endDate || "",
		emailFailure: filter?.emailFailure || false,
	});
	const [customDate, setCustomDate] = useState({
		startDate: null,
		endDate: null,
	});

	// API calling to get list of approved invoices
	const getApprovedInvoice = () => {
		const params = {
			page: page + 1,
			size: rowsPerPage,
			...(!!search ? { search } : {}),
			order: order !== "" ? order : "asc",
			orderBy: orderBy !== "" ? orderBy : "city",
			filter: {
				...(!!filterData.cityId ? { cityId: filterData.cityId } : {}),
				...(!!filterData.customer.length
					? { customerId: filterData.customer }
					: {}),
				...(!!filterData.startDate
					? { startDate: filterData.startDate }
					: !!customDate.startDate
					? { startDate: filterData.startDate }
					: {}),
				...(!!filterData.endDate
					? { endDate: filterData.endDate }
					: !!customDate.endDate
					? { endDate: filterData.endDate }
					: {}),
				...(filterData.emailFailure === true ? { emailFailure: 1 } : {}),
			},
		};
		dispatch({ type: FETCH_APPROVED_INVOICES });
		API.get("invoices/approvedInvoices", { params })
			.then((response) => {
				dispatch({
					type: FETCH_APPROVED_INVOICES_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_APPROVED_INVOICES_FAILURE, payload: error });
			});
	};

	useEffect(() => {
		getApprovedInvoice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, rowsPerPage, order, orderBy, updateFilter]);

	const handleSendEmail = (id) => {
		dispatch({ type: SEND_EMAIL });
		API.get(`invoices/${id}/sendEmail`)
			.then((response) => {
				dispatch({
					type: SEND_EMAIL_SUCCESS,
				});
				toast.success(response.data.message);
				getApprovedInvoice();
			})
			.catch((error) => {
				dispatch({ type: SEND_EMAIL_FAILURE });
			});
	};

	useEffect(() => {
		removeFilter("approvedInvoiceFilter");
	}, []);

	useDebouncedEffect(() => getApprovedInvoice(), 1000, [search]);

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

	const handleSubmit = (item) => {
		setUpdateFilter(filterData);
		setState({ ...getState, [item]: false });
		setFilter("approvedInvoiceFilter", { ...filterData, period }, true);
	};

	const handleDownloadCSV = () => {
		const params = {
			filter: {
				...(!!filterData.cityId ? { cityId: filterData.cityId } : {}),
				...(!!filterData.customer.length
					? { customerId: filterData.customer }
					: {}),
				...(!!filterData.startDate
					? { startDate: filterData.startDate }
					: !!customDate.startDate
					? { startDate: filterData.startDate }
					: {}),
				...(!!filterData.endDate
					? { endDate: filterData.endDate }
					: !!customDate.endDate
					? { endDate: filterData.endDate }
					: {}),
			},
		};
		dispatch({ type: DOWNLOAD_APPROVED_INVOICES });
		API.get("invoices/downloadInvoicesCSV", { params })
			.then((response) => {
				dispatch({
					type: DOWNLOAD_APPROVED_INVOICES_SUCCESS,
				});
				window.open(response.data.data, "_blank");
			})
			.catch((error) => {
				dispatch({ type: DOWNLOAD_APPROVED_INVOICES_FAILURE });
			});
	};
	const handleFilter = (event) => {
		const { name, value } = event.target;
		name === "emailFailure"
			? setFilterData({
					...filterData,
					[name]: event.target.checked,
			  })
			: setFilterData({
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
		removeFilter("approvedInvoiceFilter");
		setShow(false);
		setPeriod("");
		setFilterData({
			customer: [],
			cityId: "",
			startDate: null,
			endDate: null,
			emailFailure: false,
		});
		setState({ ...getState, [item]: false });
		setUpdateFilter({
			customer: [],
			cityId: "",
			startDate: null,
			endDate: null,
			emailFailure: false,
		});
	};
	const handlePeriodChange = (event, type) => {
		const { value } = event.target;
		setPeriod(value);
		setFilter(
			"approvedInvoiceFilter",
			{
				...filterData,
				period: value,
			},
			true
		);
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

	const handleClose = () => {
		setPeriod("");
		setOpen(false);
		setCustomDate({
			startDate: null,
			endDate: null,
		});
	};

	const handleSearch = (event) => {
		setSearch(event.target.value.trimStart());
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSorting = (event, property) => {
		const isAsc = orderBy === property.sortTitle && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property.sortTitle);
	};

	return (
		<>
			<Header />
			<div className={classes.invoiceWrapper}>
				<Loader
					loading={
						state.invoice?.loadingApprovedInvoice ||
						state.invoice?.downloadingAprrovedCsv ||
						state.invoice?.downloadingCsv ||
						state.invoice?.sendingEmail ||
						state.invoice?.downloadingPdf
					}
				/>
				<div className="wrapper">
					<div className="request-form-section">
						<div className="filter-search-title-strip">
							<Typography variant="h1">Approved Invoices</Typography>
							<div className="filter-search-wrapper">
								{state?.invoice?.approvedInvoiceData?.count !== 0 && (
									<div className="form-gourp">
										<Button
											className="orange-btn primary-btn"
											color="inherit"
											disableElevation
											style={{ marginRight: "10px" }}
											onClick={handleDownloadCSV}
										>
											Download CSV
										</Button>
									</div>
								)}
								<div className="inner-col">
									<div className="form-gourp">
										<TextField
											id="search-request"
											placeholder="Search Invoice Number"
											variant="outlined"
											type="search"
											value={search}
											onChange={handleSearch}
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
										handleClose={handleClose}
									/>
								</div>
							</div>
						</div>
						<TableListing
							page={page}
							handleChangePage={handleChangePage}
							rowsPerPage={rowsPerPage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							handleSorting={(e, property) => handleSorting(e, property)}
							orderBy={orderBy}
							order={order}
							search={search}
							filterData={updateFilter}
							handleSendEmail={handleSendEmail}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default InvoiceView;
