import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import AWBListing from "./awbListing";
import {
	awbByAwbNumberHeading,
	reportsHeading,
	reportsHeadingULDLoose,
} from "@utils/constant";
import { getFilter, setFilter } from "@utils/commonFunctions";
import { tabbingStyle } from "./style";

function Tabbing(props) {
	const classes = tabbingStyle();
	const persistFilter = getFilter("reportTab");
	const [value, setValue] = useState(
		persistFilter ? parseInt(persistFilter) : 3
	);

	const handleChangeTab = (event, newValue) => {
		props.setTab(newValue);
		setValue(newValue);
		setFilter("reportTab", newValue);
	};

	const TabPanel = (props) => {
		const { children, value, index } = props;
		return (
			value === index && <div className="tab-pannel-wrapper"> {children} </div>
		);
	};

	return (
		<div className={classes.tabbingWrapper}>
			<Tabs
				value={value}
				onChange={handleChangeTab}
				textColor="primary"
				variant="scrollable"
				scrollButtons="auto"
			>
				<Tab label="AWB By AWB Number" value={3} />
				<Tab label="AWB By Job Id" value={0} />
				<Tab label="ULD Reports" value={1} />
				<Tab label="Loose Reports" value={2} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<AWBListing
					getTab={props.getTab}
					reportsHeading={reportsHeading}
					page={props.page}
					handleChangePage={props.handleChangePage}
					rowsPerPage={props.rowsPerPage}
					handleChangeRowsPerPage={props.handleChangeRowsPerPage}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<AWBListing
					getTab={props.getTab}
					reportsHeading={reportsHeadingULDLoose}
					page={props.page}
					handleChangePage={props.handleChangePage}
					rowsPerPage={props.rowsPerPage}
					handleChangeRowsPerPage={props.handleChangeRowsPerPage}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<AWBListing
					getTab={props.getTab}
					reportsHeading={reportsHeadingULDLoose}
					page={props.page}
					handleChangePage={props.handleChangePage}
					rowsPerPage={props.rowsPerPage}
					handleChangeRowsPerPage={props.handleChangeRowsPerPage}
				/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<AWBListing
					getTab={props.getTab}
					reportsHeading={awbByAwbNumberHeading}
					page={props.page}
					handleChangePage={props.handleChangePage}
					rowsPerPage={props.rowsPerPage}
					handleChangeRowsPerPage={props.handleChangeRowsPerPage}
				/>
			</TabPanel>
		</div>
	);
}
export default Tabbing;
