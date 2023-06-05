import React, { useEffect } from "react";

import { CustomerDashboardStyle } from "./style";
import ChartBox from "./components/chartBox";

function CustomerDashboardView(props) {
	const classes = CustomerDashboardStyle();
	useEffect(() => {
		const interval = setInterval(() => {
			window.location.reload();
		}, 900000);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			<div className={classes.innerPageWrapper}>
				<div className="dashboard-page inner-page wrapper">
					<ChartBox />
				</div>
			</div>
		</>
	);
}

export default CustomerDashboardView;
