import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import cx from "classnames";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import Popup from "./popup";
import {
	// UPDATE_PRICE_MATRIX_CONSIGNMENT,
	UPDATE_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
	UPDATE_PRICE_MATRIX_CONSIGNMENT_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { ConsignmentStyle } from "./style";

function Consignment(props) {
	const classes = ConsignmentStyle();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [week, setWeek] = useState(schema.priceMatrixConsignmentSchema);
	const [state, dispatch] = useStore();
	const { id } = useParams();

	const handleClickOpen = (val, i) => {
		setWeek(val);
		setOpen(true);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: week,
		validationSchema: validationSchema.priceMatrixConsignmentValidationSchema,
		onSubmit: (value) => {
			setLoading(true);
			// dispatch({ type: UPDATE_PRICE_MATRIX_CONSIGNMENT });
			API.put(`customers/${id}/consignmentPriceMatrix/${value.id}`, {
				weekDaysWage: Number(value.weekDaysWage),
				weekDaysChargeType: value.weekDaysChargeType,
				saturdayWage: Number(value.saturdayWage),
				saturdayChargeType: value.saturdayChargeType,
				sundayWage: Number(value.sundayWage),
				sundayChargeType: value.sundayChargeType,
				publicHoliday1Wage: Number(value.publicHoliday1Wage),
				publicHoliday1ChargeType: value.publicHoliday1ChargeType,
				publicHoliday2Wage: Number(value.publicHoliday2Wage),
				publicHoliday2ChargeType: value.publicHoliday2ChargeType,
			})
				.then((response) => {
					dispatch({
						type: UPDATE_PRICE_MATRIX_CONSIGNMENT_SUCCESS,
						payload: response.data.data,
					});
					setLoading(false);
					props.getPriceMatrixConsignment();
					toast.success("Consignment Price Matrix Updated Successfully");
				})
				.catch((err) => {
					setLoading(false);
					dispatch({
						type: UPDATE_PRICE_MATRIX_CONSIGNMENT_FAILURE,
						payload: err,
					});
				});
		},
	});
	useEffect(() => {
		if (state?.customer?.getPriceMatrixConsignmentData) {
			setWeek(state?.customer?.getPriceMatrixConsignmentData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClose = () => {
		setOpen(false);
		formik.handleReset();
	};

	return (
		<>
			<div className={cx(classes.minimumHours, classes.dailyMinimumHours)}>
				<div className={classes.TableWrapper}>
					<Loader loading={state?.customer?.loadingPriceMatrixConsignment} />
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className="jobType">Job Type</TableCell>
									<TableCell className="truckType">Truck Type</TableCell>
									<TableCell className="pricing">Pricing</TableCell>
									<TableCell className="savePricing">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{state?.customer?.getPriceMatrixConsignmentData?.map(
									(row, index) => (
										<TableRow key={index}>
											<TableCell className="jobType">
												{row.jobTypes.name}
											</TableCell>
											<TableCell className="truckType">
												{row.truckTypes.name}
											</TableCell>
											<TableCell className="pricing">
												{`WD: $${row.weekDaysWage}; Sat: $${row.saturdayWage}; Sun: $${row.sundayWage}; PH1: $${row.publicHoliday1Wage}; PH2: $${row.publicHoliday2Wage}; `}
											</TableCell>
											<TableCell className="savePricing">
												<span onClick={() => handleClickOpen(row, index)}>
													Edit Pricing
												</span>
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			<Popup
				handleClose={handleClose}
				open={open}
				formik={formik}
				loading={loading}
			/>
		</>
	);
}
export default Consignment;
