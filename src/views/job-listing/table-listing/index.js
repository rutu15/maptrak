import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Paper,
	TableSortLabel,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import Loader from "@components/loader";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import {
	dashboardRequestStatusColors,
	jobListingRequestStyle,
	getPermissions,
	utcToTimezone,
} from "@utils/commonFunctions";
import { dashboardListingHeader, routes } from "@utils/constant";
import {
	ASSIGN_DRIVER,
	ASSIGN_DRIVER_SUCCESS,
	ASSIGN_DRIVER_FAILURE,
	RE_ASSIGN_DRIVER,
	RE_ASSIGN_DRIVER_SUCCESS,
	RE_ASSIGN_DRIVER_FAILURE,
	RE_ASSIGN_CHANGE_DRIVER,
	RE_ASSIGN_CHANGE_DRIVER_SUCCESS,
	RE_ASSIGN_CHANGE_DRIVER_FAILURE,
	FETCH_DRIVERS,
	FETCH_DRIVERS_SUCCESS,
	FETCH_DRIVERS_FAILURE,
	CHANGE_DRIVER,
	CHANGE_DRIVER_SUCCESS,
	CHANGE_DRIVER_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import AssignDriverPopup from "../assignDriverPopup";
import { TableStyle } from "./style";

function TableListing(props) {
	const classes = TableStyle();
	const [state] = useStore();
	const [openDriverPopup, setOpenDriverPopup] = useState(false);
	const [jobId, setJobId] = useState("");
	const [error, setError] = useState("");
	const [type, setType] = useState("");
	const [status, setStatus] = useState("");
	const [truckId, setTruckId] = useState("");
	const [cityId, setCityId] = useState("");
	const [, dispatch] = useStore();
	const isPermission =
		getPermissions() && getPermissions().includes("jobReview");

	const getDriver = () => {
		dispatch({ type: FETCH_DRIVERS });
		API.get("drivers", {
			params: {
				order: "ASC",
				orderBy: "driverName",
				filter: {
					active: true,
					cityId: cityId ? cityId : undefined,
				},
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
	};

	useEffect(() => {
		if (openDriverPopup) {
			getDriver();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cityId, openDriverPopup]);

	// API calling to assign and reassign driver depending on status
	const assignDriverFormik = useFormik({
		initialValues: schema.assignDriverSchema,
		validationSchema: validationSchema.assignDriverValidationSchema,
		onSubmit: (value) => {
			if (type === "Assign") {
				dispatch({ type: ASSIGN_DRIVER });
				API.put(`jobs/${jobId}/assignDriver`, { driverId: value.assignDriver })
					.then((response) => {
						dispatch({
							type: ASSIGN_DRIVER_SUCCESS,
							payload: response.data.data,
						});
						handleAssignDriverPopupClose();
						toast.success("Driver Assigned Successfully");
						props.getJobs();
					})
					.catch((error) => {
						dispatch({ type: ASSIGN_DRIVER_FAILURE, payload: error });
						setError(error.response.data.message);
					});
			} else {
				if (["Rejected", "Assigned"].includes(status)) {
					dispatch({ type: RE_ASSIGN_DRIVER });
					API.put(`jobs/${jobId}/reassignJob`, { driverId: value.assignDriver })
						.then((response) => {
							dispatch({
								type: RE_ASSIGN_DRIVER_SUCCESS,
								payload: response.data.data,
							});
							handleAssignDriverPopupClose();
							toast.success("Driver Re-Assigned Successfully");
							props.getJobs();
						})
						.catch((error) => {
							dispatch({ type: RE_ASSIGN_DRIVER_FAILURE, payload: error });
							setError(error.response.data.message);
						});
				} else {
					if (
						["In Transit", "Lodgement", "Loading", "Unloading"].includes(status)
					) {
						dispatch({ type: CHANGE_DRIVER });
						API.put(`jobs/${jobId}/modifyDriver`, {
							newDriverId: value.assignDriver,
						})
							.then((response) => {
								dispatch({
									type: CHANGE_DRIVER_SUCCESS,
									payload: response.data.data,
								});
								handleAssignDriverPopupClose();
								toast.success("Driver Re-Assigned Successfully");
								props.getJobs();
							})
							.catch((error) => {
								dispatch({
									type: CHANGE_DRIVER_FAILURE,
									payload: error,
								});
								setError(error.response.data.message);
							});
					} else {
						dispatch({ type: RE_ASSIGN_CHANGE_DRIVER });
						API.put(`jobs/${jobId}/changeDriver`, {
							driverId: value.assignDriver,
							truckId: truckId,
						})
							.then((response) => {
								dispatch({
									type: RE_ASSIGN_CHANGE_DRIVER_SUCCESS,
									payload: response.data.data,
								});
								handleAssignDriverPopupClose();
								toast.success("Driver Re-Assigned Successfully");
								props.getJobs();
							})
							.catch((error) => {
								dispatch({
									type: RE_ASSIGN_CHANGE_DRIVER_FAILURE,
									payload: error,
								});
								setError(error.response.data.message);
							});
					}
				}
			}
		},
	});

	const handleDriverPoppupOpen = (type, id, status, truck, city) => {
		setJobId(id);
		setOpenDriverPopup(true);
		setType(type);
		setStatus(status);
		setTruckId(truck);
		setCityId(city);
	};

	const handleAssignDriverPopupClose = () => {
		setOpenDriverPopup(false);
		assignDriverFormik.handleReset();
		setError("");
	};
	const isCompleted = state.job.jobsData?.rows?.map((item) => {
		return item.jobStatuses && item.jobStatuses.name;
	});
	return (
		<>
			<div className={classes.TableWrapper}>
				<Loader loading={state.job?.loadingJobs || state.job?.reviewingJobs} />
				<TableContainer component={Paper} className={classes.customTable}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								{isPermission &&
								isCompleted &&
								isCompleted.includes("Completed") ? (
									<TableCell className="check">
										<FormControlLabel
											className="custom-checkbox"
											control={
												<Checkbox
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={
														<img src={checkedIconOrange} alt="CheckBox" />
													}
													onChange={(e) => props.handleMainChange(e)}
													checked={props._maincheck}
													name="check"
												/>
											}
										/>
									</TableCell>
								) : (
									<TableCell className="check"></TableCell>
								)}
								{dashboardListingHeader.map((item, index) => {
									return (
										<TableCell key={index} className={item.className}>
											{item.title}
											{item.sort && (
												<TableSortLabel
													direction={
														props.orderBy === item.sortTitle
															? props.order
															: "desc"
													}
													active={true}
													onClick={(e) => props.handleSorting(e, item)}
												></TableSortLabel>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{state.job?.jobsData?.count === 0 ? (
								<TableRow className="no-data">
									<TableCell colSpan={7}>
										<span>No Data Found</span>
									</TableCell>
								</TableRow>
							) : (
								state.job.jobsData?.rows?.map((row, index) => {
									return (
										<TableRow key={index}>
											{isPermission &&
											row.jobStatuses &&
											row.jobStatuses.name === "Completed" ? (
												<TableCell className="check">
													<FormControlLabel
														className="custom-checkbox"
														control={
															<Checkbox
																icon={
																	<img src={uncheckedIcon} alt="CheckBox" />
																}
																checkedIcon={
																	<img src={checkedIconOrange} alt="CheckBox" />
																}
																onChange={(e) => props.handleChange(row, e)}
																checked={
																	state.job.jobsData?.rows[index][
																		"_rowChecked"
																	] === true
																}
																name="check"
															/>
														}
													/>
												</TableCell>
											) : (
												<TableCell></TableCell>
											)}
											<TableCell className="jobId">
												<Link
													to={{
														pathname: `${routes.jobDetail}/${row.id}`,
														state: row,
													}}
													target="_blank"
												>
													{row.id ? row.id : "-"}
												</Link>
											</TableCell>
											{/* Added city column https://wymap.atlassian.net/browse/MAPTRAK-856 */}
											<TableCell>{row?.cities?.name || "-"}</TableCell>
											<TableCell
												className={`driver ${jobListingRequestStyle(
													row.jobStatuses &&
														row.jobStatuses?.name === "Not Assigned"
														? "Assign Driver"
														: row.jobStatuses?.name === "Rejected" ||
														  "Change Driver"
														? "Re-Assign"
														: ""
												)}`}
											>
												{row.drivers?.name ? (
													row.jobStatuses?.name === "Rejected" ? (
														<Button
															color="primary"
															className="primary-btn"
															onClick={() =>
																handleDriverPoppupOpen(
																	"ReAssign",
																	row.id,
																	row.jobStatuses?.name,
																	row.trucks?.id,
																	row.cities.id
																)
															}
														>
															Re-Assign driver
														</Button>
													) : row.jobStatuses?.name === "Change Driver" ? (
														<span
															className="re-assign-link"
															onClick={() =>
																handleDriverPoppupOpen(
																	"ReAssign",
																	row.id,
																	row.jobStatuses?.name,
																	row.trucks?.id,
																	row.cities.id
																)
															}
														>
															{row.drivers?.name}
														</span>
													) : [
															"Assigned",
															"In Transit",
															"Lodgement",
															"Loading",
															"Unloading",
													  ].includes(row.jobStatuses?.name) ? (
														<span
															className="re-assign-link"
															onClick={() =>
																handleDriverPoppupOpen(
																	"ReAssign",
																	row.id,
																	row.jobStatuses?.name,
																	row.trucks?.id,
																	row.cities.id
																)
															}
														>
															{row.drivers?.name}
														</span>
													) : (
														row.drivers?.name
													)
												) : row.jobStatuses?.name === "Not Assigned" ? (
													<Button
														color="primary"
														className="primary-btn"
														onClick={() =>
															handleDriverPoppupOpen(
																"Assign",
																row.id,
																"",
																"",
																row.cities.id
															)
														}
													>
														Assign driver
													</Button>
												) : (
													<Button
														color="primary"
														className="primary-btn"
														onClick={() =>
															handleDriverPoppupOpen(
																"ReAssign",
																row.id,
																row.jobStatuses?.name,
																row.trucks?.id,
																row.cities.id
															)
														}
													>
														Re-Assign driver
													</Button>
												)}
											</TableCell>
											<TableCell className="truck-rego">
												{row.trucks ? row.trucks.rego : "-"}
											</TableCell>
											<TableCell
												className={`status ${dashboardRequestStatusColors(
													row.jobStatuses ? row.jobStatuses.name : ""
												)}`}
											>
												<span>
													{row.jobStatuses ? row.jobStatuses.name : "-"}
												</span>
											</TableCell>

											<TableCell className="customerName">
												{row.customers ? row.customers.name : "-"}
											</TableCell>
											<TableCell className="cto">
												{row.ctos ? row.ctos.name : "-"}
											</TableCell>
											<TableCell className="jobType">
												{row.jobTypes ? row.jobTypes.name : "-"}
											</TableCell>
											<TableCell className="cargoType">
												{row.cargoTypes ? row.cargoTypes.name : "-"}
											</TableCell>
											<TableCell className="date">
												{row.createdAt
													? utcToTimezone(
															row.createdAt,
															row.cities?.timezone,
															"DD/MM/YYYY"
													  )
													: "-"}
											</TableCell>
											<TableCell className="completion-date">
												{row.completedAt
													? utcToTimezone(
															row.completedAt,
															row.cities?.timezone,
															"DD/MM/YYYY"
													  )
													: "-"}
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
					<AssignDriverPopup
						handleClose={handleAssignDriverPopupClose}
						open={openDriverPopup}
						formik={assignDriverFormik}
						error={error}
						type={type}
					/>
				</TableContainer>
				{state.job?.jobsData?.count !== 0 && (
					<div className="pagination-wrapper">
						<Pagination
							count={state.job?.jobsData?.count}
							page={props.page}
							handleChangePage={props.handleChangePage}
							rowsPerPage={props.rowsPerPage}
							handleChangeRowsPerPage={props.handleChangeRowsPerPage}
						/>
					</div>
				)}
			</div>
		</>
	);
}
export default TableListing;
