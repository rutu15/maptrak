import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, FormControl, Select, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

// import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import calendarIcon from "@assets/images/calendar-icon.svg";
import {
	SEND_INVOICE_FOR_APPROVAL,
	SEND_INVOICE_FOR_APPROVAL_SUCCESS,
	SEND_INVOICE_FOR_APPROVAL_FAILURE,
	PREVIEW_INVOICE,
	PREVIEW_INVOICE_SUCCESS,
	PREVIEW_INVOICE_FAILURE,
	FETCH_CHILD_ORGANISATION,
	FETCH_CHILD_ORGANISATION_SUCCESS,
	FETCH_CHILD_ORGANISATION_FAILURE,
	FETCH_CUSTOMERS,
	FETCH_CUSTOMERS_SUCCESS,
	FETCH_CUSTOMERS_FAILURE,
	FETCH_CUSTOMER_MANUAL_INVOICES,
	FETCH_CUSTOMER_MANUAL_INVOICES_SUCCESS,
	FETCH_CUSTOMER_MANUAL_INVOICES_FAILURE,
	GENERATE_MANUAL_INVOICE,
	GENERATE_MANUAL_INVOICE_SUCCESS,
	GENERATE_MANUAL_INVOICE_FAILURE,
} from "@utils/actionTypes";
import { getPermissions } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import API from "@services/axios";
import Popup from "./popup";
import TableDetail from "./table-detail";
import { CurrentActivityStyle } from "./style";

function GenerateManualInvoice() {
	var currentDate = new Date();
	const materilClasses = materialCommonStyles();
	const [state, dispatch] = useStore();
	const classes = CurrentActivityStyle();
	// const [search, setSearch] = useState("");
	const [toDate, setTodate] = useState(null);
	const [fromDate, setFromDate] = useState(null);
	const [call, setCall] = useState(false);
	const [open, setOpen] = useState(false);
	// const [ids, setIds] = useState([]);
	const [organisation, setOrganisation] = useState("");
	const [sentId, setSentId] = useState([]);
	const [sentSingleId, setSentSingleId] = useState("");
	const [, setChange] = useState(0);
	const [customerName, setCustomerName] = useState(null);
	const { id } = useParams();

	const getChildAccounts = () => {
		console.log("getChildCustomer called");
		dispatch({ type: FETCH_CUSTOMERS });
		API.get("customers", {
			params: {
				filter: {
					parent: id,
					status: true,
				},
			},
		})
			.then((response) => {
				dispatch({
					type: FETCH_CUSTOMERS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
			});
	};

	// API calling to get current activites of customer
	let getCustomerActivities = () => {
		console.log("getCustomerActivity called");
		const params = {
			// ...(!!search ? { search } : {}),
			filter: {
				...(!!fromDate
					? { startDate: moment(fromDate).format("YYYY-MM-DD") }
					: {}),
				...(!!toDate ? { endDate: moment(toDate).format("YYYY-MM-DD") } : {}),
				// childCustomerId : customerName ? customerName : null
				// ...(customerName && { childCustomerId: customerName } )
			},
		};
		if (customerName && typeof customerName === "number") {
			params.filter.childCustomerId = customerName;
		}
		console.log("== params ", params);
		dispatch({ type: FETCH_CUSTOMER_MANUAL_INVOICES });
		API.get(`customers/${id}/manualInvoiceJobs`, { params })
			.then((response) => {
				dispatch({
					type: FETCH_CUSTOMER_MANUAL_INVOICES_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_CUSTOMER_MANUAL_INVOICES_FAILURE,
					payload: error,
				});
			});
	};

	// API calling to get list of child organisation
	let getChildOrganisation = () => {
		dispatch({ type: FETCH_CHILD_ORGANISATION });
		API.get("childOrganisations")
			.then((response) => {
				dispatch({
					type: FETCH_CHILD_ORGANISATION_SUCCESS,
					payload: response.data.data,
				});
				setOrganisation(
					response.data.data?.rows.find(
						(item) =>
							item?.cities?.id === state.customer?.customerByIdData?.cities?.id
					).id
				);
			})
			.catch((err) => {
				dispatch({ type: FETCH_CHILD_ORGANISATION_FAILURE, payload: err });
			});
	};

	// API calling to get review of invoices
	let getReviewInvoice = () => {
		dispatch({ type: PREVIEW_INVOICE });
		API.get(
			`customers/${id}/reviewInvoices`
			// {
			//   params: { parentInvoiceIds: JSON.stringify(ids) },
			// }
		)

			.then((response) => {
				dispatch({
					type: PREVIEW_INVOICE_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: PREVIEW_INVOICE_FAILURE,
					payload: error,
				});
			});
	};
	useEffect(() => {
		// getCustomerActivities();
		getChildOrganisation();
		getChildAccounts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (open) {
			getReviewInvoice();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	useEffect(() => {
		// if(fromDate && customerName){
		// if(call == true){
		getCustomerActivities();
		getChildOrganisation();
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromDate, customerName]);

	// useDebouncedEffect(() => getCustomerActivities(), 1000, [search]);

	// API calling to generate invoice of current activities
	const handleGenerateInvoice = () => {
		const params = {
			...(!!fromDate
				? { startDate: moment(fromDate).format("YYYY-MM-DD") }
				: {}),
			...(!!toDate ? { endDate: moment(toDate).format("YYYY-MM-DD") } : {}),
			// childCustomerId : customerName ? customerName : null
		};
		if (customerName && typeof customerName === "number") {
			params.childCustomerId = customerName;
		}
		console.log("== params ", params);
		dispatch({ type: GENERATE_MANUAL_INVOICE });
		API.post(
			`customers/${id}/generateManualInvoice`,
			{
				childOrganisationId: organisation,
			},
			{ params }
		)
			.then((response) => {
				dispatch({
					type: GENERATE_MANUAL_INVOICE_SUCCESS,
					payload: response.data.data,
				});
				getCustomerActivities();
				toast.success("Invoice Generated Successfully");
				setFromDate(null);
				setCustomerName(null);
				setCall(false);
			})
			.catch((error) => {
				toast.error(error?.response?.data?.message);
				dispatch({
					type: GENERATE_MANUAL_INVOICE_FAILURE,
					payload: error,
				});
			});
	};

	const handleSendApproval = (id) => {
		setSentSingleId(id);
		dispatch({ type: SEND_INVOICE_FOR_APPROVAL });
		API.put(`customers/${id}/sendToDraft`)
			.then((response) => {
				dispatch({
					type: SEND_INVOICE_FOR_APPROVAL_SUCCESS,
				});
				toast.success("Invoice Sent for Approval");
				getCustomerActivities();
				setSentId([...sentId, id]);
			})
			.catch((error) => {
				dispatch({
					type: SEND_INVOICE_FOR_APPROVAL_FAILURE,
				});
				toast.error(error.response.data.message);
			});
	};
	const handleFromDateChange = (date) => {
		if (date) {
			setFromDate(date);
			setTodate(moment(date).add(6, "day"));
		}
	};

	// const handleToDateChange = (date) => {
	//   setTodate(date);
	// };

	// const handleSearch = (e) => {
	//   setSearch(e.target.value);
	// };

	// const handlePopupOpen = () => {
	//   setOpen(true);
	//   setIds(
	//     (state.customer?.customerCurrentActivites?.invoices || []).map(
	//       (item) => item.id
	//     )
	//   );
	// };

	const handleClose = () => {
		setOpen(false);
	};

	// Menu data to get list of jobtypes for dropdown menu
	const menuData = [];
	state?.common?.jobTypeData?.map((item) => {
		menuData.push({
			label: item.name,
			value: item.id,
		});
		return true;
	});

	const handleOrganisation = (e) => {
		setOrganisation(e.target.value);
	};
	return (
		<div className={classes.CurrentActivityWrapper}>
			<Loader loading={state.customer.generatingManualInvoices} />

			<div className={classes.tabHeadingRow}>
				<div className="date-wrapper">
					<FormControl variant="outlined" className={classes.formControl}>
						<label className="label-text">Job Completion Date (From)</label>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
							<KeyboardDatePicker
								variant="inline"
								format="dd/MM/yyyy"
								value={fromDate}
								placeholder="DD/MM/YYYY"
								className="custom-datepicker"
								onChange={handleFromDateChange}
								onClose={() => setCall(true)}
								autoOk
								keyboardIcon={<img src={calendarIcon} alt="calendar" />}
								shouldDisableDate={(date) => date.getDay() !== 1}
								maxDate={
									new Date(
										currentDate.setDate(
											currentDate.getDate() - currentDate.getDay()
										)
									)
								}
							/>
						</MuiPickersUtilsProvider>
					</FormControl>
				</div>

				<div className="form-group">
					<FormControl variant="outlined" className={classes.selectOrg}>
						<label className="label-text">Child Accounts</label>
						<Select
							id="childCustomer"
							name="childCustomer"
							displayEmpty
							className={materilClasses.customSelect}
							MenuProps={{
								classes: { paper: materilClasses.customSelect },
							}}
							IconComponent={() => <ExpandMore />}
							value={customerName ? customerName : "Select Customer"}
							placeholder={customerName ? customerName : "Select Customer"}
							onChange={(e) => {
								console.log("console onChange ", e.target);
								setChange(1);
								setCustomerName(e.target.value);
							}}
						>
							<MenuItem value={"Select Customer"}>Select Customer</MenuItem>
							{state?.customer?.customers?.rows?.map((item, index) => {
								return (
									<MenuItem key={index} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
						{/* <FormHelperText className="error-text">
                    {props.formik.touched.childCustomer &&
                      props.formik.errors.childCustomer}
                  </FormHelperText> */}
					</FormControl>
				</div>
				{/* <div className="jobtype-wrapper">
          <FormControl variant="outlined" className={classes.formControl}>
            <label className="label-text">Search</label>
            <TextField
              id="search"
              placeholder="Search by AWB-Consg/rego"
              variant="outlined"
              type="text"
              value={search}
              onChange={handleSearch}
            />
          </FormControl>
        </div> */}
				{getPermissions() &&
					getPermissions().includes("raiseDraftInvoice") &&
					state.customer.customerManualInvoices?.count !== 0 && (
						<>
							{call === true ? (
								<div className="btn-wrapper">
									<div className="btn-inner-wrapper">
										<div className="send-draft-wrapper btn-inner1">
											<FormControl
												variant="outlined"
												className={classes.formControl}
											>
												<Select
													id="organisation"
													name="organisation"
													displayEmpty
													className={materilClasses.customSelect}
													MenuProps={{
														classes: { paper: materilClasses.customSelect },
													}}
													IconComponent={() => <ExpandMore />}
													value={organisation}
													onChange={handleOrganisation}
												>
													{state?.organisation?.childOrganisationData?.rows?.map(
														(item, index) => {
															return (
																<MenuItem key={index} value={item.id}>
																	{`${item.parentOrganisations?.name} - ${
																		item.name
																	}  ${
																		item.cities ? "- " + item.cities?.name : ""
																	}`}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</div>

										<div className="send-draft-wrapper btn-inner">
											<Button
												className="orange-btn primary-btn"
												color="inherit"
												disableElevation
												underlinenone="true"
												onClick={handleGenerateInvoice}
											>
												Generate Draft Invoice
											</Button>
										</div>
									</div>
									<div className="btn-inner-wrapper"></div>
								</div>
							) : (
								""
							)}

							<Popup
								open={open}
								handleClose={handleClose}
								handleSendApproval={handleSendApproval}
								sentId={sentId}
								sentSingleId={sentSingleId}
							/>
						</>
					)}
			</div>
			{state.customer.customerManualInvoices?.count !== 0 && call === true ? (
				<div className={classes.customCardWrapper}>
					<TableDetail />
				</div>
			) : (
				<div className={classes.customCardWrapper}>
					<div className="custom-card">
						<div className="card-header">
							<div className="right-card-header">No Data Found</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default GenerateManualInvoice;
