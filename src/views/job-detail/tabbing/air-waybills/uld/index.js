import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Button,
	SwipeableDrawer,
	Menu,
	MenuItem,
	Typography,
	CircularProgress,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";
import closeIcon from "@assets/images/close.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
	FETCH_AWB_ULD,
	FETCH_AWB_ULD_SUCCESS,
	FETCH_AWB_ULD_FAILURE,
	ADD_AWB_ULD,
	ADD_AWB_ULD_SUCCESS,
	ADD_AWB_ULD_FAILURE,
	EDIT_AWB_ULD,
	EDIT_AWB_ULD_SUCCESS,
	EDIT_AWB_ULD_FAILURE,
	DELETE_AWB_ULD,
	DELETE_AWB_ULD_SUCCESS,
	DELETE_AWB_ULD_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import AddULD from "./add-uld";
import { ULDsStyle } from "./style";

function ULDs(props) {
	const [open, setOpen] = useState(false);
	const [openDelete, setDeletePopup] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [error, setError] = useState("");
	const [getState, setState] = useState({ right: false });
	const [getIndex, setIndex] = useState("");
	const [initialValue, setInitialValue] = useState(schema.addULDSchema);
	const [anchorEl, setAnchorEl] = useState(null);
	const [state, dispatch] = useStore();
	const { id } = useParams();
	const classes = ULDsStyle();

	let data = (value) => {
		let obj = {
			number: value.uldNumber,
			quantity: value.quantity,
			overhang: value.overhang ? "Yes" : "No",
		};
		obj = {
			...obj,
			...(!!value.volume ? { volume: value.volume } : {}),
		};
		if (!obj.volume) delete obj.volume;
		return obj;
	};

	// API calling to get ULD
	let getAwbUld = () => {
		dispatch({ type: FETCH_AWB_ULD });
		API.get(`jobs/${id}/airWaybills/${props.getIndex}/ulds`)
			.then((response) => {
				dispatch({
					type: FETCH_AWB_ULD_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_AWB_ULD_FAILURE, payload: error });
			});
	};

	// API calling to add ULD
	let addAwbUld = (value) => {
		dispatch({ type: ADD_AWB_ULD });
		API.post(`jobs/${id}/airWaybills/${props.getIndex}/ulds`, data(value))
			.then((response) => {
				dispatch({
					type: ADD_AWB_ULD_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getAwbUld();
				props.getAirWayBills();
				props.getJobs();
				toast.success("ULD Added Successfully");
			})
			.catch((error) => {
				dispatch({ type: ADD_AWB_ULD_FAILURE, payload: error });
				setError(error.response.data.message);
			});
	};

	// API calling to edit ULD
	let editAwbUld = (value) => {
		dispatch({ type: EDIT_AWB_ULD });
		API.put(
			`jobs/${id}/airWaybills/${props.getIndex}/ulds/${value.id}`,
			data(value)
		)
			.then((response) => {
				dispatch({
					type: EDIT_AWB_ULD_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getAwbUld();
				props.getAirWayBills();
				props.getJobs();
				toast.success("ULD Updated Successfully");
			})
			.catch((error) => {
				dispatch({ type: EDIT_AWB_ULD_FAILURE, payload: error });
				setError(error.response.data.message);
			});
	};

	// API calling to delete ULD
	let deleteAwbUld = (value) => {
		dispatch({ type: DELETE_AWB_ULD });
		API.delete(`jobs/${id}/airWaybills/${props.getIndex}/ulds/${value}`)
			.then((response) => {
				dispatch({
					type: DELETE_AWB_ULD_SUCCESS,
					payload: response.data.data,
				});
				closeDeletePopup();
				getAwbUld();
				props.getJobs();
				props.getAirWayBills();
				toast.success("ULD Deleted Successfully");
			})
			.catch((error) => {
				dispatch({ type: DELETE_AWB_ULD_FAILURE, payload: error });
				setError(error.response.data.message);
			});
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValue,
		validationSchema: validationSchema.addULDValidationSchema,
		onSubmit: (value) => {
			isEdit ? editAwbUld(value) : addAwbUld(value);
		},
	});

	// To open drawer of uld
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...getState, [anchor]: open });
		if (open) getAwbUld();
	};

	const handleClick = (event, index) => {
		setIndex(index);
		setAnchorEl(event.currentTarget);
	};

	const handleCloseSidebar = () => setAnchorEl(null);
	const handleClickOpen = () => setOpen(true);

	const handleClose = () => {
		setEdit(false);
		setOpen(false);
		setError("");
		formik.handleReset();
		setInitialValue(schema.addULDSchema);
	};

	const openDeletePopup = (item) => {
		setDeletePopup(true);
		setAnchorEl(null);
		setInitialValue({
			...initialValue,
			id: item.id,
			number: item.number,
		});
	};

	const closeDeletePopup = () => {
		setDeletePopup(false);
		setError("");
	};

	const handleEditOpen = (item) => {
		setAnchorEl(null);
		setOpen(true);
		setEdit(true);

		setInitialValue({
			uldNumber: item.number?.replace(/ /g, "")?.replace(/-/g, ""),
			quantity: item.quantity,
			volume: item.volume,
			overhang: item.overhang === "Yes" ? true : false,
			id: item.id,
		});
	};
	return (
		<div className={classes.ULDsWrapper}>
			{["right"].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button
						className="primary-btn blue-btn lg"
						variant="contained"
						color="primary"
						disableElevation
						onClick={toggleDrawer(anchor, true)}
					>
						ULD
					</Button>
					<SwipeableDrawer
						className={classes.drawerWrapper}
						anchor={anchor}
						open={getState[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						<div className="drawer-wrapper">
							<div className="filter-title-block form-group">
								<Typography variant="h2">ULDs</Typography>
								<img
									src={closeIcon}
									alt="Close"
									onClick={toggleDrawer(anchor, false)}
								/>
							</div>
							<AddULD
								formik={formik}
								open={open}
								handleClickOpen={handleClickOpen}
								handleClose={handleClose}
								isEdit={isEdit}
								error={error}
								jobsData={props.jobsData}
							/>
							<div className="uld-list-wrapper">
								{state.job.loadingAwbUld ? (
									<div className="circular-progress">
										<CircularProgress color="inherit" size={60} />
									</div>
								) : state.job.awbUldData?.count === 0 ? (
									<div className="uld-list-item">
										<span className="uld-id">No Items Found</span>
									</div>
								) : (
									state.job.awbUldData?.rows?.map((item, index) => {
										return (
											<div className="uld-list-item" key={index}>
												<span className="uld-id">
													{`${item.number
														?.replace(/ /g, "")
														?.replace(/-/g, "")} (${
														item.uldType ? item.uldType.name : "-"
													})`}{" "}
												</span>
												<div className={classes.moreLinkWrapper}>
													<div className="more-link-block">
														<span
															className="more-link"
															aria-controls="menu"
															aria-haspopup="true"
															onClick={(e) => handleClick(e, index)}
														>
															<MoreVertIcon />
														</span>
														<Menu
															id="simple-menu"
															anchorEl={anchorEl}
															keepMounted
															open={getIndex === index && Boolean(anchorEl)}
															onClose={handleCloseSidebar}
															className={classes.customMenu}
															menuprops={{
																classes: { paper: classes.customMenu },
															}}
														>
															<MenuItem onClick={() => handleEditOpen(item)}>
																{props.jobsData?.invoiceGenerated === false
																	? "Edit"
																	: "View"}
															</MenuItem>
															{props.jobsData?.invoiceGenerated === false && (
																<MenuItem
																	onClick={(e) => openDeletePopup(item)}
																>
																	Delete
																</MenuItem>
															)}
														</Menu>
													</div>
												</div>
											</div>
										);
									})
								)}
							</div>
						</div>
						<DeletePopup
							open={openDelete}
							handleClose={closeDeletePopup}
							handleDelete={() => deleteAwbUld(initialValue.id)}
							deleteUser={initialValue.number}
							loading={state.job.deletingAwbUld}
							error={error}
						/>
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	);
}

export default ULDs;
