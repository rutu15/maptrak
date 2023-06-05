import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const DownloadReportStyle = makeStyles((theme) => ({
  DownloadReportWrapper: {},
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
  },
  customForm: {
    "& .error": {
      marginBottom: "10px",
    },
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
      // alignItems: "flex-end",
      "@media (max-width: 575px)": {
        flexWrap: "wrap",
      },
      "& .form-group": {
        padding: "0 10px",
        maxWidth: "50%",
        flex: "0 0 50%",
        marginBottom: "20px",
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
      },
    },
  },
}));

export { DownloadReportStyle };
