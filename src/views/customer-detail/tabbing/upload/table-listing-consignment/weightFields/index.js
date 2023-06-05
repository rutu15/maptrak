import React from "react";
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	Button,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useStore } from "@store/store";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { AddConsignmentStyle } from "../style";

function AddAirWayBill(props) {
	const classes = AddConsignmentStyle();
	const materilClasses = materialCommonStyles();
	const [state] = useStore();

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
			{props.formik.values.viewPhoto !== "" && (
				<div className="form-row ">
					<div className="form-group full-width">
						<FormControl variant="outlined" className={classes.formControl}>
							<label className="label-text" htmlFor="bill-number">
								View Uploaded Photo
							</label>
							<Button
								className="primary-btn gray-border-btn"
								color="inherit"
								disableElevation
								underlinenone="true"
								onClick={() => window.open(props.formik.values.viewPhoto)}
							>
								View
							</Button>
						</FormControl>
					</div>
				</div>
			)}
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
								<label className="label-text" htmlFor="flight">
									Reason for Remainder Quantity
								</label>
								<Select
									id="remainderReason"
									name="remainderReason"
									displayEmpty
									className={materilClasses.customSelect}
									MenuProps={{
										classes: { paper: materilClasses.customSelect },
									}}
									disabled
									value={props.formik.values.remainderReason}
									IconComponent={() => <ExpandMore />}
								>
									<MenuItem value={""} disabled>
										Reason of Remainder Quantity
									</MenuItem>
									{state?.job?.loadingReminders ? (
										<MenuItem>Loading...</MenuItem>
									) : (
										state?.job?.reminderData?.map((item, index) => {
											return (
												<MenuItem key={index} value={item.id}>
													{item.name}
												</MenuItem>
											);
										})
									)}
								</Select>
							</FormControl>
						</div>
					)}
			</div>
		</>
	);
}

export default AddAirWayBill;
