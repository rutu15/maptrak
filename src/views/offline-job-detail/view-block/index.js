import React from "react";
import { Typography } from "@material-ui/core";
import { utcToTimezone } from "@utils/commonFunctions";
import Loader from "@components/loader";
import { ViewBlockStyle } from "./style";

function ViewBlock(props) {
	const classes = ViewBlockStyle();

	return (
		<div className={classes.ViewBlockWrapper}>
			<Loader loading={props.loadingJobs} />
			<div className="white-card edit-block">
				<div className="edit-block-content">
					<Typography variant="h6">Description:</Typography>
					<p>{props.jobsData?.description || "-"}</p>
				</div>
				<div className="edit-block-list">
					<ul>
						<li>
							<Typography variant="h6">Customer</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.customerName
										? props.jobsData?.customerName
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Driver</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.drivers
										? props.jobsData?.drivers?.name
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Job type</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.jobTypeName
										? props.jobsData?.jobTypeName
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Cargo type</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.cargoTypeName
										? props.jobsData?.cargoTypeName
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">City</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.cities ? props.jobsData?.cities.name : "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">CTO</Typography>
							<div className="value-block">
								<p>{props.jobsData?.ctoName ? props.jobsData?.ctoName : "-"}</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Pickup Address</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.pickupAddress
										? props.jobsData?.pickupAddress
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Delivery Address</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.deliveryAddress
										? props.jobsData?.deliveryAddress
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Truck Rego</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.truckRegoName
										? props.jobsData?.truckRegoName
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Trailer Rego</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.trailerRegoName
										? props.jobsData?.trailerRegoName
										: "-"}
								</p>
							</div>
						</li>

						<li>
							<Typography variant="h6">Started Date</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.startedAt
										? utcToTimezone(
												props.jobsData?.startedAt,
												props.jobsData?.cities?.timezone,
												"DD/MM/YYYY HH:MM:SS"
										  )
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Completed Date</Typography>
							<div className="value-block">
								<p>
									{props.jobsData?.completedAt
										? utcToTimezone(
												props.jobsData?.completedAt,
												props.jobsData?.cities?.timezone,
												"DD/MM/YYYY HH:MM:SS"
										  )
										: "-"}
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default ViewBlock;
