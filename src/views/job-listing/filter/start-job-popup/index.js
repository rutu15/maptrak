import React, { useState } from "react";
import {
	FormControl,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import calendarIcon from "@assets/images/calendar-icon.svg";
import closeIcon from "@assets/images/close.svg";
import { filterCommonStyles } from "@utils/filterCommonStyles";
import { PopupStyle } from "../popup/style";

function StartDatePopup(props) {
	const classes = filterCommonStyles();
	const customRangeModalClassses = PopupStyle();
	const [scroll] = useState("body");

	const minimumDate = new Date(props.data.startJobStartDate);
	return (
		<Dialog
			open={props.open}
			className={customRangeModalClassses.customModal}
			scroll={scroll}
		>
			<div className="close-modal">
				<img src={closeIcon} alt="Close" onClick={props.handleClose} />
			</div>
			<form
				noValidate
				autoComplete="off"
				className={customRangeModalClassses.customForm}
			>
				<DialogTitle>Time Period:</DialogTitle>
				<DialogContent>
					<div className="form-row">
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text">Start date</label>
								<MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
									<KeyboardDatePicker
										variant="inline"
										format="dd/MM/yyyy"
										className="custom-datepicker"
										keyboardIcon={<img src={calendarIcon} alt="calendar" />}
										name="startJobStartDate"
										placeholder="DD/MM/YYYY"
										value={props.data.startJobStartDate}
										onChange={(e) => props.handleChange(e, "startJobStartDate")}
										maxDate={new Date()}
										autoOk
									/>
								</MuiPickersUtilsProvider>
							</FormControl>
						</div>
						<div className="form-group">
							<FormControl variant="outlined" className={classes.formControl}>
								<label className="label-text">End date</label>
								<MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
									<KeyboardDatePicker
										variant="inline"
										format="dd/MM/yyyy"
										className="custom-datepicker"
										name="startJobEndDate"
										keyboardIcon={<img src={calendarIcon} alt="calendar" />}
										placeholder="DD/MM/YYYY"
										value={props.data.startJobEndDate}
										onChange={(e) => props.handleChange(e, "startJobEndDate")}
										disabled={!props.data.startJobStartDate}
										minDate={minimumDate}
										maxDate={new Date()}
										autoOk
									/>
								</MuiPickersUtilsProvider>
							</FormControl>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.handleClose}
						color="primary"
						className="primary-btn gray-border-btn"
					>
						Cancel
					</Button>
					<Button
						onClick={props.handleSubmit}
						color="primary"
						className="orange-btn primary-btn"
						disabled={
							!props.data.startJobEndDate ||
							props.data.startJobEndDate < props.data.startJobStartDate
						}
					>
						Ok
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default StartDatePopup;
