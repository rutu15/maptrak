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
	// TableSortLabel,
} from "@material-ui/core";

import Pagination from "@components/pagination";
import Loader from "@components/loader";
import { offlineJobsHeading, routes } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing(props) {
	const classes = TableStyle();
	return (
		<>
			<div className={classes.TableWrapper}>
				<Loader loading={props?.data?.loadingOfflineJobs} />
				<TableContainer component={Paper} className={classes.customTable}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								{offlineJobsHeading.map((item, index) => {
									return (
										<TableCell key={index} className={item.className}>
											{item.title}
											{/* {item.sort && (
												<TableSortLabel
													direction={
														props.orderBy === item.sortTitle
															? props.order
															: "desc"
													}
													active={true}
													onClick={(e) => props.handleSorting(e, item)}
												></TableSortLabel>
											)} */}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>

						<TableBody>
							{props?.data?.offlineJobsData?.count === 0 ? (
								<TableRow className="no-data">
									<TableCell colSpan={5}>
										<span>No Data Found</span>
									</TableCell>
								</TableRow>
							) : (
								props?.data?.offlineJobsData?.rows?.map((item, index) => (
									<TableRow key={index}>
										<TableCell className="driverName">
											{item.drivers ? item.drivers.name : "-"}
										</TableCell>
										<TableCell className="city">
											{item.cities ? item.cities.name : "-"}
										</TableCell>
										<TableCell className="view-link">
											<span onClick={() => props.handleOpenPreview(item)}>
												View
											</span>
										</TableCell>
										<TableCell className="completed-job-link">
											<Link
												to={{
													pathname: `${routes.offlineJobDetail}/${item.id}`,
													state: item,
												}}
												target="_blank"
											>
												<span>Convert Offline Job</span>
											</Link>
										</TableCell>
										<TableCell className="delete-link">
											<span onClick={() => props.handleOpen(item)}>Delete</span>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{props?.count !== 0 && (
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
