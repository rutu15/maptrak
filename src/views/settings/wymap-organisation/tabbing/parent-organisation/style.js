import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const ParentOrganisationStyle = makeStyles({
  ParentOrganisationWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
  },
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    "@media (max-width: 1150px)": {
      flexWrap: "wrap",
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
    flex: "0 0 50%",
    maxWidth: "50%",
    order: "1",
    "& button": {
      marginLeft: "auto",
      "@media (max-width: 1150px)": {
        marginTop: "30px",
      },
    },
    "@media (max-width: 767px)": {
      maxWidth: "270px",
      flex: "0 0 270px",
    },
    "@media (max-width: 574px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      marginTop: "10px",
    },
    "& button.primary-btn": {
      height: "50px",
      lineHeight: "50px",
      fontSize: "16px",
      fontWeight: "600",
      minWidth: "208px",
      textTransform: "uppercase",
      marginRight: "10px",
      "@media (max-width: 574px)": {
        width: "100%",
      },
      "@media (max-width: 1150px)": {
        marginTop: "30px",
        width: "100%",
      },
    },
  },
});

export { ParentOrganisationStyle };
