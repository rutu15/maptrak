import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const FooterStyle = makeStyles(() => ({
  FooterWrapper: {
    "& .site-footer": {
      backgroundColor: colors.graybg,
      padding: "30px",
      color: colors.white,
      position: "fixed",
      width: "100%",
      bottom: "0",
      zIndex: "1",
      "@media (max-width: 767px)": {
        padding: "25px 15px",
      },
      "& .footer-wrapper": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "@media (max-width: 767px)": {
          flexDirection: " column",
        },
        "& p": {
          fontSize: "14px",
          "@media (max-width: 767px)": {
            marginBottom: 10,
          },
        },
        "& .cms-link": {
          "& li + li": {
            marginLeft: "30px",
          },
          "& li": {
            fontSize: "14px",
            display: "inline-block",
            "& a": {
              color: colors.white,
              textDecoration: "none !important",
              "&:hover": {
                opacity: "0.7",
              },
            },
          },
        },
      },
    },
  },
}));

export { FooterStyle };
