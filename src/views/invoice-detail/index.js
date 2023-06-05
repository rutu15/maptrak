import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import moment from "moment";

import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import { routes } from "@utils/constant";
import {
	FETCH_INVOICE_DETAIL,
	FETCH_INVOICE_DETAIL_SUCCESS,
	FETCH_INVOICE_DETAIL_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { invoiceDetailStyle } from "./style";

function InvoiceDetail() {
	const classes = invoiceDetailStyle();
	const [state, dispatch] = useStore();
	const [data, setData] = useState([]);
	const { id } = useParams();
	const history = useHistory();

	let getInvoiceDetail = () => {
		dispatch({ type: FETCH_INVOICE_DETAIL });
		API.get(`invoices/${id}/preview`)
			.then((response) => {
				dispatch({
					type: FETCH_INVOICE_DETAIL_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_INVOICE_DETAIL_FAILURE,
					payload: error,
				});
				if (error?.response?.status === 404) {
					history.push(routes.pageNotFound);
				}
			});
	};
	useEffect(() => {
		getInvoiceDetail();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const arr = [];
		if (state?.invoice?.invoiceDetailData?.jobDetails) {
			Object.keys(state?.invoice?.invoiceDetailData?.jobDetails).map((item) => {
				arr.push({
					...state?.invoice?.invoiceDetailData?.jobDetails[item],
					date: item,
				});
				setData(arr);
				return true;
			});
		}
	}, [state?.invoice?.invoiceDetailData?.jobDetails]);
	return (
		<>
			<Header />
			<div className={classes.invoiceDetailWrapper}>
				<Loader loading={state.invoice?.loadingInvoiceDetail} />
				<div className="invoice-detail-page wrapper">
					<div className="inner-page">
						{/* <div className={classes.backLinkWrapper}>
              <span
                onClick={() => history.goBack()}
                className={classes.backToPage}
              >
                <ArrowBackIosIcon /> Back to Invoices
              </span>
            </div> */}

						<div className="invoice-detail-wrapper">
							<div className="content-wrapper">
								<div className="header">
									<div className="top-header clearfix">
										<div className="logo">
											<img
												src={
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.photo
												}
												alt="logo"
											/>
										</div>
										<div className="middle-title">
											<h1>Tax Invoice</h1>
											<p>
												{state?.invoice?.invoiceDetailData?.invoiceNumber
													? state?.invoice?.invoiceDetailData?.invoiceNumber
													: "TBA"}
											</p>
										</div>
										<div className="right-block">
											<p>
												<span>Issue Date:</span>
												<span>
													{state?.invoice?.invoiceDetailData?.invoiceDate}
												</span>
											</p>
											<p>
												<span>Date Payable:</span>
												<span>
													{moment(
														state?.invoice?.invoiceDetailData?.invoiceDate
													)
														.add(
															state?.invoice?.invoiceDetailData?.customers
																?.paymentTermDays,
															"day"
														)
														.format("YYYY-MM-DD")}
												</span>
											</p>
										</div>
									</div>
									<div className="bottom-header clearfix">
										<div className="left-block">
											<p>
												{
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.name
												}
											</p>
											<p>
												{` ${
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.address1
												}, ${
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.address2 || ""
												}, ${
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.suburb
												}, ${
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.states?.name
												}, ${
													state?.invoice?.invoiceDetailData?.childOrganisations
														?.postalCode
												}`}
											</p>
										</div>
										<div className="middle-block">
											<p>
												ABN :
												<span>
													{
														state?.invoice?.invoiceDetailData
															?.childOrganisations?.ABN
													}
												</span>
											</p>
											<p>
												Phone :
												<a href="tel:0293175722">
													{
														state?.invoice?.invoiceDetailData
															?.childOrganisations?.phone
													}
												</a>
											</p>
										</div>
										<div className="right-block">
											<p>
												Email :
												<a href="mailto:accounts@wymap.com">
													{
														state?.invoice?.invoiceDetailData
															?.childOrganisations?.email
													}
												</a>
											</p>
										</div>
									</div>
								</div>
								<div className="content-block">
									<div className="detail-block clearfix">
										<div className="left-block">
											<h2>Bill To</h2>
											<p>
												{state?.invoice?.invoiceDetailData?.customers?.name}
											</p>
											<p>
												{`${
													state?.invoice?.invoiceDetailData?.customers?.address
												} ${
													state?.invoice?.invoiceDetailData?.customers
														?.postalCode || ""
												}` || "-"}
											</p>
											<p className="purchase-order">
												{" "}
												Purchase Order:
												<span>
													{state?.invoice?.invoiceDetailData?.purchaseOrder ||
														"0"}
												</span>
											</p>
										</div>
										<div className="right-block">
											<div className="shipping-adress-block clearfix">
												<div className="inner-col first">
													<h2>Wymap Group EFT Details</h2>
													{/* https://wymap.atlassian.net/browse/MAPTRAK-927 hide BSB if no value found */}
													{state?.invoice?.invoiceDetailData?.childOrganisations
														?.BSB && (
														<p>
															BSB :{" "}
															{
																state?.invoice?.invoiceDetailData
																	?.childOrganisations?.BSB
															}
														</p>
													)}
													<p>
														Account Number :{" "}
														{
															state?.invoice?.invoiceDetailData
																?.childOrganisations?.accountNumber
														}
													</p>
													<p>
														Account Name :{" "}
														{
															state?.invoice?.invoiceDetailData
																?.childOrganisations?.accountName
														}
													</p>
													<p>
														Bank :{" "}
														{
															state?.invoice?.invoiceDetailData
																?.childOrganisations?.bank
														}
													</p>
												</div>
											</div>
										</div>
									</div>
									{data?.map((item, index) => {
										return (
											<div key={index}>
												<div className="gray-bg-title-strip clearfix">
													<h3>{moment(item.date).format("DD MMMM YYYY")}</h3>
													<div className="right-block">
														{/* https://wymap.atlassian.net/browse/MAPTRAK-1060  */}
														{/* <p>
                              Total Duration:
                              <span>
                                {item.totalDuration
                                  ? parseFloat(item.totalDuration / 60).toFixed(
                                      2
                                    )
                                  : "-"}
                              </span>
                            </p> */}
														<p>
															Chargeable Hours:
															<span>
																{item.chargableDuration
																	? parseFloat(
																			item.chargableDuration / 60
																	  ).toFixed(2)
																	: 0}
															</span>
														</p>
														<p>
															Total Quantity:<span>{item.totalQty}</span>
														</p>
														<p>
															Total Weight:<span>{item.totalWeight}</span>
														</p>
													</div>
												</div>
												<div className="table-responsive">
													<table>
														<thead>
															<tr>
																<th>Job ID</th>
																<th>Job Type</th>
																<th>Quantity</th>
																<th>Weight</th>
																<th>
																	Job <span>Duration</span>
																</th>
																<th>Job Charge</th>
																<th>Net</th>
																<th>Tax</th>
																<th>Gross</th>
															</tr>
														</thead>
														{item.jobs?.map((value, key) => {
															return (
																<tbody key={key}>
																	<tr className="main-data">
																		<td>
																			<Link
																				to={`${routes.jobDetail}/${value.id}`}
																			>
																				{value.id}
																			</Link>
																		</td>
																		<td>{value?.jobType?.name || "-"}</td>
																		<td>{value.quantity || "0"}</td>
																		<td>{value.weight || "0"}</td>
																		<td>
																			{value.jobDuration
																				? parseFloat(
																						value.jobDuration / 60
																				  ).toFixed(2)
																				: "-"}{" "}
																		</td>
																		<td>
																			$
																			{parseFloat(value.jobBasePrice).toFixed(
																				2
																			)}
																		</td>
																		<td>${parseFloat(value.net).toFixed(2)}</td>
																		<td>${parseFloat(value.tax).toFixed(2)}</td>
																		<td>
																			${parseFloat(value.gross).toFixed(2)}
																		</td>
																	</tr>
																	{(value.consignments?.length
																		? value.consignments
																		: value.airWaybills
																	)?.map((itm, indx) => {
																		return (
																			<tr key={indx}>
																				<td></td>
																				<td>{itm.number || "-"}</td>
																				<td>{itm.quantity || "-"}</td>
																				<td>{itm.weight || "-"}</td>
																				<td></td>
																				<td>
																					${parseFloat(itm.net).toFixed(2)}
																				</td>
																				<td></td>
																				<td></td>
																			</tr>
																		);
																	})}
																	<tr>
																		<td>{value.rego || "-"}</td>
																		<td>
																			{value.fuelSurcharge !== 0
																				? "Fuel Surcharge"
																				: ""}
																		</td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td>
																			<span>
																				{value.fuelSurcharge !== 0 ? "$" : ""}
																			</span>
																			{value.fuelSurcharge !== 0
																				? parseFloat(
																						value.fuelSurcharge
																				  ).toFixed(2)
																				: ""}
																		</td>
																		<td></td>
																		<td></td>
																	</tr>
																	<tr>
																		<td>{value.truckType || "-"}</td>
																		<td>
																			{value.tollCharge !== 0
																				? "Toll Charge"
																				: ""}
																		</td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td>
																			<span>
																				{value.tollCharge !== 0 ? "$" : ""}
																			</span>
																			{value.tollCharge !== 0
																				? `${parseFloat(
																						value.tollCharge
																				  ).toFixed(2)}`
																				: ""}
																		</td>
																		<td></td>
																		<td></td>
																	</tr>
																	{value.additionalCharge
																		? value.additionalCharge?.map(
																				(itm, indx) => {
																					return (
																						<tr key={indx}>
																							<td></td>
																							<td>{itm.title}</td>
																							<td></td>
																							<td></td>
																							<td></td>
																							<td>
																								$
																								{parseFloat(itm.net).toFixed(2)}
																							</td>
																							<td></td>
																							<td></td>
																						</tr>
																					);
																				}
																		  )
																		: ""}
																</tbody>
															);
														})}
														<tfoot>
															{item?.hasOwnProperty("dailyMinHrsSemi") ? (
																<tr className="diff-data">
																	<td colSpan={6}>
																		<p>
																			Diff amount due to daily min hrs of Semi
																			<span className="p-txt">
																				{" "}
																				(inc. fuel surcharge){" "}
																			</span>
																		</p>
																	</td>
																	<td>
																		{item.dailyMinHrsSemi?.net
																			? `$${parseFloat(
																					item.dailyMinHrsSemi?.net
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsSemi?.tax
																			? `$${parseFloat(
																					item.dailyMinHrsSemi?.tax
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsSemi?.gross
																			? `$${parseFloat(
																					item.dailyMinHrsSemi?.gross
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																</tr>
															) : (
																""
															)}
															{item?.hasOwnProperty("dailyMinHrsRigid") ? (
																<tr className="rigid-data">
																	<td colSpan={6}>
																		<p>
																			Diff amount due to daily min hrs of Rigid
																			<span className="p-txt">
																				{" "}
																				(inc. fuel surcharge){" "}
																			</span>
																		</p>
																	</td>
																	<td>
																		{item.dailyMinHrsRigid?.net
																			? `$${parseFloat(
																					item.dailyMinHrsRigid?.net
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsRigid?.tax
																			? `$${parseFloat(
																					item.dailyMinHrsRigid?.tax
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsRigid?.gross
																			? `$${parseFloat(
																					item.dailyMinHrsRigid?.gross
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																</tr>
															) : (
																""
															)}
															{item?.hasOwnProperty(
																"dailyMinHrsSemiConsignment"
															) ? (
																<tr className="diff-data">
																	<td colSpan={6}>
																		<p>
																			Diff amount due to daily consignment min
																			hrs of Semi
																			<span className="p-txt">
																				{" "}
																				(inc. fuel surcharge){" "}
																			</span>
																		</p>
																	</td>
																	<td>
																		{item.dailyMinHrsSemiConsignment?.net
																			? `$${parseFloat(
																					item.dailyMinHrsSemiConsignment?.net
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsSemiConsignment?.tax
																			? `$${parseFloat(
																					item.dailyMinHrsSemiConsignment?.tax
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsSemiConsignment?.gross
																			? `$${parseFloat(
																					item.dailyMinHrsSemiConsignment?.gross
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																</tr>
															) : (
																""
															)}
															{item?.hasOwnProperty(
																"dailyMinHrsRigidConsignment"
															) ? (
																<tr className="diff-data">
																	<td colSpan={6}>
																		<p>
																			Diff amount due to daily consignment min
																			hrs of Rigid
																			<span className="p-txt">
																				{" "}
																				(inc. fuel surcharge){" "}
																			</span>
																		</p>
																	</td>
																	<td>
																		{item.dailyMinHrsRigidConsignment?.net
																			? `$${parseFloat(
																					item.dailyMinHrsRigidConsignment?.net
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsRigidConsignment?.tax
																			? `$${parseFloat(
																					item.dailyMinHrsRigidConsignment?.tax
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																	<td>
																		{item.dailyMinHrsRigidConsignment?.gross
																			? `$${parseFloat(
																					item.dailyMinHrsRigidConsignment
																						?.gross
																			  ).toFixed(2)}`
																			: "$0.00"}
																	</td>
																</tr>
															) : (
																""
															)}
														</tfoot>
													</table>
												</div>
											</div>
										);
									})}
									{/* https://wymap.atlassian.net/browse/MAPTRAK-943 Update label */}
									{state?.invoice?.invoiceDetailData?.mivNet ? (
										<div className="gray-bg-title-strip total-invoice clearfix">
											<h3>Difference due to weekly minimum charge</h3>
											<div className="right-block">
												<p>
													{state?.invoice?.invoiceDetailData?.mivNet
														? `$${state?.invoice?.invoiceDetailData?.mivNet}`
														: "-"}
												</p>
												<p>
													{state?.invoice?.invoiceDetailData?.mivTax
														? `$${state?.invoice?.invoiceDetailData?.mivTax}`
														: "-"}
												</p>
												<p>
													{state?.invoice?.invoiceDetailData?.mivGross
														? `$${state?.invoice?.invoiceDetailData?.mivGross}`
														: "-"}
												</p>
											</div>
										</div>
									) : (
										""
									)}

									<div className="gray-bg-title-strip total-invoice clearfix">
										<h3>Total Invoice:</h3>
										<div className="right-block">
											<p>
												{state?.invoice?.invoiceDetailData?.net
													? `$${parseFloat(
															state?.invoice?.invoiceDetailData?.net
													  ).toFixed(2)}`
													: "$0.00"}
											</p>
											<p>
												{state?.invoice?.invoiceDetailData?.tax
													? `$${parseFloat(
															state?.invoice?.invoiceDetailData?.tax
													  ).toFixed(2)}`
													: "$0.00"}
											</p>
											<p>
												{state?.invoice?.invoiceDetailData?.gross
													? `$${parseFloat(
															state?.invoice?.invoiceDetailData?.gross
													  ).toFixed(2)}`
													: "$0.00"}
											</p>
										</div>
									</div>
								</div>
								<div className="footer">
									<p className="querie-link">
										Please contact
										<a href="mailto:accounts@wymap.com.au">
											accounts@wymap.com.au
										</a>
										should you have any invoice queries.
									</p>
									<p>
										“All transactions with Wymap Group are subject to our
										standard terms and conditions unless varied by written
										agreement. Terms are available on request or on the relevant
										business website.”
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default InvoiceDetail;
