import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Menu, MenuItem, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import { routes } from "@utils/constant";
import { schema } from "@utils/schemas";
import { uploadImage } from "@utils/commonFunctions";
import validationSchema from "@utils/validationSchemas";
import {
	FETCH_JOB_CONSIGNMENT,
	FETCH_JOB_CONSIGNMENT_SUCCESS,
	FETCH_JOB_CONSIGNMENT_FAILURE,
	ADD_JOB_CONSIGNMENT,
	ADD_JOB_CONSIGNMENT_SUCCESS,
	ADD_JOB_CONSIGNMENT_FAILURE,
	UPLOAD_IMAGE_ADD_CONSIGNMENT,
	UPLOAD_IMAGE_ADD_CONSIGNMENT_SUCCESS,
	UPLOAD_IMAGE_ADD_CONSIGNMENT_FAILURE,
	EDIT_JOB_CONSIGNMENT,
	EDIT_JOB_CONSIGNMENT_SUCCESS,
	EDIT_JOB_CONSIGNMENT_FAILURE,
	DELETE_JOB_CONSIGNMENT,
	DELETE_JOB_CONSIGNMENT_SUCCESS,
	DELETE_JOB_CONSIGNMENT_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import AddConsignment from "./add-consignment";
// import AddCustomerConsignment from "./add-customer-consignment";
import ConsignmentsData from "./sidebar";
import { ConsignmentsStyle } from "./style";

function Consignments(props) {
	const classes = ConsignmentsStyle();
	// const [openCustomerConsignment, setOpenCustomerConsignment] = useState(false);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [initialValue, setInitialValue] = useState(schema.addConsignMentSchema);
	const [getIndex, setIndex] = useState("");
	const [isEdit, setEdit] = useState(false);
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState("");
	const [state, dispatch] = useStore();
	const [image, setImage] = useState(null);
	// const [, setSelectedArray] = useState([]);
	// const [mainCheck, setMainCheck] = useState(false);
	// const [dataTable, setData] = useState([
	//   {
	//     id: 1,
	//     number: "Consig. 1",
	//     weight: "55kg",
	//     qty: "99",
	//   },
	//   {
	//     id: 2,
	//     number: "Consig. 2",
	//     weight: "67kg",
	//     qty: "23",
	//   },
	// ]);
	const { id } = useParams();
	const history = useHistory();

	let data = (value) => {
		let obj = {
			number: value.number,
			quantity: value.quantity,
			weight: value.weight,
		};
		obj = {
			...obj,
			...(!!value.photo ? { photo: value.photo } : {}),
		};
		return obj;
	};

	// API calling to get list of consignment
	let getConsignment = () => {
		const params = {
			...(!!search ? { search } : {}),
		};
		if (
			["Metro", "Airside", "Transfer", "Ad-Hoc", "Interstate"].includes(
				props.jobsData?.jobTypes?.name
			)
		) {
			dispatch({ type: FETCH_JOB_CONSIGNMENT });
			API.get(`jobs/${id}/consignments`, { params })
				.then((response) => {
					dispatch({
						type: FETCH_JOB_CONSIGNMENT_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: FETCH_JOB_CONSIGNMENT_FAILURE, payload: error });
					if (error?.response?.status === 404) {
						history.push(routes.pageNotFound);
					}
				});
		}
	};

	// API calling to get list of reminders

	// API calling to get add consignment
	let addConsignment = (value) => {
		dispatch({ type: ADD_JOB_CONSIGNMENT });
		API.post(`jobs/${id}/consignments`, data(value))
			.then((response) => {
				dispatch({
					type: ADD_JOB_CONSIGNMENT_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getConsignment();
				toast.success("Consignment Added Successfully");
				setImage(null);
				props.getJobs();
			})
			.catch((error) => {
				dispatch({ type: ADD_JOB_CONSIGNMENT_FAILURE, payload: error });
				setError(error.response.data.message);
			});
	};

	// API calling to get edit consignment
	let editConsignment = (value) => {
		dispatch({ type: EDIT_JOB_CONSIGNMENT });
		API.put(`jobs/${id}/consignments/${value.id}`, data(value))
			.then((response) => {
				dispatch({
					type: EDIT_JOB_CONSIGNMENT_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getConsignment();
				toast.success("Consignment Updated Successfully");
				setImage(null);
				props.getJobs();
			})
			.catch((error) => {
				dispatch({ type: EDIT_JOB_CONSIGNMENT_FAILURE, payload: error });
				setError(error.response.data.message);
			});
	};

	// API calling to get delete consignment
	let deleteConsignment = (consignId) => {
		dispatch({ type: DELETE_JOB_CONSIGNMENT });
		API.delete(`jobs/${id}/consignments/${consignId}`)
			.then((response) => {
				dispatch({
					type: DELETE_JOB_CONSIGNMENT_SUCCESS,
					payload: response.data.data,
				});
				setDeletePopup(false);
				getConsignment();
				props.getJobs();
				toast.success("Consignment Deleted Successfully");
			})
			.catch((error) => {
				dispatch({ type: DELETE_JOB_CONSIGNMENT_FAILURE, payload: error });
				if (error.response.data.code === 409) {
					setError(error.response?.data?.message);
					toast.error(error.response?.data?.message);
				}
			});
	};

	useEffect(() => {
		getConsignment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDebouncedEffect(() => getConsignment(), 1000, [search]);
	const handleSearch = (event) => setSearch(event.target.value);

	const handleClick = (event, index) => {
		setIndex(index);
		setAnchorEl(event.currentTarget);
	};
	const handleCloseSidebar = () => setAnchorEl(null);
	const handleEditOpen = (item) => {
		setInitialValue({
			weight: item.weight,
			quantity: item.quantity,
			number: item.number,
			photo: "",
			id: item.id,
			weightLoaded: item.weightLoaded ? item.weightLoaded : 0,
			quantityLoaded: item.quantityLoaded ? item.quantityLoaded : 0,
			remainderQty: item.remainderQty ? item.remainderQty : 0,
			remainderReason: item.remainderReason ? item.remainderReason : "",
			viewPhoto: item.photo ? item.photo : "",
		});
		setOpen(true);
		setEdit(true);
		handleCloseSidebar();
	};

	const handleClickOpen = () => setOpen(true);
	const handleCloseDeletePopup = () => {
		setDeletePopup(false);
		setError("");
		setInitialValue({});
	};
	const handleClose = () => {
		setOpen(false);
		setEdit(false);
		setError("");
		setInitialValue(schema.addConsignMentSchema);
		formik.handleReset();
	};
	const handleDeleteOpenPopup = (item) => {
		setInitialValue({
			...initialValue,
			number: item.number,
			id: item.id,
		});
		setDeletePopup(true);
		setAnchorEl(null);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValue,
		validationSchema: isEdit
			? validationSchema.editConsignmentValidationSchema
			: validationSchema.addConsignmentValidationSchema,
		onSubmit: (value) => {
			if (image) {
				dispatch({
					type: UPLOAD_IMAGE_ADD_CONSIGNMENT,
				});
				uploadImage(image, image.target.files[0]?.type, "customer-logo")
					.then((res) => {
						value = {
							...value,
							...(!!res.data.fileName ? { photo: res.data.fileName } : {}),
						};
						isEdit ? editConsignment(value) : addConsignment(value);
						dispatch({
							type: UPLOAD_IMAGE_ADD_CONSIGNMENT_SUCCESS,
						});
					})
					.catch((err) => {
						dispatch({
							type: UPLOAD_IMAGE_ADD_CONSIGNMENT_FAILURE,
						});
						toast.error("Image Uploading Failed");
					});
			} else {
				value = {
					...value,
					photo: initialValue.viewPhoto
						? initialValue.viewPhoto?.split(".com/")[1]
						: "",
				};
				isEdit ? editConsignment(value) : addConsignment(value);
			}
		},
	});

	// Handle image
	const handleImage = (event, fileName, defaultText) => {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files[0];
			document.getElementById(fileName).innerHTML = file.name;
			setImage(event);
			formik.setFieldValue("photo", file);
		} else {
			document.getElementById(fileName).innerHTML = defaultText;
		}
	};
	// const handleClickCustomerConsignmentOpen = () =>
	//   setOpenCustomerConsignment(true);

	// const handleCloseCustomerConsignmentOpen = () => {
	//   setOpenCustomerConsignment(false);
	// };

	// To handle checkboxes of listing
	// const handleChange = (item) => {
	//   let _id = item.id;
	//   let index = dataTable.findIndex((x) => x.id === _id);
	//   let data = dataTable;
	//   if (index > -1) {
	//     let newState = !item._rowChecked;
	//     data[index]._rowChecked = newState;
	//     setData(data);
	//   }
	//   if (data.filter((res) => res._rowChecked === true).length === data.length) {
	//     setMainCheck(true);
	//   } else {
	//     setMainCheck(false);
	//   }
	//   let newarray = [];
	//   dataTable.map((res) => {
	//     if (res._rowChecked === true && res.isResolved !== true) {
	//       newarray.push(res.id);
	//     }
	//     return true;
	//   });
	//   setSelectedArray(newarray);
	// };

	// // To handle main checkbox
	// const handleMainChangeCheckBox = (e) => {
	//   let _val = e.target.checked;
	//   dataTable.forEach((element) => {
	//     element._rowChecked = _val;
	//   });
	//   setData(dataTable);
	//   setMainCheck(_val);
	//   let newmainarray = [];
	//   dataTable.map((res) => {
	//     if (res._rowChecked === true) {
	//       newmainarray.push(res.id);
	//     }
	//     return true;
	//   });
	//   setSelectedArray(newmainarray);
	// };
	return (
		<div className={classes.ConsignmentsWrapper}>
			<div className={classes.tabHeadingRow}>
				<div className={classes.searchWrapper}>
					<div className="form-gourp">
						<TextField
							placeholder="Search consignments"
							variant="outlined"
							type="search"
							value={search}
							onChange={handleSearch}
							InputProps={{
								endAdornment: <img src={SearchIcon} alt="Search" />,
							}}
						/>
					</div>
				</div>
				{/* <div className={classes.modalWrapper1}>
          <AddCustomerConsignment
            handleClickOpen={handleClickCustomerConsignmentOpen}
            open={openCustomerConsignment}
            handleClose={handleCloseCustomerConsignmentOpen}
            handleChange={handleChange}
            handleMainChange={handleMainChangeCheckBox}
            data={dataTable && dataTable}
            _maincheck={mainCheck}
          />
        </div> */}
				<div className={classes.modalWrapper1}>
					<AddConsignment
						formik={formik}
						handleClickOpen={handleClickOpen}
						handleClose={handleClose}
						open={open}
						handleImage={handleImage}
						isEdit={isEdit}
						error={error}
						jobsData={props.jobsData}
					/>
				</div>
			</div>
			<div className={classes.customCardWrapper}>
				{state.job.jobConsignmentData?.count === 0 ? (
					<div className="custom-card">
						<div className="card-header">
							<span className="heading-title">No Data found</span>
						</div>
					</div>
				) : (
					state.job.jobConsignmentData?.rows?.map((item, index) => {
						return (
							<div className="custom-card" key={index}>
								<div className="card-header">
									<span className="heading-title">{item.number}</span>
									<div className="bill-items-wrapper">
										<ConsignmentsData
											getIndex={item.id}
											getConsignment={() => getConsignment()}
											jobsData={props.jobsData}
											getJobs={() => props.getJobs()}
										/>
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
															onClick={() => handleDeleteOpenPopup(item)}
														>
															Delete
														</MenuItem>
													)}
												</Menu>
											</div>
										</div>
									</div>
								</div>
								<div className="card-body">
									<ul>
										{/* Added remainder tag https://wymap.atlassian.net/browse/MAPTRAK-854 */}
										<li>
											<Typography variant="h6">Remainder Reason:</Typography>
											<div className="value-block">
												<p>
													{item?.remainderQty > 0 && item?.remainderReason
														? item?.remainderReason
														: "-"}
												</p>
											</div>
										</li>
										<li>
											<Typography variant="h6">Weight:</Typography>
											<div className="value-block">
												<p>{item.weight ? `${item.weight} Kg` : "-"}</p>
											</div>
										</li>
										<li>
											<Typography variant="h6">Quantity:</Typography>
											<div className="value-block">
												<p>{item.quantity ? `${item.quantity}` : "-"}</p>
											</div>
											<Typography
												className={`${
													item.remainderQty > 0 ? "h1-red" : "h1-nrml"
												}`}
												variant="h6 new"
											>
												Loaded:
											</Typography>

											<div
												className={`${
													item.remainderQty > 0
														? "value-block-red"
														: "value-block1"
												}`}
											>
												<p>
													{item.quantityLoaded ? `${item.quantityLoaded}` : "0"}
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						);
					})
				)}
			</div>
			<DeletePopup
				open={openDeletePopup}
				handleClose={handleCloseDeletePopup}
				handleDelete={() => deleteConsignment(initialValue.id)}
				deleteUser={initialValue?.number}
				loading={state.job?.deletingJobConsignment}
				error={error}
			/>
		</div>
	);
}
export default Consignments;
