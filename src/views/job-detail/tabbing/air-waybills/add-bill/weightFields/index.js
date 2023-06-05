import React from "react";
import { FormControl, TextField } from "@material-ui/core";
import { AddAirWayBillStyle } from "../style";

function AddAirWayBill(props) {
	const classes = AddAirWayBillStyle();

	return (
		<>
			<div className="form-row">
				<div className="form-group">
					<FormControl variant="outlined" className={classes.formControl}>
						<label className="label-text" htmlFor="bill-number">
							Weight Loaded
						</label>
						<TextField
							id="weightLoaded"
							placeholder="0"
							variant="outlined"
							type="text"
							value={props.formik.values.weightLoaded}
							disabled
						/>
					</FormControl>
				</div>
				<div className="form-group">
					<FormControl variant="outlined" className={classes.formControl}>
						<label className="label-text" htmlFor="flight">
							Quantity Loaded
						</label>
						<TextField
							id="quantityLoaded"
							placeholder="0"
							variant="outlined"
							type="text"
							value={props.formik.values.quantityLoaded}
							disabled
						/>
					</FormControl>
				</div>
			</div>

			<div className="form-row">
				<div className="form-group">
					<FormControl variant="outlined" className={classes.formControl}>
						<label className="label-text" htmlFor="bill-number">
							Remainder Quantity
						</label>
						<TextField
							id="remainderQty"
							placeholder="0"
							variant="outlined"
							type="text"
							disabled
							value={props.formik.values.remainderQty}
						/>
					</FormControl>
				</div>
				{props.formik.values.remainderQty > 0 &&
					props.formik.values.remainderReason !== "" && (
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text" htmlFor="remainderReason">
									Reason for Remainder Quantity
								</label>
								<TextField
									id="remainderReason"
									name="remainderReason"
									placeholder=""
									variant="outlined"
									type="text"
									disabled
									value={props.formik.values.remainderReason}
								/>
							</FormControl>
						</div>
					)}
			</div>
		</>
	);
}

export default AddAirWayBill;
