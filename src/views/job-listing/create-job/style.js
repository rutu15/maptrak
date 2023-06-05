import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const CreateJobStyle = makeStyles({
  CreateJobWrapper: {
    "@media (max-width: 574px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
  },
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
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "36px 40px 40px",
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
      top: "45px",
      cursor: "pointer",
      "@media (max-width: 991px)": {
        top: "28px",
        right: "25px",
      },
    },
    "& .MuiFormControl-root": {
      "& > div": {
        "&::after": {
          display: "none",
        },
      },
    },
    "& .MuiInputBase-root.MuiInput-root": {
      border: "none",
      "& input": {
        border: "none",
      },
    },
    "& .MuiFormControl-marginNormal": {
      margin: "0",
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
        "@media (max-width: 480px)": {
          minWidth: "100%",
          marginBottom: "15px",
        },
      },
    },
  },
});

export { CreateJobStyle };
