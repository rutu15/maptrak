import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const TimeReportStyle = makeStyles({
  TimeReportWrapper: {},
  tabHeadingRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
});

export { TimeReportStyle };
