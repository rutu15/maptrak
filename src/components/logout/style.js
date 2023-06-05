import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const logOutStyle = makeStyles((theme) => ({
  logOutWrapper: {
    width: "100%",
    "& a": {
      color: colors.red + " ! important",
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "40px",
      textAlign: "center",
      maxWidth: "430px",
      width: "100%",
      "@media(max-width:767px)": {
        width: "auto",
        maxWidth: "100%",
        padding: "25px 15px",
        margin: "0 15px",
      },
      "& .MuiDialogContent-root,& .MuiDialogActions-root, & .MuiDialogTitle-root": {
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
  },
}));

export { logOutStyle };
