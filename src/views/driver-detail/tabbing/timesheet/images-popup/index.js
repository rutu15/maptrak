import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { AddPopupStyle } from "./style";

function ImagesPopup(props) {
	const classes = AddPopupStyle();
	const [scroll] = useState("body");
	const [state] = useStore();

	return (
		<>
			<Dialog open={props.open} className={classes.customModal} scroll={scroll}>
				<div className="close-modal">
					<img src={closeIcon} alt="Close" onClick={props.handleClose} />
				</div>
				<DialogTitle>Sign Out Images</DialogTitle>
				<div className={classes.TableWrapper}>
					<TableContainer component={Paper} className={classes.customTable}>
						<Table stickyHeader aria-label="simple table">
							<TableBody>
								{state?.driver?.driverTimeSheetData?.signOutImages?.length ===
								0 ? (
									<TableRow>
										<TableCell className="role-name">No Data Found</TableCell>
									</TableRow>
								) : (
									state?.driver?.driverTimeSheetData?.signOutImages?.map(
										(item, index) => {
											return (
												<TableRow key={index}>
													<TableCell className="status">
														<Link
															to={{
																pathname: `${item?.photo}`,
															}}
															target="_blank"
														>
															{`PHOTO ${index + 1}`}
														</Link>
													</TableCell>
												</TableRow>
											);
										}
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Dialog>
		</>
	);
}
export default ImagesPopup;
