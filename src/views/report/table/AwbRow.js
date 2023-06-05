import { useState } from "react";
import {
	TableCell,
	TableRow,
	Collapse,
	Table,
	TableBody,
} from "@material-ui/core";
import { utcToTimezone } from "@utils/commonFunctions";
import { routes } from "@utils/constant";

function AwbRow(props) {
	const [open, setOpen] = useState(true);
	const { row, unique } = props;

	return (
		<>
			<TableRow onClick={() => setOpen(!open)} key={unique}>
				<TableCell
					className={
						parseInt(row?.totalQty) > parseInt(row?.loadedQty)
							? "awb-number awb-number-red"
							: "awb-number"
					}
				>
					{row.number ? row.number : "-"}
				</TableCell>
				<TableCell className="jobId-cell">-</TableCell>
				<TableCell className="jobType">-</TableCell>
				<TableCell className="reportType">-</TableCell>
				<TableCell className="job-started-date">-</TableCell>
				<TableCell className="job-completed-date">-</TableCell>
				<TableCell className="total-qty">
					{row.totalQty >= 0 && row.totalQty !== null ? row.totalQty : "-"}
				</TableCell>
				<TableCell className="total-weight">
					{row.totalWeight >= 0 && row.totalWeight !== null
						? Number.isInteger(row.totalWeight)
							? row.totalWeight
							: row.totalWeight.toFixed(2)
						: "-"}
				</TableCell>
				<TableCell className="loaded-qty">
					{row.loadedQty ? row.loadedQty : "-"}
				</TableCell>
				<TableCell className="loaded-weight">
					{row.loadedWeight >= 0 && row.loadedWeight !== null
						? Number.isInteger(row.loadedWeight)
							? row.loadedWeight
							: row.loadedWeight.toFixed(2)
						: "-"}
				</TableCell>
				<TableCell className="remainder-reason">-</TableCell>
				<TableCell className="cto">-</TableCell>
				<TableCell className="jobStatus">-</TableCell>
				<TableCell className="run-sheet">-</TableCell>
			</TableRow>
			<TableRow className="sub-row">
				<TableCell className="MuiTableSubRoW" colSpan={14}>
					<Collapse in={open}>
						<Table stickyHeader aria-label="simple table">
							{row?.jobs?.map((item, index) => {
								return (
									<TableBody key={index}>
										<TableRow>
											<TableCell className="awb-number">-</TableCell>
											<TableCell
												className="jobId-cell"
												onClick={() =>
													window.open(`${routes.jobDetail}/${item.jobId}`)
												}
											>
												{item.jobId ? item.jobId : "-"}
											</TableCell>
											<TableCell className="jobType">
												{item.jobType ? item.jobType : "-"}
											</TableCell>
											<TableCell className="reportType">
												{item.cargoType ? item.cargoType : "-"}
											</TableCell>
											<TableCell className="job-started-date">
												{item.jobStartedDate
													? utcToTimezone(
															item.jobStartedDate,
															item.timezone,
															"DD/MM/YYYY"
													  )
													: "-"}
											</TableCell>
											<TableCell className="job-completed-date">
												{item.jobCompletedDate
													? utcToTimezone(
															item.jobCompletedDate,
															item.timezone,
															"DD/MM/YYYY"
													  )
													: "-"}
											</TableCell>
											<TableCell className="total-qty">-</TableCell>
											<TableCell className="total-weight">-</TableCell>
											<TableCell className="loaded-qty">
												{item.quantityLoaded >= 0 &&
												item.quantityLoaded !== null
													? item.quantityLoaded
													: "-"}
											</TableCell>
											<TableCell className="loaded-weight">
												{item.weightLoaded >= 0 && item.weightLoaded !== null
													? Number.isInteger(item.weightLoaded)
														? item.weightLoaded
														: item.weightLoaded.toFixed(2)
													: "-"}
											</TableCell>
											<TableCell className="remainder-reason">
												{item.remainderReason ? item.remainderReason : "-"}
											</TableCell>
											<TableCell className="cto">
												{item.cto ? item.cto : "-"}
											</TableCell>
											<TableCell className="jobStatus">
												{item.status ? item.status : "-"}
											</TableCell>
											<TableCell className="run-sheet">
												{item.jobRunsheetPDFPath ? (
													<a
														href={item.jobRunsheetPDFPath}
														target="_blank"
														rel="noreferrer"
													>
														Link
													</a>
												) : (
													"-"
												)}
											</TableCell>
										</TableRow>
									</TableBody>
								);
							})}
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default AwbRow;
