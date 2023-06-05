import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const JobListingStyle = makeStyles({
	JobListingWrapper: {
		"& .custom-datepicker": {
			"& .MuiInput-root": {
				"& .MuiIconButton-root": {
					right: "15px",
				},
			},
		},
	},
	innerPageTopBlock: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		"@media (max-width: 1359px)": {
			flexWrap: "wrap",
		},
		"& h1": {
			fontSize: "30px",
			color: colors.black,
			textTransform: "capitalize",
			margin: "0 20px 0 0",
		},
		"& .right-block": {
			flex: "1",
			"& .right-block-inner": {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				"@media (max-width: 1300px)": {
					flexWrap: "wrap",
				},
				"@media (max-width: 574px)": {
					justifyContent: "center",
				},
				"& .modal-wrapper": {
					marginLeft: "15px",
					display: "flex",
					"@media (max-width: 991px)": {
						margin: "30px 0 0",
						justifyContent: "flex-end",
						flex: "0 0 100%",
						maxWidth: "100%",
					},
					"@media (max-width: 767px)": {
						margin: "5px 0 0",
					},
					"@media (max-width: 574px)": {
						flexWrap: "wrap",
						margin: "0",
					},
					"& .primary-btn": {
						fontSize: "16px",
						fontWeight: "600",
						minWidth: "160px",
						lineHeight: "50px",
						height: "50px",
						"@media (max-width: 1300px)": {
							minWidth: "240px",
						},
						"@media (max-width: 574px)": {
							width: "100%",
						},
					},
				},
				"& .dropdown_wrapper": {
					maxWidth: "150px",
					flex: "0 0 150px",
					margin: "0 0 0 15px",
					"@media (max-width: 767px)": {
						flex: "0 0 100%",
						maxWidth: "100%",
						margin: "0 0 20px 0",
					},
					"& .MuiSelect-selectMenu": {
						backgroundColor: colors.white,
						color: colors.light_black,
						boxShadow: "0 3px 8px 0 rgb(97 97 97 / 5%)",
					},
					"& .MuiOutlinedInput-notchedOutline": {
						border: "none",
					},
					"& .MuiSvgIcon-root": {
						color: colors.gray4,
					},
				},
				"& .dropdown_wrapper1": {
					maxWidth: "200px",
					// flex: "0 0 200px",
					// margin: "0 0 0 15px",
					"@media (max-width: 1199px)": {
						margin: "20px 25px 20px 0",
					},

					"@media (max-width: 767px)": {
						flex: "0 0 100%",
						maxWidth: "100%",
						margin: "0 0 20px 0",
					},
					"& .MuiSelect-selectMenu": {
						backgroundColor: colors.white,
						color: colors.light_black,
						boxShadow: "0 3px 8px 0 rgb(97 97 97 / 5%)",
					},
					"& .MuiOutlinedInput-notchedOutline": {
						border: "none",
					},
					"& .MuiSvgIcon-root": {
						color: colors.gray4,
					},
				},
				"& .btn-wrapper": {
					marginLeft: "15px",
					// display: "block",
					"@media (max-width: 574px)": {
						paddingTop: "20px",
						paddingBottom: "20px",
						margin: "0",
						flex: "0 0 100%",
						maxWidth: "100%",
					},
					"& .primary-btn": {
						fontSize: "16px",
						fontWeight: "600",
						minWidth: "110px",
						lineHeight: "50px",
						height: "50px",
						textTransform: "uppercase",
						"@media (max-width: 574px)": {
							width: "100%",
						},
					},
					"& .offline-jobs-btn": {
						minWidth: "160px",
					},
				},
				"& .search-wrapper": {
					maxWidth: "230px",
					flex: "0 0 230px",
					"@media (max-width: 1199px)": {
						maxWidth: "270px",
						flex: "0 0 270px",
					},
					"@media (max-width: 767px)": {
						flex: "0 0 100%",
						maxWidth: "100%",
						margin: "0 0 20px 0",
					},
					"& .form-gourp": {
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
						"& input": {
							boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.05)",
							border: "0",
							color: colors.light_black,
							letterSpacing: 0,
							backgroundColor: colors.white,
							padding: "0 35px 0 15px !important",
							"&::placeholder": {
								opacity: "0.5",
								color: colors.light_black,
							},
						},
					},
				},
			},
		},
		"& .left-block": {
			paddingRight: "10px",
			"@media (max-width: 1359px)": {
				flex: "0 0 100%",
				maxWidth: "100%",
				marginBottom: "20px",
				padding: "0px",
			},
		},
	},
	filter: {
		"& .filter-wrapper.white-card": {
			padding: "0 !important",
			boxShadow: "none",
			backgroundColor: "transparent",
			margin: "0",
			"& .filter-form-row": {
				flexWrap: "wrap",
				margin: "0",
				position: "fixed",
				width: "100%",
				right: "0",
				top: 0,
				bottom: 0,
				boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
				backgroundColor: colors.white,
				zIndex: "10",
				transform: "translateX(101%)",
				maxHeight: "100vh",
				overflowY: "auto",
				padding: 30,
				maxWidth: 420,
				transition: "all 0.3s",
				"@media (max-width: 575px)": {
					maxWidth: 350,
					padding: "30px 15px 30px 15px",
				},
				"@media (max-width: 424px)": {
					maxWidth: 300,
				},
				"@media (max-width: 374px)": {
					maxWidth: 250,
				},
				".open-filter &": {
					transform: "none",
				},
				"& .label-text": {
					fontSize: "14px",
				},
				"& .form-gourp": {
					flex: "0 0 100%",
					maxWidth: "100%",
					marginBottom: "20px",
					paddingLeft: "0",
					paddingRight: "0",
				},
				"& .filter-btn-wrapper": {
					marginTop: "50px",
				},
				"& .filter-title-block , & .filter-btn-wrapper": {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					"& img": {
						cursor: "pointer",
					},
					"&  button": {
						fontSize: "16px",
						minWidth: "165px",
						fontWeight: "600",
					},
				},
			},
			"& .btn-wrapper": {
				display: "block",
			},
		},
	},
});

export { JobListingStyle };
