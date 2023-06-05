import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const OfflineJobListingStyle = makeStyles({
	OfflineJobListingWrapper: {},
	innerPageTopBlock: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		"@media (max-width: 1279px)": {
			flexWrap: "wrap",
		},
		"& h1": {
			fontSize: "30px",
			color: colors.black,
			textTransform: "capitalize",
			margin: "0 20px 0 0",
			"@media (max-width: 1279px)": {
				margin: "0 0 20px 0",
			},
		},
		"& .right-block": {
			flex: "1",
			"@media (max-width: 1279px)": {
				flex: "0 0 100%",
				maxWidth: "100%",
			},
			"& .right-block-inner": {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				"@media (max-width: 991px)": {
					flexWrap: "wrap",
				},
				"@media (max-width: 767px)": {
					justifyContent: "center",
				},
			},
		},
		"& .left-block": {
			paddingRight: "10px",
			"@media (max-width: 991px)": {
				flex: "0 0 100%",
				maxWidth: "100%",
			},
		},
	},
	backLinkWrapper: {
		marginBottom: "20px",
		"& a": {
			fontSize: "18px",
			lineHeight: "1.2",
			position: "relative",
			fontWeight: "500",
			color: colors.orange,
			display: "inline-flex",
			alignItems: "center",
			"& svg": {
				height: 15,
				width: 15,
			},
		},
	},
});

export { OfflineJobListingStyle };
