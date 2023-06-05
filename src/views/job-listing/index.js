import React, { useState, useEffect } from "react";
import {
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	Button,
} from "@material-ui/core";
import moment from "moment";
import { ExpandMore } from "@material-ui/icons";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import {
	FETCH_JOBS,
	FETCH_JOBS_SUCCESS,
	FETCH_JOBS_FAILURE,
	REVIEW_JOBS,
	REVIEW_JOBS_SUCCESS,
	REVIEW_JOBS_FAILURE,
	RESET_REDIRECTION,
} from "@utils/actionTypes";
import Header from "@components/header";
import SearchIcon from "@assets/images/search.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import API from "@services/axios";
import {
	getPermissions,
	getFilter,
	setFilter,
	removeFilter,
} from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import { JobListingStyle } from "./style";
import CreateJob from "./create-job";
import CreateCompletedJob from "./create-completed-jobs";
import Filter from "./filter";
import TableListing from "./table-listing";

function JobListing() {
	const classes = JobListingStyle();
	const dashboardFilter = getFilter("jobDashboardFilter", true);
	const filter = getFilter("jobFilter", true);
	const allocateFilter = parseInt(getFilter("jobAllocate"));
	const cargoVolumeFilter = getFilter("cargoVolume");
	const materilClasses = materialCommonStyles();
	let status = "";
	const [state, dispatch] = useStore();
	const [openFilter, setOpenFilter] = useState(false);
	const [allocate, setAllocate] = useState(
		!!allocateFilter ? parseInt(allocateFilter) : ""
	);
	const [dataTable, setData] = useState({});
	const [mainCheck, setMainCheck] = useState(false);
	const [selectedArray, setSelectedArray] = useState([]);
	const [, setClick] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
	const [order, setOrder] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [period, setPeriod] = useState(
		filter ? filter?.period : dashboardFilter ? dashboardFilter.period : ""
	);
	const [openStartJob, setOpenStartJob] = useState(false);
	const [showStartJob, setShowStartJob] = useState(false);
	const [startJobPeriod, setStartJobPeriod] = useState(
		filter ? filter?.startJobPeriod : ""
	);
	status = state?.redirection?.jobStatusRedirection
		? state?.common?.jobStatusData?.find(
				(item) => item.name === state?.redirection?.jobStatusRedirection
		  ).id
		: "";
	const [filterData, setFilterData] = useState({
		jobStatus: filter ? filter.jobStatus : [],
		truckRego: filter ? filter.truckRego : [],
		driver: filter ? filter.driver : [],
		customer: filter
			? filter?.customer
			: dashboardFilter
			? dashboardFilter.customer
			: [],
		jobType: filter
			? filter?.jobType
			: dashboardFilter
			? dashboardFilter.jobType
			: [],
		city: filter ? filter?.city : dashboardFilter ? dashboardFilter.city : [],
		cargoType: cargoVolumeFilter
			? cargoVolumeFilter
			: filter
			? filter.cargoType
			: dashboardFilter
			? dashboardFilter.cargoType
			: [],
		cto: filter ? filter?.cto : dashboardFilter ? dashboardFilter.cto : [],
		startDate: filter
			? filter?.startDate
			: dashboardFilter
			? dashboardFilter.startDate
			: "",
		endDate: filter
			? filter?.endDate
			: dashboardFilter
			? dashboardFilter.endDate
			: "",
		startJobStartDate: filter ? filter?.startJobStartDate : "",
		startJobEndDate: filter ? filter?.startJobEndDate : "",
	});
	const [customDate, setCustomDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [startJobCustomDate, setStartJobCustomDate] = useState({
		startJobStartDate: null,
		startJobEndDate: null,
	});
	const [updateFilter, setUpdateFilter] = useState({});

	const isPermission =
		getPermissions() && getPermissions().includes("jobReview");
	// API calling to get list of jobs
	let getJobs = () => {
		const params = {
			page: page + 1,
			size: rowsPerPage,
			...(!!search ? { search } : {}),
			...(!!order ? { order } : {}),
			...(!!orderBy ? { orderBy } : {}),

			filter: {
				...(allocate === 1 ? { durationOver3Hours: 1 } : {}),
				...(allocate === 2 ? { waitingTimeOver2Hours: 1 } : {}),
				...(allocate === 3 ? { withoutJobCharge: 1 } : {}),
				...(allocate === 4 ? { reviewNotCompleted: 1 } : {}),
				...(allocate === 5 ? { notAcceptedByDriver: 1 } : {}),
				...(allocate === 6 ? { AWBNotTakenFully: 1 } : {}),
				...(allocate === 7 ? { childAccountNotMapped: 1 } : {}),
				...(!!filterData.jobStatus.length
					? { jobStatusId: filterData.jobStatus }
					: {}),
				...(!!filterData.jobType.length
					? { jobTypeId: filterData.jobType }
					: {}),
				...(!!filterData.city.length ? { cityId: filterData.city } : {}),
				...(!!filterData.truckRego.length
					? { truckId: filterData.truckRego }
					: {}),
				...(!!filterData.driver.length ? { driverId: filterData.driver } : {}),
				...(!!filterData.customer.length
					? { customerId: filterData.customer }
					: {}),
				...(!!filterData.cargoType.length
					? { cargoTypeId: filterData.cargoType }
					: {}),
				...(!!filterData.cto.length ? { ctoId: filterData.cto } : {}),
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
				...(!!filterData.startJobStartDate
					? { startJobStartDate: filterData.startJobStartDate }
					: !!startJobCustomDate.startJobStartDate
					? { startJobStartDate: filterData.startJobStartDate }
					: {}),
				...(!!filterData.startJobEndDate
					? { startJobEndDate: filterData.startJobEndDate }
					: !!startJobCustomDate.startJobEndDate
					? { startJobEndDate: filterData.startJobEndDate }
					: {}),
			},
		};
		dispatch({ type: FETCH_JOBS });
		API.get("jobs", { params })
			.then((response) => {
				dispatch({
					type: FETCH_JOBS_SUCCESS,
					payload: response.data.data,
				});
				setData(response?.data?.data?.rows);
			})
			.catch((error) => {
				dispatch({ type: FETCH_JOBS_FAILURE, payload: error });
			});
	};

	useEffect(() => {
		if (state?.redirection?.jobStatusRedirection && status) {
			setFilterData({
				...filterData,
				jobStatus: [
					state?.common?.jobStatusData?.find(
						(item) => item.name === state?.redirection?.jobStatusRedirection
					).id,
				],
			});
			setUpdateFilter(filterData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	useEffect(() => {
		getJobs();
		return () =>
			dispatch({
				type: RESET_REDIRECTION,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		page,
		rowsPerPage,
		allocate,
		order,
		orderBy,
		updateFilter,
		state?.redirection?.filterRedirection,
	]);

	useEffect(() => {
		setFilter("jobAllocate", allocateFilter);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useDebouncedEffect(() => getJobs(), 1000, [search]);

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
		setFilter("jobFilter", { ...filterData, period, startJobPeriod }, true);
		closeFilerPopup();
	};

	const handleReset = () => {
		removeFilter("jobFilter");
		removeFilter("jobDashboardFilter");
		removeFilter("jobAllocate");
		removeFilter("cargoVolume");
		document.body.classList.remove("open-filter");
		setShow(false);
		setPeriod("");
		setShowStartJob(false);
		setStartJobPeriod("");
		setFilterData({
			jobStatus: [],
			truckRego: [],
			driver: [],
			customer: [],
			jobType: [],
			city: [],
			cargoType: [],
			cto: [],
			startDate: null,
			endDate: null,
			startJobStartDate: null,
			startJobEndDate: null,
		});
		setCustomDate({
			startDate: null,
			endDate: null,
		});
		setStartJobCustomDate({
			startJobStartDate: null,
			startJobEndDate: null,
		});
		setUpdateFilter({
			jobStatus: [],
			truckRego: [],
			driver: [],
			customer: [],
			jobType: [],
			city: [],
			cargoType: [],
			cto: [],
			startDate: null,
			endDate: null,
			startJobStartDate: null,
			startJobEndDate: null,
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
		if (!openFilter) {
			setUpdateFilter(filterData);
		}
		setPeriod(7);
	};
	const handleStartJobCustomDateSubmit = () => {
		setOpenStartJob(false);
		setShowStartJob(true);
		setFilterData({
			...filterData,
			startJobStartDate: startJobCustomDate.startJobStartDate,
			startJobEndDate: startJobCustomDate.startJobEndDate,
		});
		if (!openFilter) {
			setUpdateFilter(filterData);
		}
		setStartJobPeriod(7);
	};

	const handleFilter = (event) => {
		const { name, value } = event.target;
		setFilterData({
			...filterData,
			[name]: value,
		});
		if (!openFilter) {
			setUpdateFilter(filterData);
		}
	};

	const handleSearch = (event) => {
		setSearch(event.target.value.trimStart());
	};

	const handleSorting = (event, property) => {
		const isAsc = orderBy === property.sortTitle && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property.sortTitle);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleAllocate = (event) => {
		setAllocate(event.target.value);
		setFilter("jobAllocate", event.target.value);
	};

	// To handle checkboxes from listing
	const handleChange = (item, e) => {
		let _id = item.id;
		let index = dataTable.findIndex((x) => x.id === _id);
		let data = dataTable;
		if (index > -1) {
			let newState = !item._rowChecked;
			data[index]._rowChecked = newState;
			setData(data);
		}
		if (
			data.filter((res, index) => res._rowChecked === true).length ===
			data.length
		) {
			setMainCheck(true);
		} else {
			setMainCheck(false);
		}
		let newarray = [];
		dataTable.map((res, index) => {
			if (res._rowChecked === true) {
				newarray.push(res.id);
			}
			return true;
		});
		setSelectedArray(newarray);
	};

	// To handle main checkbox
	const handleMainChangeCheckBox = (e) => {
		let _val = e.target.checked;
		dataTable.forEach((element) => {
			if (element.jobStatuses && element.jobStatuses.name === "Completed") {
				element._rowChecked = _val;
			}
		});
		setData(dataTable);
		setMainCheck(_val);

		let newmainarray = [];
		dataTable.map((res, index) => {
			if (res._rowChecked === true) {
				newmainarray.push(res.id);
			}
			return true;
		});
		setSelectedArray(newmainarray);
	};

	// API calling to review multiple jobs
	const handleClickShowData = () => {
		dispatch({ type: REVIEW_JOBS });
		API.put("jobs/reviewCompleted", { jobIds: selectedArray })
			.then((response) => {
				dispatch({
					type: REVIEW_JOBS_SUCCESS,
					payload: response.data.data,
				});
				setClick(true);
				setSelectedArray([]);
				getJobs();
			})
			.catch((error) => {
				dispatch({ type: REVIEW_JOBS_FAILURE, payload: error });
			});
	};

	const handleStartJobPeriodChange = (event, type) => {
		const { value } = event.target;
		setStartJobPeriod(value);
		setShowStartJob(false);
		if (!openFilter) {
			setFilter(
				"jobFilter",
				{
					...filterData,
					startJobPeriod: value,
				},
				true
			);
		}
		if (value === 7 || type === true) {
			setOpenStartJob(true);
		} else {
			const newDate = new Date();
			if (value === "") {
				setFilterData({
					...filterData,
					startJobStartDate: null,
					startJobEndDate: null,
				});
				setStartJobCustomDate({
					startJobStartDate: null,
					startJobEndDate: null,
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 1) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate).format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 2) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate)
						.subtract(1, "day")
						.format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate)
						.subtract(1, "day")
						.format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 3) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate)
						.subtract(3, "day")
						.format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 4) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate)
						.subtract(7, "day")
						.format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 5) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate)
						.subtract(14, "day")
						.format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			} else if (value === 6) {
				setFilterData({
					...filterData,
					startJobStartDate: moment(newDate)
						.subtract(30, "day")
						.format("YYYY-MM-DD"),
					startJobEndDate: moment(newDate).format("YYYY-MM-DD"),
				});
				if (!openFilter) {
					setUpdateFilter(filterData);
				}
			}
		}
	};

	const handlePeriodChange = (event, type) => {
		const { value } = event.target;
		setPeriod(value);
		setShow(false);
		if (!openFilter) {
			setFilter(
				"jobFilter",
				{
					...filterData,
					period: value,
				},
				true
			);
		}
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

	const handleClose = () => {
		setPeriod("");
		setOpen(false);
		setCustomDate({
			startDate: null,
			endDate: null,
		});
	};
	const handleStartJobClose = () => {
		setStartJobPeriod("");
		setOpenStartJob(false);
		setStartJobCustomDate({
			startJobStartDate: null,
			startJobEndDate: null,
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
	const handleStartJobCustomChange = (event, type) => {
		if (type === "startJobStartDate" || type === "startJobEndDate") {
			setStartJobCustomDate({
				...startJobCustomDate,
				[type]: moment(event).format("YYYY-MM-DD"),
			});
		} else {
			const { name, value } = event.target;
			setStartJobCustomDate({
				...startJobCustomDate,
				[name]: value,
			});
		}
	};

	return (
		<>
			<Header />
			<div className={classes.JobListingWrapper}>
				<div className="dashboard-page wrapper">
					<div className="inner-page">
						<div className={classes.innerPageTopBlock}>
							<div className="left-block">
								<Typography variant="h1">Jobs</Typography>
							</div>

							<div className="right-block">
								<div className="right-block-inner">
									<div className="search-wrapper">
										<div className="form-gourp">
											<TextField
												id="search-request"
												placeholder="Search by ID/AWB/Cons./ULD/Info"
												variant="outlined"
												type="search"
												InputProps={{
													endAdornment: <img src={SearchIcon} alt="Search" />,
												}}
												value={search}
												onChange={handleSearch}
											/>
										</div>
									</div>
									<div className="dropdown_wrapper">
										<FormControl
											variant="outlined"
											className={classes.formControl}
										>
											<Select
												value={allocate}
												onChange={handleAllocate}
												displayEmpty
												className={materilClasses.customSelect}
												MenuProps={{
													classes: { paper: materilClasses.customSelect },
												}}
												IconComponent={() => <ExpandMore />}
											>
												<MenuItem value={""}>Choose</MenuItem>
												<MenuItem value={1}>Duration Over 3 Hours</MenuItem>
												<MenuItem value={2}>
													Jobs Waiting Time Over 2 Hours
												</MenuItem>
												<MenuItem value={3}>
													Jobs Without Any Job Charge
												</MenuItem>
												<MenuItem value={4}>
													Jobs With Review Not Completed
												</MenuItem>
												<MenuItem value={5}>
													Jobs Not Accepted By Driver
												</MenuItem>
												<MenuItem value={6}>
													Jobs Whose AWB Is Not Taken Fully
												</MenuItem>
												<MenuItem value={7}>
													Jobs With Child Account Not Being Mapped
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="modal-wrapper">
										{/* https://wymap.atlassian.net/browse/MAPTRAK-1033  */}
										<CreateJob getJobs={getJobs} />

										{isPermission && (
											<div className="btn-wrapper">
												<Button
													className="orange-btn primary-btn"
													color="inherit"
													disableElevation
													onClick={handleClickShowData}
													disabled={selectedArray.length === 0}
												>
													Review
												</Button>
											</div>
										)}
									</div>
									<div className="modal-wrapper">
										<CreateCompletedJob getJobs={getJobs} />
									</div>
									<div className="dropdown_wrapper1">
										<div className={classes.filter}>
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
												startJobPeriod={startJobPeriod}
												openStartJob={openStartJob}
												showStartJob={showStartJob}
												startJobCustomDate={startJobCustomDate}
												handleStartJobPeriodChange={handleStartJobPeriodChange}
												handleStartJobCustomChange={handleStartJobCustomChange}
												handleStartJobCustomDateSubmit={
													handleStartJobCustomDateSubmit
												}
												handleStartJobClose={handleStartJobClose}
												handleReset={handleReset}
												openFilter={openFilter}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<TableListing
							handleChange={handleChange}
							handleMainChange={handleMainChangeCheckBox}
							_maincheck={mainCheck}
							page={page}
							handleChangePage={handleChangePage}
							rowsPerPage={rowsPerPage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							handleSorting={(e, property) => handleSorting(e, property)}
							orderBy={orderBy}
							order={order}
							getJobs={getJobs}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default JobListing;
