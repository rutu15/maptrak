import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
	TableWrapper: {
		boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
		backgroundColor: colors.white,
		borderRadius: "6px",
		border: "1px solid #ebeef6",
		marginTop: "20px",
	},
	buttonArea: {
		ButtonWrapper: {
			width: "100%",
			display: "flex",
			marginTop: "10px",
			"& .primary-btn.blue-btn": {
				// marginLeft: "auto",
				// marginTop: "20px",
				width: "20%",
				marginRight: "10px",
				marginBottom: "10px",
				float: "left",
			},
		},
	},
	ButtonWrapper: {
		"& .primary-btn.blue-btn": {
			marginLeft: "auto",
			marginTop: "20px",
			marginRight: "10px",
			marginBottom: "10px",
		},
	},
	customTable: {
		overflowY: "hidden",
		boxShadow: "none",
		"& .MuiTable-root": {
			minWidth: 500,
			tableLayout: "fixed",
			"& .MuiTableCell-root": {
				fontWeight: 500,
				color: colors.black,
				border: "none",
				wordBreak: "break-word",
			},
			"& .MuiTableHead-root": {
				boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
				backgroundColor: colors.white,
				"& .MuiTableCell-root": {
					color: "rgba(33, 33, 33, 0.7)",
					padding: "30px 25px",
					backgroundColor: colors.white,
					borderBottom: "1px solid #f4f4f4",
					"&:first-child": {
						paddingLeft: "30px",
					},
					"&:last-child": {
						paddingRight: "30px",
					},
				},
			},
			"& .MuiTableBody-root": {
				"& .MuiTableCell-root": {
					padding: "30px 25px",
					borderBottom: "1px solid #f4f4f4",
					"&:first-child": {
						paddingLeft: "30px",
					},
					"&:last-child": {
						paddingRight: "30px",
					},
				},
			},
			"& .cargoType": {
				width: "200px",
			},
			"& hours": {
				width: "120px",
			},
			"& .hourlyCharge": {
				widht: "120px",
			},
			"& .error-text": {
				color: "red",
				position: "absolute",
			},
		},
	},
	weeklyMinimumHours: {
		"& .MuiBackdrop-root": {
			color: " #fff",
			zIndex: "1201",
		},
		"& .check-wrapper": {
			marginBottom: "50px",
		},

		"& .info-wrapper": {
			display: "flex",
			"& .span-wrapper2": {
				marginTop: "15px",
				marginLeft: "15px",
				color: colors.primary,
				fontWeight: "600",
			},
			"& .add-more": {
				marginTop: "30px",
				marginBottom: "15px",
				marginLeft: "auto",
				// marginRight: "50px",
				cursor: "pointer",
				color: colors.primary,
			},
			"& .toll": {
				marginTop: "15px",
				marginLeft: "auto",
				marginRight: "50px",
				color: colors.primary,
				fontWeight: "600",
			},
		},
		"& .span-wrapper": {
			marginBottom: "30px",
		},

		"& $customTable": {
			"& .check-wrapper": {
				marginBottom: "0px",
			},
			"& .MuiTable-root": {
				minWidth: "500px",
				position: "relative",
				"& .cargoType": {
					width: "150px",
				},
				"& .hours": {
					width: "200px",
				},
				"& .weight": {
					width: "200px",
					"& .error-text": {
						color: "red",
						position: "absolute",
					},
				},
				"& .hourlyCharge": {
					width: "200px",
				},
				"& .amount": {
					width: "200px",
					"& .error-text": {
						color: "red",
						position: "absolute",
					},
				},
				"& .btn-weight": {
					width: "150px",
					"@media (max-width:500px)": {
						width: "200px",
					},
					"@media (max-width:1700px)": {
						width: "150px",
					},
				},
				"& .edit-btn": {
					width: "150px",
					"@media (max-width:500px)": {
						width: "200px",
					},
					"@media (max-width:1700px)": {
						width: "120px",
						"& .primary-btn": {
							width: "100px",
						},
					},
				},
			},
		},
	},
	normal: {
		color: "red",
		// marginTop: "20px",
		fontSize: "14px",
		fontWeight: 600,
		width: "80%",
		float: "left",
	},
});

export { TableStyle };
