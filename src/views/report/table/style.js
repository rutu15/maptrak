import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const tableStyles = makeStyles({
	customTable: {
		marginTop: 25,
		maxHeight: 680,
		boxShadow: "none",
		"& .MuiTable-root": {
			minWidth: 2000,
			"& .MuiTableRow-root": {
				transition: "all 0.3s",
				cursor: "pointer",
				"&.sub-row": {
					"& .MuiTableRow-root": {
						cursor: "default",
					},
					backgroundColor: "#f6f6f6",
					"& > .MuiTableCell-root": {
						padding: 0,
					},
					"& .MuiTableSubRoW": {
						paddingBottom: 0,
						paddingTop: 0,
					},
				},
			},
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
					padding: "30px 10px",
					backgroundColor: colors.white,
					"&:first-child": {
						paddingLeft: "30px",
					},
					"&:last-child": {
						paddingRight: "30px",
					},
					"&.job-status": {
						width: 178,
					},
					"&.location": {
						width: 150,
					},
				},
			},
			"& .MuiTableBody-root": {
				"& .MuiTableCell-root": {
					padding: "22px 10px",
					"&:first-child": {
						paddingLeft: "30px",
					},
					"&:last-child": {
						paddingRight: "30px",
					},
					"&.jobId-cell": {
						cursor: "pointer",
						color: colors.skyblue,
						textDecoration: "none !important",
					},
					"&.awb-number-red": {
						color: colors.darkRed,
					},
					"& span": {
						display: "block",
					},
					"&.chat-column": {
						"& a": {
							display: "flex",
							alignItems: "center",
							borderRadius: "6px",
							padding: "7px",
							textDecoration: "none !important",
							backgroundColor: "rgba(0, 174, 239, 0.06)",
							color: colors.black,
							"& img": {
								marginRight: "5px",
							},
						},
					},
					"&.request-status": {
						"& span": {
							position: "relative",
							paddingLeft: 20,
							display: "block",
							"&:before": {
								content: '""',
								position: "absolute",
								backgroundColor: colors.black,
								height: 10,
								width: 10,
								borderRadius: "50%",
								left: 0,
								top: 7,
							},
						},
						"&.requested": {
							"& span": {
								color: colors.green,
								"&:before": {
									backgroundColor: colors.green,
								},
							},
						},
						"&.acknowledged": {
							"& span": {
								color: colors.red3,
								"&:before": {
									backgroundColor: colors.red3,
								},
							},
						},
						"&.driver-assigned": {
							"& span": {
								color: colors.yellow1,
								"&:before": {
									backgroundColor: colors.yellow1,
								},
							},
						},
						"&.request-completed": {
							"& span": {
								color: colors.green1,
								"&:before": {
									backgroundColor: colors.green1,
								},
							},
						},
					},
				},
			},
			"& .jobId-cell": {
				width: "180px",
			},
			"& .jobType": {
				width: "138px",
			},
			"& .airBill": {
				width: "138px",
			},
			"& .customer": {
				width: "200px",
			},
			"& .reportType": {
				width: "140px",
			},
			"& .pieces": {
				width: "88px",
			},
			"& .weight": {
				width: "136px",
			},
			"& .cto": {
				width: "120px",
			},
			"& .request-status": {
				width: "248px",
			},
			"& .jobStatus": {
				width: "140px",
			},
			"& .refNo": {
				width: "161px",
			},
			"& .jobDuration": {
				width: "209px",
			},
			"& .truckRego": {
				width: "138px",
			},
			"& .city": {
				width: "150px",
			},
			"& .awb-number": {
				width: "250px",
			},
			"& .job-started-date": {
				width: "150px",
			},
			"& .job-completed-date": {
				width: "170px",
			},
			"& .total-qty": {
				width: "100px",
			},
			"& .total-weight": {
				width: "120px",
			},
			"& .loaded-qty": {
				width: "100px",
			},
			"& .loaded-weight": {
				width: "120px",
			},
			"& .remainder-reason": {
				width: "200px",
			},
			"& .run-sheet": {
				width: "172px",
			},
		},
	},
	noMaxWidth: {
		display: "block",
	},
});

export { tableStyles };
