import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	FormHelperText,
	Button,
	TableFooter,
	CircularProgress,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
	const classes = AddPopupStyle();
	const [scroll] = useState("body");
	const [state] = useStore();

	return (
		<>
			<Dialog open={props.open} className={classes.customModal} scroll={scroll}>
				<div className="close-modal">
					<img src={closeIcon} alt="Close" onClick={props.handleClose} />
				</div>
				<DialogTitle>Update Timesheet</DialogTitle>
				<div className={classes.TableWrapper}>
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className="date">Status</TableCell>
									<TableCell className="action">Time</TableCell>
									<TableCell className="action">Location</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props?.data?.map((item, index) => {
									return (
										<TableRow key={index}>
											<TableCell className="date">
												{`${item?.jobRunsheetStatus}${
													!!item?.nonJobRelatedActivity
														? ` (${item?.nonJobRelatedActivity})`
														: ""
												}` || "-"}
											</TableCell>
											<TableCell className="action">
												<MuiPickersUtilsProvider
													utils={DateFnsUtils}
													locale={enAU}
												>
													<KeyboardDateTimePicker
														key={item.id}
														variant="inline"
														ampm={false}
														format="dd/MM/yyyy HH:mm:ss"
														className="custom-datepicker"
														keyboardIcon={
															<img src={calendarIcon} alt="calendar" />
														}
														value={item.time}
														name="time"
														onChange={(e) => props.handleChange(e, index)}
														autoOk
														disabled={
															!["SIGN_IN", "SIGN_OUT"].includes(
																item?.driverDailyTimesheetStatuses?.code
															)
														}
													/>
												</MuiPickersUtilsProvider>
												<FormHelperText className="error-text">
													{item.error}
												</FormHelperText>
											</TableCell>
											<TableCell className="action">
												{item.location || "-"}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={3}>
										<Button
											className="primary-btn orange-btn"
											color="inherit"
											disableElevation
											onClick={props.handleSubmit}
											disabled={props.error || state?.driver?.updatingTimeSheet}
										>
											{state?.driver?.updatingTimeSheet ? (
												<CircularProgress color="inherit" />
											) : (
												"Save"
											)}
										</Button>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</div>
			</Dialog>
		</>
	);
}
export default Popup;
