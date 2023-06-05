import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const AssignJobStyle = makeStyles({
  modalWrapper: {
    paddingLeft: "20px",
  },
  customForm: {
    overflow: "hidden",
    "& .form-row": {
      display: "flex",
      margin: "0 -10px",
      "@media (max-width: 575px)": {
        flexWrap: "wrap",
      },
      "& .form-group": {
        padding: "0 10px",
        maxWidth: "100%",
        flex: "0 0 100%",
        marginBottom: "20px",
        minWidth: "350px",
        "@media (max-width: 424px)": {
          minWidth: "300px",
        },
        "@media (max-width: 374px)": {
          minWidth: "270px",
        },
        "& .label-text": {
          fontSize: "14px",
        },
      },
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "32px 40px 40px",
      maxWidth: "430px",
      minWidth: "250px",
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
        "& + button": {
          marginLeft: "15px",
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

export { AssignJobStyle };
