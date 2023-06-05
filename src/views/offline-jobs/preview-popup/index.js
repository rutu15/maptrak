import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	TableContainer,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@material-ui/core";

import { utcToTimezone } from "@utils/commonFunctions";
import closeIcon from "@assets/images/close.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
	const classes = AddPopupStyle();
	const [scroll] = useState("body");

	return (
		<>
			<Dialog open={props.open} className={classes.customModal} scroll={scroll}>
				<div className="close-modal">
					<img src={closeIcon} alt="Close" onClick={props.handleClose} />
				</div>
				<DialogTitle>Review Offline Job</DialogTitle>
				<div className={classes.TableWrapper}>
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableBody>
								<TableRow>
									<TableCell className="role-name">Customer</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.customerName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Driver Name</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.drivers?.name || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Description</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.description || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Job Type</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.jobTypeName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Cargo Type</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.cargoTypeName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">City</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.cities?.name || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">CTO</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.ctoName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Pickup Address</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.pickupAddress || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Delivery Address</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.deliveryAddress || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Truck Rego</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.truckRegoName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Trailer Rego</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.trailerRegoName || "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Started Time</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.startedAt
											? utcToTimezone(
													props.getPreviewData?.startedAt,
													props.getPreviewData?.cities?.timezone,
													"yyyy-MM-DD HH:mm:ss"
											  )
											: "-"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="role-name">Completed Time</TableCell>
									<TableCell className="status">
										{props.getPreviewData?.completedAt
											? utcToTimezone(
													props.getPreviewData?.completedAt,
													props.getPreviewData?.cities?.timezone,
													"yyyy-MM-DD HH:mm:ss"
											  )
											: "-"}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Dialog>
		</>
	);
}
export default Popup;
