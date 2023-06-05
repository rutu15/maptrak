import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const AWBStyle = makeStyles({
  AWBWrapper: {},
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "10px",
    // justifyContent: "space-between",
  },
  searchWrapper: {
    maxWidth: "200px",
    flex: "0 0 250px",
    marginRight: "15px",
    "@media (max-width: 1001px)": {
      maxWidth: "150px",
      flex: "0 0 190px",
    },
    "@media (max-width: 1500px)": {
      maxWidth: "220px",
      flex: "0 0 300px",
      marginBottom: "10px",
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
    },
    "@media (max-width: 900px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      display: "flex",
      marginTop: "10px",
    },
    "& .btn-wrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      "& .primary-btn": {
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
      margin: "0 0 20px 0",
      flex: "0 0 100%",
      maxWidth: "100%",
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

export { AWBStyle };
