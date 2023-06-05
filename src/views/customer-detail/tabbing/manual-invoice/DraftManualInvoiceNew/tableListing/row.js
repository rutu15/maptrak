import { useState, useEffect } from "react";
import {
	TableCell,
	TableRow,
	Collapse,
	Table,
	TableBody,
	FormControlLabel,
	Checkbox,
	FormControl,
	Button,
	TextField,
	Select,
	MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

import { useStore } from "@store/store";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { routes } from "@utils/constant";
import { allowAlphaNumeric } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";

function Row(props) {
	const materilClasses = materialCommonStyles();
	const [open, setOpen] = useState(false);
	const { row } = props;
	const [state] = useStore();

	const handleAccordian = () => {
		setOpen(!open);
		props.handleChange(row);
	};
	useEffect(() => {
		if (props.search !== "") {
			setOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.search]);
	useEffect(() => {
		if (props.open === true && props.data[props.index]?._rowChecked) {
			setOpen(true);
		} else {
			setOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.open, props.data[props.index]?._rowChecked]);
	return (
		<>
			<TableRow onClick={handleAccordian}>
				<TableCell className="check">
					<FormControlLabel
						className="custom-checkbox"
						control={
							<Checkbox
								key={row.id}
								icon={<img src={uncheckedIcon} alt="CheckBox" />}
								checkedIcon={<img src={checkedIconOrange} alt="CheckBox" />}
								checked={props.data[props.index]?._rowChecked === true && open}
								name="check"
							/>
						}
					/>
				</TableCell>
				<TableCell className="number">-</TableCell>
				<TableCell className="customer">{row.customers?.name || "-"}</TableCell>
				{/* <TableCell className="city">{row.cities?.name || "-"}</TableCell> */}
				<TableCell className="date">{row.invoiceDate || "-"}</TableCell>
				<TableCell className="organisation">-</TableCell>
				<TableCell className="purchase-order">-</TableCell>
				<TableCell className="gross">{row.gross || "-"}</TableCell>
				{/* <TableCell className="chat-column">-</TableCell> */}
				<TableCell className="update-btn">-</TableCell>
			</TableRow>
			<TableRow className="sub-row">
				<TableCell className="MuiTableSubRoW" colSpan={10}>
					<Collapse in={open}>
						<Table stickyHeader aria-label="simple table">
							<TableBody>
								{row?.childInvoice?.map((item, index) => {
									return (
										<TableRow key={index}>
											<TableCell className="check">-</TableCell>
											<TableCell
												className="number"
												onClick={() =>
													window.open(
														`${routes.invoiceDetail}/${item.id}`,
														"_blank"
													)
												}
											>
												{item.invoiceNumber || "view"}
											</TableCell>
											<TableCell className="customer">
												{item.customers?.name || "-"}
											</TableCell>
											{/* <TableCell className="city">-</TableCell> */}
											<TableCell className="date">
												<FormControl variant="outlined" className="date-cntrl">
													<MuiPickersUtilsProvider
														utils={DateFnsUtils}
														locale={enAU}
													>
														<KeyboardDatePicker
															key={index}
															name="invoiceDate"
															variant="inline"
															format="dd/MM/yyyy"
															placeholder="DD/MM/YYYY"
															className="custom-datepicker date-field"
															value={item.invoiceDate}
															onChange={(e) =>
																props.handleDateChange(
																	e,
																	props.index,
																	index,
																	"invoiceDate"
																)
															}
															autoOk
															keyboardIcon={
																<img src={calendarIcon} alt="calendar" />
															}
														/>
													</MuiPickersUtilsProvider>
												</FormControl>
											</TableCell>
											<TableCell className="organisation">
												<FormControl
													variant="outlined"
													className="purchase-form"
												>
													<Select
														id="childOrganisations"
														name="childOrganisations"
														displayEmpty
														className={materilClasses.customSelect}
														MenuProps={{
															classes: { paper: materilClasses.customSelect },
														}}
														IconComponent={() => <ExpandMore />}
														value={item?.childOrganisations?.id}
														onChange={(e) =>
															props.handleDateChange(
																e,
																props.index,
																index,
																"childOrganisations",
																item
															)
														}
													>
														{state?.organisation?.childOrganisationData?.rows?.map(
															(item, index) => {
																return (
																	<MenuItem key={index} value={item.id}>
																		{`${item.parentOrganisations?.name} - ${
																			item.name
																		}  ${
																			item.cities
																				? "- " + item.cities?.name
																				: ""
																		}`}
																	</MenuItem>
																);
															}
														)}
														{/* {state?.organisation?.childOrganisationData?.rows?.map(
                              (item, index) => {
                                return (
                                  <MenuItem key={index} value={item.id}>
                                    {item.parentOrganisations?.name}
                                  </MenuItem>
                                );
                              }
                            )} */}
													</Select>
												</FormControl>
											</TableCell>
											<TableCell className="purchase-order">
												<FormControl variant="outlined">
													<TextField
														key={index}
														className="purchase-form"
														placeholder="Purchase Order"
														variant="outlined"
														type="text"
														onKeyPress={allowAlphaNumeric}
														value={item.purchaseOrder ? item.purchaseOrder : ""}
														onChange={(e) =>
															props.handleDateChange(
																e,
																props.index,
																index,
																"purchaseOrder"
															)
														}
														error={true}
														helperText={item.error}
													/>
												</FormControl>
											</TableCell>

											<TableCell className="gross">
												{" "}
												{item.gross ? item.gross : "-"}
											</TableCell>
											{/* <TableCell className="chat-column">
                        <DiscussionThread
                          sendMessage={props.sendMessage}
                          rowId={item.id}
                          state={props.state}
                          handleMessage={props.handleMessage}
                          newMessage={props.newMessage}
                          messages={props.messages}
                          messagePage={props.messagePage}
                          setMessagePage={props.setMessagePage}
                          handleSearchedMessage={props.handleSearchedMessage}
                          searchMessage={props.searchMessage}
                          setSearchMessage={props.setSearchMessage}
                          messageSent={props.messageSent}
                          setMessageSent={props.setMessageSent}
                          openChat={props.openChat}
                          uploadFile={props.uploadFile}
                          image={props.image}
                          setImage={props.setImage}
                          chatType={props.chatType}
                          error={props.error}
                          loading={props.loading}
                          setOpenChat={props.setOpenChat}
                          setSenderId={props.setSenderId}
                        />
                      </TableCell> */}
											<TableCell className="update-btn">
												<Button
													className="blue-btn primary-btn"
													color="inherit"
													disableElevation
													onClick={() =>
														props.handleUpdate(props.index, index, item)
													}
													style={{ marginRight: "10px" }}
												>
													Update
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default Row;
