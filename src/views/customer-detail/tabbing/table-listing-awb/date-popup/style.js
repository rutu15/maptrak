import { makeStyles } from "@material-ui/core/styles";

const PopupStyle = makeStyles((theme) => ({
  customForm: {
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
  customModal: {
    "& .MuiDialog-paperWidthSm": {
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
    "& .MuiDialogActions-root": {
      justifyContent: "space-between",
      "@media(max-width:374px)": {
        flexWrap: "wrap",
      },
      "& button": {
        maxWidth: "165px",
        width: "100%",
        height: "50px",
        lineHeight: "50px",
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
        "@media(max-width:374px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
        },
      },
      "& button + button": {
        marginLeft: "20px",
        "@media(max-width:767px)": {
          marginLeft: "15px",
        },
        "@media(max-width:374px)": {
          margin: "15px 0 0",
        },
      },
    },
  },
}));

export { PopupStyle };
