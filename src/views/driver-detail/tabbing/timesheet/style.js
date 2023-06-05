import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const TimesheetStyle = makeStyles({
	TimesheetWrapper: {
		"& .MuiBackdrop-root": {
			color: " #fff",
			zIndex: "1201",
		},
		"& .dateWrapper": {
			marginTop: "10px",
			"& .MuiFormControl-root": {
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				"@media(max-width:1499px)": {
					flexWrap: "wrap",
				},
				"& .date-wrapper": {
					"@media(max-width:767px)": {
						maxWidth: "100%",
						flex: "0 0 100%",
					},
					"& .custom-datepicker": {
						"& input": {
							width: "150px",
							"@media(max-width:767px)": {
								width: "100%",
							},
						},
					},
				},
				"& .btn-wrapper": {
					display: "flex",
					alignItems: "center",
					marginLeft: "20px",
					"@media(max-width:1499px)": {
						maxWidth: "100%",
						flex: "0 0 100%",
						margin: "20px 0 0 0",
						justifyContent: "flex-end",
						textAlign: "left",
					},
					"@media(max-width:767px)": {
						flexWrap: "wrap",
					},
					"& button": {
						minWidth: "200px",
						height: "50px",
						lineHeight: "50px",
						fontSize: "16px",
						textTransform: "uppercase",
						"@media(max-width:767px)": {
							maxWidth: "100%",
							flex: "0 0 100%",
						},
						"& + button": {
							marginLeft: "20px",
							"@media(max-width:767px)": {
								margin: "20px 0 0",
							},
						},
					},
				},
				"& .assign-driver-wrapper": {
					maxWidth: "300px",
					marginLeft: "20px",
					width: "100%",
					"@media(max-width:767px)": {
						maxWidth: "100%",
						flex: "0 0 100%",
						margin: "20px 0 0",
					},
					"& .MuiInputBase-root": {
						width: "100%",
					},
				},
			},
		},
		"& .map-wrapper": {
			height: "0",
			paddingBottom: "30%",
			maxWidth: "100%",
			overflow: "hidden",
			"& .map-container ": {
				position: "relative",
				paddingBottom: "26.25%",
				paddingTop: "30px",
				height: 0,
				overflow: "hidden",
			},
			"@media(max-width:767px)": {
				paddingBottom: "40%",
			},
			"@media(max-width:574px)": {
				paddingBottom: "50%",
			},
		},
	},
	customCardWrapper: {
		marginTop: "20px",
		"& .custom-card": {
			borderRadius: "4px",
			border: "solid 1px #e3e3e3",
			overflow: "hidden",
			backgroundColor: colors.white,
			"& + .custom-card": {
				marginTop: "20px",
			},
			"& .card-body": {
				padding: "15px 20px",
				"@media(max-width:767px)": {
					padding: "15px",
				},
				"& ul ": {
					"& li": {
						display: "flex",
						"@media(max-width:424px)": {
							flexWrap: "wrap",
						},
						"& + li": {
							marginTop: "10px",
						},
						"& .value-block": {
							flex: "1",
							paddingLeft: "10px",
							"@media(max-width:424px)": {
								paddingLeft: "0",
								flex: "0 0 100%",
								maxWidth: "100%",
							},
							"& p": {
								fontWeight: "600",
								color: colors.black1,
							},
						},
						"& h6": {
							color: colors.gray3,
							maxWidth: "230px",
							flex: "0 0 230px",
							"@media(max-width:424px)": {
								flex: "0 0 100%",
								maxWidth: "100%",
							},
						},
					},
				},
			},
			"& .card-header": {
				backgroundColor: colors.gray5,
				padding: "16px 20px",
				borderBottom: "solid 1px #e3e3e3",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				"@media(max-width:767px)": {
					padding: "15px",
				},
				"& .heading-title": {
					fontSize: "18px",
					fontWeight: "600",
					color: colors.black2,
					paddingRight: "10px",
					"& .deleted-title": {
						color: colors.red,
					},
					"& em": {
						fontStyle: "normal",
						color: colors.gray3,
						display: "block",
						fontSize: "16px",
						fontWeight: "500",
						"& a": {
							color: "#00AEEF",
						},
					},
				},
				"& .total-time": {
					fontSize: "18px",
					fontWeight: "600",
					color: colors.skyblue,
				},
			},
		},
	},
	timeCardWrapper: {
		marginTop: "20px",
		"& .custom-card": {
			borderRadius: "4px",
			overflow: "hidden",
			"& .card-body": {
				backgroundColor: colors.gray5,
				padding: "16px 20px",
				borderBottom: "solid 1px #e3e3e3",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				"@media(max-width:767px)": {
					padding: "15px",
				},
				"@media(max-width:530px)": {
					display: "block",
					textAlign: "center",
				},
				"& .heading-title": {
					fontSize: "18px",
					fontWeight: "600",
					color: colors.black2,
					paddingRight: "10px",
				},
				"& .total-time": {
					fontSize: "24px",
					fontWeight: "600",
					color: colors.skyblue,
					textAlign: "center",
					fontFamily: "'ArialMT'",
				},
			},
		},
	},
});

export { TimesheetStyle };
