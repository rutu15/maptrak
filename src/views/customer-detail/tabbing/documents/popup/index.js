import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
	CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import closeIcon from "@assets/images/close.svg";
import UploadImage from "@assets/images/upload.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
	const classes = AddPopupStyle();
	const [scroll] = useState("body");

	return (
		<>
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
					<DialogTitle> {"Add"} Document</DialogTitle>
					<DialogContent>
						<div className="form-row">
							<div className="form-group">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text">Document Name</label>
									<TextField
										id="name"
										name="name"
										variant="outlined"
										placeholder="Name"
										autoComplete="off"
										type="text"
										value={props.formik.values.name}
										onChange={props.formik.handleChange}
										error={
											props.formik.touched.name &&
											Boolean(props.formik.errors.name)
										}
										helperText={
											props.formik.touched.name && props.formik.errors.name
										}
									/>
								</FormControl>
							</div>
							<div className="form-group">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="upload-item-photo">
										Upload Document
									</label>
									<div className={classes.fileInput}>
										<TextField
											id="document"
											name="document"
											variant="outlined"
											type="file"
											multiple
											onChange={props.uploadFile}
											InputProps={{
												inputProps: {
													accept:
														"image/x-png,image/jpeg,image/jpg,image/svg+xml,image/gif,image/webp,video/mp4,video/x-msvideo,video/webm,text/csv,application/pdf,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
												},
											}}
											error={props.uploadError}
											// helperText={props.uploadError && "Please upload document"}
										/>
										<div className="label-block">
											<img src={UploadImage} alt="  Upload" />
											<span className="file-name" id="file-name">
												{props.fileName ? props.fileName : "Upload Document"}
											</span>
										</div>
										{props.showMsg && (
											<p className="p-block">Please upload document</p>
										)}
									</div>
								</FormControl>
							</div>
						</div>
						<div className="form-row"></div>
					</DialogContent>
					<DialogActions className="bottom-button-block">
						<Button
							className="primary-btn gray-border-btn"
							color="inherit"
							disableElevation
							underlinenone="true"
							onClick={props.handleClose}
						>
							Cancel
						</Button>
						<Button
							className="orange-btn primary-btn"
							color="inherit"
							disableElevation
							underlinenone="true"
							type="submit"
							disabled={props.buttonLoader}
						>
							{props.buttonLoader ? (
								<CircularProgress color="inherit" />
							) : (
								"Add Document"
							)}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}
export default Popup;
