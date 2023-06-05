import React from "react";
import { Typography } from "@material-ui/core";

import { useStore } from "@store/store";
import { EditBlockStyle } from "./style";

function EditBlock() {
	const classes = EditBlockStyle();
	const [state] = useStore();
	return (
		<div className={classes.EditBlockWrapper}>
			<div className="white-card edit-block">
				<div className="edit-block-header">
					<div className="inner-heading">
						<p>Online Request Number</p>
						<span>
							{state.onlineRequest?.getOnlineRequestById?.id
								? state.onlineRequest?.getOnlineRequestById?.id
								: "-"}
						</span>
					</div>
				</div>
				{state.onlineRequest?.getOnlineRequestById?.description && (
					<div className="edit-block-content">
						<Typography variant="h6">Description:</Typography>
						<p>{state.onlineRequest?.getOnlineRequestById?.description}</p>
					</div>
				)}
				<div className="edit-block-list">
					<ul>
						<li>
							<Typography variant="h6">Ref No</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.referenceNo
										? state.onlineRequest?.getOnlineRequestById?.referenceNo
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Job type</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.jobTypes
										? state.onlineRequest?.getOnlineRequestById?.jobTypes?.name
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Cargo type</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.cargoTypes
										? state.onlineRequest?.getOnlineRequestById?.cargoTypes
												?.name
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Requester</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.requesterName
										? state.onlineRequest?.getOnlineRequestById?.requesterName
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Email</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.email
										? state.onlineRequest?.getOnlineRequestById?.email
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">CC</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.cc
										? state.onlineRequest?.getOnlineRequestById?.cc
												?.split(",")
												.map((item) => item + ", ")
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">City</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.cities
										? state.onlineRequest?.getOnlineRequestById?.cities.name
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Weight</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.weight
										? state.onlineRequest?.getOnlineRequestById?.weight
										: "-"}{" "}
									Kg
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Quantity</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.quantity
										? state.onlineRequest?.getOnlineRequestById?.quantity
										: "-"}{" "}
									Qty
								</p>
							</div>
						</li>

						<li>
							<Typography variant="h6">Pick up</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.pickUpLocation
										? state.onlineRequest?.getOnlineRequestById?.pickUpLocation
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">Drop off</Typography>
							<div className="value-block">
								<p>
									{state.onlineRequest?.getOnlineRequestById?.dropOffLocation
										? state.onlineRequest?.getOnlineRequestById?.dropOffLocation
										: "-"}
								</p>
							</div>
						</li>
						<li>
							<Typography variant="h6">CTO</Typography>
							<p>
								{" "}
								{state.onlineRequest?.getOnlineRequestById?.ctos
									? state.onlineRequest?.getOnlineRequestById?.ctos?.name
									: "-"}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default EditBlock;
