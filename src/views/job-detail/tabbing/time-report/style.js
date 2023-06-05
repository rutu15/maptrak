import { makeStyles } from "@material-ui/core";

const TimeReportStyle = makeStyles({
  TimeReportWrapper: {
    "& .map-wrapper": {
      height: "0",
      paddingBottom: "30%",
      maxWidth: "100%",
      overflow: "hidden",
      "& .map-container ": {
        position: "relative",
        paddingBottom: "26.25%",
        paddingTop: "30px",
        height: 0,
        overflow: "hidden",
      },
      "@media(max-width:767px)": {
        paddingBottom: "40%",
      },
      "@media(max-width:574px)": {
        paddingBottom: "50%",
      },
    },
  },
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  titleWrapper: {
    "& h2": {
      fontWeight: "600",
      fontSize: "30px",
      textTransform: "capitalize",
      "@media (max-width: 767px)": {
        marginBottom: "10px",
      },
    },
  },
  buttonWrapper: {
    "@media (max-width: 767px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
    "& .btn-inner-wrapper": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      "& button": {
        height: "50px",
        lineHeight: "50px",
        fontSize: "16px",
        fontWeight: "600",
        minWidth: "208px",
        textTransform: "uppercase",
        "@media (max-width: 574px)": {
          width: "100%",
        },
        "& .MuiButton-label": {
          display: "flex",
          alignItems: "center",
        },
        "& img": {
          width: "20px",
          height: "20px",
          marginRight: "10px",
        },
        "& + button": {
          marginLeft: "15px",
          "@media (max-width: 574px)": {
            margin: "15px 0 0 0",
          },
        },
      },
    },
  },
});

export { TimeReportStyle };
