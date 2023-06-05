import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { TextField, Typography, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFormik } from "formik";
import moment from "moment";

import { useStore } from "@store/store";
import { useDebouncedEffect } from "@hooks/debounceEffect";
import {
	FETCH_AIR_WAY_BILLS,
	FETCH_AIR_WAY_BILLS_SUCCESS,
	FETCH_AIR_WAY_BILLS_FAILURE,
	ADD_AWB,
	ADD_AWB_SUCCESS,
	ADD_AWB_FAILURE,
	EDIT_AWB,
	EDIT_AWB_SUCCESS,
	EDIT_AWB_FAILURE,
	DELETE_AWB,
	DELETE_AWB_SUCCESS,
	DELETE_AWB_FAILURE,
} from "@utils/actionTypes";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import { schema } from "@utils/schemas";
import { routes } from "@utils/constant";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import AddAirWayBill from "./add-bill";
// import AddCustomerAWB from "./add-customer-awb";
import { AirWayBillStyle } from "./style";
import ULD from "./uld";
import Loose from "./loose";

function AirWayBill(props) {
	const classes = AirWayBillStyle();
	const [openAddAwb, setOpenAddAwb] = useState(false);
	// const [openCustomerAwb, setOpenCustomerAwb] = useState(false);
	const [search, setSearch] = useState("");
	const [initialValue, setInitialValue] = useState(schema.addAirWayBillSchema);
	const [getIndex, setIndex] = useState("");
	const [isEditAwb, setEditAwb] = useState(false);
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState("");
	// const [, setSelectedArray] = useState([]);
	// const [mainCheck, setMainCheck] = useState(false);
	// const [dataTable, setData] = useState([
	//   {
	//     id: 1,
	//     awb: "123-456",
	//     airline: "SQ airline",
	//     weight: "45Kg",
	//     qty: "68",
	//     readyDate: "12/12/2021",
	//     readyTime: "12:00 pm",
	//     cutoffTime: "01:00 pm",
	//   },
	//   {
	//     id: 2,
	//     awb: "456-789",
	//     airline: "Sunrise airline",
	//     weight: "59kg",
	//     qty: "97",
	//     readyDate: "13/12/2021",
	//     readyTime: "02:00 pm",
	//     cutoffTime: "07:00 am",
	//   },
	// ]);
	const [state, dispatch] = useStore();
	const { id } = useParams();
	const history = useHistory();

	// https://wymap.atlassian.net/browse/MAPTRAK-1051
	const data = (value) => {
		let obj = {
			id: value.id,
			number: value.number,
		};
		obj = {
			...obj,
			...(!!value.weight ? { weight: value.weight } : {}),
			...(!!value.flight ? { flight: value.flight } : {}),
			...(!!value.quantity ? { quantity: value.quantity } : {}),
			...(!!value.readyDate
				? { readyDate: moment(value.readyDate).format("YYYY-MM-DD") }
				: {}),
			...(!!value.readyTime
				? { readyTime: moment(value.readyTime).format("HH:mm:ss") }
				: {}),
			...(!!value.cutOffTime
				? { cutOffTime: moment(value.cutOffTime).format("HH:mm:ss") }
				: {}),
		};
		return obj;
	};

	// API calling to get airway bills
	let getAirWayBills = () => {
		const params = {
			...(!!search ? { search } : {}),
		};
		if (
			["Import", "Export", "Temp Control"].includes(
				props.jobsData?.jobTypes?.name
			)
		) {
			dispatch({ type: FETCH_AIR_WAY_BILLS });
			API.get(`jobs/${id}/airWaybills`, { params })
				.then((response) => {
					dispatch({
						type: FETCH_AIR_WAY_BILLS_SUCCESS,
						payload: response.data.data,
					});
				})
				.catch((error) => {
					dispatch({ type: FETCH_AIR_WAY_BILLS_FAILURE, payload: error });
					if (error?.response?.status === 404) {
						history.push(routes.pageNotFound);
					}
				});
		}
	};

	// API calling to add AWB
	let addAWB = (value) => {
		dispatch({ type: ADD_AWB });
		API.post(`jobs/${id}/airWaybills`, data(value))
			.then((response) => {
				dispatch({
					type: ADD_AWB_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getAirWayBills();
				toast.success("AirWayBill Added Successfully");
				props.getJobs();
			})
			.catch((err) => {
				dispatch({ type: ADD_AWB_FAILURE, payload: err });
				setError(err.response.data.message);
			});
	};

	// API calling to edit AWB
	let editAWB = (value) => {
		dispatch({ type: EDIT_AWB });
		API.put(`jobs/${id}/airWaybills/${value.id}`, data(value))
			.then((response) => {
				dispatch({
					type: EDIT_AWB_SUCCESS,
					payload: response.data.data,
				});
				handleClose();
				getAirWayBills();
				toast.success("AirWayBill Updated Successfully");
				props.getJobs();
			})
			.catch((err) => {
				dispatch({ type: EDIT_AWB_FAILURE, payload: err });
				setError(err.response.data.message);
			});
	};

	// API calling to delete AWB
	let deleteAWB = (value) => {
		dispatch({ type: DELETE_AWB });
		API.delete(`jobs/${id}/airWaybills/${value}`)
			.then((response) => {
				setDeletePopup(false);
				getAirWayBills();
				dispatch({
					type: DELETE_AWB_SUCCESS,
					payload: response.data.data,
				});
				toast.success("AirwayBill Deleted Successfully");
				props.getJobs();
			})
			.catch((error) => {
				if (error.response.data.code === 409) {
					setError(error.response?.data?.message);
					toast.error(error.response?.data?.message);
				}
				dispatch({ type: DELETE_AWB_FAILURE, payload: error });
			});
	};

	useEffect(() => {
		getAirWayBills();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDebouncedEffect(() => getAirWayBills(), 1000, [search]);
	const handleSearch = (event) => setSearch(event.target.value);
	const handleCloseSidebar = () => setAnchorEl(null);

	const handleClick = (event, index) => {
		setIndex(index);
		setAnchorEl(event.currentTarget);
	};

	// To handle and prefill initial value while editing AWB
	const handleEditOpen = (item) => {
		setInitialValue({
			number: item.number,
			flight: item.flight,
			weight: item.weight ? item.weight : "",
			quantity: item.quantity ? item.quantity : "",
			readyDate: item.readyDate ? item.readyDate : null,
			readyTime: item.readyTime ? moment(item.readyTime, "hh:mm:ss") : null,
			cutOffTime: item.cutOffTime ? moment(item.cutOffTime, "hh:mm:ss") : null,
			weightLoaded: item.weightLoaded ? item.weightLoaded : 0,
			quantityLoaded: item.quantityLoaded ? item.quantityLoaded : 0,
			remainderQty: item.remainderQty ? item.remainderQty : 0,
			remainderReason: item.remainderReason ? item.remainderReason : "",
			id: item.id ? item.id : "",
		});
		setOpenAddAwb(true);
		setEditAwb(true);
		handleCloseSidebar();
	};

	const handleClickOpen = () => setOpenAddAwb(true);
	// const handleClickCustomerAwbOpen = () => setOpenCustomerAwb(true);

	const handleClose = () => {
		setOpenAddAwb(false);
		setEditAwb(false);
		setError("");
		setInitialValue(schema.addAirWayBillSchema);
		awbFormik.handleReset();
	};

	// const handleCloseCustomerAwb = () => {
	//   setOpenCustomerAwb(false);
	// };

	const handleDeleteOpenPopup = (item) => {
		setInitialValue({
			...initialValue,
			id: item.id,
			number: item.number,
		});
		setDeletePopup(true);
		setAnchorEl(null);
	};

	const closeDeletePopup = () => {
		setError("");
		setDeletePopup(false);
	};
	const awbFormik = useFormik({
		enableReinitialize: true,
		initialValues: initialValue,
		validationSchema: validationSchema.addAirWayBillValidationSchema,
		onSubmit: (value) => {
			isEditAwb ? editAWB(value) : addAWB(value);
		},
	});

	// // To handle checkboxes of listing
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
		<div className={classes.AirWayBillWrapper}>
			<div className={classes.tabHeadingRow}>
				<div className={classes.searchWrapper}>
					<div className="form-gourp">
						<TextField
							id="search-request"
							placeholder="Search air waybills"
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
          <AddCustomerAWB
            handleClickOpen={handleClickCustomerAwbOpen}
            open={openCustomerAwb}
            handleClose={handleCloseCustomerAwb}
            handleChange={handleChange}
            handleMainChange={handleMainChangeCheckBox}
            data={dataTable && dataTable}
            _maincheck={mainCheck}
          />
        </div> */}
				<div className={classes.modalWrapper1}>
					<AddAirWayBill
						formik={awbFormik}
						handleClickOpen={handleClickOpen}
						open={openAddAwb}
						handleClose={handleClose}
						isEdit={isEditAwb}
						error={error}
						jobsData={props.jobsData}
					/>
				</div>
			</div>
			{props.jobsData?.cargoTypes?.name === "ULD" ? (
				<div className={classes.customCardWrapper}>
					{state.job.airWayBillData?.count === 0 ? (
						<div className="custom-card">
							<div className="card-header">
								<span className="heading-title">No Data found</span>
							</div>
						</div>
					) : (
						state.job.airWayBillData?.rows?.map((item, index) => {
							return (
								<div className="custom-card" key={index}>
									<div className="card-header">
										<span className="heading-title">{item.number}</span>
										<div className="bill-items-wrapper">
											<ULD
												getIndex={item.id}
												jobsData={props.jobsData}
												getAirWayBills={getAirWayBills}
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
														anchorOrigin={{
															vertical: "top",
															horizontal: "left",
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
													<p>{item.weight ? `${item.weight} Kg` : "-"} </p>
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
														{item.quantityLoaded
															? `${item.quantityLoaded}`
															: "0"}
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
			) : (
				<div className={classes.customCardWrapper}>
					{state.job.airWayBillData?.count === 0 ? (
						<div className="custom-card">
							<div className="card-header">
								<span className="heading-title">No Data found</span>
							</div>
						</div>
					) : (
						state?.job?.airWayBillData?.rows?.map((data, index) => (
							<div className="custom-card" key={index}>
								<div className="card-header">
									<span className="heading-title">{data.number}</span>
									<div className={classes.moreLinkWrapper}>
										<div className="bill-items-wrapper">
											<Loose
												getIndex={data.id}
												jobsData={props.jobsData}
												getAirWayBills={getAirWayBills}
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
														id={data.index}
														anchorEl={anchorEl}
														keepMounted
														open={getIndex === index && Boolean(anchorEl)}
														onClose={handleCloseSidebar}
														className={classes.customMenu}
														menuprops={{
															classes: { paper: classes.customMenu },
														}}
													>
														<MenuItem onClick={() => handleEditOpen(data)}>
															{props.jobsData?.invoiceGenerated === false
																? "Edit"
																: "View"}
														</MenuItem>
														{props.jobsData?.invoiceGenerated === false && (
															<MenuItem
																onClick={() => handleDeleteOpenPopup(data)}
															>
																Delete
															</MenuItem>
														)}
													</Menu>
												</div>
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
												<p>{data?.remainderReason || "-"}</p>
											</div>
										</li>
										<li>
											<Typography variant="h6">Weight:</Typography>
											<div className="value-block">
												<p>{data.weight ? `${data.weight} Kg` : "-"}</p>
											</div>
										</li>
										<li>
											<Typography variant="h6">Quantity:</Typography>
											<div className="value-block">
												<p>{data.quantity ? `${data.quantity}` : "-"}</p>
											</div>
											<Typography
												className={`${
													data.remainderQty > 0 ? "h1-red" : "h1-nrml"
												}`}
												variant="h6 new"
											>
												Loaded:
											</Typography>
											<div
												className={`${
													data.remainderQty > 0
														? "value-block-red"
														: "value-block1"
												}`}
											>
												<p>
													{data.quantityLoaded ? `${data.quantityLoaded}` : "0"}
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						))
					)}
				</div>
			)}
			<DeletePopup
				open={openDeletePopup}
				handleClose={closeDeletePopup}
				handleDelete={() => deleteAWB(initialValue.id)}
				deleteUser={initialValue.number}
				loading={state.job?.deletetingAWB}
				error={error}
			/>
		</div>
	);
}
export default React.memo(AirWayBill);
