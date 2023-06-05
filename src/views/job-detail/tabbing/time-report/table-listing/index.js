import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableFooter,
	Button,
	FormHelperText,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { convertMinutesToHours } from "@utils/commonFunctions";
import { TableStyle } from "./style";

function TableListing(props) {
	const classes = TableStyle();
	const [state] = useStore();
	const isGenerated = props.jobsData?.invoiceGenerated === true;
	return (
		<>
			{isGenerated &&
				"Note: You need to reject the invoice to continue editing the job run sheet."}
			<div className={classes.TableWrapper}>
				<Loader
					loading={
						state.job?.gettingJobRunsheet || state.job?.updatingJobRunsheet
					}
				/>
				<TableContainer component={Paper} className={classes.customTable}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="status">Status</TableCell>
								<TableCell className="time">Time</TableCell>
								<TableCell className="location">Location</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!props.data.length ? (
								<TableRow>
									<TableCell colSpan={4}>
										Job Runsheet Report Not Found
									</TableCell>
								</TableRow>
							) : (
								props.data?.map((item, index) => {
									console.log("====> item.time", item.time);
									return (
										<TableRow key={index}>
											<TableCell className="status">
												{item.jobRunsheetStatus ? item.jobRunsheetStatus : "-"}
											</TableCell>
											<TableCell className="time">
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
															isGenerated ||
															!["Review Completed", "Completed"].includes(
																props.jobsData?.jobStatuses?.name
															)
														}
													/>
												</MuiPickersUtilsProvider>
												<FormHelperText className="error-text">
													{item.error}
												</FormHelperText>
											</TableCell>
											<TableCell className="location">
												{item.location ? item.location : "-"}
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
						{props.data?.length !== 0 && (
							<TableFooter>
								<TableRow>
									{state?.job?.jobRunSheetData?.totalDuration ? (
										<TableCell>
											Total time:{" "}
											{state?.job?.jobRunSheetData?.totalDuration
												? convertMinutesToHours(
														state?.job?.jobRunSheetData?.totalDuration
												  )
												: "-"}
										</TableCell>
									) : (
										""
									)}
								</TableRow>
							</TableFooter>
						)}
					</Table>
				</TableContainer>
				{props.data?.length !== 0 && (
					<Button
						className="blue-btn primary-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						onClick={props.handleSubmit}
						disabled={
							props.error ||
							isGenerated ||
							!["Review Completed", "Completed"].includes(
								props.jobsData?.jobStatuses?.name
							)
						}
					>
						Save
					</Button>
				)}
			</div>
		</>
	);
}
export default TableListing;
