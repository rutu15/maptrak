import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const RequestFilterStyle = makeStyles((theme) => ({
  drawerWrapper: {
    position: "relative",
    "& .drawer-wrapper": {
      width: "420px",
      height: "calc(100% - 100px)",
      padding: "30px",
      overflowY: "auto",
      "@media(max-width:767px)": {
        padding: "20px 15px",
        width: "350px",
      },
      "@media(max-width:480px)": {
        width: "300px",
      },
      "@media(max-width:374px)": {
        width: "280px",
      },
      "& .filter-title-block": {
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h2": {
          fontSize: "24px",
        },
        "& img": {
          cursor: "pointer",
          width: "35px",
          padding: "10px",
        },
      },
      "& .label-text": {
        fontSize: "14px",
      },
      "& .form-gourp": {
        marginBottom: "20px",
        "& .MuiOutlinedInput-root": {
          "& .MuiSelect-selectMenu": {
            height: "50px",
            lineHeight: "50px",
          },
        },
      },
    },
    "& .button-wrapper": {
      padding: "30px",
      position: "absolute",
      bottom: "0",
      top: "auto",
      backgroundColor: colors.white,
      width: "100%",
      "@media(max-width:767px)": {
        padding: "20px 15px",
      },
      "& .button-wrapper-inner": {
        display: "flex",
        justifyContent: "space-between",
        "& .btn": {
          minWidth: "165px",
          fontSize: "16px",
          fontWeight: "600",
          "@media(max-width:767px)": {
            minWidth: "140px",
          },
          "@media(max-width:480px)": {
            minWidth: "120px",
          },
          "& + .btn": {
            marginLeft: "15px",
            "@media(max-width:374px)": {
              marginLeft: "10px",
            },
          },
        },
      },
    },
  },
}));

export { RequestFilterStyle };
