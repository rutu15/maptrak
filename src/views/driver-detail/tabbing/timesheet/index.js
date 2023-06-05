import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography, FormControl, Button } from "@material-ui/core";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment-timezone";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { routes } from "@utils/constant";
import { utcToLocal, utcToLocalTime } from "@utils/commonFunctions";
import {
	FETCH_DRIVER_TIMESHEET,
	FETCH_DRIVER_TIMESHEET_SUCCESS,
	FETCH_DRIVER_TIMESHEET_FAILURE,
	FETCH_NOT_APPROVED_DRIVER_TIMESHEET,
	FETCH_NOT_APPROVED_DRIVER_TIMESHEET_SUCCESS,
	FETCH_NOT_APPROVED_DRIVER_TIMESHEET_FAILURE,
	APPROVE_DRIVER_TIMESHEET,
	APPROVE_DRIVER_TIMESHEET_SUCCESS,
	APPROVE_DRIVER_TIMESHEET_FAILURE,
	DOWNLOAD_DRIVER_TIMESHEET,
	DOWNLOAD_DRIVER_TIMESHEET_SUCCESS,
	DOWNLOAD_DRIVER_TIMESHEET_FAILURE,
	FETCH_TIMESHEET_LIST,
	FETCH_TIMESHEET_LIST_SUCCESS,
	FETCH_TIMESHEET_LIST_FAILURE,
	UPDATE_DRIVER_TIMESHEET,
	UPDATE_DRIVER_TIMESHEET_SUCCESS,
	UPDATE_DRIVER_TIMESHEET_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import DriveMapDisplay from "./map/driver";
import JobMapDisplay from "./map/job";
import Popup from "./popup";
import EditPopup from "./edit-popup";
import ImagesPopup from "./images-popup";
import { TimesheetStyle } from "./style";

function Timesheet() {
	const classes = TimesheetStyle();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openImages, setOpenImages] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [state, dispatch] = useStore();
	const { id } = useParams();

	// API calling to get list of driver timesheet
	const getDriverTimeSheet = () => {
		dispatch({ type: FETCH_DRIVER_TIMESHEET });
		API.get(`drivers/${id}/dailyTimesheetReport`, {
			params: {
				date: moment(selectedDate).format("YYYY-MM-DD"),
			},
		})
			.then((response) => {
				dispatch({
					type: FETCH_DRIVER_TIMESHEET_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_DRIVER_TIMESHEET_FAILURE, payload: error });
				toast.error(error?.response?.data?.message);
			});
	};

	// API calling to get date of not approved timesheet
	const getNotApprovedTimesheet = () => {
		dispatch({ type: FETCH_NOT_APPROVED_DRIVER_TIMESHEET });
		API.get(`drivers/${id}/notApprovedTimesheets`)
			.then((response) => {
				dispatch({
					type: FETCH_NOT_APPROVED_DRIVER_TIMESHEET_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_NOT_APPROVED_DRIVER_TIMESHEET_FAILURE,
					payload: error,
				});
				toast.error(error?.response?.data?.message);
			});
	};

	useEffect(() => {
		getDriverTimeSheet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate]);

	useEffect(() => {
		if (open) {
			getNotApprovedTimesheet();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenImages = () => {
		setOpenImages(true);
	};

	const handleCloseImages = () => {
		setOpenImages(false);
	};

	const handleEditOpen = () => {
		let temp = [];
		setOpenEdit(true);
		dispatch({ type: FETCH_TIMESHEET_LIST });
		API.get(`drivers/${id}/dailyTimesheetStatuses`, {
			params: {
				date: moment(selectedDate).format("YYYY-MM-DD"),
			},
		})
			.then((response) => {
				dispatch({
					type: FETCH_TIMESHEET_LIST_SUCCESS,
					payload: response.data.data,
				});
				temp = response?.data?.data?.dailyTimesheetReport?.map((item) => {
					return {
						...item,
						time: utcToLocalTime(
							item.time,
							response?.data?.data?.timezone,
							"YYYY-MM-DD HH:mm:ss"
						),
						timezone: response.data.data?.timezone,
					};
				});
				setData(temp);
			})
			.catch((error) => {
				dispatch({ type: FETCH_TIMESHEET_LIST_FAILURE, payload: error });
				toast.error(error?.response?.data?.message);
			});
	};

	// Update and logic for validation
	const handleChange = (event, id) => {
		const newArray = [...data];
		const time = moment(event).format("YYYY/MM/DD HH:mm:ss");
		newArray[id] = {
			...newArray[id],
			time: time,
		};

		const getTime = (id) => {
			return moment(newArray[id].time).toDate();
		};
		if (id === 0) {
			if (getTime(id) > getTime(id + 1)) {
				newArray[id].error = "Invalid Time";
				setError(true);
			} else {
				newArray[id].error = "";
				setError(false);
			}
		} else if (id === newArray.length - 1) {
			if (getTime(id) < getTime(id - 1)) {
				newArray[id].error = "Invalid Time";
				setError(true);
			} else {
				setError(false);
				newArray[id].error = "";
			}
		} else if (getTime(id) > getTime(id + 1) || getTime(id) < getTime(id - 1)) {
			newArray[id - 1].error = "";
			newArray[id].error = "Invalid Time";
			setError(true);
		} else {
			setError(false);
			newArray[id].error = "";
		}
		setData(newArray);
	};

	// API calling to update runsheet
	const handleSubmit = () => {
		let temp = [];
		temp = data.map((item) => {
			const time = moment(item.time).format("YYYY-MM-DD HH:mm:ss");
			return {
				id: item.id,
				driverDailyTimesheetStatusCode: item.driverDailyTimesheetStatuses?.code,
				time: moment.tz(time, item.timezone),
			};
		});
		dispatch({ type: UPDATE_DRIVER_TIMESHEET });
		API.put(
			`drivers/${id}/dailyTimeSheetReport`,
			{ data: temp },
			{
				params: {
					date: moment(selectedDate).format("YYYY-MM-DD"),
				},
			}
		)
			.then(() => {
				dispatch({
					type: UPDATE_DRIVER_TIMESHEET_SUCCESS,
				});
				getDriverTimeSheet();
				handleEditClose();
				toast.success("Driver TimeSheet Updated Successfully");
			})
			.catch((error) => {
				dispatch({ type: UPDATE_DRIVER_TIMESHEET_FAILURE });
				toast.error(error?.response?.data?.message);
			});
	};

	const handleEditClose = () => {
		setOpenEdit(false);
		setError("");
	};
	const handleViewDate = (date) => {
		setOpen(false);
		setSelectedDate(date);
	};

	// API calling to approve timesheet
	const handleApprove = () => {
		dispatch({ type: APPROVE_DRIVER_TIMESHEET });
		API.put(`drivers/${id}/approveTimesheet`, null, {
			params: {
				date: moment(selectedDate).format("YYYY-MM-DD"),
			},
		})
			.then(() => {
				dispatch({
					type: APPROVE_DRIVER_TIMESHEET_SUCCESS,
				});
				toast.success("Timesheet Approved Successfully");
				getDriverTimeSheet();
			})
			.catch((error) => {
				dispatch({ type: APPROVE_DRIVER_TIMESHEET_FAILURE });
				toast.error(error?.response?.data?.message);
			});
	};

	// API calling to download timesheet
	const handleDownload = () => {
		dispatch({ type: DOWNLOAD_DRIVER_TIMESHEET });
		API.get(`drivers/${id}/downloadDailyTimesheetReport`, {
			params: {
				date: moment(selectedDate).format("YYYY-MM-DD"),
			},
		})
			.then((response) => {
				dispatch({
					type: DOWNLOAD_DRIVER_TIMESHEET_SUCCESS,
				});
				window.open(response.data.data, "_blank");
			})
			.catch((error) => {
				dispatch({ type: DOWNLOAD_DRIVER_TIMESHEET_FAILURE });
				toast.error(error?.response?.data?.message);
			});
	};
	return (
		<div className={classes.TimesheetWrapper}>
			<Loader
				loading={
					state?.driver?.loadingDriverTimesheet ||
					state?.driver?.approvingTimeSheet ||
					state?.driver?.downloadingTimeSheet
				}
			/>
			<div className="dateWrapper">
				<FormControl variant="outlined" className={classes.formControl}>
					<div className="date-wrapper">
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
							<KeyboardDatePicker
								variant="inline"
								format="dd/MM/yyyy"
								className="custom-datepicker"
								keyboardIcon={<img src={calendarIcon} alt="calendar" />}
								name="to"
								placeholder="DD/MM/YYYY"
								autoOk
								value={selectedDate}
								onChange={handleDateChange}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="btn-wrapper">
						<Button
							className="primary-btn orange-btn"
							color="inherit"
							disableElevation
							onClick={handleOpen}
						>
							Not Approved Timesheets
						</Button>

						<Button
							className="primary-btn orange-btn"
							color="inherit"
							disableElevation
							onClick={handleApprove}
						>
							{state?.driver?.driverTimeSheetData?.timesheetStatus
								? "Re-Approve"
								: "Approve"}
						</Button>
					</div>
				</FormControl>
			</div>
			<div className="dateWrapper">
				<FormControl variant="outlined" className={classes.formControl}>
					{state?.driver?.driverTimeSheetData?.dailyTimesheetReport?.length !==
						0 && (
						<div className="btn-wrapper">
							<Button
								className="primary-btn orange-btn"
								color="inherit"
								disableElevation
								onClick={handleEditOpen}
							>
								Edit
							</Button>

							<Button
								className="primary-btn orange-btn"
								color="inherit"
								disableElevation
								onClick={handleDownload}
							>
								Download PDF
							</Button>

							<Button
								className="primary-btn orange-btn"
								color="inherit"
								disableElevation
								onClick={handleOpenImages}
							>
								VIEW PHOTOS
							</Button>
						</div>
					)}
				</FormControl>
			</div>

			<div className={classes.timeCardWrapper}>
				<div className="custom-card">
					<div className="card-body">
						<div>
							<div className="total-time">
								<span>
									<div className="total-time">
										{Math.floor(
											state?.driver?.driverTimeSheetData?.workTime / 60
										) > 0 &&
											`${Math.floor(
												state?.driver?.driverTimeSheetData?.workTime / 60
											)}hr `}
										{state?.driver?.driverTimeSheetData?.workTime
											? `${Math.floor(
													state?.driver?.driverTimeSheetData?.workTime % 60
											  )}min`
											: "0min"}
									</div>
								</span>
							</div>
							<span className="heading-title">Total Work Time</span>
						</div>
						<div>
							<div className="total-time">
								{Math.floor(
									state?.driver?.driverTimeSheetData?.breakTime / 60
								) > 0 &&
									`${Math.floor(
										state?.driver?.driverTimeSheetData?.breakTime / 60
									)} hr`}{" "}
								{state?.driver?.driverTimeSheetData?.breakTime
									? `${Math.floor(
											state?.driver?.driverTimeSheetData?.breakTime % 60
									  )}min`
									: "0min"}
							</div>
							<span className="heading-title">Total Break Time</span>
						</div>
					</div>
				</div>
			</div>

			{state?.driver?.driverTimeSheetData?.dailyTimesheetReport?.length ? (
				state?.driver?.driverTimeSheetData?.dailyTimesheetReport?.map(
					(item, index) => {
						return item.type === "Job" ? (
							<div className={classes.customCardWrapper} key={index}>
								<div className="map-wrapper">
									<JobMapDisplay
										type="job"
										reportStatus={item?.jobRunsheetReport}
										index={index}
									/>
								</div>
								<div className="custom-card">
									<div className="card-header">
										<span className="heading-title">
											{item.customer}{" "}
											<span className="deleted-title">
												{item.isDeleted && "(Deleted)"}
											</span>
											<em>
												Job:{" "}
												<Link to={`${routes.jobDetail}/${item.jobId}`}>
													{item.jobId}
												</Link>
											</em>
										</span>
										<div className="total-time">
											<span>{`${utcToLocal(
												item.startTime,
												state?.driver?.driverTimeSheetData?.timezone,
												"DD/MM/yyyy hh:mm a"
											)} - ${utcToLocal(
												item.endTime,
												state?.driver?.driverTimeSheetData?.timezone,
												"DD/MM/yyyy hh:mm a"
											)}`}</span>
										</div>
									</div>
									<div className="card-body">
										<ul>
											{item?.jobRunsheetReport?.map((val, key) => {
												return (
													<li key={key}>
														<Typography variant="h6">
															{val.jobRunsheetStatus}
														</Typography>
														<div className="value-block">
															<p>
																{val.jobRunsheetStatus === "Break:"
																	? `${
																			val.startTime !== null
																				? utcToLocal(
																						val.startTime,
																						state?.driver?.driverTimeSheetData
																							?.timezone,
																						"hh:mm a"
																				  )
																				: ""
																	  }  ${
																			val.endTime !== null
																				? "- " +
																				  utcToLocal(
																						val.endTime,
																						state?.driver?.driverTimeSheetData
																							?.timezone,
																						"hh:mm a"
																				  )
																				: ""
																	  }`
																	: val.time &&
																	  utcToLocal(
																			val.time,
																			state?.driver?.driverTimeSheetData
																				?.timezone,
																			"hh:mm a"
																	  )}
															</p>
														</div>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
						) : (
							<div className={classes.customCardWrapper} key={index}>
								<div className="map-wrapper">
									<DriveMapDisplay
										type="driver"
										latitude={item.latitude}
										longitude={item.longitude}
										index={index}
									/>
								</div>
								<div className="custom-card">
									<div className="card-header">
										<span className="heading-title">
											{`${item?.jobRunsheetStatus}${
												!!item?.nonJobRelatedActivity
													? ` (${item?.nonJobRelatedActivity})`
													: ""
											}` || "-"}
										</span>
										<div className="total-time">
											<span>{`${
												item.startTime !== null
													? utcToLocal(
															item.startTime,
															state?.driver?.driverTimeSheetData?.timezone,
															"DD/MM/yyyy hh:mm a"
													  )
													: ""
											}  ${
												item.hasOwnProperty("endTime") && item.endTime !== null
													? "- " +
													  utcToLocal(
															item.endTime,
															state?.driver?.driverTimeSheetData?.timezone,
															"DD/MM/yyyy hh:mm a"
													  )
													: ""
											}`}</span>
										</div>
									</div>
								</div>
							</div>
						);
					}
				)
			) : (
				<div className={classes.customCardWrapper}>No Data Found</div>
			)}
			<Popup
				open={open}
				handleClose={handleClose}
				handleViewDate={handleViewDate}
			/>
			<ImagesPopup open={openImages} handleClose={handleCloseImages} />
			<EditPopup
				open={openEdit}
				handleClose={handleEditClose}
				data={data}
				handleChange={handleChange}
				handleSubmit={() => handleSubmit()}
				error={error}
			/>
		</div>
	);
}
export default Timesheet;
