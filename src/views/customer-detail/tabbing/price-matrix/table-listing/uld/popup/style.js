import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const AddPopupStyle = makeStyles({
  customForm: {
    overflow: "hidden",
    "& .weekly-row-wrapper": {
      marginTop: "30px",
      "& .weekly-row": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        "& + .weekly-row": {
          marginTop: "24px",
        },
        "& .textfield-wrapper": {
          display: "flex",
          flex: "1",
          "@media(max-width:767px)": {
            padding: "0",
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .MuiFormControl-root": {
            "& + .MuiFormControl-root": {
              marginLeft: "20px",
            },
          },
        },
        "& .label-text": {
          paddingRight: "15px",
          margin: "0",
          maxWidth: "150px",
          flex: "0 0 150px",
          "@media(max-width:767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            paddingRight: "0",
            margin: "0 0 10px",
          },
        },
      },
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "32px 40px 40px",
      maxWidth: "550px",
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
      margin: "40px 0 0",
      padding: "0",
      display: "flex",
      "@media (max-width: 480px)": {
        flexDirection: "column",
      },
      "& button": {
        height: "50px",
        lineHeight: "50px",
        fontWeight: "600",
        fontSize: "16px",
        minWidth: "150px",
        textTransform: "uppercase",
        "@media (max-width: 480px)": {
          minWidth: "100%",
          marginBottom: "15px",
        },
        "& + button": {
          marginLeft: "20px",
          "@media (max-width: 480px)": {
            margin: "0 ",
          },
        },
        "&.gray-border-btn": {
          boxShadow: "none",
          border: "1px solid #e7e4f1",
          color: colors.primary,
          textTransform: "uppercase",
          backgroundColor: "transparent",
          "&:hover": {
            boxShadow: "none",
            color: colors.primary,
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export { AddPopupStyle };
