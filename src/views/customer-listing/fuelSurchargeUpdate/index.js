import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	TableCell,
	TableRow,
	TableBody,
	Table,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import HelpIcon from "@material-ui/icons/Help";
import { toast } from "react-toastify";
import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import UploadImage from "@assets/images/blue-upload.svg";
import {
	IMPORT_CUSTOMER_CSV,
	IMPORT_CUSTOMER_CSV_SUCCESS,
	IMPORT_CUSTOMER_CSV_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { UploadFile } from "@utils/commonFunctions";
import { fuelSurchargeUpdateStyle } from "./style";

function FuelSurchargeUpdate() {
	const classes = fuelSurchargeUpdateStyle();
	const [open, setOpen] = useState(false);
	const [fileName, setFilename] = useState("");
	const [helpOpen, setHelpOpen] = useState(false);
	const [, dispatch] = useStore();

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	//Uploading file for importing CSV of truck
	function uploadFile(event, fileName, defaultText) {
		setOpen(false);
		setFilename(event.target?.files[0]?.name);
		if (event.target.files && event.target.files.length) {
			dispatch({ type: IMPORT_CUSTOMER_CSV });
		}
		UploadFile(event, fileName, defaultText, "text/csv", "customer-awb-csv")
			.then((res) => {
				API.post(`customers/import`, {
					file: res.data.fileName,
				})
					.then((response) => {
						toast.success(response?.data?.message);
						dispatch({
							type: IMPORT_CUSTOMER_CSV_SUCCESS,
							payload: response.data.data,
						});
						setFilename("");
						event.target.value = "";
					})
					.catch((error) => {
						setFilename("");
						event.target.value = "";
						if (error.response?.data?.code === 400)
							toast.error(error.response.data?.message);
						dispatch({ type: IMPORT_CUSTOMER_CSV_FAILURE, payload: error });
					});
			})
			.catch((error) => {
				setFilename("");
				event.target.value = "";
				dispatch({ type: IMPORT_CUSTOMER_CSV_FAILURE, payload: error });
				toast.error(error.response.data?.message);
			});
	}

	const saveFile = () => {
		window.open(process.env.REACT_APP_FUEL_SURCHARGE_SAMPLE, "_blank")
	};

	return (
		<div className={classes.fuelSurchargeUpdateWrapper}>
			<Button
				className="blue-btn primary-btn"
				color="inherit"
				disableElevation
				onClick={handleClickOpen}
			>
				Fuel Surcharge Update
			</Button>

			<div className={classes.ConfirmWrapper}>
				<Dialog
					open={open}
					// scroll={scroll}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.customModal}
				>
					<div className="close-modal">
						<img src={closeIcon} alt="Close" onClick={handleClose} />
					</div>
					<DialogTitle id="alert-dialog-title" className="title">
						Fuel Surcharge Update
					</DialogTitle>
					<DialogContent>
						<div className="btn-wrapper">
							<div className={classes.fileInput}>
								<TextField
									id="truckCsv"
									variant="outlined"
									type="file"
									onChange={(e) => uploadFile(e, "file-name", "Import csv")}
									InputProps={{
										inputProps: { accept: ".csv" },
									}}
								/>
								<div className="label-block">
									<img src={UploadImage} alt="Upload" />
									<span className="file-name" id="file-name">
										{fileName ? fileName : "Bulk Import"}
									</span>
								</div>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<div className={classes.searchWrapper1}>
							<div className="btn-wrapper">
								<div className="form-gourp">
									<Button
										className="orange-btn primary-btn"
										color="inherit"
										disableElevation
										onClick={() => saveFile()}
										startIcon={<GetAppIcon />}
										style={{ width: "190px" }}
									>
										Sample CSV
									</Button>
								</div>
							</div>
							<div className="btn-wrapper">
								<div className="form-gourp">
									<Button
										className="orange-btn primary-btn"
										color="inherit"
										disableElevation
										startIcon={<HelpIcon />}
										onClick={() => setHelpOpen(true)}
									>
										Help
									</Button>
								</div>
							</div>
						</div>
					</DialogActions>
					{/* <DialogActions>
						<Button
							onClick={handleClose}
							color="primary"
							className="primary-btn gray-border-btn"
						>
							No
						</Button>
						<Button
							// onClick={props.handleConfirm}
							onClick={() => alert("Confirm Clicked")}
							color="primary"
							className="orange-btn primary-btn"
						>
							Yes
						</Button>
					</DialogActions> */}
				</Dialog>
				<Dialog open={helpOpen} className={classes.customHelpModal}>
					<div className="close-modal">
						<img
							src={closeIcon}
							alt="Close"
							onClick={() => setHelpOpen(false)}
						/>
					</div>
					<DialogTitle>Bulk Fuel Surcharge Update Instruction</DialogTitle>
					<DialogContent>
						<DialogContentText className={classes.dialogContentText}>
							Please download the sample bulk update fuel surcharge csv file,
							fill out the details, save the file, then use the “BULK IMPORT”
							feature to upload.
						</DialogContentText>

						<DialogContentText className={classes.dialogContentText}>
							Note: If upload is failed, please check the required format for
							City, Customer and Fuel Surcharge.
						</DialogContentText>

						<Table>
							<TableBody>
								<TableRow>
									<TableCell className={classes.cellHeader}>City:</TableCell>
									<TableCell>City Name</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.cellHeader}>
										Customer:
									</TableCell>
									<TableCell>Customer Name</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.cellHeader}>
										Fuel Surcharge:
									</TableCell>
									<TableCell>Customer Fuel Surcharge</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default FuelSurchargeUpdate;
