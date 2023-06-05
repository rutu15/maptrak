import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const onlineReportStyle = makeStyles((theme) => ({
	OnlineReportWrapper: {
		"& .MuiBackdrop-root": {
			color: " #fff",
			zIndex: "1201",
		},
		background: colors.lightbg,
		minHeight: "100vh",
		"& .report-form-section": {
			padding: "30px",
			"@media (max-width:767px)": {
				padding: "30px 15px",
			},
			"& .filter-search-title-strip": {
				position: "relative",
				"@media (max-width:1399px)": {
					flexWrap: "wrap",
				},
				"& .filter-search-wrapper": {
					"@media (max-width:1399px)": {
						order: "-1",
						maxWidth: "100%",
						flex: "0 0 100%",
						justifyContent: "flex-end",
						marginBottom: "20px",
					},
					"@media (max-width:675px)": {
						flexWrap: "wrap",
					},
					"& .inner-col": {
						"@media (max-width:675px)": {
							maxWidth: "100%",
							flex: "0 0 100%",
						},
						"& + .inner-col": {
							marginLeft: "15px",
							"@media (max-width:675px)": {
								margin: "15px 0 0 0",
							},
							"& button": {
								"@media (max-width:675px)": {
									width: "100%",
								},
							},
						},
						"& .MuiFormControl-fullWidth": {
							minWidth: "360px",
							"@media (max-width:1366px)": {
								minWidth: "100%",
							},
							"& .form-gourp": {
								"& input": {
									padding: "0 30px 0 15px !important",
								},
							},
						},
					},
					"& .orange-btn": {
						minWidth: "212px",
						textTransform: "uppercase",
					},
				},
			},
		},
		"& .pagination-wrapper": {
			marginBottom: "30px",
		},
	},
}));

export { onlineReportStyle };
