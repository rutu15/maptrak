import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const HolidayStyle = makeStyles((theme) => ({
  HolidayWrapper: {
    "& .setting-page": {
      "& h1": {
        color: colors.darkBlack,
        textTransform: "none",
      },
      "& .right-content": {
        "& .right-content-inner": {
          padding: "30px",
          "@media (max-width: 767px)": {
            padding: "20px",
          },
        },
      },
    },
  },
  innerPageTopBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "25px",
    "@media (max-width: 991px)": {
      flexWrap: "wrap",
    },
    "& h1": {
      fontSize: "30px",
      color: colors.black,
      textTransform: "capitalize",
      margin: "0",
      "@media (max-width: 374px)": {
        fontSize: "24px",
      },
    },
    "& .right-block": {
      flex: "1",
      "@media (max-width: 1279px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
      "& .right-block-inner": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        "@media (max-width: 991px)": {
          flexWrap: "wrap",
        },
        "& .modal-wrapper": {
          marginLeft: "15px",
          "@media (max-width: 1023px)": {
            margin: "20px 0 0 0",
            flex: "0 0 100%",
            maxWidth: "100%",
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
              "@media (max-width: 574px)": {
                width: "100%",
              },
            },
          },
        },
      },
    },
    "& .left-block": {
      paddingRight: "10px",
      "@media (max-width: 991px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
    },
  },
}));

export { HolidayStyle };
