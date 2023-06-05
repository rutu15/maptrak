import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	FormHelperText,
	CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import closeIcon from "@assets/images/close.svg";
import { allowOnlyNumbers, allowOnlyFloat } from "@utils/commonFunctions";
import { PopupStyle } from "./style";

function Popup(props) {
	const classes = PopupStyle();
	const [scroll] = useState("body");
	const [state] = useStore();

	return (
		<Dialog open={props.open} className={classes.customModal} scroll={scroll}>
			<div className="close-modal">
				<img src={closeIcon} alt="Close" onClick={props.handleClose} />
			</div>
			<form
				noValidate
				autoComplete="off"
				className={classes.customForm}
				onSubmit={props.formik.handleSubmit}
			>
				{props.error && <Alert severity="error">{props.error}</Alert>}
				<DialogTitle>
					{props.isEdit
						? props.jobsData?.invoiceGenerated === false
							? "Edit"
							: "View"
						: "Add"}{" "}
					ULD
				</DialogTitle>
				<DialogContent>
					<div className="form-row">
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text" htmlFor="additional-info">
									Volume (M²)
								</label>
								<TextField
									id="volume"
									placeholder="Volume"
									variant="outlined"
									type="text"
									onKeyPress={allowOnlyFloat}
									onChange={props.formik.handleChange}
									value={props.formik.values.volume}
									error={
										props.formik.touched.volume &&
										Boolean(props.formik.errors.volume)
									}
									helperText={
										props.formik.touched.volume && props.formik.errors.volume
									}
								/>
							</FormControl>
						</div>
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text" htmlFor="quantity">
									Quantity
								</label>
								<TextField
									id="quantity"
									placeholder="0"
									variant="outlined"
									type="text"
									name="quantity"
									onKeyPress={allowOnlyNumbers}
									onChange={props.formik.handleChange}
									value={props.formik.values.quantity}
									error={
										props.formik.touched.quantity &&
										Boolean(props.formik.errors.quantity)
									}
									helperText={
										props.formik.touched.quantity &&
										props.formik.errors.quantity
									}
									disabled
								/>
							</FormControl>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text" htmlFor="additional-info">
									ULD Number
								</label>
								<TextField
									id="uldNumber"
									name="uldNumber"
									placeholder="AKE12345DG4"
									variant="outlined"
									type="text"
									onChange={props.formik.handleChange}
									value={props.formik.values.uldNumber}
									error={
										props.formik.touched.uldNumber &&
										Boolean(props.formik.errors.uldNumber)
									}
									helperText={
										props.formik.touched.uldNumber &&
										props.formik.errors.uldNumber
									}
								/>
							</FormControl>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group full-width checkbox-wrapper">
							<FormControl component="fieldset">
								<FormGroup aria-label="position" className="custom-checkbox">
									<FormControlLabel
										value="end"
										control={
											<Checkbox
												name="overhang"
												onChange={props.formik.handleChange}
												value={props.formik.values.overhang}
												checked={props.formik.values.overhang}
												icon={<img src={uncheckedIcon} alt="CheckBox" />}
												checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
											/>
										}
										label="Is it an overhang?"
										labelPlacement="end"
									/>
								</FormGroup>
								<FormHelperText className="error-text">
									{props.formik.touched.overhang &&
										props.formik.errors.overhang}
								</FormHelperText>
							</FormControl>
						</div>
					</div>
				</DialogContent>
				<DialogActions className="bottom-button-block">
					<Button
						className="primary-btn gray-border-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						onClick={props.handleClose}
					>
						CANCEL
					</Button>
					{props.jobsData?.invoiceGenerated === false && (
						<Button
							className="orange-btn primary-btn"
							color="inherit"
							disableElevation
							underlinenone="true"
							type="submit"
							disabled={state?.job?.addingAwbUld || state?.job?.editingAwbUld}
						>
							{state?.job?.addingAwbUld || state?.job?.editingAwbUld ? (
								<CircularProgress color="inherit" />
							) : props.isEdit ? (
								"Edit ULD"
							) : (
								"Add ULD"
							)}{" "}
						</Button>
					)}
				</DialogActions>
			</form>
		</Dialog>
	);
}
export default Popup;
