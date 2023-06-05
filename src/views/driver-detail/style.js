import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const DriverDetailStyle = makeStyles({
  DriverDetailWrapper: {
    "& .detail-col-layout": {
      display: "flex",
      margin: "0 -15px",
      flexWrap: "wrap",
      "& .left-block": {
        maxWidth: "31%",
        flex: "0 0 31%",
        padding: "0 15px",
        "@media(max-width:1199px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
          marginBottom: "20px",
        },
      },
      "& .right-block": {
        maxWidth: "69%",
        flex: "0 0 69%",
        padding: "0 15px",
        "@media(max-width:1199px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
        },
      },
    },
  },
  backLinkWrapper: {
    marginBottom: "20px",
    "& a": {
      fontSize: "18px",
      lineHeight: "1.2",
      position: "relative",
      fontWeight: "500",
      color: colors.orange,
      display: "inline-flex",
      alignItems: "center",
      "& svg": {
        height: 15,
        width: 15,
      },
    },
  },
});

export { DriverDetailStyle };
