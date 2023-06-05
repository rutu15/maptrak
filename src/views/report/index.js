import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import Header from "@components/header";
import {
	DOWNLOAD_REPORTS,
	DOWNLOAD_REPORTS_SUCCESS,
	DOWNLOAD_REPORTS_FAILURE,
	FETCH_REPORTS,
	FETCH_REPORTS_SUCCESS,
	FETCH_REPORTS_FAILURE,
} from "@utils/actionTypes";
import { getFilter, setFilter, removeFilter } from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import DownloadReport from "./downloadReport";
import Tabbing from "./tabbing";
import OnlineReportFilter from "./filter";
import { onlineReportStyle } from "./style";

function OnlineReport() {
	const classes = onlineReportStyle();
	const persistFilter = getFilter("reportFilter", true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
	const [search, setSearch] = useState("");
	const [period, setPeriod] = useState(persistFilter?.period || "");
	const [show, setShow] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const reportTab = getFilter("reportTab");
	const [getTab, setTab] = useState(reportTab ? parseInt(reportTab) : 3);
	const [open, setOpen] = useState(false);
	const [openDate, setOpenDate] = useState(false);
	const [getState, setState] = useState({
		right: false,
	});
	const [updateFilter, setUpdateFilter] = useState({});
	const [filterData, setFilterData] = useState({
		jobType: persistFilter?.jobType || [],
		cargoType: persistFilter?.cargoType || "",
		AWBCargoType: persistFilter?.cargoType || [],
		requestStatus: persistFilter?.requestStatus || [],
		jobStatus: persistFilter?.jobStatus || [],
		cto: persistFilter?.cto || [],
		city: persistFilter?.city || [],
		customer: persistFilter?.customer || [],
		startDate: persistFilter?.startDate || "",
		endDate: persistFilter?.endDate || "",
		notFullyLoaded: persistFilter?.notFullyLoaded || false,
	});
	const [customDate, setCustomDate] = useState({
		startDate: null,
		endDate: null,
	});

	const [downloadDate, setDownloadDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [state, dispatch] = useStore();
	const getCargoTab = getTab === 1 ? 1 : 2;

	const setCargoTypId = () => {
		if (getTab !== 3) {
			if (![0, "0", null].includes(reportTab)) {
				return parseInt(reportTab);
			} else {
				if (filterData.cargoType !== "") {
					return filterData.cargoType;
				} else {
					if (getTab === 0) {
						return undefined;
					} else {
						return getCargoTab;
					}
				}
			}
		} else {
			if (getTab === 3) {
				if (!!filterData.AWBCargoType.length) {
					return filterData.AWBCargoType;
				} else {
					return undefined;
				}
			}
		}
	};

	const filter = {
		cargoTypeId: setCargoTypId(),
		cityId: filterData.city.length ? filterData.city : undefined,
		jobStatusId: filterData.jobStatus.length ? filterData.jobStatus : undefined,
		jobTypeId: filterData.jobType.length ? filterData.jobType : undefined,
		onlineRequestStatusId:
			getTab !== 3 && filterData.requestStatus.length
				? filterData.requestStatus
				: undefined,
		ctoId: filterData.cto.length ? filterData.cto : undefined,
		customerId: filterData.customer.length ? filterData.customer : undefined,
		...(!!downloadDate.startDate
			? { startDate: downloadDate.startDate }
			: !!filterData.startDate
			? { startDate: filterData.startDate }
			: !!customDate.startDate
			? { startDate: filterData.startDate }
			: {}),
		...(!!downloadDate.endDate
			? { endDate: downloadDate.endDate }
			: !!filterData.endDate
			? { endDate: filterData.endDate }
			: !!customDate.endDate
			? { endDate: filterData.endDate }
			: {}),
		notFullyLoaded:
			getTab === 3 && filterData.notFullyLoaded === true ? 1 : undefined,
	};

	const getReport = () => {
		const params = {
			search: search !== "" ? search : null,
			page: page + 1,
			size: rowsPerPage,
			filter,
		};
		const url = getTab === 3 ? "reports/awbReportByAWB" : "reports/awbReport";
		dispatch({ type: FETCH_REPORTS });
		API.get(url, { params })
			.then((response) => {
				dispatch({
					type: FETCH_REPORTS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_REPORTS_FAILURE, payload: error });
			});
	};
	useEffect(() => {
		return () => {
			removeFilter("reportFilter");
			removeFilter("reportTab");
		};
	}, []);
	useEffect(() => {
		setRowsPerPage(rowsPerPageVal);
		setPage(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getTab]);

	useEffect(() => {
		getReport();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateFilter, page, rowsPerPage, getTab]);

	useDebouncedEffect(() => getReport(), 1000, [search]);

	const handleFilter = (event) => {
		const { name, value } = event.target;
		name === "notFullyLoaded"
			? setFilterData({
					...filterData,
					[name]: event.target.checked,
			  })
			: setFilterData({
					...filterData,
					[name]: value,
			  });
	};
	const toggleDrawer = (anchor, open) => (event) => {
		setOpenFilter(open);
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...getState, [anchor]: open });
	};
	const handleSubmit = (anchor) => {
		setUpdateFilter(filterData);
		setState({ ...getState, [anchor]: false });
		setFilter("reportFilter", { ...filterData, period }, true);
	};
	const handleReset = (anchor) => {
		removeFilter("reportFilter");
		setPeriod("");
		setFilterData({
			jobType: [],
			cargoType: "",
			AWBCargoType: [],
			requestStatus: [],
			jobStatus: [],
			cto: [],
			city: [],
			customer: [],
			startDate: null,
			endDate: null,
		});
		setCustomDate({
			startDate: null,
			endDate: null,
		});
		setUpdateFilter({
			jobType: [],
			cargoType: "",
			AWBCargoType: [],
			requestStatus: [],
			jobStatus: [],
			cto: [],
			city: [],
			customer: [],
			startDate: null,
			endDate: null,
		});
		setState({ ...getState, [anchor]: false });
	};

	const handleCustomDateSubmit = () => {
		setOpenDate(false);
		setShow(true);
		setFilterData({
			...filterData,
			startDate: customDate.startDate,
			endDate: customDate.endDate,
		});
		setPeriod(7);
	};

	const handleClickOpen = () => {
		setOpen(true);
		setDownloadDate({
			startDate: filterData.startDate || null,
			endDate: filterData.endDate || null,
		});
	};
	const handleClose = () => {
		setOpen(false);
		setDownloadDate({
			startDate: null,
			endDate: null,
		});
	};
	const handleCloseDate = () => {
		setPeriod("");
		setOpenDate(false);
		setCustomDate({
			startDate: null,
			endDate: null,
		});
	};
	const handleDownloadDate = (event, type) => {
		if (type === "startDate" || type === "endDate") {
			setDownloadDate({
				...downloadDate,
				[type]: moment(event).format("YYYY-MM-DD"),
			});
		}
	};
	const downloadReport = () => {
		handleClose();
		const params = {
			search: search !== "" ? search : null,
			filter,
		};
		//  Removed PDF download and added CSV download  (https://wymap.atlassian.net/browse/MAPTRAK-783)
		const url =
			getTab === 3
				? "reports/awbReportByAWB/downloadCSVReport"
				: "reports/awbReport/downloadCSVReport";
		dispatch({ type: DOWNLOAD_REPORTS });
		API.get(url, { params })
			.then((response) => {
				dispatch({
					type: DOWNLOAD_REPORTS_SUCCESS,
				});
				window.open(response.data.data, "_blank");
				toast.success("Report Downloaded Successfully");
			})
			.catch((error) => {
				dispatch({ type: DOWNLOAD_REPORTS_FAILURE });
				toast.error(error?.response?.data?.message);
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
	const handlePeriodChange = (event, type) => {
		const { value } = event.target;
		setPeriod(value);
		setShow(false);
		if (!openFilter) {
			setFilter(
				"reportFilter",
				{
					...filterData,
					period: value,
				},
				true
			);
		}
		if (value === 7 || type === true) {
			setOpenDate(true);
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
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 1) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 2) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 3) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 4) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 5) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 6) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
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

	return (
		<>
			<Header />
			<div className={classes.OnlineReportWrapper}>
				<Loader
					loading={
						state.report?.downloadingReport || state.report?.loadingReports
					}
				/>
				<div className="wrapper">
					<div className="report-form-section">
						<div className="filter-search-title-strip">
							<Tabbing
								setTab={setTab}
								getTab={getTab}
								page={page}
								handleChangePage={handleChangePage}
								rowsPerPage={rowsPerPage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
							/>
							<div className="filter-search-wrapper">
								<div className="inner-col">
									<div className="form-gourp">
										<TextField
											id="search-report"
											placeholder="Search Reports"
											variant="outlined"
											type="search"
											value={search}
											onChange={handleSearch}
										/>
									</div>
								</div>
								<div className="inner-col">
									<OnlineReportFilter
										handleFilter={handleFilter}
										filterData={filterData}
										toggleDrawer={toggleDrawer}
										getState={getState}
										handleSubmit={handleSubmit}
										handleReset={handleReset}
										handlePeriodChange={handlePeriodChange}
										handleCustomChange={handleCustomChange}
										handleCustomDateSubmit={handleCustomDateSubmit}
										period={period}
										open={openDate}
										show={show}
										customDate={customDate}
										handleClose={handleCloseDate}
										getTab={getTab}
									/>
								</div>
								<div className="inner-col">
									<DownloadReport
										getTab={getTab}
										downloadReport={downloadReport}
										handleClickOpen={handleClickOpen}
										handleClose={handleClose}
										open={open}
										data={downloadDate}
										handleChange={(e, type) => handleDownloadDate(e, type)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OnlineReport;
