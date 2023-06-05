import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const AddAirWayBillStyle = makeStyles({
  AddAirWayBillWrapper: {},
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
        "& .inner-row": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -10px",
          alignItems: "flex-end",
          "& .inner-form-group": {
            maxWidth: "50%",
            flex: "0 0 50%",
            padding: "0 10px",
            "@media (max-width: 575px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
              marginBottom: "20px",
              "&:last-child": {
                margin: "0",
              },
            },
          },
        },
        "& .label-text": {
          fontSize: "14px",
        },
        "& .error-text": {
          color: "red",
        },
        "& .info-icon": {
          position: "relative",
          top: "-3px",
          paddingLeft: "8px",
          cursor: "pointer",
          display: "inline-block",
        },
      },
      "& .checkbox-wrapper": {
        display: "flex",
        alignItems: "center",
        "& .custom-checkbox": {
          margin: 0,
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
        color: colors.skyblue,
        display: "block",
        marginLeft: "10px",
        lineHeight: "1.321",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      "& img": {
        height: "20px",
        width: "20px",
      },
    },
  },
});

export { AddAirWayBillStyle };
