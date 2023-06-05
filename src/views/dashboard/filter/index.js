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
import { filterCommonStyles } from "@utils/filterCommonStyles";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { getCustomFormToDate } from "@utils/commonFunctions";
import {
	GET_JOBTYPES,
	GET_JOBTYPES_SUCCESS,
	GET_JOBTYPES_FAILURE,
	GET_CARGO_TYPE,
	GET_CARGO_TYPE_SUCCESS,
	GET_CARGO_TYPE_FAILURE,
	GET_CTOS,
	GET_CTOS_SUCCESS,
	GET_CTOS_FAILURE,
	GET_CITIES,
	GET_CITIES_SUCCESS,
	GET_CITIES_FAILURE,
	FETCH_CUSTOMERS,
	FETCH_CUSTOMERS_SUCCESS,
	FETCH_CUSTOMERS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Popup from "./popup";

function Filter(props) {
	const classes = filterCommonStyles();
	const materilClasses = materialCommonStyles();
	const [state, dispatch] = useStore();
	const [allMenuData, setAllMenuData] = useState({
		jobTypeMenuData: [],
		cargoTypeMenuData: [],
		customerMenuData: [],
		cityMenuData: [],
		ctoMenuData: [],
	});

	const handleSetMenuData = (stateName, name) => {
		const arr = [];
		stateName?.map((item) => {
			arr.push({
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
		handleSetMenuData(state?.common?.jobTypeData, "jobTypeMenuData");
		handleSetMenuData(state?.common?.cargoTypeData, "cargoTypeMenuData");
		handleSetMenuData(state?.customer?.customers?.rows, "customerMenuData");
		handleSetMenuData(state?.common?.citiesData, "cityMenuData");
		handleSetMenuData(state?.common?.ctosData, "ctoMenuData");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		state?.common?.jobTypeData,
		state?.common?.cargoTypeData,
		state?.customer?.customers?.rows,
		state?.common?.citiesData,
		state?.common?.ctosData,
	]);

	useEffect(() => {
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
		if (state?.customer?.customers === null) {
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
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Display customer drop down on basis of city https://wymap.atlassian.net/browse/MAPTRAK-870
		if (props.filterData?.city.length) {
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

	return (
		<div className={classes.filterWrapper}>
			<div className="inner-white-box filter-wrapper">
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
								<label className="label-text">Job Type</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
									labelId="type-of-job-label"
									id="type-of-job-id"
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
											return <> Select Job type</>;
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
								<label className="label-text">Reporting period</label>
							</div>
							<FormControl variant="outlined" className={classes.formControl}>
								<Select
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
								/>
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

						<div className="form-gourp reset-column">
							<div className="reset-wrapper">
								<Button
									className="primary-btn blue-btn"
									variant="contained"
									color="primary"
									disableElevation
									onClick={props.handleReset}
								>
									Reset
								</Button>
							</div>
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
