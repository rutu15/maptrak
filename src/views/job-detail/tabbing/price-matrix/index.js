import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Select,
	MenuItem,
	FormControl,
	Button,
	TableContainer,
	TableRow,
	TableCell,
	TableBody,
	TextField,
	Table,
	Paper,
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import DeletePopup from "@components/deletePopup";
import {
	allowOnlyFloat,
	allowNegativeOnlyFloat,
	allowOnlyFloatFour,
} from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import {
	FETCH_JOB_PRICE_MATRIX,
	FETCH_JOB_PRICE_MATRIX_SUCCESS,
	FETCH_JOB_PRICE_MATRIX_FAILURE,
	UPDATE_JOB_PRICE_MATRIX,
	UPDATE_JOB_PRICE_MATRIX_SUCCESS,
	UPDATE_JOB_PRICE_MATRIX_FAILURE,
	FETCH_ADDITIONAL_CHARGES,
	FETCH_ADDITIONAL_CHARGES_SUCCESS,
	FETCH_ADDITIONAL_CHARGES_FAILURE,
	UPDATE_ADDITIONAL_CHARGES,
	UPDATE_ADDITIONAL_CHARGES_SUCCESS,
	UPDATE_ADDITIONAL_CHARGES_FAILURE,
	GET_ADDITIONAL_CHARGE_TYPE,
	GET_ADDITIONAL_CHARGE_TYPE_SUCCESS,
	GET_ADDITIONAL_CHARGE_TYPE_FAILURE,
	FETCH_JOB_TOLL_CHARGE,
	FETCH_JOB_TOLL_CHARGE_SUCCESS,
	FETCH_JOB_TOLL_CHARGE_FAILURE,
	DELETE_JOB_TOLL_CHARGE,
	DELETE_JOB_TOLL_CHARGE_SUCCESS,
	DELETE_JOB_TOLL_CHARGE_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import API from "@services/axios";
import UldTable from "./uld";
import LooseTable from "./loose";
import ConsignmentTable from "./consignment";
import EmptyTable from "./empty";
import TollListing from "./toll/table-listing";
import TollPopup from "./toll/popup";
import { TableStyle } from "./style";

function PriceMatrix(props) {
	const classes = TableStyle();
	const materilClasses = materialCommonStyles();
	const [state, dispatch] = useStore();
	const [data, setData] = useState([]);
	const [overWrite, setOverWrite] = useState(false);
	const [addInfo, setAddInfo] = useState([]);
	const [openAddPopup, setOpenAddPopup] = useState(false);
	const [getEditToll, setEditToll] = useState(schema.jobsToll);
	const [isEdit, setEdit] = useState(false);
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [getDeleteData, setDeleteData] = useState({});
	const [error, setError] = useState(false);
	const [charge1, setCharge1] = useState(0);
	const [chargeType1, setChargeType1] = useState("");
	const [chargeError1, setChargeError1] = useState("");
	const [charge2, setCharge2] = useState(0);
	const [chargeType2, setChargeType2] = useState("");
	const [chargeError2, setChargeError2] = useState("");
	const [charge3, setCharge3] = useState(0);
	const [chargeType3, setChargeType3] = useState("");
	const [chargeError3, setChargeError3] = useState("");
	const [charge4, setCharge4] = useState(0);
	const [chargeType4, setChargeType4] = useState("");
	const [chargeError4, setChargeError4] = useState("");
	const [extraCharge, setExtraCharge] = useState(false);
	const [charge5, setCharge5] = useState(0);
	const [, setChargeType5] = useState("");
	const [chargeError5, setChargeError5] = useState("");
	const { id } = useParams();

	// API calling to get jobs
	const getJob = () => {
		API.get(`jobs/${id}`)
			.then((response) => {
				setOverWrite(response.data?.data?.overWritePriceMatrix);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// API calling to get additional charge type
	const getAdditionalChargeType = () => {
		dispatch({ type: GET_ADDITIONAL_CHARGE_TYPE });
		API.get("master/additionalChargeTypes")
			.then((response) => {
				dispatch({
					type: GET_ADDITIONAL_CHARGE_TYPE_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: GET_ADDITIONAL_CHARGE_TYPE_FAILURE, payload: error });
			});
	};

	// API calling to get price matrix
	const getPriceMatrix = () => {
		dispatch({ type: FETCH_JOB_PRICE_MATRIX });
		API.get(`jobs/${id}/jobPriceMatrix`)
			.then((response) => {
				dispatch({
					type: FETCH_JOB_PRICE_MATRIX_SUCCESS,
					payload: response.data.data,
				});
				setData(response.data.data);
			})
			.catch((error) => {
				dispatch({ type: FETCH_JOB_PRICE_MATRIX_FAILURE, payload: error });
				toast.error(error?.response?.data?.message);
			});
	};

	// API calling to get addtional charges
	const getAdditionalCharges = () => {
		dispatch({ type: FETCH_ADDITIONAL_CHARGES });
		API.get(`jobs/${id}/additionalCharges`)
			.then((response) => {
				dispatch({
					type: FETCH_ADDITIONAL_CHARGES_SUCCESS,
					payload: response.data.data,
				});
				setAddInfo(
					response.data.data?.additionalJobCharges.length
						? response.data?.data?.additionalJobCharges.map((item) => {
								return {
									...item,
									additionalJobChargeTypes: item?.additionalJobChargeTypes?.id,
								};
						  })
						: [
								{
									additionalJobChargeTypes: "",
									description: "",
									charge: "",
								},
						  ]
				);
			})
			.catch((error) => {
				dispatch({ type: FETCH_ADDITIONAL_CHARGES_FAILURE, payload: error });
				toast.error(error?.response?.data?.message);
			});
	};

	// API calling to get price matrix
	const getJobToll = () => {
		dispatch({ type: FETCH_JOB_TOLL_CHARGE });
		API.get(`jobs/${id}/tolls`)
			.then((response) => {
				dispatch({
					type: FETCH_JOB_TOLL_CHARGE_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_JOB_TOLL_CHARGE_FAILURE, payload: error });
				toast.error(error?.response?.data?.message);
			});
	};

	useEffect(() => {
		getAdditionalChargeType();
		getJob();
		getPriceMatrix();
		getJobToll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data && data.length === 4) {
			setCharge1(data[0].charge);
			setCharge2(data[1].charge);
			setCharge3(data[2].charge);
			setCharge4(data[3].charge);
			setChargeType1(data[0].chargeType);
			setChargeType2(data[1].chargeType);
			setChargeType3(data[2].chargeType);
			setChargeType4(data[3].chargeType);
		} else if (data && data.length === 1) {
			setCharge5(data[0].charge);
			setChargeType5(data[0].chargeType);
			setExtraCharge(true);
		}
	}, [data]);

	useEffect(() => {
		if (extraCharge) {
			if (data && data.length === 1) {
				setCharge5(data[0].charge);
			}
			if (data) {
				setCharge1(0);
				setCharge2(0);
				setCharge3(0);
				setCharge4(0);
			}
		} else {
			if (data && data.length === 4) {
				setCharge1(data[0].charge);
				setCharge2(data[1].charge);
				setCharge3(data[2].charge);
				setCharge4(data[3].charge);
				setChargeType1(data[0].chargeType);
				setChargeType2(data[1].chargeType);
				setChargeType3(data[2].chargeType);
				setChargeType4(data[3].chargeType);
				setCharge5(0);
			} else if (data && data.length === 1) {
				setCharge5(0);
				setChargeType5(data[0].chargeType);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extraCharge]);

	useEffect(() => {
		if (state?.common?.loadingAdditionalChargeType === true) {
			getAdditionalCharges();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.common?.loadingAdditionalChargeType]);

	const handleChangeUldLoose = (e, index) => {
		const { name, value } = e.target;
		const newArray = [...data];
		newArray[index] = {
			...newArray[index],
			[name]: value,
		};
		newArray.map((item, index) => {
			if (item.charge === "") {
				newArray[index].flag = true;
				newArray[index].error = "Charge is required";
			} else {
				if (parseFloat(item.charge) > 99999) {
					newArray[index].error = "Charge must not be more than 99999";
					newArray[index].flag = true;
				} else {
					newArray[index].flag = false;
				}
			}
			return true;
		});
		setData(newArray);
	};

	const handleAdd = () => {
		const arr = [
			...addInfo,
			{
				additionalJobChargeTypes: "",
				description: "",
				charge: "",
			},
		];
		setAddInfo(arr);
	};

	const handleInputChange = (e) => {
		if (e.target.name === "charge1") {
			if (e.target.value === "") {
				setError(true);
				setChargeError1("Charge is required");
			} else {
				setError(false);
				setChargeError1("");
			}
			setCharge1(e.target.value);
		} else if (e.target.name === "charge2") {
			if (e.target.value === "") {
				setError(true);
				setChargeError2("Charge is required");
			} else {
				setError(false);
				setChargeError2("");
			}
			setCharge2(e.target.value);
		} else if (e.target.name === "charge3") {
			if (e.target.value === "") {
				setError(true);
				setChargeError3("Charge is required");
			} else {
				setError(false);
				setChargeError3("");
			}
			setCharge3(e.target.value);
		} else if (e.target.name === "charge4") {
			if (e.target.value === "") {
				setError(true);
				setChargeError4("Charge is required");
			} else {
				setError(false);
				setChargeError4("");
			}
			setCharge4(e.target.value);
		} else {
			if (e.target.value === "") {
				setError(true);
				setChargeError5("Charge is required");
			} else {
				setError(false);
				setChargeError5("");
			}
			setCharge5(e.target.value);
		}
	};

	const handleChargeChange = (e) => {
		if (e.target.name === "chargeType1") {
			setChargeType1(e.target.value);
		} else if (e.target.name === "chargeType2") {
			setChargeType2(e.target.value);
		} else if (e.target.name === "chargeType3") {
			setChargeType3(e.target.value);
		} else if (e.target.name === "chargeType4") {
			setChargeType4(e.target.value);
		} else {
			setChargeType5("HOUR");
		}
	};

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const newArray = [...addInfo];
		newArray[index] = {
			...newArray[index],
			[name]: value,
		};

		newArray.map((item, index) => {
			if (item.charge === "") {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge is required";
			} else if (item.additionalJobChargeTypes === 3 && item.charge > 0) {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge must be negative value";
			} else if (item.additionalJobChargeTypes !== 3 && item.charge < 0) {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge must be positive value";
			} else if (parseFloat(item.charge) > 99999) {
				newArray[index].chargeErr = "Charge must not be more than 99999";
				newArray[index].flagCharge = true;
			} else {
				newArray[index].flagCharge = false;
			}
			if (item.additionalJobChargeTypes === "") {
				newArray[index].flagAdditional = true;
				newArray[index].typeErr = "Please select charge type";
			} else {
				newArray[index].flagAdditional = false;
			}
			if (item.description?.length > 255) {
				newArray[index].flagDesc = true;
				newArray[index].descErr = "Description must not be more than 255";
			} else {
				newArray[index].flagDesc = false;
			}
			return true;
		});
		setAddInfo(newArray);
	};

	const handleclick = () => {
		const newArray = [...addInfo];
		newArray.map((item, index) => {
			if (item.charge === "") {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge is required";
			} else if (item.additionalJobChargeTypes === 3 && item.charge > 0) {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge must be negative value";
			} else if (item.additionalJobChargeTypes !== 3 && item.charge < 0) {
				newArray[index].flagCharge = true;
				newArray[index].chargeErr = "Charge must be positive value";
			} else if (parseFloat(item.charge) > 99999) {
				newArray[index].chargeErr = "Charge must not be more than 99999";
				newArray[index].flagCharge = true;
			} else {
				newArray[index].flagCharge = false;
			}
			if (item.additionalJobChargeTypes === "") {
				newArray[index].flagAdditional = true;
				newArray[index].typeErr = "Please select charge type";
			} else {
				newArray[index].flagAdditional = false;
			}
			if (item.description?.length > 255) {
				newArray[index].flagDesc = true;
				newArray[index].descErr = "Description must not be more than 255";
			} else {
				newArray[index].flagDesc = false;
			}
			return true;
		});
		const additionalChargeData = addInfo.map((item) => {
			return {
				additionalChargeTypeId: item.additionalJobChargeTypes,
				charge: item.charge,
				description: item.description ? item.description : undefined,
			};
		});
		setAddInfo(newArray);
		let flagCharge = addInfo.find((x) => x.flagCharge === true);
		let flagAdditional = addInfo.find((x) => x.flagAdditional === true);
		let flagDesc = addInfo.find((x) => x.flagDesc === true);
		if (
			flagAdditional?.flagAdditional !== true &&
			flagCharge?.flagCharge !== true &&
			flagDesc?.flagDesc !== true
		) {
			dispatch({ type: UPDATE_ADDITIONAL_CHARGES });
			API.post(`jobs/${id}/additionalCharges`, {
				additionalChargeData,
			})
				.then((response) => {
					dispatch({
						type: UPDATE_ADDITIONAL_CHARGES_SUCCESS,
						payload: response.data.data,
					});
					getAdditionalCharges();
					props.getJobs();
					toast.success("Additional Charge Added Successfully");
				})
				.catch((error) => {
					dispatch({ type: UPDATE_ADDITIONAL_CHARGES_FAILURE, payload: error });
					toast.error(error?.response?.data?.message);
				});
		}
	};

	const checkError = () => {
		if (extraCharge) {
			if (charge1 > 0 || charge2 > 0 || charge3 > 0 || charge4 > 0) {
				return false;
			}
		} else {
			if (charge5 > 0) {
				return false;
			}
		}
		return true;
	};

	const checkChrgeTypeError = () => {
		if (!extraCharge) {
			if (
				chargeType1 === "" ||
				chargeType2 === "" ||
				chargeType3 === "" ||
				chargeType4 === ""
			) {
				return false;
			}
		}
		return true;
	};

	// API calling to update/overwrite job price matrix
	const handleOverWriteSubmit = (e) => {
		e.preventDefault();
		let jobPriceMatrixData = [];
		if (extraCharge) {
			jobPriceMatrixData = [
				{
					chargeType: "HOUR",
					charge: Number(charge5),
				},
			];
		} else {
			jobPriceMatrixData = [
				{
					uldTypeId: 1,
					chargeType: chargeType1,
					charge: Number(charge1),
				},
				{
					uldTypeId: 2,
					chargeType: chargeType2,
					charge: Number(charge2),
				},
				{
					uldTypeId: 3,
					chargeType: chargeType3,
					charge: Number(charge3),
				},
				{
					uldTypeId: 4,
					chargeType: chargeType4,
					charge: Number(charge4),
				},
			];
		}
		const isError = checkError();
		const isChrgeTypeError = checkChrgeTypeError();
		if (!error && isError && isChrgeTypeError) {
			dispatch({ type: UPDATE_JOB_PRICE_MATRIX });
			API.put(`jobs/${id}/jobPriceMatrix`, {
				overWritePriceMatrix: overWrite === false ? 0 : 1,
				jobPriceMatrixData,
			})
				.then((response) => {
					dispatch({
						type: UPDATE_JOB_PRICE_MATRIX_SUCCESS,
						payload: response.data.data,
					});
					getAdditionalCharges();
					getJob();
					props.getJobs();
					getPriceMatrix();
					toast.success("Overwite Price Matrix Update Successfully");
				})
				.catch((error) => {
					dispatch({ type: UPDATE_JOB_PRICE_MATRIX_FAILURE, payload: error });
					toast.error(error?.response?.data?.message);
				});
		}
	};
	const handleDelete = (item) => {
		const newArray = [...addInfo];
		if (item > -1) {
			newArray.splice(item, 1);
		}
		setAddInfo(newArray);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: getEditToll,
		onSubmit: (value) => {
			console.log(value);
		},
	});
	const handleCloseDeletePopup = () => {
		setDeletePopup(false);
	};
	const handleDeleteToll = () => {
		dispatch({ type: DELETE_JOB_TOLL_CHARGE });
		API.delete(`jobs/${id}/tolls/${getDeleteData?.id}`)
			.then((response) => {
				setDeletePopup(false);
				getJobToll();
				dispatch({
					type: DELETE_JOB_TOLL_CHARGE_SUCCESS,
					payload: response.data.data,
				});
				toast.success("Toll Deleted Successfully");
			})
			.catch((error) => {
				toast.error(error?.response?.data?.message);
				dispatch({ type: DELETE_JOB_TOLL_CHARGE_FAILURE, payload: error });
			});
	};
	const handleAddToll = (item) => {
		if (item) {
			setEdit(true);
			setEditToll(item);
		}
		setEditToll(schema.jobsToll);
		setOpenAddPopup(true);
	};

	const handleCloseToll = () => {
		setOpenAddPopup(false);
		setEdit(false);
	};

	const handleOpenToll = (item) => {
		setDeletePopup(true);
		setDeleteData(item);
	};
	return (
		<>
			<form noValidate autoComplete="off" className="custom-form">
				<div className={classes.weeklyMinimumHours}>
					<Loader
						loading={
							state.job?.updatingJobPriceMatrix ||
							state.job?.loadingJobPriceMatrix ||
							state.job?.loadingAdditionalCharge ||
							state.job?.updatingAdditionalCharges ||
							state.job?.loadingJobTollCharge
						}
					/>
					<FormControl component="fieldset" className="check-wrapper">
						<FormGroup aria-label="position" className="custom-checkbox">
							<FormControlLabel
								value="end"
								control={
									<Checkbox
										icon={<img src={uncheckedIcon} alt="CheckBox" />}
										checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
										checked={overWrite}
										onChange={(e) => setOverWrite(e.target.checked)}
									/>
								}
								label="Want to overwrite pricing matrix?"
								labelPlacement="end"
							/>
						</FormGroup>
					</FormControl>
				</div>
				{overWrite && (
					<div>
						{["Import", "Export", "Temp Control"].includes(
							props.jobsData?.jobTypes?.name
						) ? (
							<div className={classes.weeklyMinimumHours}>
								<div className={classes.TableWrapper}>
									{props.jobsData?.cargoTypes?.name === "ULD" ? (
										<UldTable
											uldData={data}
											handleChangeUld={handleChangeUldLoose}
											handleInputChange={handleInputChange}
											handleChargeChange={handleChargeChange}
											charge1={charge1}
											chargeType1={chargeType1}
											charge2={charge2}
											chargeType2={chargeType2}
											charge3={charge3}
											chargeType3={chargeType3}
											charge4={charge4}
											chargeType4={chargeType4}
											chargeError1={chargeError1}
											chargeError2={chargeError2}
											chargeError3={chargeError3}
											chargeError4={chargeError4}
											extraCharge={extraCharge}
										/>
									) : (
										<LooseTable
											handleChangeLoose={handleChangeUldLoose}
											looseData={data}
										/>
									)}
								</div>
							</div>
						) : props.jobsData?.jobTypes?.name === "Empty" ? (
							<div className={classes.weeklyMinimumHours}>
								<div className={classes.TableWrapper}>
									<EmptyTable
										handleEmpty={handleChangeUldLoose}
										emptyData={data}
									/>
								</div>
							</div>
						) : (
							<div className={classes.weeklyMinimumHours}>
								<div className={classes.TableWrapper}>
									<ConsignmentTable
										handleConsignment={handleChangeUldLoose}
										consignmentData={data}
									/>
								</div>
							</div>
						)}
					</div>
				)}
				{props.jobsData?.cargoTypes?.name === "ULD" && overWrite && (
					<div className={classes.TableWrapper}>
						<TableContainer component={Paper} className={classes.customTable}>
							<Table stickyHeader aria-label="simple table">
								<TableBody>
									<TableRow>
										<TableCell className="amount">
											<Checkbox
												icon={<img src={uncheckedIcon} alt="CheckBox" />}
												checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
												checked={extraCharge}
												onChange={(e) => setExtraCharge(!extraCharge)}
											/>
											ULD Hourly Charge
										</TableCell>
										<TableCell className="weight">
											<TextField
												name="charge5"
												variant="outlined"
												type="text"
												placeholder="Charge"
												value={charge5}
												onChange={(e) => handleInputChange(e)}
												onKeyPress={allowOnlyFloatFour}
											/>
											<FormHelperText className="error-text">
												{(chargeError5 !== "" && chargeError5) ||
													(!extraCharge && charge5 > 0
														? "Value must be zero"
														: "")}
											</FormHelperText>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
				<div className={classes.ButtonWrapper}>
					<Button
						className="blue-btn primary-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						type="submit"
						onClick={handleOverWriteSubmit}
					>
						Save
					</Button>
				</div>
			</form>
			<div className={classes.weeklyMinimumHours}>
				<div className="info-wrapper">
					<div className="add-more">
						<span onClick={handleAdd}>Add more..</span>
					</div>
				</div>
				<div className={classes.TableWrapper}>
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableBody>
								{addInfo.length === 0 ? (
									<TableRow>
										<TableCell>No Data Found</TableCell>
									</TableRow>
								) : (
									addInfo?.map((item, index) => {
										return (
											<TableRow key={index}>
												<TableCell className="amount">
													<FormControl variant="outlined">
														<Select
															name="additionalJobChargeTypes"
															displayEmpty
															className={materilClasses.customSelect}
															menuprops={{
																classes: { paper: materilClasses.customSelect },
															}}
															IconComponent={() => <ExpandMore />}
															placeholder="Select Type"
															value={item.additionalJobChargeTypes}
															onChange={(e) => handleChange(e, index)}
														>
															<MenuItem value={""} disabled>
																Select Charge Type
															</MenuItem>
															{state.common?.loadingAdditionalChargeType ? (
																<MenuItem>Loading...</MenuItem>
															) : (
																state.common.chargeTypeData?.map(
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
													</FormControl>
													<FormHelperText className="error-text">
														{item.flagAdditional === true &&
															item.typeErr !== "" &&
															item.typeErr}
													</FormHelperText>
												</TableCell>
												<TableCell className="weight">
													<TextField
														name="description"
														variant="outlined"
														type="text"
														placeholder="Description"
														value={item.description}
														onChange={(e) => handleChange(e, index)}
													/>
													<FormHelperText className="error-text">
														{item.flagDesc === true &&
															item.descErr !== "" &&
															item.descErr}
													</FormHelperText>
												</TableCell>
												<TableCell className="weight">
													<TextField
														name="charge"
														variant="outlined"
														type="text"
														placeholder="Charge"
														value={item.charge}
														onChange={(e) => handleChange(e, index)}
														onKeyPress={
															item.additionalJobChargeTypes === 3
																? allowNegativeOnlyFloat
																: allowOnlyFloat
														}
													/>
													<FormHelperText className="error-text">
														{item.flagCharge === true &&
															item.chargeErr !== "" &&
															item.chargeErr}
													</FormHelperText>
												</TableCell>
												<TableCell className="btn-weight">
													<Button
														className="blue-btn primary-btn"
														color="inherit"
														disableElevation
														underlinenone="true"
														onClick={() => handleDelete(index)}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										);
									})
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div className={classes.buttonArea}>
					<span className={classes.normal}>
						Please note: Manual Job Charge will not calculate Fuel Levy
						automatically.
					</span>
					<div className={classes.ButtonWrapper}>
						<Button
							className="blue-btn primary-btn"
							color="inherit"
							disableElevation
							underlinenone="true"
							onClick={handleclick}
						>
							Save
						</Button>
					</div>
				</div>

				{/* <div className={classes.ButtonWrapper}>
          <Button
            className="blue-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            onClick={() => handleAddToll("")}
          >
            Add Toll
          </Button>
        </div> */}

				<TollListing handleEdit={handleAddToll} handleOpen={handleOpenToll} />
				<TollPopup
					open={openAddPopup}
					handleClose={handleCloseToll}
					formik={formik}
					isEdit={isEdit}
				/>
				<DeletePopup
					open={openDeletePopup}
					handleClose={handleCloseDeletePopup}
					handleDelete={handleDeleteToll}
					loading={state.job?.deletingJobTollCharge}
				/>
				<div className="info-wrapper">
					<div className="span-wrapper2">
						<span>
							Job Charge -{" "}
							{state?.job?.additionalChargesData?.jobCharge
								? `$${parseFloat(
										state?.job?.additionalChargesData?.jobCharge
								  ).toLocaleString("en-US", {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
								  })}`
								: 0}
						</span>
					</div>
				</div>
				{/* https://wymap.atlassian.net/browse/MAPTRAK-1034 */}
				<div className="info-wrapper">
					<div className="span-wrapper2">
						<span>
							Job Net Charge -{" "}
							{state?.job?.additionalChargesData?.net
								? `$${parseFloat(
										state?.job?.additionalChargesData?.net
								  ).toLocaleString("en-US", {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
								  })}`
								: 0}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
export default PriceMatrix;
