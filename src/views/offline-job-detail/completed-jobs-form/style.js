import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const CreateJobStyle = makeStyles({
	CreateCompleteJobWrapper: {
		"& .card-wrapper": {
			padding: "25px",
			"@media(max-width:767px)": {
				padding: "15px",
			},
			"& h2": {
				fontSize: "24px",
			},
			"& .MuiTabs-root": {
				padding: "0 30px",
				borderBottom: "1px solid #f2f2f2",
				"@media(max-width:1279px)": {
					padding: "0 25px",
				},
				"@media(max-width:767px)": {
					padding: "0",
				},
				"& .MuiTabs-scrollable": {
					"& .MuiTabs-indicator": {
						backgroundColor: colors.skyblue,
						borderRadius: "3px 3px 0 0",
						height: "3px",
					},
					"& .MuiTab-root": {
						"& + .MuiTab-root": {
							marginLeft: "40px",
							"@media(max-width:767px)": {
								marginLeft: "0",
							},
						},
						color: colors.gray4,
						fontSize: "14px",
						padding: "0 0 25px 0",
						minWidth: "auto",
						textTransform: "none",
						"@media(max-width:767px)": {
							padding: "15px",
						},
						"&.Mui-selected": {
							color: colors.skyblue,
							fontWeight: "600",
						},
					},
				},
			},
			"& .MuiTabs-scrollButtonsDesktop": {
				display: "flex !important",
				boxShadow: "0px 0px 15px 0 rgb(0 0 0 / 15%)",
				zIndex: "1",
				backgroundColor: colors.white,
				width: "30px",
				"& svg": {
					fill: colors.gray4,
				},
			},
		},
	},
	customForm: {
		paddingTop: "35px",
		overflow: "hidden",
		"& textarea": {
			overflow: "auto !important",
			verticalAlign: "top",
			resize: "none",
			border: "1px solid #e7e4f1",
			borderRadius: "6px",
			padding: "10px 15px !important",
			minHeight: "90px",
			lineHeight: "1.321",
		},
		"& .form-row": {
			display: "flex",
			margin: "0 -10px",
			"@media (max-width: 575px)": {
				flexWrap: "wrap",
			},
			"& .form-gourp": {
				padding: "0 10px",
				maxWidth: "50%",
				flex: "0 0 50%",
				"@media (max-width: 575px)": {
					maxWidth: "100%",
					flex: "0 0 100%",
				},
				"&.full-width": {
					maxWidth: "100%",
					flex: "0 0 100%",
				},
				"&.three-column": {
					maxWidth: "33.33%",
					flex: "0 0 33.33%",
					"@media (max-width: 575px)": {
						maxWidth: "100%",
						flex: "0 0 100%",
					},
				},
				"& .label-text": {
					fontSize: "14px",
				},
				"& .error-text": {
					color: "red",
				},
				"& .chip-input": {
					"& > div": {
						minHeight: "50px",
						border: "1px solid #e7e4f1",
						marginBottom: 0,
						borderRadius: "6px",
						alignItems: "center",
						padding: "10px 15px 0",
						overflow: "hidden",
						"&::before": {
							display: "none",
						},
						"&::focus": {
							border: "none",
						},
						"& input": {
							border: "none",
							padding: "0 !important",
						},
					},
					"& .MuiChip-root": {
						height: "28px",
						lineHeight: "28px",
						backgroundColor: colors.lightGraybg,
						fontSize: "16px",
						color: colors.black,
						borderRadius: "30px",
					},
					"& .MuiInput-root": {
						marginTop: "-10px",
						"& input": {
							height: "38px",
							lineHeight: "38px",
						},
					},
				},
				"&.chip-input-wrapper": {
					"& .label-text": {
						display: "flex",
						alignItems: "center",
					},
				},
				"& .info-icon": {
					lineHeight: "0",
					paddingLeft: "8px",
					cursor: "pointer",
				},
			},
			"&.date-time-wrapper": {
				"& .MuiInput-root": {
					border: "1px solid #e7e4f1 !important",
					borderRadius: "6px",
					"&::before": {
						display: "none",
					},
					"& input": {
						border: "none",
					},
				},
				"& .MuiIconButton-root": {
					position: "relative",
					right: "6px",
				},
			},
			"& .checkbox-wrapper": {
				display: "flex",
				alignItems: "center",
				"& .custom-checkbox": {
					margin: 0,
				},
			},
		},
		"& .bottom-button-block": {
			padding: "15px 0 0",
			display: "flex",
			justifyContent: "end",
			"@media (max-width: 480px)": {
				flexDirection: "column",
			},
			"& button": {
				height: "50px",
				lineHeight: "50px",
				fontWeight: "600",
				fontSize: "16px",
				minWidth: "165px",
				"@media (max-width: 480px)": {
					minWidth: "100%",
					marginBottom: "15px",
				},
			},
		},
	},
});

export { CreateJobStyle };
