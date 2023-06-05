import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField, Checkbox } from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import { useFormik } from "formik";
import {
	UPDATE_WAITING_TIME,
	UPDATE_WAITING_TIME_SUCCESS,
	UPDATE_WAITING_TIME_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import { allowOnlyFloatFour } from "@utils/commonFunctions";
import { MinimumInvoiceStyle } from "./style";

function WaitingTime(props) {
	const classes = MinimumInvoiceStyle();
	const [state, dispatch] = useStore();
	const [check, setCheck] = useState(state.customer?.waitingTimeData?.isEnable);
	const [waitingData, setWaitingData] = useState(schema.waitingTimeSchema);
	const { id } = useParams();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: waitingData,
		validationSchema: validationSchema.waitingTimeValidationSchema,
		onSubmit: (value) => {
			const data = {
				...value,
				isEnable: check ? 1 : 0,
			};
			delete data.id;
			const newData = {};
			for (let key in data) {
				newData[key] = Number(data[key]);
			}
			dispatch({
				type: UPDATE_WAITING_TIME,
			});

			API.put(`customers/${id}/waitingTimePriceMatrix/${value.id}`, newData)
				.then((response) => {
					dispatch({
						type: UPDATE_WAITING_TIME_SUCCESS,
						payload: response.data.data,
					});
					toast.success("Waiting time Updated Successfully");
					//  setWaitingData(newData)
					props.getWaitingTimeData();
					setCheck(state.customer?.waitingTimeData?.isEnable);
				})
				.catch((error) => {
					dispatch({
						type: UPDATE_WAITING_TIME_FAILURE,
						payload: error,
					});
					toast.error(error?.response?.data?.message);
				});
		},
	});

	useEffect(() => {
		if (state?.customer?.waitingTimeData) {
			setWaitingData(state?.customer?.waitingTimeData);
			setCheck(state.customer?.waitingTimeData?.isEnable);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
				<div className={classes.MinimumInvoiceWrapper}>
					<label className="label-text">
						Apply Waiting Time Charges ?
						<span className="normal-text">
							{"  "}
							<Checkbox
								icon={<img src={uncheckedIcon} alt="CheckBox" />}
								checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
								value={check}
								checked={check}
								onChange={() => setCheck(!check)}
							/>
						</span>
					</label>
					<label className="label-text">
						Waiting Time charges applies after
						<span className="normal-input">{"  "}</span>
						<TextField
							name="freeWaitingTime"
							variant="outlined"
							type="text"
							className="cost"
							// placeholder="Amount"
							onKeyPress={allowOnlyFloatFour}
							value={formik.values.freeWaitingTime}
							onChange={formik.handleChange}
							error={
								formik.touched.freeWaitingTime &&
								Boolean(formik.errors.freeWaitingTime)
							}
							helperText={
								formik.touched.freeWaitingTime && formik.errors.freeWaitingTime
							}
						/>
						<span className="normal-input">{"  "}</span>
						minutes waiting per
						<span className="normal-input">{"  "}</span>
						<TextField
							name="waitingTimeInterval"
							variant="outlined"
							type="text"
							className="cost"
							// placeholder="Amount"
							onKeyPress={allowOnlyFloatFour}
							value={formik.values.waitingTimeInterval}
							onChange={formik.handleChange}
							error={
								formik.touched.waitingTimeInterval &&
								formik.errors.waitingTimeInterval
							}
							helperText={
								formik.touched.waitingTimeInterval &&
								formik.errors.waitingTimeInterval
							}
						/>
						<span className="normal-input">{"  "}</span>
						minutes increment until delivery has been delivered .
					</label>

					<div className="weekly-row-wrapper">
						<Loader loading={state?.customer?.updatingWaitingTime} />
						<div className="weekly-row">
							<label className="label-text">Weekday charge rate</label>
							<div className="textfield-wrapper1">
								<label className="label-doller">$</label>
								<TextField
									name="weekdayCharge"
									variant="outlined"
									type="text"
									className="invoiceValue"
									placeholder="Amount"
									onKeyPress={allowOnlyFloatFour}
									value={formik.values.weekdayCharge}
									onChange={formik.handleChange}
									error={
										formik.touched.weekdayCharge && formik.errors.weekdayCharge
									}
									helperText={
										formik.touched.weekdayCharge && formik.errors.weekdayCharge
									}
								/>
							</div>
						</div>
						<div className="weekly-row">
							<label className="label-text">Saturday charge rate</label>
							<div className="textfield-wrapper1">
								<label className="label-doller">$</label>
								<TextField
									name="saturdayCharge"
									variant="outlined"
									type="text"
									className="invoiceValue"
									placeholder="Amount"
									onKeyPress={allowOnlyFloatFour}
									value={formik.values.saturdayCharge}
									onChange={formik.handleChange}
									error={
										formik.touched.saturdayCharge &&
										formik.errors.saturdayCharge
									}
									helperText={
										formik.touched.saturdayCharge &&
										formik.errors.saturdayCharge
									}
								/>
							</div>
						</div>
						<div className="weekly-row">
							<label className="label-text">Sunday charge rate</label>
							<div className="textfield-wrapper1">
								<label className="label-doller">$</label>
								<TextField
									name="sundayCharge"
									variant="outlined"
									type="text"
									className="invoiceValue"
									placeholder="Amount"
									onKeyPress={allowOnlyFloatFour}
									value={formik.values.sundayCharge}
									onChange={formik.handleChange}
									error={
										formik.touched.sundayCharge && formik.errors.sundayCharge
									}
									helperText={
										formik.touched.sundayCharge && formik.errors.sundayCharge
									}
								/>
							</div>
						</div>
						<div className="weekly-row">
							<label className="label-text">Public Holiday 1 charge rate</label>
							<div className="textfield-wrapper1">
								<label className="label-doller">$</label>
								<TextField
									name="publicHoliday1Charge"
									variant="outlined"
									type="text"
									className="invoiceValue"
									placeholder="Amount"
									onKeyPress={allowOnlyFloatFour}
									value={formik.values.publicHoliday1Charge}
									onChange={formik.handleChange}
									error={
										formik.touched.publicHoliday1Charge &&
										formik.errors.publicHoliday1Charge
									}
									helperText={
										formik.touched.publicHoliday1Charge &&
										formik.errors.publicHoliday1Charge
									}
								/>
							</div>
						</div>
						<div className="weekly-row">
							<label className="label-text">Public Holiday 2 charge rate</label>
							<div className="textfield-wrapper1">
								<label className="label-doller">$</label>
								<TextField
									name="publicHoliday2Charge"
									variant="outlined"
									type="text"
									className="invoiceValue"
									placeholder="Amount"
									onKeyPress={allowOnlyFloatFour}
									value={formik.values.publicHoliday2Charge}
									onChange={formik.handleChange}
									error={
										formik.touched.publicHoliday2Charge &&
										formik.errors.publicHoliday2Charge
									}
									helperText={
										formik.touched.publicHoliday2Charge &&
										formik.errors.publicHoliday2Charge
									}
								/>
							</div>
						</div>
					</div>

					<Button
						className="blue-btn primary-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						type="submit"
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
export default WaitingTime;
