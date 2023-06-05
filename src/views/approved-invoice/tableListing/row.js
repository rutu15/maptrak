import { useState } from "react";
import {
	TableCell,
	TableRow,
	Collapse,
	Table,
	TableBody,
	Button,
} from "@material-ui/core";

import { routes } from "@utils/constant";
import { useStore } from "@store/store";
import {
	DOWNLOAD_APPROVED_INVOICES_PDF,
	DOWNLOAD_APPROVED_INVOICES_PDF_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_PDF_FAILURE,
	DOWNLOAD_APPROVED_INVOICES_CSV,
	DOWNLOAD_APPROVED_INVOICES_CSV_SUCCESS,
	DOWNLOAD_APPROVED_INVOICES_CSV_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";

function Row(props) {
	const [open, setOpen] = useState(false);
	const [, dispatch] = useStore();
	const { row } = props;

	// Handle open accordian
	const handleAccordian = () => {
		setOpen(!open);
	};

	const handleDownloadPDF = (link, id) => {
		if (link) {
			window.open(link, "_blank");
		} else {
			dispatch({ type: DOWNLOAD_APPROVED_INVOICES_PDF });
			API.get(`invoices/${id}/downloadInvoicePDF`)
				.then((response) => {
					dispatch({
						type: DOWNLOAD_APPROVED_INVOICES_PDF_SUCCESS,
					});
					window.open(response.data.data, "_blank");
				})
				.catch((error) => {
					dispatch({ type: DOWNLOAD_APPROVED_INVOICES_PDF_FAILURE });
				});
		}
	};

	const handleDownloadCSV = (id) => {
		dispatch({ type: DOWNLOAD_APPROVED_INVOICES_CSV });
		API.get(`invoices/${id}/downloadInvoiceCSV`)
			.then((response) => {
				dispatch({
					type: DOWNLOAD_APPROVED_INVOICES_CSV_SUCCESS,
				});
				window.open(response.data.data, "_blank");
			})
			.catch((error) => {
				dispatch({ type: DOWNLOAD_APPROVED_INVOICES_CSV_FAILURE });
			});
	};

	return (
		<>
			<TableRow onClick={handleAccordian}>
				<TableCell className="number">-</TableCell>
				<TableCell className="customer">{row.customers?.name || "-"}</TableCell>
				<TableCell className="city">{row.cities?.name || "-"}</TableCell>
				<TableCell className="date">{row.invoiceDate || "-"}</TableCell>
				<TableCell className="gross">{row.gross || "-"}</TableCell>
				<TableCell className="email-sent">-</TableCell>
				<TableCell className="invoice">-</TableCell>
				<TableCell className="invoice">-</TableCell>
			</TableRow>
			<TableRow className="sub-row">
				<TableCell className="MuiTableSubRoW" colSpan={10}>
					<Collapse in={open}>
						<Table stickyHeader aria-label="simple table">
							<TableBody>
								{row?.childInvoice?.map((item, index) => {
									return (
										<TableRow key={index}>
											<TableCell className="number">
												<span
													onClick={() =>
														window.open(
															`${routes.invoiceDetail}/${item.id}`,
															"_blank"
														)
													}
													className={item.isManual ? "textRedBg" : "textblueBg"}
												>
													{item.invoiceNumber || "-"}
												</span>
											</TableCell>
											<TableCell className="customer">
												{item.customers?.name || "-"}
											</TableCell>
											<TableCell className="city">-</TableCell>
											<TableCell className="date">
												{item.invoiceDate || "-"}
											</TableCell>
											<TableCell className="gross">
												{" "}
												{item.gross || "-"}
											</TableCell>
											<TableCell className="email-sent">
												{item.isEmailSent === true ? "Yes" : "No" || "-"}
											</TableCell>

											<TableCell className="invoice">
												<Button
													className="primary-btn blue-btn"
													variant="contained"
													color="primary"
													disableElevation
													onClick={() =>
														handleDownloadPDF(item.pdfLink, item.id)
													}
												>
													Download PDF
												</Button>
											</TableCell>

											<TableCell className="invoice">
												<Button
													className="primary-btn blue-btn"
													variant="contained"
													color="primary"
													disableElevation
													onClick={() => handleDownloadCSV(item.id)}
												>
													Download CSV
												</Button>
											</TableCell>
											<TableCell className="invoice">
												{item.isEmailSent === false && (
													<Button
														className="primary-btn blue-btn"
														variant="contained"
														color="primary"
														disableElevation
														onClick={() => props.handleSendEmail(item.id)}
													>
														Send Email
													</Button>
												)}
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
