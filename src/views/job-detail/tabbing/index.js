import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import { TabbingStyle } from "./style";
import AirWayBill from "./air-waybills";
import Consignments from "./consignments";
import TimeReport from "./time-report";
import PriceMatrix from "./price-matrix";

function Tabbing(props) {
	const classes = TabbingStyle();
	const [value, setValue] = useState(0);

	const handleChangeTab = (event, newValue) => {
		setValue(newValue);
	};
	function TabPanel(props) {
		const { children, value, index } = props;
		return (
			value === index && <div className="tab-pannel-wrapper"> {children} </div>
		);
	}

	return (
		<div className={classes.TabbingWrapper}>
			<div className="white-card tabbing-wrapper">
				<Tabs
					value={value}
					onChange={handleChangeTab}
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
				>
					{props.jobsData?.jobTypes?.name === "Empty" ? (
						""
					) : ["Import", "Export", "Temp Control"].includes(
							props.jobsData?.jobTypes?.name
					  ) ? (
						<Tab label={`Air waybills`} />
					) : (
						<Tab label={`Consignments`} />
					)}
					<Tab label="Run Sheet" />

					{["Review Completed", "Completed"].includes(
						props.jobsData?.jobStatuses?.name
					) && <Tab label="Pricing" />}
				</Tabs>
				<TabPanel value={value} index={0}>
					{props.jobsData?.jobTypes?.name === "Empty" ? (
						""
					) : ["Import", "Export", "Temp Control"].includes(
							props.jobsData?.jobTypes?.name
					  ) ? (
						<AirWayBill jobsData={props.jobsData} getJobs={props.getJobs} />
					) : (
						<Consignments jobsData={props.jobsData} getJobs={props.getJobs} />
					)}
				</TabPanel>
				<TabPanel
					value={value}
					index={props.jobsData?.jobTypes?.name === "Empty" ? 0 : 1}
				>
					<TimeReport jobsData={props.jobsData} getJobs={props.getJobs} />
				</TabPanel>
				{["Review Completed", "Completed"].includes(
					props.jobsData?.jobStatuses?.name
				) && (
					<TabPanel
						value={value}
						index={
							["Review Completed", "Completed"].includes(
								props.jobsData?.jobStatuses?.name
							)
								? props.jobsData?.jobTypes?.name === "Empty"
									? 1
									: 2
								: 1
						}
					>
						<PriceMatrix jobsData={props.jobsData} getJobs={props.getJobs} />
					</TabPanel>
				)}
			</div>
		</div>
	);
}
export default React.memo(Tabbing);
