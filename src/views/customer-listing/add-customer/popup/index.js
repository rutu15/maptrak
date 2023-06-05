import React, { useState } from "react";
import {
	Button,
	DialogActions,
	DialogContent,
	FormControl,
	Select,
	MenuItem,
	TextField,
	FormHelperText,
	Dialog,
	DialogTitle,
	CircularProgress,
	Checkbox,
	ListItemText,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import PlaceTextField from "@components/placeField";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import closeIcon from "@assets/images/close.svg";
import UploadImage from "@assets/images/upload.svg";
import {
	allowAlphaNumeric,
	allowNumberWithSpaceValidation,
	allowOnlyNumbers,
	// awbNumberValidation,
} from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";

import { PopupStyle } from "./style";

// Regex for email
const re = /([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;

function Popup(props) {
	// List of menu of jobType to show in popup while adding customer
	const menuData = [];
	props?.state?.common?.jobTypeData?.map((item) => {
		menuData.push({
			label: item.name,
			value: item.id,
		});
		return true;
	});
	const classes = PopupStyle();
	const materilClasses = materialCommonStyles();
	const [state] = useStore();
	const [scroll] = useState("body");
	const [, setEmails] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const [error, setError] = useState(false);

	const handleChange = (e) => {
		const newArray = props.formik.values.email;
		if (newArray?.length < 0) {
			setError(true);
			setErrorMsg("Email is required");
		} else {
			if (re.test(e)) {
				setErrorMsg("");
				setError(true);
			} else {
				setError(true);
				setErrorMsg("Enter a valid email");
			}
		}
		newArray.push(e);
		setEmails(newArray);
	};

	const handleDeleteChip = (e) => {
		const index = props.formik.values.email.indexOf(e);
		const newArray = props.formik.values.email.splice(index, 1);
		if (props.formik.values.email.length < 1) {
			setError(true);
			setErrorMsg("Email is required");
		} else {
			setError(true);
			setErrorMsg("");
			setEmails(newArray);
		}
	};

	const handleClose = () => {
		setError(false);
		setErrorMsg("");
		props.handleClose();
	};
	return (
		<Dialog
			open={props.open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			className={classes.customModal}
			scroll={scroll}
		>
			<div className="close-modal">
				<img src={closeIcon} alt="Close" onClick={handleClose} />
			</div>
			<form
				noValidate
				autoComplete="off"
				className={classes.customForm}
				onSubmit={props.formik.handleSubmit}
			>
				{props.error && <Alert severity="error">{props.error}</Alert>}
				<DialogTitle id="alert-dialog-title">
					{props.isEdit ? "Edit" : "Add"} Customer
				</DialogTitle>
				{state.customer.loadingChildCustomer ? (
					<CircularProgress
						color="inherit"
						size={80}
						className="cirularProgess"
					/>
				) : (
					<DialogContent>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="customer-name">
										Customer Name
									</label>
									<TextField
										id="name"
										placeholder="Customer name"
										variant="outlined"
										type="text"
										onKeyPress={allowAlphaNumeric}
										onChange={props.formik.handleChange}
										value={props.formik.values.name}
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
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									{!props.isEdit && (
										<div className="div-wrapper">
											<div>
												<Checkbox
													name="isParent"
													onChange={props.formik.handleChange("isParent")}
													icon={<img src={uncheckedIcon} alt="CheckBox" />}
													checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
													checked={props.formik.values.isParent}
												/>
												<span className="label-tex">Parent Account</span>
											</div>
										</div>
									)}
									<label
										className="label-text blank-lable"
										htmlFor="customer-name"
									>
										Parent Account
									</label>
									<Select
										disabled={props.isEdit || props.formik.values.isParent}
										id="parentId"
										displayEmpty
										className={materilClasses.customSelect}
										MenuProps={{
											classes: {
												paper: materilClasses.customSelect,
											},
										}}
										onChange={props.formik.handleChange("parentId")}
										value={props.formik.values.parentId}
										IconComponent={() => <ExpandMore />}
									>
										<MenuItem value={""}>Choose</MenuItem>
										{props?.state?.customer?.loadingParent ? (
											<MenuItem>Loading...</MenuItem>
										) : (
											props?.state?.customer?.parentCustomers?.rows?.map(
												(item, index) => {
													return (
														<MenuItem key={index} value={item.id}>
															{item.name}
														</MenuItem>
													);
												}
											)
										)}
									</Select>
									{!props.isEdit && !props.formik.values.isParent && (
										<FormHelperText
											className={
												props.formik.touched.parentId &&
												props.formik.errors.parentId
													? "error-text"
													: ""
											}
										>
											{props.formik.touched.parentId &&
											props.formik.errors.parentId
												? props.formik.errors.parentId
												: "Please select city to get list"}
										</FormHelperText>
									)}
								</FormControl>
							</div>
						</div>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="address">
										Location
									</label>
									{!props.formik.values.parentId ||
									props.formik.values.isParent ? (
										<>
											<PlaceTextField
												handleChange={(address) => props.handleChange(address)}
												handleSelect={(address) => props.handleSelect(address)}
												value={props.formik.values.address}
											/>

											<FormHelperText className="error-text">
												{props.formik.touched.address &&
													(props.formik.errors.address ||
														props.formik.errors.latitude ||
														props.formik.errors.longitude)}
											</FormHelperText>
										</>
									) : (
										<TextField
											id="address"
											placeholder="Location"
											variant="outlined"
											type="text"
											onChange={props.formik.handleChange}
											value={props.formik.values.address}
											error={
												props.formik.touched.address &&
												Boolean(props.formik.errors.address)
											}
											helperText={
												props.formik.touched.address &&
												props.formik.errors.address
											}
										/>
									)}
								</FormControl>
							</div>
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="email">
										Email
									</label>
									{props.isEdit ? (
										!props.formik.values.parentId ? (
											<TextField
												id="email"
												placeholder="Email address"
												variant="outlined"
												type="text"
												onChange={props.formik.handleChange}
												value={props.formik.values.email}
												error={
													props.formik.touched.email &&
													Boolean(props.formik.errors.email)
												}
												helperText={
													props.formik.touched.email &&
													props.formik.errors.email
												}
											/>
										) : (
											<div className="form-group two-column">
												<ChipInput
													className="chip-input"
													id="email"
													name="email"
													value={
														props.formik.values.email
															? props.formik.values.email
															: []
													}
													onAdd={(e) => handleChange(e)}
													onDelete={(e) => handleDeleteChip(e)}
													placeholder="Email address"
													error={
														error
															? errorMsg
															: props.formik.touched.email &&
															  Boolean(props.formik.errors.email)
													}
												/>
												<FormHelperText className="error-text">
													{error && errorMsg}
												</FormHelperText>
											</div>
										)
									) : props.formik.values.isParent ? (
										<TextField
											id="email"
											placeholder="Email address"
											variant="outlined"
											type="text"
											onChange={props.formik.handleChange}
											value={props.formik.values.email}
											error={
												props.formik.touched.email &&
												Boolean(props.formik.errors.email)
											}
											helperText={
												props.formik.touched.email && props.formik.errors.email
											}
										/>
									) : (
										<div className="form-group two-column">
											<ChipInput
												className="chip-input"
												id="email"
												name="email"
												value={
													props.formik.values.email &&
													typeof props.formik.values.email !== "string"
														? props.formik.values.email
														: []
												}
												onChange={props.formik.handleChange}
												onAdd={(e) => handleChange(e)}
												onDelete={(e) => handleDeleteChip(e)}
												placeholder="Email address"
												error={
													error
														? errorMsg
														: props.formik.touched.email &&
														  Boolean(props.formik.errors.email)
												}
											/>
											<FormHelperText className="error-text">
												{error
													? errorMsg
													: props.formik.touched.email &&
													  props.formik.errors.email}
											</FormHelperText>
										</div>
									)}
								</FormControl>
							</div>
						</div>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="phone">
										Phone Number
									</label>
									<TextField
										id="phone"
										placeholder="Phone Number"
										variant="outlined"
										type="text"
										onChange={props.formik.handleChange}
										value={props.formik.values.phone}
										error={
											props.formik.touched.phone &&
											Boolean(props.formik.errors.phone)
										}
										helperText={
											props.formik.touched.phone && props.formik.errors.phone
										}
										onKeyPress={allowNumberWithSpaceValidation}
									/>
									{props.formik.touched.phone && props.formik.errors.phone ? (
										""
									) : (
										<FormHelperText>
											{
												"0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX"
											}
										</FormHelperText>
									)}
								</FormControl>
							</div>
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text">Status</label>
									<Select
										id="status"
										displayEmpty
										className={materilClasses.customSelect}
										MenuProps={{
											classes: {
												paper: materilClasses.customSelect,
											},
										}}
										onChange={props.formik.handleChange("status")}
										value={props.formik.values.status}
										IconComponent={() => <ExpandMore />}
									>
										<MenuItem value={""} disabled>
											Please Select Status
										</MenuItem>
										<MenuItem value={1}>Active</MenuItem>
										<MenuItem value={0}>Inactive</MenuItem>
									</Select>
									<FormHelperText className="error-text">
										{props.formik.touched.status && props.formik.errors.status}
									</FormHelperText>
								</FormControl>
							</div>
						</div>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text">Invoicing Period</label>
									<Select
										id="invoicingPeriodId"
										displayEmpty
										className={materilClasses.customSelect}
										MenuProps={{
											classes: {
												paper: materilClasses.customSelect,
											},
										}}
										onChange={props.formik.handleChange("invoicingPeriodId")}
										value={props.formik.values.invoicingPeriodId}
										IconComponent={() => <ExpandMore />}
									>
										<MenuItem value={""} disabled>
											Select Invoicing Period
										</MenuItem>

										{props?.state?.common?.loadingInvoicingPeriod ? (
											<MenuItem>Loading..,</MenuItem>
										) : (
											props?.state?.common?.invoicingPeriodData?.map(
												(item, index) => {
													return (
														<MenuItem key={index} value={item.id}>
															{item.name}
														</MenuItem>
													);
												}
											)
										)}
									</Select>
									<FormHelperText className="error-text">
										{props.formik.touched.invoicingPeriodId &&
											props.formik.errors.invoicingPeriodId}
									</FormHelperText>
								</FormControl>
							</div>
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="damagePhoto">
										Upload Logo
									</label>
									<div className={classes.fileInput}>
										<TextField
											id="logo"
											variant="outlined"
											type="file"
											InputProps={{
												inputProps: {
													accept: "image/x-png,image/jpeg",
												},
											}}
											onChange={(e) =>
												props.handleImage(e, "upload-file-name", "Upload photo")
											}
										/>
										<div className="label-block">
											<img src={UploadImage} alt="Upload" />
											<span className="file-name" id="upload-file-name">
												{props.formik.values.logo
													? props.formik.values.logo.name
													: "Upload Logo"}
											</span>
										</div>
									</div>
									<FormHelperText className="error-text">
										{props.formik.touched.logo && props.formik.errors.logo}
									</FormHelperText>
								</FormControl>
							</div>
						</div>

						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="city">
										City
									</label>
									<Select
										id="city"
										displayEmpty
										className={materilClasses.customSelect}
										MenuProps={{
											classes: {
												paper: materilClasses.customSelect,
											},
										}}
										onChange={props.formik.handleChange("city")}
										value={props.formik.values.city}
										IconComponent={() => <ExpandMore />}
									>
										<MenuItem value={""} disabled>
											Select city
										</MenuItem>
										{props?.state?.common?.loadingCities ? (
											<MenuItem>Loading...</MenuItem>
										) : (
											props?.state?.common?.citiesData?.map((item, index) => {
												return (
													<MenuItem key={index} value={item.id}>
														{item.name}
													</MenuItem>
												);
											})
										)}
									</Select>
									<FormHelperText className="error-text">
										{props.formik.touched.city && props.formik.errors.city}
									</FormHelperText>
								</FormControl>
							</div>

							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="customer-nnumber">
										Old Customer Number
									</label>
									<TextField
										id="oldCustomerNumber"
										placeholder="Old customer number"
										variant="outlined"
										type="text"
										onKeyPress={allowAlphaNumeric}
										onChange={props.formik.handleChange}
										value={props.formik.values.oldCustomerNumber}
										error={
											props.formik.touched.oldCustomerNumber &&
											Boolean(props.formik.errors.oldCustomerNumber)
										}
										helperText={
											props.formik.touched.oldCustomerNumber &&
											props.formik.errors.oldCustomerNumber
										}
									/>
								</FormControl>
							</div>
						</div>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="city">
										Customer Category
									</label>
									<Select
										id="customerCategoryId"
										displayEmpty
										className={materilClasses.customSelect}
										MenuProps={{
											classes: {
												paper: materilClasses.customSelect,
											},
										}}
										onChange={props.formik.handleChange("customerCategoryId")}
										value={props.formik.values.customerCategoryId}
										IconComponent={() => <ExpandMore />}
									>
										<MenuItem value={""} disabled>
											Select Customer Category
										</MenuItem>
										{props?.state?.common?.loadingCustomerCategories ? (
											<MenuItem>Loading...</MenuItem>
										) : (
											props?.state?.common?.customerCategoriesData?.map(
												(item, index) => {
													return (
														<MenuItem key={index} value={item.id}>
															{item.name}
														</MenuItem>
													);
												}
											)
										)}
									</Select>
									<FormHelperText className="error-text">
										{props.formik.touched.customerCategoryId &&
											props.formik.errors.customerCategoryId}
									</FormHelperText>
								</FormControl>
							</div>
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text" htmlFor="customer-name">
										ABN/NZBN
									</label>
									<TextField
										id="ABN"
										placeholder="Australian business  number"
										variant="outlined"
										type="text"
										onKeyPress={allowNumberWithSpaceValidation}
										onChange={props.formik.handleChange}
										value={props.formik.values.ABN}
										error={
											props.formik.touched.ABN &&
											Boolean(props.formik.errors.ABN)
										}
										helperText={
											props.formik.touched.ABN && props.formik.errors.ABN
										}
									/>
								</FormControl>
							</div>
						</div>
						<div className="form-row">
							<div className="form-gourp">
								<FormControl variant="outlined" className={classes.formControl}>
									<label className="label-text">Postal code</label>
									<TextField
										id="postalCode"
										name="postalCode"
										placeholder="Postal Code"
										variant="outlined"
										type="text"
										onChange={props.formik.handleChange}
										value={props.formik.values.postalCode}
										onKeyPress={allowNumberWithSpaceValidation}
										error={
											props.formik.touched.postalCode &&
											Boolean(props.formik.errors.postalCode)
										}
										helperText={
											props.formik.touched.postalCode &&
											props.formik.errors.postalCode
										}
									/>
								</FormControl>
							</div>
							{props.formik.values.parentId && (
								<div className="form-gourp">
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<label className="label-text">Job Type</label>
										<Select
											name="jobTypeId"
											displayEmpty
											className={materilClasses.customSelect}
											multiple
											MenuProps={{
												classes: {
													paper: materilClasses.customSelect,
												},
											}}
											renderValue={(selected) => {
												if (selected.length === 0) {
													return <> Select Job Type</>;
												}

												return menuData
													.filter((m) => selected.includes(m.value))
													.map((m) => m.label)
													.join(",");
											}}
											IconComponent={() => <ExpandMore />}
											onChange={props.formik.handleChange("jobTypeId")}
											value={props.formik.values.jobTypeId}
										>
											<MenuItem value="" disabled>
												Select Job Type
											</MenuItem>
											{menuData.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.value}
														className="custom-checkbox custom-Multicheckbox"
													>
														<Checkbox
															checked={
																props.formik?.values?.jobTypeId?.indexOf(
																	item.value
																) > -1
															}
															icon={<img src={uncheckedIcon} alt="CheckBox" />}
															checkedIcon={
																<img src={checkedIcon} alt="CheckBox" />
															}
														/>
														<ListItemText primary={item.label} />
													</MenuItem>
												);
											})}
										</Select>

										<FormHelperText className="error-text">
											{props.formik.touched.jobTypeId &&
												props.formik.errors.jobTypeId}
										</FormHelperText>
									</FormControl>
								</div>
							)}
							{(!props.formik.values.parentId ||
								props.formik.values.isParent) && (
								<div className="form-gourp">
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<label className="label-text" htmlFor="customer-name">
											Payment Terms
										</label>
										<TextField
											id="paymentTerms"
											placeholder="Payment terms"
											variant="outlined"
											type="text"
											onKeyPress={allowOnlyNumbers}
											onChange={props.formik.handleChange}
											value={props.formik.values.paymentTerms}
											error={
												props.formik.touched.paymentTerms &&
												Boolean(props.formik.errors.paymentTerms)
											}
											helperText={
												props.formik.touched.paymentTerms &&
												props.formik.errors.paymentTerms
											}
										/>
									</FormControl>
								</div>
							)}
						</div>
					</DialogContent>
				)}
				<DialogActions className="bottom-button-block">
					<Button
						className="primary-btn gray-border-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						onClick={handleClose}
					>
						CANCEL
					</Button>

					<Button
						className="orange-btn primary-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						type="submit"
						disabled={
							state?.common?.imageUploading ||
							state?.customer?.addingCustomer ||
							state?.customer?.editingCustomer
						}
					>
						{state?.common?.imageUploading ||
						state?.customer?.addingCustomer ||
						state?.customer?.editingCustomer ? (
							<CircularProgress color="inherit" />
						) : props.isEdit ? (
							"Edit Customer"
						) : (
							"Add Customer"
						)}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default Popup;
