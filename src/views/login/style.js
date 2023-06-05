import { makeStyles } from "@material-ui/core/styles";
import bgImage from "@assets/images/bg-image.jpg";

const loginStyle = makeStyles((theme) => ({
  customSelect: {
    display: "block",
  },
  commonBannerWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
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
        "& .label-text": {
          marginTop: "15px",
        },
      },
    },
  },
}));

export { loginStyle };
