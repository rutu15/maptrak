import { makeStyles } from "@material-ui/core/styles";
import bgImage from "@assets/images/bg-image.jpg";
import { colors } from "@utils/constant";

const bannerStyle = makeStyles((theme) => ({
  customSelect: {
    display: "block",
  },
  commonBannerWrapper: {
    "& .commonBanner": {
      backgroundImage: "url(" + bgImage + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "top",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "@media (max-width: 1600px)": {
        backgroundPosition: "bottom",
      },
      "@media (max-height: 550px)": {
        minHeight: 600,
      },
    },
    "& .custom-form": {
      "& .btn-wrapper": {
        marginTop: "35px",
        "& button": {
          width: "100%",
          height: "50px",
          lineHeight: "50px",
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "uppercase",
        },
      },
    },
  },
}));

const innerPageStyle = makeStyles((theme) => ({
  innerPageWrapper: {
    "& .inner-page": {
      paddingLeft: "30px",
      paddingRight: "30px",
      backgroundColor: colors.lightGray,
      minHeight: "100vh",
      "@media (max-width: 1359px)": {
        paddingLeft: "15px",
        paddingRight: "15px",
      },
      "& .inner-white-box": {
        boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
        backgroundColor: "#fff",
        paddingLeft: "25px",
        paddingRight: "25px",
        paddingTop: "18px",
        paddingBottom: "20px",
        borderRadius: "6px",
        height: "100%",
        "@media (max-width: 1359px)": {
          paddingLeft: "15px",
          paddingRight: "15px",
        },
      },
    },
  },
}));

export { bannerStyle, innerPageStyle };
