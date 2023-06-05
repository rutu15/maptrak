import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
	Typography,
	TextField,
	Select,
	MenuItem,
	FormControl,
} from "@material-ui/core";
import moment from "moment";
import { ExpandMore } from "@material-ui/icons";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import SearchIcon from "@assets/images/search.svg";
import UploadImage from "@assets/images/blue-upload.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
	FETCH_DRIVERS,
	FETCH_DRIVERS_SUCCESS,
	FETCH_DRIVERS_FAILURE,
	IMPORT_DRIVERS_CSV,
	IMPORT_DRIVERS_CSV_SUCCESS,
	IMPORT_DRIVERS_CSV_FAILURE,
	RESET_REDIRECTION,
} from "@utils/actionTypes";
import {
	UploadFile,
	getFilter,
	setFilter,
	removeFilter,
} from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import AddCustomer from "./add-driver";
import TableListing from "./table-listing";
import OnlineRequestFilter from "./filter";
import { DriverListingStyle } from "./style";

function DriverListing() {
	const classes = DriverListingStyle();
	const materilClasses = materialCommonStyles();
	const filter = getFilter("driverFilter", true);
	const dashboardFilter = getFilter("jobDashboardFilter", true);
	const driverGraphFilter = getFilter("driverDashboardFilter", true);
	const [, dispatch] = useStore();
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState(filter ? filter.status : true);
	const [period, setPeriod] = useState(
		filter ? filter?.period : dashboardFilter ? dashboardFilter?.period : ""
	);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("");
	const [fileName, setFilename] = useState("");
	const [graphFilter, setGraphFilter] = useState(
		driverGraphFilter ? parseInt(driverGraphFilter) : ""
	);
	const [openFilter, setOpenFilter] = useState(false);
	const [updateFilter, setUpdateFilter] = useState({});
	const [getState, setState] = useState({
		right: false,
	});
	const [filterData, setFilterData] = useState({
		city: filter ? filter?.city : dashboardFilter ? dashboardFilter?.city : [],
		startDate: filter
			? filter?.startDate
			: dashboardFilter
			? dashboardFilter?.startDate
			: "",
		endDate: filter
			? filter?.endDate
			: dashboardFilter
			? dashboardFilter?.endDate
			: "",
	});
	const [customDate, setCustomDate] = useState({
		startDate: null,
		endDate: null,
	});

	// API calling to get list of drivers
	let getDrivers = () => {
		const params = {
			page: page + 1,
			size: rowsPerPage,
			...(!!search ? { search } : {}),
			...(!!order ? { order: order === "asc" ? "ASC" : "DESC" } : {}),
			orderBy: orderBy !== "" ? orderBy : "city",
			filter: {
				...(status !== "" ? { active: status } : {}),
				...(graphFilter === 1 ? { fatigueDrivers: 1 } : {}),
				...(graphFilter === 2 ? { timesheetNotApproved: 1 } : {}),
				...(!!filterData.city?.length ? { cityId: filterData.city } : {}),
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
		dispatch({ type: FETCH_DRIVERS });
		API.get("drivers", { params })
			.then((response) => {
				dispatch({
					type: FETCH_DRIVERS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_DRIVERS_FAILURE, payload: error });
			});
	};

	useEffect(() => {
		getDrivers();
		return () =>
			dispatch({
				type: RESET_REDIRECTION,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, page, rowsPerPage, order, orderBy, updateFilter, graphFilter]);

	useDebouncedEffect(() => getDrivers(), 1000, [search]);

	const handleGraphFilter = (e) => {
		setGraphFilter(e.target.value);
		setFilter("driverDashboardFilter", e.target.value, true);
	};
	const closeFilerPopup = (anchor) => {
		setState({ ...getState, [anchor]: false });
		setOpenFilter(false);
	};

	const handleSubmit = (anchor) => {
		setUpdateFilter(filterData);
		closeFilerPopup(anchor);
		setFilter("driverFilter", { ...filterData, period, status }, true);
	};

	const handleReset = (anchor) => {
		removeFilter("driverFilter");
		removeFilter("jobDashboardFilter");
		setState({ ...getState, [anchor]: false });
		setShow(false);
		setPeriod("");
		setFilterData({
			city: [],
			startDate: null,
			endDate: null,
		});
		setCustomDate({
			startDate: null,
			endDate: null,
		});
		setUpdateFilter({
			city: [],
			startDate: null,
			endDate: null,
		});
	};

	// To open drawer of filter
	const toggleDrawer = (anchor, open) => (event) => {
		setOpenFilter(true);
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...getState, [anchor]: open });
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

	const handlePeriodChange = (event, type) => {
		const { value } = event.target;
		setPeriod(value);
		setShow(false);
		if (!openFilter) {
			setFilter(
				"driverFilter",
				{
					...filterData,
					period: value,
					status,
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

	const handleSearch = (event) => {
		setSearch(event.target.value.trimStart());
	};

	const handleStatusChange = (event) => {
		setStatus(event.target.value);
		setFilter(
			"driverFilter",
			{
				...filterData,
				period,
				status: event.target.value,
			},
			true
		);
	};

	const handleClose = () => {
		setPeriod("");
		setOpen(false);
		setCustomDate({
			startDate: null,
			endDate: null,
		});
	};

	//Uploading file for import csv of driver
	function uploadFile(event, fileName, defaultText) {
		setFilename(event.target?.files[0]?.name);
		if (event.target.files && event.target.files.length) {
			dispatch({ type: IMPORT_DRIVERS_CSV });
		}
		UploadFile(event, fileName, defaultText, "text/csv", "driver-csv")
			.then((res) => {
				API.post("drivers/import", { file: res.data.fileName })
					.then((response) => {
						setFilename("");
						event.target.value = "";
						getDrivers();
						toast.success("CSV Imported Successfully");
						dispatch({
							type: IMPORT_DRIVERS_CSV_SUCCESS,
							payload: response.data.data,
						});
					})
					.catch((error) => {
						setFilename("");
						event.target.value = "";
						if (error.response?.data?.code === 400)
							toast.error("Please Upload Valid CSV");
						dispatch({ type: IMPORT_DRIVERS_CSV_FAILURE, payload: error });
					});
			})
			.catch((error) => {
				setFilename("");
				event.target.value = "";
				dispatch({ type: IMPORT_DRIVERS_CSV_FAILURE, payload: error });
				toast.error("Please Upload CSV File");
			});
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSorting = (event, property) => {
		setOrderBy(property.sortTitle);
		const isAsc = order === "asc";
		setOrder(isAsc ? "desc" : "asc");
	};

	return (
		<>
			<Header />
			<div className={classes.DriverListingWrapper}>
				<div className="dashboard-page wrapper">
					<div className="inner-page">
						<div className={classes.innerPageTopBlock}>
							<div className="left-block">
								<Typography variant="h1">Drivers</Typography>
							</div>
							<div className="right-block">
								<div className="right-block-inner">
									<div className="search-wrapper">
										<div className="form-gourp">
											<TextField
												id="search-request"
												placeholder="Search Drivers"
												variant="outlined"
												InputProps={{
													endAdornment: <img src={SearchIcon} alt="Search" />,
												}}
												type="search"
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
												value={graphFilter}
												onChange={handleGraphFilter}
												displayEmpty
												className={materilClasses.customSelect}
												MenuProps={{
													classes: { paper: materilClasses.customSelect },
												}}
												IconComponent={() => <ExpandMore />}
											>
												<MenuItem value={""}>Choose</MenuItem>
												<MenuItem value={1}>Fatigue Management</MenuItem>
												<MenuItem value={2}>
													Drivers whose timesheets are not approved
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="dropdown_wrapper1">
										<FormControl
											variant="outlined"
											className={classes.formControl}
										>
											<Select
												value={status}
												onChange={handleStatusChange}
												displayEmpty
												className={materilClasses.customSelect}
												MenuProps={{
													classes: { paper: materilClasses.customSelect },
												}}
												IconComponent={() => <ExpandMore />}
											>
												<MenuItem value={""}>Status</MenuItem>
												<MenuItem value={true}>Active</MenuItem>
												<MenuItem value={false}>Inactive</MenuItem>
											</Select>
										</FormControl>
									</div>

									<div className="modal-wrapper">
										<div className="btn-wrapper">
											<div className={classes.fileInput}>
												<TextField
													id="photo"
													variant="outlined"
													type="file"
													multiple
													onChange={(e) =>
														uploadFile(e, "file-name", "Import csv")
													}
													InputProps={{
														inputProps: { accept: ".csv" },
													}}
												/>
												<div className="label-block">
													<img src={UploadImage} alt="Upload" />
													<span className="file-name" id="file-name">
														{fileName ? fileName : "Import CSV"}
													</span>
												</div>
											</div>
											<AddCustomer getDrivers={getDrivers} />
										</div>
									</div>
									<div className="modal-wrapper">
										<div className="btn-wrapper">
											<OnlineRequestFilter
												handleFilter={handleFilter}
												filterData={filterData}
												toggleDrawer={toggleDrawer}
												getState={getState}
												handleSubmit={handleSubmit}
												handleReset={handleReset}
												handlePeriodChange={handlePeriodChange}
												handleClose={handleClose}
												handleCustomChange={handleCustomChange}
												handleCustomDateSubmit={handleCustomDateSubmit}
												period={period}
												open={open}
												show={show}
												customDate={customDate}
											/>
										</div>
									</div>
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
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default DriverListing;
