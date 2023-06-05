import React, { useState, useEffect } from "react";
import {
	Typography,
	Select,
	MenuItem,
	FormControl,
	Button,
	Checkbox,
	ListItemText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import filterIcon from "@assets/images/filter-icon.svg";
import closeIcon from "@assets/images/close.svg";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import {
	GET_JOB_STATUS,
	GET_JOB_STATUS_SUCCESS,
	GET_JOB_STATUS_FAILURE,
	GET_JOBTYPES,
	GET_JOBTYPES_SUCCESS,
	GET_JOBTYPES_FAILURE,
	GET_CITIES,
	GET_CITIES_SUCCESS,
	GET_CITIES_FAILURE,
	FETCH_DRIVERS,
	FETCH_DRIVERS_SUCCESS,
	FETCH_DRIVERS_FAILURE,
	FETCH_CUSTOMERS,
	FETCH_CUSTOMERS_SUCCESS,
	FETCH_CUSTOMERS_FAILURE,
	FETCH_TRUCKS,
	FETCH_TRUCKS_SUCCESS,
	FETCH_TRUCKS_FAILURE,
	GET_CARGO_TYPE,
	GET_CARGO_TYPE_SUCCESS,
	GET_CARGO_TYPE_FAILURE,
	GET_CTOS,
	GET_CTOS_SUCCESS,
	GET_CTOS_FAILURE,
} from "@utils/actionTypes";
import { filterCommonStyles } from "@utils/filterCommonStyles";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { getCustomFormToDate } from "@utils/commonFunctions";
import API from "@services/axios";
import Popup from "./popup";
import StartDatePopup from "./start-job-popup";

function Filter(props) {
	const [state, dispatch] = useStore();
	const [allMenuData, setAllMenuData] = useState({
		jobStatusMenuData: [],
		truckRegoMenuData: [],
		driverMenuData: [],
		customerMenuData: [],
		jobTypeMenuData: [],
		cityMenuData: [],
		cargoTypeMenuData: [],
		ctoMenuData: [],
	});

	const handleSetMenuData = (stateName, name) => {
		const arr = [];
		stateName?.map((item) => {
			name === "truckRegoMenuData"
				? arr.push({
						label: item.rego,
						value: item.id,
				  })
				: arr.push({
						label: item.name,
						value: item.id,
				  });
			return true;
		});
		setAllMenuData((prevState) => ({
			...prevState,
			[name]: arr,
		}));
	};

	useEffect(() => {
		handleSetMenuData(state?.common?.jobStatusData, "jobStatusMenuData");
		handleSetMenuData(state?.trucks?.trucksData?.rows, "truckRegoMenuData");
		handleSetMenuData(state?.driver?.getDriversData?.rows, "driverMenuData");
		handleSetMenuData(state?.customer?.customers?.rows, "customerMenuData");
		handleSetMenuData(state?.common?.jobTypeData, "jobTypeMenuData");
		handleSetMenuData(state?.common?.citiesData, "cityMenuData");
		handleSetMenuData(state?.common?.cargoTypeData, "cargoTypeMenuData");
		handleSetMenuData(state?.common?.ctosData, "ctoMenuData");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		state?.common?.jobStatusData,
		state?.driver?.getDriversData?.rows,
		state?.trucks?.trucksData?.rows,
		state?.customer?.customers?.rows,
		state?.common?.jobTypeData,
		state?.common?.citiesData,
		state?.common?.cargoTypeData,
		state?.common?.ctosData,
	]);

	useEffect(() => {
		if (state?.common?.cargoTypeData === null) {
			dispatch({ type: GET_CARGO_TYPE });
			API.get("master/cargoTypes")
				.then((response) => {
					dispatch({
						type: GET_CARGO_TYPE_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: GET_CARGO_TYPE_FAILURE, payload: error });
				});
		}

		if (state?.common?.citiesData === null) {
			dispatch({ type: GET_CITIES });
			API.get("master/cities")
				.then((response) => {
					dispatch({
						type: GET_CITIES_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: GET_CITIES_FAILURE, payload: error });
				});
		}

		if (state?.common?.jobStatusData === null) {
			dispatch({ type: GET_JOB_STATUS });
			API.get("master/jobStatuses")
				.then((response) => {
					dispatch({
						type: GET_JOB_STATUS_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: GET_JOB_STATUS_FAILURE, payload: error });
				});
		}

		if (state?.common?.jobTypeData === null) {
			dispatch({ type: GET_JOBTYPES });
			API.get("master/jobTypes")
				.then((response) => {
					dispatch({
						type: GET_JOBTYPES_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: GET_JOBTYPES_FAILURE, payload: error });
				});
		}

		dispatch({ type: FETCH_TRUCKS });
		API.get("trucks", {
			params: {
				orderBy: "rego",
				order: "asc",
			},
		})
			.then((response) => {
				dispatch({
					type: FETCH_TRUCKS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_TRUCKS_FAILURE, payload: error });
			});
		dispatch({ type: FETCH_CUSTOMERS });
		API.get("customers", {
			params: {
				orderBy: "name",
				order: "asc",
				filter: { parent: 0, status: true },
			},
		})
			.then((response) => {
				dispatch({
					type: FETCH_CUSTOMERS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (props.openFilter) {
			dispatch({ type: FETCH_DRIVERS });
			// Added default ASC filter (https://wymap.atlassian.net/browse/MAPTRAK-862)
			API.get("drivers", {
				params: {
					order: "ASC",
					orderBy: "driverName",
					filter: { active: true },
				},
			})
				.then((response) => {
					dispatch({
						type: FETCH_DRIVERS_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: FETCH_DRIVERS_FAILURE, payload: error });
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.openFilter]);
	useEffect(() => {
		if (props.filterData.city.length) {
			const params = {
				cityId: JSON.stringify(props.filterData?.city),
			};
			dispatch({ type: GET_CTOS });
			API.get("master/ctos", { params })
				.then((response) => {
					dispatch({
						type: GET_CTOS_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: GET_CTOS_FAILURE, payload: error });
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.filterData?.city]);

	const classes = filterCommonStyles();
	const materilClasses = materialCommonStyles();

	return (
		<div className={classes.filterWrapper}>
			<div className="white-card filter-wrapper">
				<form noValidate autoComplete="off" className="custom-form">
					<div className="btn-wrapper">
						<Button
							className="primary-btn blue-btn"
							variant="contained"
							color="primary"
							disableElevation
							onClick={props.openFilterPopup}
						>
							<img src={filterIcon} alt="Filter" />
							Filter
						</Button>
					</div>
					<div className="filter-overlay" onClick={props.closeFilerPopup}></div>
					<div className="form-row filter-form-row">
						<div className="filter-title-block form-gourp">
							<Typography variant="h2">Filter</Typography>
							<img
								src={closeIcon}
								alt="Close"
								onClick={props.closeFilerPopup}
							/>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Job Status</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData?.jobStatus}
									name="jobStatus"
									onChange={(e) => props.handleFilter(e)}
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select Job Status</>;
										}

										return allMenuData.jobStatusMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select Job Status
									</MenuItem>
									{allMenuData.jobStatusMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.jobStatus.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Truck Rego</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData.truckRego}
									onChange={(e) => props.handleFilter(e)}
									name="truckRego"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select truck rego</>;
										}

										return allMenuData.truckRegoMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select truck rego
									</MenuItem>
									{allMenuData.truckRegoMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.truckRego.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Driver</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData.driver}
									onChange={(e) => props.handleFilter(e)}
									name="driver"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select Driver</>;
										}

										return allMenuData.driverMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select Driver
									</MenuItem>
									{allMenuData.driverMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.driver.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Customer</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData?.customer}
									onChange={props.handleFilter}
									name="customer"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select customer</>;
										}

										return allMenuData.customerMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select customer
									</MenuItem>
									{allMenuData.customerMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.customer.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Job Type</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData.jobType}
									onChange={(e) => props.handleFilter(e)}
									name="jobType"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select job type</>;
										}

										return allMenuData.jobTypeMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select Job Type
									</MenuItem>
									{allMenuData.jobTypeMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.jobType.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Job Completed Date</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									name="reportingPeriod"
									value={props.period}
									onChange={props.handlePeriodChange}
									placeholder="06/12/2021"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
								>
									<MenuItem value={""}>Select Period</MenuItem>
									<MenuItem value={1}>Today</MenuItem>
									<MenuItem value={2}>Yesterday</MenuItem>
									<MenuItem value={3}>Last 3 days</MenuItem>
									<MenuItem value={4}>Last 7 days</MenuItem>
									<MenuItem value={5}>Last fortnight</MenuItem>
									<MenuItem value={6}>Last 30 days</MenuItem>
									<MenuItem
										value={7}
										onClick={(e) => props.handlePeriodChange(e, true)}
									>
										{props.show
											? getCustomFormToDate(
													props.customDate.startDate,
													props.customDate.endDate
											  )
											: "Custom Range"}
									</MenuItem>
								</Select>
								<Popup
									open={props.open}
									handleSubmit={props.handleCustomDateSubmit}
									handleClose={props.handleClose}
									data={props.customDate}
									handleChange={(e, type) => props.handleCustomChange(e, type)}
									startName="startDate"
									endName="endDate"
								/>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Job Started Date</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									name="jobStartedDate"
									value={props.startJobPeriod}
									onChange={props.handleStartJobPeriodChange}
									placeholder="06/12/2021"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
								>
									<MenuItem value={""}>Select Period</MenuItem>
									<MenuItem value={1}>Today</MenuItem>
									<MenuItem value={2}>Yesterday</MenuItem>
									<MenuItem value={3}>Last 3 days</MenuItem>
									<MenuItem value={4}>Last 7 days</MenuItem>
									<MenuItem value={5}>Last fortnight</MenuItem>
									<MenuItem value={6}>Last 30 days</MenuItem>
									<MenuItem
										value={7}
										onClick={(e) => props.handleStartJobPeriodChange(e, true)}
									>
										{props.showStartJob
											? getCustomFormToDate(
													props.startJobCustomDate.startJobStartDate,
													props.startJobCustomDate.startJobEndDate
											  )
											: "Custom Range"}
									</MenuItem>
								</Select>
								<StartDatePopup
									open={props.openStartJob}
									handleSubmit={props.handleStartJobCustomDateSubmit}
									handleClose={props.handleStartJobClose}
									data={props.startJobCustomDate}
									handleChange={(e, type) =>
										props.handleStartJobCustomChange(e, type)
									}
									startName="startJobStartDate"
									endName="startJobEndDate"
								/>
							</FormControl>
						</div>
						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">City</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData?.city}
									onChange={(e) => props.handleFilter(e)}
									name="city"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select city</>;
										}

										return allMenuData.cityMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select city
									</MenuItem>
									{allMenuData.cityMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.city.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>

						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">Cargo Type</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									name="cargoType"
									value={props.filterData.cargoType}
									onChange={(e) => props.handleFilter(e)}
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select CargoType</>;
										}

										return allMenuData.cargoTypeMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select CargoType
									</MenuItem>
									{allMenuData.cargoTypeMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.cargoType.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>

						<div className="form-gourp">
							<div className="label-wrapper">
								<label className="label-text">CTO</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									value={props.filterData?.cto}
									onChange={(e) => props.handleFilter(e)}
									name="cto"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									IconComponent={() => <ExpandMore />}
									disabled={!props.filterData?.city.length}
									multiple
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <> Select cto</>;
										}

										return allMenuData.ctoMenuData
											.filter((m) => selected.includes(m.value))
											.map((m) => m.label)
											.join(", ");
									}}
								>
									<MenuItem value="" disabled>
										Select cto
									</MenuItem>
									{allMenuData.ctoMenuData.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.value}
												className="custom-checkbox custom-Multicheckbox"
											>
												<Checkbox
													checked={
														props.filterData.cto.indexOf(item.value) > -1
													}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												/>
												<ListItemText primary={item.label} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>

						<div className="form-gourp filter-btn-wrapper">
							<Button
								className="primary-btn gray-border-btn"
								variant="contained"
								color="primary"
								disableElevation
								onClick={props.handleReset}
							>
								RESET
							</Button>
							<Button
								className="orange-btn primary-btn"
								variant="contained"
								color="primary"
								disableElevation
								onClick={props.handleSubmit}
							>
								APPLY
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Filter;
