import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const ViewBlockStyle = makeStyles({
	ViewBlockWrapper: {
		"& .MuiBackdrop-root": {
			color: " #fff",
			zIndex: "1201",
		},
		"& .edit-block": {
			padding: "30px",
			"@media(max-width:1279px)": {
				padding: "25px",
			},
			"@media(max-width:767px)": {
				padding: "15px",
			},
			"& .edit-block-list ": {
				"& ul ": {
					"& li": {
						display: "flex",
						justifyContent: "space-between",
						"@media(max-width:424px)": {
							flexWrap: "wrap",
						},
						"& + li": {
							marginTop: "10px",
						},
						"& .value-block": {
							flex: "1",
							paddingLeft: "10px",
							textAlign: "right",
							"& span": {
								color: "#00548e",
								cursor: "pointer",
								fontWeight: "600",
							},
							"@media(max-width:424px)": {
								textAlign: "left",
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
							maxWidth: "135px",
							flex: "0 0 135px",
							"@media(max-width:424px)": {
								paddingLeft: "0",
								flex: "0 0 100%",
								maxWidth: "100%",
							},
						},
					},
				},
			},
			"& .edit-block-content": {
				paddingBottom: "20px",
				borderBottom: "1px solid #e3e3e3",
				marginBottom: "20px",
				"& p": {
					fontSize: "14px",
					lineHeight: "1.71",
					wordBreak: "break-word",
					fontWeight: 600,
					color: colors.black1,
				},
				"& h6": {
					fontSize: "14px",
					lineHeight: "1",
					color: colors.gray3,
					marginBottom: "6px",
				},
			},
		},
	},
});

export { ViewBlockStyle };
