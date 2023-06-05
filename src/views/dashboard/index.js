import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import moment from "moment";

import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import { innerPageStyle } from "@utils/commonStyles";
import {
	DASHBOARD_JOB_DRIVER_MANAGE,
	DASHBOARD_JOB_DRIVER_MANAGE_SUCCESS,
	DASHBOARD_JOB_DRIVER_MANAGE_FAILURE,
	DASHBOARD_AVERAGE,
	DASHBOARD_AVERAGE_SUCCESS,
	DASHBOARD_AVERAGE_FAILURE,
	DASHBOARD_STATUS_TIMEOVER,
	DASHBOARD_STATUS_TIMEOVER_SUCCESS,
	DASHBOARD_STATUS_TIMEOVER_FAILURE,
	DASHBOARD_FILTER_REDIRECTION,
	DRIVERS_GRAPH_FILTER,
	INVOICE_GRAPH_FILTER,
} from "@utils/actionTypes";
import { routes } from "@utils/constant";
import { getFilter, setFilter, removeFilter } from "@utils/commonFunctions";
import API from "@services/axios";
import CustomerDashboard from "./customer-dashboard";
import Filter from "./filter";
import { MainDashboardStyle } from "./style";

function Dashboard() {
	const classes = innerPageStyle();
	const classes01 = MainDashboardStyle();
	const filter = getFilter("dashboardFilter", true);
	const [state, dispatch] = useStore();
	const [period, setPeriod] = useState(filter ? filter.period : 1);
	const [openFilter, setOpenFilter] = useState(false);
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [filterData, setFilterData] = useState({
		jobType: filter ? filter.jobType : [],
		cargoType: filter ? filter.cargoType : [],
		cto: filter ? filter.cto : [],
		city: filter ? filter.city : [],
		customer: filter ? filter.customer : [],
		startDate: filter
			? filter.startDate
			: moment(new Date()).format("YYYY-MM-DD"),
		endDate: filter ? filter.endDate : moment(new Date()).format("YYYY-MM-DD"),
	});
	const [customDate, setCustomDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [updateFilter, setUpdateFilter] = useState({});
	const history = useHistory();

	// API calling to get dashboard data
	let getDashboardData = () => {
		const params = {
			filter: {
				...(!!filterData.cargoType.length
					? { cargoTypeId: filterData.cargoType }
					: {}),
				...(!!filterData.cto.length ? { ctoId: filterData.cto } : {}),
				...(!!filterData.jobType.length
					? { jobTypeId: filterData.jobType }
					: {}),
				...(!!filterData.city.length ? { cityId: filterData.city } : {}),
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
		dispatch({ type: DASHBOARD_JOB_DRIVER_MANAGE });
		API.get("reports/dashboards/jobAndDriverManage", { params })
			.then((response) => {
				dispatch({
					type: DASHBOARD_JOB_DRIVER_MANAGE_SUCCESS,
					payload: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: DASHBOARD_JOB_DRIVER_MANAGE_FAILURE,
					payload: error?.response?.data,
				});
			});

		dispatch({ type: DASHBOARD_AVERAGE });
		API.get("reports/dashboards/averageDuration", { params })
			.then((response) => {
				dispatch({
					type: DASHBOARD_AVERAGE_SUCCESS,
					payload: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: DASHBOARD_AVERAGE_FAILURE,
					payload: error?.response?.data,
				});
			});

		dispatch({ type: DASHBOARD_STATUS_TIMEOVER });
		API.get("reports/dashboards/jobInvoiceStatusesAndTimeOver", { params })
			.then((response) => {
				dispatch({
					type: DASHBOARD_STATUS_TIMEOVER_SUCCESS,
					payload: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: DASHBOARD_STATUS_TIMEOVER_FAILURE,
					payload: error?.response?.data,
				});
			});
	};

	useEffect(() => {
		return () => {
			removeFilter("dashboardFilter");
		};
	}, []);

	useEffect(() => {
		getDashboardData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateFilter]);

	const openFilterPopup = () => {
		document.body.classList.toggle("open-filter");
		setOpenFilter(true);
	};

	const closeFilerPopup = () => {
		document.body.classList.remove("open-filter");
		setOpenFilter(false);
	};

	const handleSubmit = () => {
		setUpdateFilter(filterData);
		setFilter("dashboardFilter", { ...filterData, period }, true);
		setFilter("jobDashboardFilter", { ...filterData, period }, true);
		closeFilerPopup();
	};

	const handleReset = () => {
		removeFilter("dashboardFilter");
		document.body.classList.remove("open-filter");
		setShow(false);
		setPeriod("");
		setFilterData({
			jobType: [],
			cargoType: [],
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
			cargoType: [],
			cto: [],
			city: [],
			customer: [],
			startDate: null,
			endDate: null,
		});
	};

	const handleCustomDateSubmit = () => {
		setOpen(false);
		setShow(true);
		setDynamic(
			moment(customDate?.startDate).format("YYYY-MM-DD"),
			moment(customDate?.endDate).format("YYYY-MM-DD"),
			period
		);
		setFilterData({
			...filterData,
			startDate: customDate.startDate,
			endDate: customDate.endDate,
		});
		if (!openFilter) {
			setUpdateFilter(filterData);
		}
		setPeriod(7);
	};

	const handleFilter = (event) => {
		const { name, value } = event.target;
		setFilterData({
			...filterData,
			[name]: value,
		});
		if (!openFilter) {
			setUpdateFilter(filterData);
			setFilter(
				"dashboardFilter",
				{
					...filterData,
					[name]: value,
					period,
				},
				true
			);
			setFilter(
				"jobDashboardFilter",
				{
					...filterData,
					[name]: value,
					period,
				},
				true
			);
		}
	};

	const setDynamic = (start, end, period) => {
		setFilter(
			"dashboardFilter",
			{
				...filterData,
				startDate: start,
				endDate: end,
				period,
			},
			true
		);
		setFilter(
			"jobDashboardFilter",
			{
				...filterData,
				startDate: start,
				endDate: end,
				period,
			},
			true
		);
	};

	const handlePeriodChange = (event, type) => {
		const { value } = event.target;
		setPeriod(value);
		setShow(false);
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
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(null, null, value);
				}
			} else if (value === 1) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).format("YYYY-MM-DD"),
						moment(newDate).format("YYYY-MM-DD")
					);
				}
			} else if (value === 2) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
						moment(newDate).subtract(1, "day").format("YYYY-MM-DD"),
						value
					);
				}
			} else if (value === 3) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).subtract(3, "day").format("YYYY-MM-DD"),
						moment(newDate).format("YYYY-MM-DD"),
						value
					);
				}
			} else if (value === 4) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).subtract(7, "day").format("YYYY-MM-DD"),
						moment(newDate).format("YYYY-MM-DD"),
						value
					);
				}
			} else if (value === 5) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).subtract(14, "day").format("YYYY-MM-DD"),
						moment(newDate).format("YYYY-MM-DD"),
						value
					);
				}
			} else if (value === 6) {
				setFilterData({
					...filterData,
					startDate: moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
					endDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
					setDynamic(
						moment(newDate).subtract(30, "day").format("YYYY-MM-DD"),
						moment(newDate).format("YYYY-MM-DD"),
						value
					);
				}
			}
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

	const handleRedirection = (type, value) => {
		setFilter("jobDashboardFilter", { ...filterData, period }, true);
		if (type === "CARGO_VOLUME") {
			setFilter("cargoVolume", value);
		} else {
			setFilter("jobAllocate", value);
		}

		dispatch({ type: type, payload: value });
		if (updateFilter) {
			dispatch({
				type: DASHBOARD_FILTER_REDIRECTION,
				payload: { filter: filterData, period: period },
			});
		}
		if (value) history.push(routes.jobListing);
	};

	const handleRedirectionDriver = (type, value) => {
		setFilter("jobDashboardFilter", { ...filterData, period }, true);
		setFilter("driverDashboardFilter", value);
		dispatch({ type: type, payload: value });
		if (filterData) {
			dispatch({
				type: DRIVERS_GRAPH_FILTER,
				payload: { filter: filterData, period: period },
			});
		}
		history.push(routes.driverListing);
	};

	const handleRedirectionInvoice = (type) => {
		setFilter("jobDashboardFilter", { ...filterData, period }, true);
		if (type === "Rejected") {
			if (filterData) {
				dispatch({
					type: INVOICE_GRAPH_FILTER,
					payload: { filter: filterData, period: period },
				});
			}
			history.push(routes.rejectedInvoice);
		}
		if (type === "Draft") history.push(routes.invoice);
	};

	return (
		<>
			<Header />
			<div
				className={cx(classes.innerPageWrapper, classes01.MainDashboardWrapper)}
			>
				<Loader
					loading={
						state.dashboard?.loadingJobsDriver ||
						state.dashboard?.loadingDashboardAverage ||
						state.dashboard?.dashboardTimeoverLoading
					}
				/>
				<div className="dashboard-page wrapper">
					<div className="filter-main-wrapper">
						<Filter
							handleFilter={handleFilter}
							filterData={filterData}
							openFilterPopup={openFilterPopup}
							closeFilerPopup={closeFilerPopup}
							handleSubmit={handleSubmit}
							handlePeriodChange={handlePeriodChange}
							handleClose={handleClose}
							handleCustomChange={handleCustomChange}
							handleCustomDateSubmit={handleCustomDateSubmit}
							period={period}
							open={open}
							show={show}
							customDate={customDate}
							handleReset={handleReset}
							setFilterData={setFilterData}
							openFilter={openFilter}
							filter={filter}
							updateFilter={updateFilter}
						/>
					</div>
					<CustomerDashboard
						handleRedirection={handleRedirection}
						handleRedirectionDriver={handleRedirectionDriver}
						handleRedirectionInvoice={handleRedirectionInvoice}
					/>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
