import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import { TableStyle } from "./style";

function TableListing(props) {
	const classes = TableStyle();
	return (
		<div className={classes.TableWrapper} key={props.index}>
			<TableContainer component={Paper} className={classes.customTable}>
				<Table stickyHeader aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className="AWB">
								{["Import", "Export", "Empty", "Temp Control"].includes(
									props?.data?.jobTypes?.name
								)
									? "AWB"
									: "Consignment"}
							</TableCell>
							<TableCell className="quantity">Quantity</TableCell>
							<TableCell className="weight">Weight</TableCell>
							<TableCell className="charge">Charge</TableCell>
						</TableRow>
					</TableHead>

					{["Import", "Export", "Empty", "Temp Control"].includes(
						props?.data?.jobTypes?.name
					) ? (
						props?.data?.airWaybills.length === 0 ? (
							<TableBody>
								<TableRow>
									<TableCell>No Data Found</TableCell>
								</TableRow>
							</TableBody>
						) : (
							props?.data?.airWaybills?.map((item, index) => {
								return (
									<TableBody key={index}>
										<TableRow>
											<TableCell className="AWB">
												{item.number ? item.number : "-"}
											</TableCell>
											<TableCell className="quantity">
												{item.quantity ? item.quantity : 0}
											</TableCell>
											<TableCell className="weight">
												{item.weight ? item.weight : 0}
											</TableCell>
											{/* values update format https://wymap.atlassian.net/browse/MAPTRAK-872 */}
											<TableCell className="charge">
												{item.price
													? `$${parseFloat(item.price).toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
													  })}`
													: "-"}
											</TableCell>
										</TableRow>
									</TableBody>
								);
							})
						)
					) : props?.data?.consignments.length === 0 ? (
						<TableBody>
							<TableRow>
								<TableCell>No Data Found</TableCell>
							</TableRow>
						</TableBody>
					) : (
						props?.data?.consignments?.map((item, index) => {
							return (
								<TableBody key={index}>
									<TableRow>
										<TableCell className="Consignment">
											{item.number ? item.number : "-"}
										</TableCell>
										<TableCell className="quantity">
											{item.quantity ? item.quantity : 0}
										</TableCell>
										<TableCell className="weight">
											{item.weight ? item.weight : 0}
										</TableCell>
										<TableCell className="charge">
											{item.price ? item.price : 0}
										</TableCell>
									</TableRow>
								</TableBody>
							);
						})
					)}
				</Table>
			</TableContainer>
		</div>
	);
}
export default TableListing;
