import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const fuelSurchargeUpdateStyle = makeStyles((theme) => ({
	fuelSurchargeUpdateWrapper: {},
	dialogContentText: {
		fontWeight: "700",
		color: "#212121",
	},
	customModal: {
		"& .MuiDialog-paperScrollPaper": {
			boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
			padding: "40px",
			textAlign: "center",
			maxWidth: "500px",
			width: "100%",
			"@media(max-width:767px)": {
				maxWidth: "100%",
				padding: "25px 15px",
				margin: "0 15px",
			},
			"& .MuiDialogContent-root,& .MuiDialogActions-root, & .MuiDialogTitle-root":
				{
					padding: "0",
					justifyContent: "center",
				},
			"& .MuiDialogTitle-root": {
				"& .MuiTypography-root": {
					fontWeight: "700",
					fontSize: "24px",
					lineHeight: "1.321",
					color: colors.black,
					marginBottom: "12px",
					"& img": {
						display: "block",
						margin: "0 auto 20px",
					},
				},
			},
			"& .MuiDialogContent-root": {
				"& .MuiTypography-root": {
					fontWeight: "400",
					fontSize: "18px",
					lineHeight: "1.44",
					color: colors.black,
					maxWidth: "300px",
					margin: "0 auto 15px",
				},
			},
			"& .MuiDialogActions-root": {
				"& button": {
					maxWidth: "165px",
					width: "100%",
					height: "50px",
					lineHeight: "50px",
					fontSize: "16px",
					fontWeight: "600",
					textTransform: "uppercase",
					transition: "all 0.3s",
					"@media(max-width:374px)": {
						padding: "0 8px",
					},
				},
				"& button + button": {
					marginLeft: "20px",
					"@media(max-width:767px)": {
						marginLeft: "15px",
					},
				},
			},
		},

		"& .title": {
			textAlign: "start",
		},
		"& .close-modal": {
			position: "absolute",
			right: "40px",
			top: "45px",
			cursor: "pointer",
			"@media (max-width: 991px)": {
				top: "28px",
				right: "25px",
			},
		},
		"& .btn-wrapper": {
			display: "flex",
			marginTop: "10px",
			justifyContent: "center",
			flexWrap: "wrap",
		},
	},
	customHelpModal: {
		"& .MuiDialog-paperWidthSm": {
			display: "block",
			boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
			padding: "32px 40px 40px",
			maxWidth: "820px",
			width: "100%",
			"@media (max-width: 991px)": {
				maxWidth: "100%",
				padding: "20px 15px",
				margin: "30px 15px",
				width: "auto",
			},
			"& .MuiDialogTitle-root": {
				padding: "0",
				display: "flex",
				justifyContent: "space-between",
				marginBottom: "30px",
				"@media (max-width: 480px)": {
					marginBottom: "20px",
				},
			},
			"& .MuiDialogContent-root": {
				padding: "0",
				overflow: "hidden",
			},
			"& h2": {
				fontSize: "24px",
				fontWeight: "700",
				lineHeight: "40px",
				marginLeft: "10px",
			},
		},
		"& .close-modal": {
			position: "absolute",
			right: "40px",
			top: "40px",
			cursor: "pointer",
			"@media (max-width: 991px)": {
				top: "28px",
				right: "25px",
			},
		},
		"& .bottom-button-block": {
			padding: "15px 0 0",
			display: "flex",
			justifyContent: "space-between",
			"@media (max-width: 480px)": {
				flexDirection: "column",
			},
			"& button": {
				height: "50px",
				lineHeight: "50px",
				fontWeight: "600",
				fontSize: "16px",
				minWidth: "165px",
				textTransform: "uppercase",
				"@media (max-width: 480px)": {
					minWidth: "100%",
					marginBottom: "15px",
				},
			},
		},
	},
	fileInput: {
		display: "block",
		position: "relative",
		marginRight: "15px",
		maxWidth: "200px",
		"&:hover": {
			opacity: "0.4",
		},
		"@media (max-width: 574px)": {
			flex: "0 0 100%",
			maxWidth: "100%",
			marginRight: "10px",
			marginBottom: "10px",
		},
		"& .MuiFormControl-root": {
			opacity: 0,
			overflow: "hidden",
			position: "absolute",
			right: "0",
			left: "0",
			"& input": {
				cursor: "pointer",
				fontSize: "0",
			},
		},
		"& .label-block": {
			width: "100%",
			border: " 1px solid #e7e4f1",
			height: "50px",
			margin: 0,
			display: "flex",
			alignItems: "center",
			padding: "0 15px",
			transition: "all 0.3s",
			lineHeight: "50px",
			borderRadius: "6px",
			cursor: "pointer",
			"& .file-name": {
				color: colors.primary,
				display: "block",
				fontWeight: "600",
				fontSize: "16px",
				marginLeft: "10px",
				lineHeight: "1.321",
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
				textTransform: "uppercase",
			},
			"& img": {
				height: "20px",
				width: "20px",
			},
		},
	},
	searchWrapper1: {
		maxWidth: "250px",
		flex: "0 0 250px",
		marginLeft: "15px",
		display: "flex",
		justifyContent: "center",
		"@media (max-width: 1001px)": {
			maxWidth: "190px",
			flex: "0 0 190px",
		},
		"@media (max-width: 1500px)": {
			maxWidth: "300px",
			flex: "0 0 300px",
			marginTop: "10px",
		},
		"@media (max-width: 900px)": {
			flex: "0 0 100%",
			maxWidth: "100%",
			display: "flex",
			flexWrap: "wrap",
			marginTop: "10px",
		},
		"& .btn-wrapper": {
			display: "flex",
			alignItems: "center",
			marginTop: "10px",
			justifyContent: "flex-end",
			flexWrap: "wrap",
			"& .primary-btn": {
				display: "flex",
				fontSize: "16px",
				fontWeight: "600",
				minWidth: "160px",
				lineHeight: "50px",
				textTransform: "uppercase",
				height: "50px",
				"@media (max-width: 1001px)": {
					width: "100%",
				},
				"@media (max-width: 574px)": {
					width: "100%",
					marginTop: "10px",
				},
			},
			"& .form-gourp": {
				marginRight: "15px",
				"& .MuiOutlinedInput-adornedEnd": {
					padding: "0",
					position: "relative",
					"& img": {
						position: "absolute",
						top: "50%",
						transform: "translateY(-50%)",
						right: "15px",
					},
				},
			},
		},
	},
}));

export { fuelSurchargeUpdateStyle };
