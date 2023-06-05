import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import cx from "classnames";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import {
	// UPDATE_PER_JOB,
	UPDATE_PER_JOB_SUCCESS,
	UPDATE_PER_JOB_FAILURE,
	ISENABLE_PER_JOB,
	ISENABLE_PER_JOB_SUCCESS,
	ISENABLE_PER_JOB_FAILURE,
	// ISENABLE_ULD_PER_JOB,
	ISENABLE_ULD_PER_JOB_SUCCESS,
	ISENABLE_ULD_PER_JOB_FAILURE,
} from "@utils/actionTypes";

import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import Popup from "./popup";
import { TableStyle } from "./style";

function PerJob(props) {
	const classes = TableStyle();
	const [buttonLoading, setButtonLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [week, setWeek] = useState({});
	const [jobTypes, setJobTypes] = useState("");
	const [truckTypes, setTruckTypes] = useState("");
	const [state, dispatch] = useStore();
	const [data] = useState(state?.customer?.perJobData);
	const { id } = useParams();

	const handleClickOpen = (val, i, type) => {
		setJobTypes(type);
		setTruckTypes("");
		setWeek(val);
		setOpen(true);
	};

	const handleClickOpen1 = (val, i, row, truckType) => {
		setJobTypes(row.jobTypes.name);
		setTruckTypes(truckType);
		setWeek(val);
		setOpen(true);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: week,
		validationSchema: validationSchema.perJobValidationSchema,
		onSubmit: (value) => {
			const data = {
				...value,
			};
			delete data.id;
			delete data.jobTypes;
			delete data.uldHourlyPriceMatrix;
			delete data.isEnable;

			const newData = {};
			for (let key in data) {
				newData[key] = Number(data[key]);
			}
			if (value.jobTypes) {
				setButtonLoading(true);
				// dispatch({ type: UPDATE_PER_JOB });
				API.put(`customers/${id}/perJobPriceMatrix/${value.id}`, newData)
					.then((response) => {
						dispatch({
							type: UPDATE_PER_JOB_SUCCESS,
							payload: response.data.data,
						});
						setButtonLoading(false);
						props.getPerJob();
						handleClose();
						toast.success("Pricing Updated Successfully");
					})
					.catch((error) => {
						setButtonLoading(false);
						dispatch({ type: UPDATE_PER_JOB_FAILURE, payload: error });
						toast.error(error?.response?.data?.message);
					});
			} else {
				delete newData.truckTypes;
				setButtonLoading(true);
				// dispatch({ type: ISENABLE_ULD_PER_JOB });
				API.put(`customers/${id}/uldHourlyPriceMatrix/${value.id}`, newData)
					.then((response) => {
						dispatch({
							type: ISENABLE_ULD_PER_JOB_SUCCESS,
							payload: response.data.data,
						});
						setButtonLoading(false);
						props.getPerJob();
						handleClose();
						toast.success("Pricing Updated Successfully");
					})
					.catch((error) => {
						setButtonLoading(false);
						dispatch({ type: ISENABLE_ULD_PER_JOB_FAILURE, payload: error });
						toast.error(error?.response?.data?.message);
					});
			}
		},
	});
	const handleClose = () => {
		setOpen(false);
		formik.handleReset();
	};

	const handleIsEnable = (e, index, r_id) => {
		data[index].isEnable = e.target.checked;
		dispatch({ type: ISENABLE_PER_JOB });
		API.put(`customers/${id}/perJobPriceMatrix/${r_id}/isEnable`, {
			isEnable: e.target.checked === true ? 1 : 0,
		})
			.then(() => {
				dispatch({
					type: ISENABLE_PER_JOB_SUCCESS,
				});
				props.getPerJob();
				handleClose();
			})
			.catch(() => {
				dispatch({ type: ISENABLE_PER_JOB_FAILURE });
			});
	};

	const handleIsEnableUld = (e, index, r_id) => {
		// data[index].uldHourlyPriceMatrix[0].isEnable = e.target.checked;
		dispatch({ type: ISENABLE_PER_JOB });
		API.put(`customers/${id}/uldHourlyPriceMatrix/${r_id}/isEnable`, {
			isEnable: e.target.checked === true ? 1 : 0,
		})
			.then(() => {
				dispatch({
					type: ISENABLE_PER_JOB_SUCCESS,
				});
				props.getPerJob();
				handleClose();
			})
			.catch(() => {
				dispatch({ type: ISENABLE_PER_JOB_FAILURE });
			});
	};

	return (
		<>
			<div className={cx(classes.minimumHours, classes.dailyMinimumHours)}>
				<div className={classes.TableWrapper}>
					<Loader loading={state?.customer?.loadingPerJob} />
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className="jobType">Job Type</TableCell>
									<TableCell className="action">Per Job</TableCell>
									<TableCell className="pricing">Per Job Pricing</TableCell>
									<TableCell className="savePricing">Action</TableCell>
									<TableCell className="jobType">ULD hourly Charges?</TableCell>
									<TableCell className="jobType">Truck Type</TableCell>
									<TableCell className="pricing">ULD Hourly Pricing</TableCell>
									<TableCell className="savePricing">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map((row, index) => (
									<>
										<TableRow key={index}>
											<TableCell className="jobType">
												{row.jobTypes?.name || "-"}
											</TableCell>
											<TableCell className="action">
												<FormControl
													component="fieldset"
													className="check-wrapper"
												>
													<FormGroup
														aria-label="position"
														className="custom-checkbox"
													>
														<FormControlLabel
															value="end"
															control={
																<Checkbox
																	icon={
																		<img src={uncheckedIcon} alt="CheckBox" />
																	}
																	checkedIcon={
																		<img src={checkedIcon} alt="CheckBox" />
																	}
																	value={row?.isEnable}
																	checked={row?.isEnable}
																	onChange={(e) =>
																		handleIsEnable(e, index, row.id)
																	}
																/>
															}
															labelPlacement="end"
														/>
													</FormGroup>
												</FormControl>
											</TableCell>
											<TableCell className="pricing">
												{" "}
												{`WD: $${row.weekdayCharge}; Sat: $${row.saturdayCharge}; Sun: $${row.sundayCharge}; PH1: $${row.publicHoliday1Charge}; PH2: $${row.publicHoliday2Charge}; `}
											</TableCell>
											<TableCell className="savePricing">
												<span
													onClick={() =>
														handleClickOpen(row, index, row.jobTypes.name)
													}
												>
													Edit Pricing
												</span>
											</TableCell>
											{row.jobTypes.name === "Import" ||
											row.jobTypes.name === "Export" ||
											row.jobTypes.name === "Temp Control" ||
											row.jobTypes.name === "Empty" ? (
												<TableCell className="action">
													<FormControl
														component="fieldset"
														className="check-wrapper"
													>
														<FormGroup
															aria-label="position"
															className="custom-checkbox"
														>
															<FormControlLabel
																value="end"
																control={
																	<Checkbox
																		icon={
																			<img src={uncheckedIcon} alt="CheckBox" />
																		}
																		checkedIcon={
																			<img src={checkedIcon} alt="CheckBox" />
																		}
																		value={
																			row?.uldHourlyPriceMatrix[0]?.isEnable
																				? row?.uldHourlyPriceMatrix[0]?.isEnable
																				: false
																		}
																		checked={
																			row?.uldHourlyPriceMatrix[0]?.isEnable
																				? row?.uldHourlyPriceMatrix[0]?.isEnable
																				: false
																		}
																		onChange={(e) =>
																			handleIsEnableUld(e, index, row.id)
																		}
																	/>
																}
																labelPlacement="end"
															/>
														</FormGroup>
													</FormControl>
												</TableCell>
											) : (
												<TableCell>{"_"}</TableCell>
											)}
											{row.uldHourlyPriceMatrix.length > 0 &&
											row.uldHourlyPriceMatrix[0].isEnable ? (
												<TableCell className="jobType">
													{row.uldHourlyPriceMatrix[0].truckTypes.name || "-"}
												</TableCell>
											) : (
												<TableCell className="jobType">{"_"}</TableCell>
											)}
											{row.uldHourlyPriceMatrix.length > 0 &&
											row.uldHourlyPriceMatrix[0].isEnable ? (
												<TableCell className="pricing">
													{" "}
													{`WD: $${
														row.uldHourlyPriceMatrix[0].weekdayCharge
															? row.uldHourlyPriceMatrix[0].weekdayCharge
															: 0
													};
                       Sat: $${
													row.uldHourlyPriceMatrix[0].saturdayCharge
														? row.uldHourlyPriceMatrix[0].saturdayCharge
														: 0
												};
                       Sun: $${
													row.uldHourlyPriceMatrix[0].sundayCharge
														? row.uldHourlyPriceMatrix[0].sundayCharge
														: 0
												};
                       PH1: $${
													row.uldHourlyPriceMatrix[0].publicHoliday1Charge
														? row.uldHourlyPriceMatrix[0].publicHoliday1Charge
														: 0
												};
                       PH2: $${
													row.uldHourlyPriceMatrix[0].publicHoliday2Charge
														? row.uldHourlyPriceMatrix[0].publicHoliday2Charge
														: 0
												}; `}
												</TableCell>
											) : (
												<TableCell className="pricing">{"_"}</TableCell>
											)}
											{row.uldHourlyPriceMatrix.length > 0 &&
											row.uldHourlyPriceMatrix[0].isEnable ? (
												<TableCell className="savePricing">
													<span
														onClick={() =>
															handleClickOpen1(
																row.uldHourlyPriceMatrix[0],
																index,
																row,
																row.uldHourlyPriceMatrix[0].truckTypes.name
															)
														}
													>
														Edit Pricing
													</span>
												</TableCell>
											) : (
												<TableCell className="savePricing">{"_"}</TableCell>
											)}
										</TableRow>
										{row.uldHourlyPriceMatrix.length > 0 &&
											row.uldHourlyPriceMatrix[0].isEnable && (
												<TableRow key={index}>
													<TableCell className="action"></TableCell>
													<TableCell className="jobType"></TableCell>
													<TableCell className="pricing"></TableCell>
													<TableCell className="savePricing"></TableCell>
													<TableCell className="action"></TableCell>
													<TableCell className="jobType">
														{row.uldHourlyPriceMatrix[1].truckTypes.name || "-"}
													</TableCell>

													<TableCell className="pricing">
														{" "}
														{`WD: $${
															row.uldHourlyPriceMatrix[1].weekdayCharge || 0
														}; Sat: $${
															row.uldHourlyPriceMatrix[1].saturdayCharge || 0
														}; Sun: $${
															row.uldHourlyPriceMatrix[1].sundayCharge || 0
														}; PH1: $${
															row.uldHourlyPriceMatrix[1]
																.publicHoliday1Charge || 0
														}; PH2: $${
															row.uldHourlyPriceMatrix[1]
																.publicHoliday2Charge || 0
														}; `}
													</TableCell>
													<TableCell className="savePricing">
														<span
															onClick={() =>
																handleClickOpen1(
																	row.uldHourlyPriceMatrix[1],
																	index,
																	row,
																	row.uldHourlyPriceMatrix[1].truckTypes.name
																)
															}
														>
															Edit Pricing
														</span>
													</TableCell>
												</TableRow>
											)}
									</>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			<Popup
				handleClose={handleClose}
				open={open}
				formik={formik}
				loading={state?.customer?.loadingPerJob}
				jobTypes={jobTypes}
				truckTypes={truckTypes}
				buttonLoading={buttonLoading}
			/>
		</>
	);
}
export default PerJob;
