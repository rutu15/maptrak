import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const CustomerDashboardStyle = makeStyles({
	innerPageWrapper: {
		"& .inner-page": {
			paddingLeft: "30px",
			paddingRight: "30px",
			backgroundColor: colors.lightGray,
			minHeight: "auto",
			"@media (max-width: 1359px)": {
				paddingLeft: "15px",
				paddingRight: "15px",
			},
			"& .inner-white-box": {
				boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
				backgroundColor: "#fff",
				paddingLeft: "25px",
				paddingRight: "25px",
				paddingTop: "18px",
				paddingBottom: "20px",
				borderRadius: "6px",
				height: "100%",
				"@media (max-width: 1359px)": {
					paddingLeft: "15px",
					paddingRight: "15px",
				},
			},
		},
	},
});

export { CustomerDashboardStyle };
