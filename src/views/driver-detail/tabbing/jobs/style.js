import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const JobsStyle = makeStyles({
  JobsWrapper: {
    "& .button-assign-filter": {
      display:"flex",
      alignItems:"center",
    },
  },
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& > div": {
      "@media (max-width: 574px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
      "& .primary-btn.orange-btn": {
        height: "50px",
        lineHeight: "50px",
        fontSize: "16px",
        textTransform: "uppercase",
        "@media (max-width: 574px)": {
          width: "100%",
        },
      },
    },
  },
  searchWrapper: {
    maxWidth: "360px",
    flex: "0 0 360px",
    "@media (max-width: 767px)": {
      maxWidth: "270px",
      flex: "0 0 270px",
    },
    "@media (max-width: 574px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      marginBottom: "20px",
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
  modalWrapper: {
    "@media (max-width: 574px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      marginTop: "20px",
    },
    "& button.primary-btn": {
      height: "50px",
      lineHeight: "50px",
      fontSize: "16px",
      fontWeight: "600",
      minWidth: "208px",
      textTransform: "uppercase",
      "@media (max-width: 574px)": {
        width: "100%",
      },
    },
  },
});

export { JobsStyle };
