import { makeStyles } from "@material-ui/core/styles";

const AssignDriverStyle = makeStyles({
  customForm: {
    overflow: "hidden",
    "& .form-row": {
      display: "flex",
      margin: "0 -10px",
      "@media (max-width: 575px)": {
        flexWrap: "wrap",
      },
      "& .form-gourp": {
        padding: "0 10px",
        maxWidth: "100%",
        flex: "0 0 100%",
        minWidth: "350px",
        "@media (max-width: 424px)": {
          minWidth: "300px",
        },
        "@media (max-width: 374px)": {
          minWidth: "270px",
        },
        "&.full-width": {
          maxWidth: "100%",
          flex: "0 0 100%",
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
      padding: "36px 40px 40px",
      maxWidth: "500px",
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
        textTransform: "uppercase",
        "& + button": {
          marginLeft: "15px",
          "@media (max-width: 480px)": {
            marginLeft: "0",
          },
        },
        "@media (max-width: 480px)": {
          minWidth: "100%",
          marginBottom: "15px",
          marginLeft: "0",
        },
      },
    },
  },
});

export { AssignDriverStyle };
