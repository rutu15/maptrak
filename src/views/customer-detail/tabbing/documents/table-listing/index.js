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
import moment from "moment";

import { TableStyle } from "./style";
import { useStore } from "@store/store";

function TableListing(props) {
	const [state] = useStore();
	const classes = TableStyle();

	return (
		<>
			<div className={classes.TableWrapper}>
				<TableContainer component={Paper} className={classes.customTable}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="descripition">Document Name</TableCell>
								<TableCell className="amount">Upload Date</TableCell>
								<TableCell className="edit-link"></TableCell>
								<TableCell className="delete-link"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.customer?.documentList?.rows.length === 0 ? (
								<TableRow>
									<TableCell colSpan={4}>No Data Found</TableCell>
								</TableRow>
							) : (
								state.customer?.documentList?.rows.map((item, index) => (
									<TableRow key={index}>
										<TableCell className="descripition">
											{item.name || "-"}
										</TableCell>
										<TableCell className="amount">
											{moment(item.createdAt).format("YYYY-MM-DD") || "-"}
										</TableCell>
										<TableCell className="edit-link">
											<span
												onClick={() => props.handleDownload(item.documentPath)}
											>
												Download
											</span>
										</TableCell>
										<TableCell className="delete-link">
											<span onClick={() => props.handleOpen(item.id)}>
												Delete
											</span>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
}
export default TableListing;
