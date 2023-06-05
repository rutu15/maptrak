import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const ConsignmentStyle = makeStyles({
  ConsignmentWrapper: {},
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "10px",
    // justifyContent: "space-between",
  },
  dialogContentText: {
    fontWeight: "700",
    color: "#212121",
  },
  cellHeader: {
    fontWeight: "700",
  },
  searchWrapper: {
    maxWidth: "250px",
    flex: "0 0 250px",
    marginRight: "15px",
    "@media (max-width: 1001px)": {
      maxWidth: "190px",
      flex: "0 0 190px",
    },
    "@media (max-width: 1500px)": {
      maxWidth: "300px",
      flex: "0 0 300px",
      // marginBottom: "10px",
    },
    "@media (max-width: 900px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      marginBottom: "10px",
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
        border: "solid 1px #e3e3e3",
        color: colors.light_black,
        letterSpacing: 0,
        backgroundColor: colors.white,
        padding: "0 35px 0 15px !important",
        height: "48px",
        lineHeight: "48px",
        "&::placeholder": {
          opacity: "0.5",
          color: colors.light_black,
        },
      },
    },
  },
  searchWrapper1: {
    maxWidth: "250px",
    flex: "0 0 250px",
    marginRight: "15px",
    display: "flex",
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
      marginTop: "10px",
      alignItems: "center",
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
  deleteButton : {
    "@media (max-width: 574px)": { 
      paddingBottom: "10px",
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
});

const AddConsignmentStyle = makeStyles({
  AddConsignmentWrapper: {},
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
    },
  },
  customModal: {
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

export { AddConsignmentStyle };

export { ConsignmentStyle };
