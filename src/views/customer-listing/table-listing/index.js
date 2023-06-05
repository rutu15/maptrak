import React from "react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableSortLabel,
} from "@material-ui/core";

import Pagination from "@components/pagination";
import Loader from "@components/loader";
import { customerListingHeader, routes } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing(props) {
	const classes = TableStyle();
	return (
		<>
			<div className={classes.TableWrapper}>
				<Loader
					loading={props?.data?.loading || props?.data?.importingCustomerCsv}
				/>
				<TableContainer component={Paper} className={classes.customTable}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								{customerListingHeader.map((item, index) => {
									return (
										<TableCell key={index} className={item.className}>
											{item.title}
											{item.sort && (
												<TableSortLabel
													direction={
														props.orderBy === item.sortTitle
															? props.order
															: "desc"
													}
													active={true}
													onClick={(e) => props.handleSorting(e, item)}
												></TableSortLabel>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>

						<TableBody>
							{props?.data?.customers?.count === 0 ? (
								<TableRow className="no-data">
									<TableCell colSpan={7}>
										<span>No Data Found</span>
									</TableCell>
								</TableRow>
							) : (
								props?.data?.customers?.rows?.map((item, index) => (
									<TableRow key={index}>
										<TableCell className="customer">
											<Link to={`${routes.customerDetail}/${item.id}`}>
												{" "}
												{item.name ? item.name : "-"}
											</Link>
										</TableCell>
										<TableCell className="city">
											{item.cities ? item.cities.name : "-"}
										</TableCell>
										<TableCell className="oldCustomerNumber">
											{item.oldCustomerNumber ? item.oldCustomerNumber : "-"}
										</TableCell>
										<TableCell className="newCustomerNumber">
											{item.newCustomerNumber ? item.newCustomerNumber : "-"}
										</TableCell>
										<TableCell className="customerCategory">
											{item.customerCategories.name
												? item.customerCategories.name
												: "-"}
										</TableCell>
										<TableCell className="email">
											{item.email ? item.email : "-"}
										</TableCell>
										<TableCell className="phone">
											{item.phone ? item.phone : "-"}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{props?.data?.customers?.count !== 0 && (
					<div className="pagination-wrapper">
						<Pagination
							count={props.count}
							page={props.page}
							handleChangePage={props.handleChangePage}
							rowsPerPage={props.rowsPerPage}
							handleChangeRowsPerPage={props.handleChangeRowsPerPage}
						/>
					</div>
				)}
			</div>
		</>
	);
}
export default TableListing;
